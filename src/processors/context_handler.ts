import { ND_EVENTS, NO_CONTEXT } from "../main/constants";
import { Util } from "../modules/util.js";
import { AbstractProcessor } from "./abstract_processor.js";
import { Context } from "../modules/context.js";

export class ContextHandler extends AbstractProcessor {
    static _instance: ContextHandler;

    active_context: string = NO_CONTEXT;

    constructor() {
        super("ContextHandler");

        // Singleton
        if (!!ContextHandler._instance) {
            return ContextHandler._instance;
        }
        ContextHandler._instance = this;

        this.templates = [];
        this.handlers = [];

        // Add an event listeners
        this.logger.info(`Adding a listener to handle '${ND_EVENTS.CONTEXT}' events.`);
        document.addEventListener(ND_EVENTS.CONTEXT, this.#set_context);
        document.addEventListener(ND_EVENTS.REFRESH_AFTER, this.#after_refresh);
    }

    #set_context = (event: Event) => {
        const { context, action } = (event as CustomEvent<{ context: string; action: string; }>).detail;
        this.logger.info(`Event: ${event.type}. Context: '${context}'. Action: '${action}'`);

        switch (action) {
            case "set":
                this.active_context !== context ? (this.active_context = context) : {};
                Context.context_changed = true;

                break;
            case "clear":
                this.active_context !== NO_CONTEXT ? (this.active_context = NO_CONTEXT) : {};
                Context.context_changed = true;
                break;
            default:
                return;
        }
        this.#apply();
    };

    #after_refresh = (e) => {
        this.logger.info("After refresh event received from", e.detail.fragment);
        this.#update_handlers();
        this.#apply();
    };

    #clear_handlers = () => {
        this.logger.info(`Clearing handlers (${this.handlers.length}).`);
        while (this.handlers.length > 0) {
            const handler = this.handlers[0];
            this.logger.info(`The handler for the '${handler.name}' context is no longer needed (cleaned).`);
            this.handlers.splice(0, 1);
        }
        while (this.templates.length > 0) {
            this.templates.splice(0, 1);
        }

        this.active_context = null;
        this.logger.info(`Clear handlers done. Handlers left: ${this.handlers.length}.`);
    };

    #update_handlers = (fragment) => {
        this.logger.info("Updating handlers.");

        const contexts = document.querySelectorAll("[nd-context]");
        if (contexts.length === 0) {
            this.#clear_handlers();
            return;
        }

        let new_context_templates = false;
        contexts.forEach((e) => {
            this.templates.findIndex((template) => template.innerHTML === e.innerHTML) < 0 ? (new_context_templates = true) : {};
        });

        if (!new_context_templates) {
            this.logger.info(`Document already processed.`);
            return;
        }

        this.#clear_handlers();
        contexts.forEach((e) => {
            const tag = e.tagName.toLowerCase();
            const context_name = e.getAttribute("nd-context");

            // Check tag (must be 'template')
            if (tag !== "template") {
                this.logger.error(`Contexts must be defined within a '<template.../>' tag. Provided : '<${tag}.../>'.`);
                return;
            }

            // Check name
            if (!context_name) {
                this.logger.error(`Contexts must have a name !`, e);
                return;
            }

            // Create a handler (if not already done)
            context_name.split(" ").forEach((name) => {
                this.logger.info(`Creating a handler for the '${name}' context.`);
                this.handlers.push(new Context(e, name));
            });
            this.templates.push(e);
        });
        this.logger.info(`Added ${this.handlers.length} context handlers.`);

        // Check if there is a 'no context' handler
        if (this.handlers.findIndex((handler) => handler.name === NO_CONTEXT) < 0) {
            this.logger.error(`A context for '${NO_CONTEXT}' must be present !`);
        }
        this.logger.info("Updating handlers done.");
    };

    #apply = () => {
        this.active_context ? {} : (this.active_context = NO_CONTEXT);

        if (this.handlers.length === 0) return;

        this.logger.info(`Applying context '${this.active_context}'.`);

        // First apply the NO CONTEXT handler (initial app state)
        const index = this.handlers.findIndex((handler) => handler.name === NO_CONTEXT);
        if (index > -1) {
            this.handlers[index].apply();
        }

        // Apply for current context(s)
        this.handlers.forEach((h) => {
            if (h.name === NO_CONTEXT) return;
            h.name === this.active_context ? h.apply() : {};
        });
        Context.context_changed = false;
    };

    get_current_context = () => {
        return this.active_context === NO_CONTEXT ? null : this.active_context;
    };

    process = (fragment: HTMLElement): void => { };


    postprocess = () => { };
};
