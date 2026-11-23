/**
 * Class VersionHandler
 *
 * Handles elements bearing the nd-version attribute.
 *
 * Methods and attributes starting with an underscore (_) are private !
 *
 * Usage:
 *    <tag nd-version><tag>
 *
 * Attributes:
 *    nd-version: no data
 */

import { Util } from "../modules/util";
import { AbstractProcessor } from "./abstract_processor";

export class VersionProcessor extends AbstractProcessor {
    constructor() {
        super();
    }

    /**
     * Process a given fragment.
     */
    process = (fragment: Element) => {
        if (document.querySelectorAll("[nd-version]").length == 0) return;

        // Process this fragment
        fragment.querySelectorAll(`[nd-version]`).forEach((element) => {
            this.logger.info(`Processing element ${Util.truncate(element.outerHTML)}`);
            element.textContent = nd_core.version;
        });
    };

    /**
     * Clean the DOM
     */
    postprocess = () => { };
};
