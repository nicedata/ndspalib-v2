/**
 * Syntax & checks
 */

import { CheckResult } from "../main/types";
import { Util } from "../modules/util";

import { FragmentCheckResult, Keyword, Parameter, Syntax } from "./types";


const TRUNCATE_LENGTH = 80;
const WILDCARD = '*';

export const KEYWORDS: Record<string, Keyword> = {
    // Main keywords
    NONE: { name: '', tags: [WILDCARD] },
    MAIN: { name: 'nd-main', tags: [WILDCARD] },
    SOURCE: { name: 'nd-source', tags: [WILDCARD] },
    NAV: { name: 'nd-nav', tags: [WILDCARD] },
    VERSION: { name: 'nd-version', tags: [WILDCARD] },
    POLL: { name: 'nd-poll', tags: [WILDCARD] },
    CONTEXT: { name: 'nd-context', tags: ['template'] },
    SELECT: { name: 'nd-select', tags: ['select'] },
    // TODO : check if used !
    ENV: { name: 'nd-env', tags: [WILDCARD] },
    TEST: { name: 'nd-test', tags: [WILDCARD] },
};

export const PARAMETERS: Record<string, Parameter> = {
    // Parameter appearing beside of a keyword
    INFORM: { name: 'nd-inform', standalone: false, needsvalue: true },
    TARGET: { name: 'nd-target', standalone: false, needsvalue: true },
    KEY: { name: 'nd-key', standalone: false, needsvalue: true },
    INTERVAL: { name: 'nd-interval', standalone: false, needsvalue: true },
    ACTION: { name: 'nd-action', standalone: false, needsvalue: true },
    PARAMS: { name: 'nd-params', standalone: false, needsvalue: true },
    DIALOG: { name: 'nd-dialog', standalone: false, needsvalue: true },
    SELECTED: { name: 'nd-selected', standalone: false, needsvalue: true },
    DEFAULT: { name: 'nd-default', standalone: false, needsvalue: true },
    PARAMETER: { name: 'nd-params', standalone: false, needsvalue: true },
    // Standalone parameters (no keyword needed)
    URL: { name: 'nd-url', standalone: true, needsvalue: true },
    SHOWFOR: { name: 'nd-show-for', standalone: true, needsvalue: true },
    HIDEFOR: { name: 'nd-hide-for', standalone: true, needsvalue: true },
    FOLLOW: { name: 'nd-follow', standalone: true, needsvalue: false },
    SYNC: { name: 'nd-sync', standalone: true, needsvalue: false },
    ACTIVATE: { name: 'nd-activate', standalone: true, needsvalue: false },
};

const SYNTAX: Syntax[] = [
    // Keyword syntax
    { keyword: KEYWORDS.VERSION, required: [], optional: [] },
    { keyword: KEYWORDS.CONTEXT, required: [], optional: [] },
    { keyword: KEYWORDS.MAIN, required: [PARAMETERS.URL], optional: [PARAMETERS.TARGET] },
    { keyword: KEYWORDS.SOURCE, required: [PARAMETERS.URL], optional: [PARAMETERS.TARGET] },
    { keyword: KEYWORDS.NAV, required: [PARAMETERS.URL, PARAMETERS.TARGET], optional: [PARAMETERS.DIALOG, PARAMETERS.PARAMETER] },
    { keyword: KEYWORDS.SELECT, required: [PARAMETERS.TARGET], optional: [PARAMETERS.URL, PARAMETERS.SELECTED, PARAMETERS.INFORM, PARAMETERS.DEFAULT] },
    // Standalone parameters
    { keyword: KEYWORDS.NONE, required: [], optional: [PARAMETERS.SHOWFOR, PARAMETERS.HIDEFOR, PARAMETERS.FOLLOW, PARAMETERS.SYNC, PARAMETERS.URL, PARAMETERS.ACTIVATE] },
];


// Define keyword and parameter sets
const KEYWORD_SET = new Set(Object.values(KEYWORDS).flatMap(k => k.name));
const PARAMETER_SET = new Set(Object.values(PARAMETERS).flatMap(p => p.name));

const find_nd_elements = (fragment: Element): Element[] => {
    return [...fragment.querySelectorAll('*')].filter(el => [...el.attributes].some(attr => attr.name.startsWith('nd-')));
};


class SyntaxCheck {
    private static readonly fragment_check_result = new FragmentCheckResult();

    private static find_syntax = (element: Element): Syntax | undefined => {
        let result = SYNTAX.find((item) => item.keyword === KEYWORDS.NONE);

        for (const s of SYNTAX) {
            if (element.hasAttribute(s.keyword.name)) {
                result = s;
                break;
            }
        };
        return result;
    };

    private static find_nd_attributes = (element: Element): string[] => {
        return [...element.attributes].filter(attr => attr.name.startsWith('nd-')).flatMap(a => a.name);
    };

    public static clear_errors = () => {
        this.fragment_check_result.clear();
    };

    public static dump_errors_and_warnings = (): void => {
        this.fragment_check_result.log_all();
    };

    public static has_errors = (): boolean => {
        return this.fragment_check_result.has_errors() || this.fragment_check_result.has_warnings();
    };

    public static check_element = (element: Element): void => {
        const element_html = Util.truncate(element.outerHTML, TRUNCATE_LENGTH);
        const nd_attributes = this.find_nd_attributes(element);

        // Check nd-keywords
        const kwds = [...new Set(nd_attributes).intersection(KEYWORD_SET)];


        switch (kwds.length) {
            case 0:
                // No keywords at all
                break;
            case 1:
                // Single keyword
                const kwd_name = kwds[0];
                const kwd = Object.values(KEYWORDS).find(k => k.name === kwd_name);
                // Check if nd-keyword is on the right tag
                if (kwd?.tags) {
                    if (!kwd.tags.includes(WILDCARD) && !kwd.tags.includes(element.tagName.toLowerCase())) {
                        this.fragment_check_result.add_error(`The ${kwd.name} keyword should sit on following tag(s) : ${kwd.tags.join(', ')}`);
                    }
                }
                // Check if attribute has a value (not allowed !)
                const attr = element.getAttribute(kwd_name);
                if (attr)
                    this.fragment_check_result.add_warning(`An nd-keyword (${kwd_name}) cannot have a value. Element : ${element_html}`);
                break;
            default:
                // Multiple keywords
                this.fragment_check_result.add_error(`Too many nd-keywords found. Element : ${element_html}`);
        }


        // Find a syntax description for this element
        const syntax = this.find_syntax(element);
        if (!syntax) {
            this.fragment_check_result.add_warning(`No syntax check found for element ${element_html}`);
            return;
        }

        // Check all nd-attributes
        nd_attributes.forEach(attr => {
            const attribute_id_valid = KEYWORD_SET.has(attr) || PARAMETER_SET.has(attr);
            if (!attribute_id_valid) {
                this.fragment_check_result.add_error(`Unknown attribute ${attr} in element ${element_html}`);
            }

            if (kwds.length > 0 || attr === syntax.keyword.name) return;

            const attribute = syntax.optional.find(a => a.name === attr) || syntax.required.find(a => a.name === attr);
            if (!attribute) {
                this.fragment_check_result.add_error(`Attribute ${attr} cannot be used on element ${element_html}`);
            } else if (!attribute.standalone)
                this.fragment_check_result.add_error(`Attribute ${attr} is not standalone and therfore cannot be used on element ${element_html}`);
        });


        // Check required parameters
        syntax.required.forEach(required => {
            if (!element.hasAttribute(required.name)) {
                this.fragment_check_result.add_error(`Mandatory parameter ${required.name} is missing on element ${element_html}`);
            } else if (required.needsvalue && !element.getAttribute(required.name)?.trim()) {
                this.fragment_check_result.add_error(`Parameter ${required.name} has no value on element ${element_html}`);
            }
        });

        // Check optional parameters
        syntax.optional.forEach(optional => {
            if (element.hasAttribute(optional.name) && optional.needsvalue && !element.getAttribute(optional.name)?.trim()) {
                this.fragment_check_result.add_error(`Parameter ${optional.name} has no value on element ${element_html}`);
            }
        });
    };
}



export const check_fragment = (fragment: Element): CheckResult => {
    SyntaxCheck.clear_errors();

    // Check all elements bearing nd-attributes and check them
    find_nd_elements(fragment).forEach(element => {
        SyntaxCheck.check_element(element);
    });

    // Dump errors
    SyntaxCheck.dump_errors_and_warnings();

    return SyntaxCheck.has_errors() ? CheckResult.FAILURE : CheckResult.SUCCESS;
};





