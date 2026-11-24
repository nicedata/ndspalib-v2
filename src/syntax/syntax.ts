/**
 * Syntax & checks
 */

import { DATA_PREFIX, ND_PREFIX, WILDCARD } from "../main/constants";
import { CheckResult } from "../main/types";
import { Util } from "../modules/util";

import { FragmentCheckResult, Keyword, Parameter, Syntax } from "./types";


export const KEYWORDS: Record<string, Keyword> = {
    // Main keywords
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

const NO_KEYWORD: Keyword = { name: 'no-keyword', tags: [WILDCARD] };

export const PARAMETERS: Record<string, Parameter> = {
    // Parameter appearing beside of a keyword
    INFORM: { name: 'nd-inform', standalone: false, needsvalue: true },
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
    TARGET: { name: 'nd-target', standalone: true, needsvalue: true },
    SHOWFOR: { name: 'nd-show-for', standalone: true, needsvalue: true },
    HIDEFOR: { name: 'nd-hide-for', standalone: true, needsvalue: true },
    FOLLOW: { name: 'nd-follow', standalone: true, needsvalue: false },
    SYNC: { name: 'nd-sync', standalone: true, needsvalue: false },
    ACTIVATE: { name: 'nd-activate', standalone: true, needsvalue: false },
    HIDERESET: { name: 'nd-hide-reset', standalone: true, needsvalue: false },
    // Standalone data- parameters
    TRACKID: { name: 'data-ndtrack', standalone: true, needsvalue: false },
    NAME: { name: 'data-name', standalone: false, needsvalue: true },
    SHOW: { name: 'data-show', standalone: false, needsvalue: true },
    HIDE: { name: 'data-hide', standalone: false, needsvalue: true },
    DISABLE: { name: 'data-disable', standalone: false, needsvalue: true },
    ENABLE: { name: 'data-enable', standalone: false, needsvalue: true },
    REMOVE: { name: 'data-remove', standalone: false, needsvalue: true },
    RESET: { name: 'data-reset', standalone: false, needsvalue: true },
};

const SYNTAX: Syntax[] = [
    // Keyword syntax
    { keyword: KEYWORDS.VERSION, requires: [], requires_all: false, optional: [] },
    { keyword: KEYWORDS.MAIN, requires: [PARAMETERS.URL], requires_all: true, optional: [PARAMETERS.TARGET] },
    { keyword: KEYWORDS.SOURCE, requires: [PARAMETERS.URL], requires_all: true, optional: [PARAMETERS.TARGET] },
    { keyword: KEYWORDS.NAV, requires: [PARAMETERS.URL, PARAMETERS.TARGET], requires_all: true, optional: [PARAMETERS.DIALOG, PARAMETERS.PARAMETER] },
    { keyword: KEYWORDS.SELECT, requires: [PARAMETERS.TARGET, PARAMETERS.INFORM], requires_all: false, optional: [PARAMETERS.URL, PARAMETERS.SELECTED, PARAMETERS.DEFAULT] },
    { keyword: KEYWORDS.CONTEXT, requires: [PARAMETERS.NAME], requires_all: true, optional: [PARAMETERS.SHOW, PARAMETERS.HIDE, PARAMETERS.ENABLE, PARAMETERS.DISABLE, PARAMETERS.REMOVE, PARAMETERS.RESET] },
];

const DEFAULT_SYNTAX: Syntax = { keyword: NO_KEYWORD, requires: [], requires_all: false, optional: [PARAMETERS.SHOWFOR, PARAMETERS.HIDEFOR, PARAMETERS.HIDERESET, PARAMETERS.FOLLOW, PARAMETERS.SYNC, PARAMETERS.TARGET, PARAMETERS.URL, PARAMETERS.ACTIVATE] };


// Define keyword and parameter sets
const KEYWORD_SET = new Set(Object.values(KEYWORDS).flatMap(k => k.name));
const PARAMETER_SET = new Set(Object.values(PARAMETERS).flatMap(p => p.name));
const VOCABULARY_SET = KEYWORD_SET.union(PARAMETER_SET);

const find_nd_elements = (fragment: Element): Element[] => {
    // Build a list of elements
    const elements = [...fragment.querySelectorAll('*')];
    // Add the containing fragment
    elements.push(fragment);
    // Return a list of elements containing nd- keywords
    return elements.filter(el => [...el.attributes].some(attr => attr.name.startsWith(ND_PREFIX)));
};


class SyntaxCheck {
    private static readonly fragment_check_result = new FragmentCheckResult();

    /**
     * Find a syntax that applies to a given element.
     * 
     * @param element The element that is to be checked.
     * @returns The syntax to be checked or the NONE syntax
     */
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

    /**
     * Find all nd- attributes on an element.
     * 
     * @param element The element to be analyzed.
     * @returns 
     */
    private static find_nd_parameters = (element: Element): string[] => {
        return [...element.attributes].filter(attr => attr.name.startsWith(ND_PREFIX) || attr.name.startsWith(DATA_PREFIX)).flatMap(a => a.name);
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

    /**
     * Check element keyword.
     * 
     * Rules :
     * 
     * - There may be only one keyword. 
     * - The keyword must sit on the right HTML element.
     * 
     * @param element The element to check.
     */
    private static check_keywords = (element: Element): void => {
        const element_html = Util.truncate(element.outerHTML);
        const parameters = this.find_nd_parameters(element);

        // Get current keyword(s) via a set intersection
        const keywords = [...new Set(parameters).intersection(KEYWORD_SET)];

        // No keyword, no check
        if (keywords.length === 0) {
            return;
        }

        // More than one keyword
        if (keywords.length > 1) {
            this.fragment_check_result.add_error(`KEYWORD | Too many nd-keywords found. Element : ${element_html}`);
            return;
        }

        // There is only one keyword. Check it.
        const keyword_name = keywords[0];
        const keyword = Object.values(KEYWORDS).find(k => k.name === keyword_name);

        // Check if nd-keyword is on the right tag
        if (keyword?.tags) {
            if (!keyword.tags.includes(WILDCARD) && !keyword.tags.includes(element.tagName.toLowerCase())) {
                this.fragment_check_result.add_error(`KEYWORD | The ${keyword.name} keyword should only appear on following tag(s) : ${keyword.tags.join(', ')}`);
            }
        }

        // Check if attribute has a value (not allowed !)
        if (element.getAttribute(keyword_name))
            this.fragment_check_result.add_warning(`KEYWORD | An nd-keyword (${keyword_name}) cannot have a value. Element : ${element_html}`);
    };

    public static check_element = (element: Element): void => {
        const element_html = Util.truncate(element.outerHTML);
        const parameters = this.find_nd_parameters(element);

        // Keyword checks
        this.check_keywords(element);

        // Find a syntax description for this element
        const syntax = this.find_syntax(element) || DEFAULT_SYNTAX;
        const used_syntax = syntax.keyword.name.toUpperCase();

        // Check all nd-attributes
        parameters.forEach(param => {
            // If the checked attribute is the keyword itself, don't go further
            if (param === syntax.keyword.name) return;


            // Check if attribute is known
            const parameter_is_valid = VOCABULARY_SET.has(param);
            if (!parameter_is_valid) {
                this.fragment_check_result.add_error(`${used_syntax} | Unknown attribute ${param} on element ${element_html}`);
                return;
            }

            // Get the parameter fron the attribute
            const parameter = Object.values(PARAMETERS).find(p => p.name === param);
            const parameter_has_value = element.getAttribute(param)?.trim() !== '';
            if (parameter?.needsvalue && !parameter_has_value) {
                this.fragment_check_result.add_error(`${used_syntax} | Parameter ${parameter.name} has no value on element ${element_html}`);
            }
        });

        // If there are no required parameters, the job is done. 
        if (syntax.requires.length === 0) return;

        // Check required parameters
        const required_parameters: Set<Parameter> = new Set(syntax.requires);
        const present_parameters: Set<Parameter> = new Set();
        syntax.requires.forEach(param => {
            element.hasAttribute(param.name) ? present_parameters.add(param) : {};
        });

        const required_parameter_names = syntax.requires.flatMap(e => e.name).join(', ');
        const all_present = required_parameters.size === required_parameters.intersection(present_parameters).size;
        if (syntax.requires_all) {
            if (!all_present)
                this.fragment_check_result.add_error(`${used_syntax} | One of the ${required_parameter_names} parameter(s) is missing on element ${element_html}`);
        } else {
            if (!present_parameters.size)
                this.fragment_check_result.add_error(`${used_syntax} | At least one of the ${required_parameter_names} parameter(s) must be on element ${element_html}`);
        }
    };
}

export const check_fragment = (fragment: Element): CheckResult => {
    SyntaxCheck.clear_errors();

    // Check all elements bearing nd-attributes and check them
    const nd_elements = find_nd_elements(fragment);
    nd_elements.forEach(element => {
        SyntaxCheck.check_element(element);
    });

    // Dump errors
    SyntaxCheck.dump_errors_and_warnings();

    return SyntaxCheck.has_errors() ? CheckResult.FAILURE : CheckResult.SUCCESS;
};





