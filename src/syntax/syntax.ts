/**
 * Syntax & checks
 */

import { CheckResult } from "../main/types";
import { Logger } from "../modules/logger";
import { Util } from "../modules/util";

const NONE: Parameter[] = [];

export class Parameter {
    constructor(public name: string) { }
}

export class Attribute {
    constructor(public name: string, public unique: boolean, public parameters: Parameter[], public mandatory: Parameter[], public requires_one_of: Parameter[]) { }
}

export class PARAMETER {
    static readonly URL = new Parameter('nd-url');
    static readonly TARGET = new Parameter('nd-target');
    static readonly KEY = new Parameter('nd-key');
    static readonly INTERVAL = new Parameter('nd-interval');
    static readonly ACTION = new Parameter('nd-action');
    static readonly PARAMS = new Parameter('nd-params');
    static readonly DIALOG = new Parameter('nd-dialog');

    static readonly enum: Parameter[] = [this.URL, this.TARGET, this.KEY, this.INTERVAL, this.ACTION, this.PARAMS, this.DIALOG];
}

export class ATTRIBUTE {
    static readonly MAIN = new Attribute('nd-main', true, [PARAMETER.URL, PARAMETER.TARGET], [PARAMETER.URL], NONE);
    static readonly SOURCE = new Attribute('nd-source', false, [PARAMETER.URL, PARAMETER.TARGET], [PARAMETER.URL], NONE);
    static readonly ENV = new Attribute('nd-env', false, [PARAMETER.KEY], [PARAMETER.KEY], NONE);
    static readonly VERSION = new Attribute('nd-version', false, NONE, NONE, NONE);
    static readonly POLL = new Attribute('nd-poll', false, [PARAMETER.URL, PARAMETER.TARGET, PARAMETER.INTERVAL, PARAMETER.ACTION], NONE, [PARAMETER.URL, PARAMETER.ACTION]);
    static readonly NAV = new Attribute('nd-nav', false, [PARAMETER.URL, PARAMETER.TARGET, PARAMETER.DIALOG, PARAMETER.PARAMS], [PARAMETER.URL, PARAMETER.TARGET], NONE);
    static readonly TEST = new Attribute('nd-test', false, [PARAMETER.PARAMS], [PARAMETER.PARAMS], NONE);

    static readonly enum: Attribute[] = [this.MAIN, this.SOURCE, this.ENV, this.VERSION, this.POLL, this.NAV, this.TEST];
    static readonly attribute_list = `[${ATTRIBUTE.enum.map((e) => { return e.name; }).join("|")}]`;
}

const logger = new Logger('FragmentCheck');
class FragmentCheckResult {
    errors: string[] = [];
    warnings: string[] = [];

    has_errors = (): boolean => {
        return this.errors.length > 0;
    };

    has_warnings = (): boolean => {
        return this.warnings.length > 0;
    };

    log_all = (): void => {
        this.errors.forEach(e => {
            logger.error(e);
        });
        this.warnings.forEach(e => {
            logger.warn(e);
        });

    };
}

export const check_fragment = (fragment: Element): CheckResult => {
    const result = new FragmentCheckResult();

    const check_attribute_unicity = (element: Element): void => {
        const has_attr: boolean[] = [];
        ATTRIBUTE.enum.forEach(attr => {
            has_attr.push(element.hasAttribute(attr.name));
        });

        if (has_attr.filter((v) => v).length > 1) {
            result.errors.push(`Multiple attributes are present on element '${Util.compress(element.outerHTML)}' ! Use one and only one of ${ATTRIBUTE.attribute_list} !`);
        }
    };

    // Main function
    ATTRIBUTE.enum.forEach(attribute => {
        const elements = fragment.querySelectorAll(`[${attribute.name}]`);

        if (attribute.unique && elements.length > 1) {
            result.errors.push(`There can only be one '${attribute.name}' on the page !`);
        }

        elements.forEach(element => {
            const html = Util.compress(element.outerHTML);
            const parameters: Parameter[] = [];
            logger.info(`Checking attribute '${attribute.name}' on element '${html}'.`);
            // Check attribute unicity
            check_attribute_unicity(element);

            // Check parameters
            attribute.parameters.forEach(parameter => {
                const mandatory = attribute.mandatory.includes(parameter);
                const qualifier = mandatory ? 'mandatory' : 'optional';
                logger.info(`Checking ${qualifier} parameter '${parameter.name}' of attribute '${attribute.name}'.`);

                // Mandatory parameters
                if (mandatory && !element.hasAttribute(parameter.name)) {
                    result.errors.push(`Mandatory attribute '${parameter.name}' not found on element '${html}' !`);
                }

                // Parameter value
                if (element.hasAttribute(parameter.name)) {
                    parameters.push(parameter);
                    const value = element.getAttribute(parameter.name);
                    if (!value) {
                        result.errors.push(`Attribute '${parameter.name}' on element '${html}' has no value !`);
                    }
                }

            });
            // Required parameters
            if (attribute.requires_one_of.length && !attribute.requires_one_of.some(r => parameters.includes(r))) {
                result.errors.push(`At least one of [${attribute.requires_one_of.join('|')}] is required on element '${html}'!`);
            }
        });
    });
    result.log_all();
    return result.has_errors() ? CheckResult.FAILURE : CheckResult.SUCCESS;
};

