const { BaseHandler } = require("./base_handler.js");
const { Form } = require("../modules/form.js");

exports.FormHandler = class FormHandler extends BaseHandler {
    constructor() {
        super("FormHandler");
        // Singleton
        if (!!FormHandler._instance) {
            return FormHandler._instance;
        }
        FormHandler._instance = this;
        this.forms = [];
    }

    /**
     * Process a given fragment.
     */
    process = (fragment) => {
        // if (document.querySelectorAll("[nd-form]").length == 0) return;

        // Process this fragment
        fragment.querySelectorAll("[nd-form]").forEach((element) => {
            // Check element
            if (element.tagName !== "FORM") {
                this.logger.error(`The 'nd-form' attribute can only be on a <form> element !`);
                return;
            }
            // Create a new Form instance
            new Form(element);
            this.logger.info("New form instance created.");
        });
    };

    /**
     * Clean the DOM (remove unused handlers)
     */
    postprocess = () => {};
};
