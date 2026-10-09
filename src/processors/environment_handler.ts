import JSON5 from 'json5';
import { ND_EVENTS } from "../main/constants";
import { AbstractProcessor } from "./abstract_processor";
import type { KeyValuePair } from "../main/types";


export class EnvironmentHandler extends AbstractProcessor {
    static _instance: EnvironmentHandler;
    envs: KeyValuePair<string, any>[] = []; // The current environments list of {key, value}

    constructor() {
        // Singleton
        if (!!EnvironmentHandler._instance) {
            return EnvironmentHandler._instance;
        }
        super();
        EnvironmentHandler._instance = this;

        this.envs = []; // The current environments list of {key, value}


        // Add an event listeners
        this.logger.info(`Adding a listener to handle '${ND_EVENTS.ENVIRONMENT}' events.`);
        document.addEventListener(ND_EVENTS.ENVIRONMENT, this.event_handler as EventListener);

        // Make this instance imutable !
        Object.preventExtensions(this);
    }

    get_environment = (): KeyValuePair<string, any>[] => {
        return this.envs;
    };

    update_document = () => {
        this.logger.info(`Updating document. Environment: ${JSON5.stringify(this.envs)}.`);

        document.querySelectorAll("[nd-env]").forEach((e) => {
            const key = e.getAttribute("nd-env");
            if (!key) {
                this.logger.error(`No key specified in element`, e);
                return;
            }

            let result = "";

            // Handle wildard (useful for debugging ?)
            if (key === "*" && this.envs.length > 0) {
                const env_list: string[] = [];
                this.envs.forEach((e) => {
                    env_list.push(`${e.key}=${e.value}`);
                });
                result = env_list.join(", ");
            } else {
                // find the key in the environments list
                const item = this.envs.find((env) => env.key === key);
                result = item ? item.value : "";
            }
            result ? (e.innerHTML = result) : {};
        });
    };

    process = (fragment: Element): void => { };

    postprocess = (): void => {
        this.update_document();
    };

    event_handler = (event: CustomEvent): void => {
        this.logger.info(`Event: ${event.type}. Data: '${JSON5.stringify(event.detail)}'.`);
        const data = event.detail;

        switch (data.action) {
            case "set":
                const result = this.envs.find((env) => env.key === data.key);
                result ? (result.value = data.value) : this.envs.push({ key: data.key, value: data.value });
                break;
            case "unset":
                const index = this.envs.findIndex((env) => env.key === data.key);
                index >= 0 ? this.envs.splice(index, 1) : {};
                break;
            case "clear":
                this.envs = [];
                break;
        }

        // Update the whole document !
        this.update_document();
    };
};
