import { AbstractProcessor } from "../processors/abstract_processor";
import { SourceProcessor } from "../processors/source_processor";
import { Debug } from "../modules/debug";
import { Fetcher } from "../modules/fetcher";
import { Logger } from "../modules/logger";
import { BaseTracker } from "../trackers/base_tracker";
import { HandlerTracker } from "../trackers/handler_tracker";
import { TimerTracker } from "../trackers/timer_tracker";
import { INFOS } from "./constants";

export class Core {
    static _instance: Core;

    logger: Logger = new Logger("Core", true);
    version: string = `${INFOS.PROGNAME} ${INFOS.VERSION}`;
    fetcher: Fetcher = new Fetcher();
    debug: Debug = new Debug();
    handlers: AbstractProcessor[] = [];
    trackers: BaseTracker[] = [new TimerTracker(), new HandlerTracker()];
    main_container!: Element;

    constructor() {
        // Singleton pattern
        if (!!Core._instance) {
            return Core._instance;
        }
        Core._instance = this;

        Object.preventExtensions(this);
    };

    set_main_container: () => void = () => {
        const nd_init = document.querySelector("[nd-main]");
        nd_init ? (this.main_container = nd_init) : this.logger.warn(`No 'nd-init' element found in the document !`);
    };


    static init: () => Promise<Core> = () => {
        return new Promise((resolve) => {
            resolve(new Core());
        });

    };

    // export const core_init = (): Promise<Core> => {
    //     return new Promise((resolve) => {
    //         resolve(new Core());
    //     });
    // };
}