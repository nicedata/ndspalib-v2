import { AbstractProcessor } from "../processors/abstract_processor";
import { SourceProcessor } from "../processors/source_processor";
import { Debug } from "../modules/debug";
import { Fetcher } from "../modules/fetcher";
import { Logger } from "../modules/logger";
import { BaseTracker } from "../trackers/base_tracker";
import { HandlerTracker } from "../trackers/handler_tracker";
import { TimerTracker } from "../trackers/timer_tracker";
import { INFOS } from "./constants";
import { Util } from "../modules/util";
import { AlertSeverity } from "./types";
import { Alert } from "../components/notifications/alert";
import { Toast } from "../components/notifications/toast";

export class Core {
    private static _instance: Core;

    logger: Logger = new Logger("Core", true);
    version: string = `${INFOS.PROGNAME} ${INFOS.VERSION}`;
    fetcher: Fetcher = new Fetcher();
    debug: Debug = new Debug();
    util: Util = Util;
    handlers: AbstractProcessor[] = [];
    trackers: BaseTracker[] = [];
    main_container!: Element;

    alert = (severity: AlertSeverity, message: string) => {
        new Alert(severity, message).render();
    };

    toast = (title: string, message: string) => {
        new Toast(title, message).render();
    };

    constructor() {
        // Singleton pattern
        if (!!Core._instance) {
            return Core._instance;
        }
        Core._instance = this;

        Object.preventExtensions(this);
    };

    set_main_container: () => void = () => {
        const nd_main = document.querySelector("[nd-main]");
        nd_main ? (this.main_container = nd_main) : this.logger.warn(`No 'nd-main' element found in the document !`);
    };


    static init: () => Promise<Core> = () => {
        return new Promise((resolve) => {
            resolve(new Core());
        });

    };
}