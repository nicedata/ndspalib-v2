const { BaseHandler } = require("./base_handler.js");
const { Select } = require("../modules/select.js");

exports.SelectHandler = class SelectHandler extends BaseHandler {
    constructor() {
        super("SelectHandler");
        // Singleton
        if (!!SelectHandler._instance) {
            return SelectHandler._instance;
        }
        SelectHandler._instance = this;
    }

    process = (fragment) => {
        fragment.querySelectorAll("[nd-select]").forEach((element) => {
            new Select(element);
        });
    };

    postprocess = () => {};
};
