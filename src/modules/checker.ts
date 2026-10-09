import { Logger } from "./logger.js";
import { POLL_DEFAULT_INTERVAL_MS, DEFINITIONS } from "../main/constants";

export class Checker {
    static _instance: Checker;
    logger!: Logger;
    // static ND_ELEMENTS = ["nd-poll", "nd-link", "nd-action", "nd-form", "nd-zone"];
    constructor() {
        // Singleton !
        if (!!Checker._instance) {
            return Checker._instance;
        }
        Checker._instance = this;
        this.logger = new Logger("Checker", true);
    }

    check = (fragment: HTMLElement) => {
        DEFINITIONS.forEach((nd_element) => {
            fragment.querySelectorAll(`[${nd_element.tag}]`).forEach((element) => {
                const errors: string[] = [];
                const warnings: string[] = [];
                if (!nd_element.required.some((attr) => element.hasAttribute(attr))) {
                    errors.push(`Element <${nd_element.tag}> is missing required attribute(s): ${nd_element.required.join(", ")}.`);
                }
                nd_element.optional.forEach((opt) => {
                    if (!element.hasAttribute(opt.attribute)) {
                        warnings.push(`Element <${nd_element.tag}> is missing optional attribute '${opt.attribute}'. Using default value: ${opt.default}.`);
                    }
                });
                if (errors.length > 0) {
                    this.logger.info(`${errors.length} error(s) found in <${nd_element.tag}> element`, element);
                    errors.forEach((error) => this.logger.error(error));
                    return; // Skip further checks for this element if there are errors
                }
                if (warnings.length > 0) {
                    this.logger.info(`${warnings.length} warning(s) found in <${nd_element.tag}> element`, element);
                    warnings.forEach((warning) => this.logger.warn(warning));
                }
            });
        });
    };

    check_all = () => { };
};