import { Logger } from "./logger";
import { InformationDialog, DecisionDialog, SecureDecisionDialog, CustomDialog, Alert, Toast } from "../components/dialogs";

const MODES = ["info", "decision", "secure", "custom", "alert", "toast"];

const PARAMS_ALERT = [
    { name: "type", required: true, default: null },
    { name: "severity", required: true, default: "info" },
    { name: "message", required: true, default: "Missing message !" },
    { name: "redirect_url", required: false, default: null },
];

const PARAMS_TOAST = [
    { name: "type", required: true, default: null },
    { name: "title", required: true, default: "Missing title" },
    { name: "message", required: true, default: "Missing message !" },
    { name: "redirect_url", required: false, default: null },
];

const PARAMS_INFO = [
    { name: "type", required: true, default: null },
    { name: "escape", required: false, default: false },
    { name: "title", required: true, default: "Missing title !" },
    { name: "message", required: true, default: "Missing message !" },
    { name: "accept", required: true, default: "OK" },
    { name: "accept_url", required: false, default: null },
];

const PARAMS_DECISION = [
    { name: "type", required: true, default: null },
    { name: "escape", required: false, default: false },
    { name: "title", required: true, default: "Missing title !" },
    { name: "message", required: true, default: "Missing message !" },
    { name: "accept", required: true, default: "OK" },
    { name: "accept_url", required: false, default: null },
    { name: "dismiss", required: true, default: "Cancel" },
    { name: "dismiss_url", required: false, default: null },
];

const PARAMS_SECURE = [
    { name: "type", required: true, default: null },
    { name: "escape", required: false, default: false },
    { name: "title", required: true, default: "Missing title !" },
    { name: "message", required: true, default: "Missing message !" },
    { name: "confirm", required: true, default: "Please confirm" },
    { name: "accept", required: true, default: "OK" },
    { name: "accept_url", required: false, default: null },
    { name: "dismiss", required: true, default: "Cancel" },
    { name: "dismiss_url", required: false, default: null },
];

const PARAMS_CUSTOM = [
    { name: "type", required: true, default: null },
    { name: "escape", required: false, default: false },
    { name: "title", required: false, default: "" },
    { name: "width_pc", required: false, default: "30" },
];

exports.Dialog = class Dialog {
    constructor() {
        // Singleton !
        if (!!Dialog._instance) {
            return Dialog._instance;
        }
        this.logger = new Logger("Dialog", true);
        Dialog._instance = this;
    }

    static get = () => {
        return new Dialog();
    };

    get_dict = (template) => {
        const result = {};
        const warnings = [];
        const errors = [];

        // Get the mode
        const mode = template.content.querySelector(`[name="type"]`).value.toLowerCase();

        let checklist = null;
        switch (mode) {
            case "info":
                checklist = PARAMS_INFO;
                break;
            case "decision":
                checklist = PARAMS_DECISION;
                break;
            case "secure":
                checklist = PARAMS_SECURE;
                break;
            case "custom":
                checklist = PARAMS_CUSTOM;
                break;
            case "alert":
                checklist = PARAMS_ALERT;
                break;
            case "toast":
                checklist = PARAMS_TOAST;
                break;
        }

        if (mode === "custom") {
            // In a modal dialog, a sub-template containing the HTML elements must be present
            const sub_template = template.content.querySelector("template");
            if (!sub_template) {
                errors.push(`${mode} : required parameter '<template.../>' is missing in template with 'id=${template.id}'.`);
            } else {
                result["fragment"] = sub_template.content;
            }
        }

        checklist.forEach((item) => {
            const param = template.content.querySelector(`[name="${item.name}"]`);
            if (!param) {
                if (item.required) {
                    errors.push(`${mode} : required parameter '${item.name}' is missing in template with 'id=${template.id}'.`);
                } else {
                    warnings.push(`${mode} : optional parameter '${item.name}' is missing in template with 'id=${template.id}'.`);
                }
            }
            result[item.name] = param ? param.value : item.default;
        });

        // Display errors/warnings
        errors.forEach((error) => {
            this.logger.error(error);
        });
        warnings.forEach((warning) => {
            this.logger.info(warning);
        });
        return result;
    };

    from_template = (dialog_str) => {
        const [template_id, title, title_text] = dialog_str.split("::");

        if (title) {
            if (title !== "title") {
                this.logger.error(`Only the '::title' modifier is allowed in template with 'id=${template_id}.`);
                return;
            }
            if (!title_text) {
                this.logger.error(`A '::title::argument' must be defined in template with 'id=${template_id}.`);
                return;
            }
        }

        // Check if template exists
        const template = document.getElementById(template_id);
        if (!template) {
            this.logger.error(`Template with 'id=${template_id}' not found.`);
            return;
        }

        // Get all parameters
        const param_names = [];
        template.content.querySelectorAll("param").forEach((p) => {
            param_names.push(p.name);
        });

        // Check for required 'mode' parameter
        if (!param_names.includes("type")) {
            this.logger.error(`Parameter 'type' is missing in template with 'id=${template_id}'.`);
            return;
        }

        // Check if the mode is allowed
        const mode = template.content.querySelector(`[name="type"]`).value.toLowerCase();
        if (!MODES.includes(mode)) {
            this.logger.error(`Parameter 'type' must be  one of [${MODES.join(", ")}] in template with 'id=${template_id}'.`);
            return;
        }

        const dict = this.get_dict(template);

        console.log("Dialog dict", dict);

        dict["title"] = title_text ? title_text : dict["title"];

        switch (dict["type"]) {
            case "info":
                return new InformationDialog(dict);
            case "decision":
                return new DecisionDialog(dict);
            case "secure":
                return new SecureDecisionDialog(dict);
            case "custom":
                return new CustomDialog(dict);
            case "alert":
                const x = new Alert(dict);
                console.log("XXXX Alert", x);
                return x;
            case "toast":
                return new Toast(dict);
            default:
                return null;
        }
    };

    show = (dialog_str) => {
        console.log("Dialog show", dialog_str);
        const dialog = new Dialog().from_template(dialog_str);
        if (dialog) dialog.show();
    };
};
