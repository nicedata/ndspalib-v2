import { AbstractProcessor } from "../processors/abstract_processor";
import { Debug } from "../modules/debug";
import { Fetcher } from "../modules/fetcher";
import { Logger } from "../modules/logger";
import { BaseTracker } from "../trackers/base_tracker";
import { PROGNAME, VERSION, NO_CONTEXT } from "./constants";
import { Util } from "../modules/util";
import { AlertSeverity } from "./types";
import { Alert } from "../components/notifications/alert";
import { Toast } from "../components/notifications/toast";
import { ContextProcessor } from "../processors/context_processor";
import { EnvironmentProcessor } from "../processors/environment_processor";

export class Core {
    private static _instance: Core;

    logger: Logger = new Logger("Core", true);
    version: string = `${PROGNAME}`;
    fetcher: Fetcher = Fetcher.get();
    debug: Debug = new Debug();
    util: Util = Util;
    handlers: AbstractProcessor[] = [];
    trackers: BaseTracker[] = [];
    main_container!: Element;

    constructor() {
        // Singleton pattern
        if (Core._instance) {
            return Core._instance;
        }
        Core._instance = this;

        Object.preventExtensions(this);
    };

    set_main_container: () => void = () => {
        const nd_main = document.querySelector("[nd-main]");
        nd_main ? this.main_container = nd_main : this.logger.warn(`No 'nd-main' element found in the document !`);
    };

    alert = (severity: AlertSeverity, message: string) => {
        new Alert(severity, message).render();
    };

    toast = (title: string, message: string) => {
        new Toast(title, message).render();
    };


    set_context = (name: string): void => {
        ContextProcessor.getInstance().set_context(name);
    };

    get_context = (): string => {
        return ContextProcessor.getInstance().get_context();
    };

    clear_context = (): void => {
        ContextProcessor.getInstance().set_context(NO_CONTEXT);
    };


    get_environment = () => {
        return EnvironmentProcessor.getInstance().get_environment();
    };

    static init: () => Promise<Core> = () => {
        return new Promise((resolve) => {
            resolve(new Core());
        });

    };
}