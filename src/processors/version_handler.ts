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

const { BaseHandler } = require("./base_handler.js");

exports.VersionHandler = class VersionHandler extends BaseHandler {
    constructor() {
        super("VersionHandler");
        // Singleton
        if (!!VersionHandler._instance) {
            return VersionHandler._instance;
        }
        VersionHandler._instance = this;
    }

    /**
     * Process a given fragment.
     */
    process = (fragment) => {
        if (document.querySelectorAll("[nd-version]").length == 0) return;

        // Process this fragment
        fragment.querySelectorAll(`[nd-version]`).forEach((element) => {
            this.logger.info(`Processing element`, element);
            element.textContent = nd.version;
        });
    };

    /**
     * Clean the DOM
     */
    postprocess = () => {};
};
