/**
 * Syntax & checks
 */

import { Logger } from "../modules/logger";
import { Util } from "../modules/util";


export enum ATTR_NAME {
    MAIN = 'nd-main',
    SOURCE = 'nd-source',
    POLL = 'nd-poll',
    LINK = 'nd-link',
    ENV = 'nd-env',
}

export enum PARAM_NAME {
    URL = 'nd-url',
    TARGET = 'nd-target',
    KEY = 'nd-key',
}


type NdParameter = {
    name: PARAM_NAME;
    mandatory: boolean;
};

type NdAttribute = {
    name: ATTR_NAME;
    unique: boolean;
    one_way: boolean;
    parameters: NdParameter[];
};

// Syntax definition
const ATTRIBUTES: NdAttribute[] = [
    { name: ATTR_NAME.MAIN, unique: true, one_way: true, parameters: [{ name: PARAM_NAME.URL, mandatory: true }, { name: PARAM_NAME.TARGET, mandatory: false }] },
    { name: ATTR_NAME.SOURCE, unique: false, one_way: false, parameters: [{ name: PARAM_NAME.URL, mandatory: true }, { name: PARAM_NAME.TARGET, mandatory: false }] },
    { name: ATTR_NAME.ENV, unique: false, one_way: false, parameters: [{ name: PARAM_NAME.KEY, mandatory: true }] },
];

const logger = new Logger('FragmentCheck');
const attribute_list = ATTRIBUTES.map((e) => { return e.name; }).join(", ");

class FragmentCheckResult {
    errors: string[] = [];
    warnings: string[] = [];

    has_errors = (): boolean => {
        return this.errors.length > 0;
    };

    has_warnings = (): boolean => {
        return this.warnings.length > 0;
    };

    log = (): void => {
        if (this.has_errors() || this.has_warnings()) {
            this.errors.forEach(e => {
                logger.error(e);
            });
            this.warnings.forEach(e => {
                logger.warn(e);
            });
        }

    };
}

/**
 * Check for ND attribute unicity on an element.
 * 
 * @param element The element to analyze.
 * @returns true if OK, false if more than one attribute is present.
 */

export const check_fragment = (fragment: Element): void => {
    const result = new FragmentCheckResult();

    const check_element = (element: Element): void => {
        const has_attr: boolean[] = [];
        ATTRIBUTES.forEach(attr => {
            has_attr.push(element.hasAttribute(attr.name));
        });
        if (has_attr.filter((v) => v).length > 1) {
            result.errors.push(`Multiple attributes are present on element '${Util.truncate(element.outerHTML, 40)}' ! Use one and only one of ${attribute_list} !`);
        }
    };

    const check_url = (value: string) => {
        if (!value.startsWith("/")) {
            result.errors.push(`Cannot use url '${value}'. Only relative URLs are allowed !`);
        }
        if (value === "/") {
            result.errors.push(`Url '/' is not allowed !`);
        }
    };

    ATTRIBUTES.forEach(a => {
        const elements = fragment.querySelectorAll(`[${a.name}]`);
        if (a.unique && elements.length > 1) {
            result.errors.push(`There can only be one '${a.name}' on the page !`);
        }

        elements.forEach(e => {
            check_element(e);
            a.parameters.forEach(p => {
                if (p.mandatory) {
                    if (!e.hasAttribute(p.name)) {
                        result.errors.push(`Mandatory attribute '${p.name}' not found on element '${Util.truncate(e.outerHTML, 40)}' !`);
                    }
                }
                if (e.hasAttribute(p.name)) {
                    const value = e.getAttribute(p.name);
                    if (!value) {
                        result.errors.push(`Attribute '${p.name}' on element '${Util.truncate(e.outerHTML, 40)}' has no value !`);
                    } else {
                        switch (p.name) {
                            case PARAM_NAME.URL:
                                check_url(value);
                                break;
                        }
                    }
                }
            });
        });
        result.log();
        if (result.has_errors()) throw new Error(`Fragment check failed with errors. See console for details.`);
    });
};

