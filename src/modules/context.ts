import { ND_EVENTS } from "../main/constants";
import { Logger } from "./logger";
import { Util } from "./util";

export class Context {
    static LOGGER = new Logger("Context", true);
    static ACTIONS = ["show", "hide", "remove", "reset", "disable", "enable"];
    static context_changed = false;
    logger: Logger;
    name: string;
    show_selector: string | null;
    hide_selector: string | null;
    enable_selector: string | null;
    disable_selector: string | null;
    remove_selector: string | null;
    reset_selector: string | null;

    constructor(template: HTMLTemplateElement, name: string) {
        this.logger = Context.LOGGER;
        this.name = name;
        this.show_selector = null; // A list of elements to show
        this.hide_selector = null; // A list of elements to hide
        this.enable_selector = null; // A list of elements to hide
        this.disable_selector = null; // A list of elements to hide
        this.remove_selector = null; // A list of elements to remove
        this.reset_selector = null; // A list of elements to reset

        template.content.querySelectorAll("[name]").forEach((param) => {
            const param_name = param.getAttribute('name') || '';

            if (!Context.ACTIONS.includes(param_name)) {
                this.logger.error(`Invalid context action: '${param_name}'. Valid values are: ${Context.ACTIONS.join(", ")}.`);
                return;
            }

            if (!param.hasAttribute("nd-target")) {
                this.logger.error(`No 'nd-target' attribute found. Element:`, param);
                return;
            }

            const value = param.getAttribute("nd-target");

            switch (param_name) {
                case "show":
                    this.show_selector = value;
                    break;
                case "hide":
                    this.hide_selector = value;
                    break;
                case "remove":
                    this.remove_selector = value;
                    break;
                case "reset":
                    this.reset_selector = value;
                    break;
                case "enable":
                    this.enable_selector = value;
                    break;
                case "disable":
                    this.disable_selector = value;
                    break;
            }
        });
        this.logger.info(`Handler for the '${this.name}' context created.`);
    }

    apply = () => {
        this.logger.info(`Applying context '${this.name}'.`);
        // Show
        Util.get_targets(this.show_selector).forEach((element) => {
            element.hidden = false;
        });
        // Hide
        Util.get_targets(this.hide_selector).forEach((element) => {
            element.hidden = true;
        });
        // Enable
        Util.get_targets(this.enable_selector).forEach((element) => {
            element.disabled = false;
        });
        // Disable
        Util.get_targets(this.disable_selector).forEach((element) => {
            element.disabled = true;
        });
        // Remove
        Util.get_targets(this.remove_selector).forEach((element) => {
            if (element.innerHTML === "") return;
            Util.clear_node(element);
            Util.refresh(element);
        });
        // Reset
        Util.get_targets(this.reset_selector).forEach((element) => {
            Context.context_changed ? element.dispatchEvent(new CustomEvent(ND_EVENTS.RESET)) : {};
        });
    };
};