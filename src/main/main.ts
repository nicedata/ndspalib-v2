import { CONTAINERS, ND_STYLES, PROGNAME } from "./constants";
import { Core } from "./core";
import { Util } from "../modules/util";
import { SourceProcessor } from "../processors/source_processor";
import { EnvironmentProcessor } from "../processors/environment_processor";
import { Logger } from "../modules";
import { check_fragment } from "../syntax/syntax";
import { PollProcessor } from "../processors/poll_processor";
import { TimerTracker } from "../trackers/timer_tracker";
import { HandlerTracker } from "../trackers/handler_tracker";
import { VersionHandler } from "../processors/version_handler";
import { NavProcessor } from "../processors/nav_processor";
import { TestProcessor } from "../processors/test_processor";

declare global {
    var nd_core: Core;
}

/**
 * Initialize the document with required elements and styles.
 */
const initialize_document = () => {
    const styles = `<style id="nd-style">${ND_STYLES}</style>`;
    const containers = `<!-- Notification, dialog and busy containers --><div ${CONTAINERS.NOTIFICATIONS}></div><div ${CONTAINERS.DIALOGS}></div><div ${CONTAINERS.BUSY}><div nd-spinner></div></div>`;
    // Add the custom style sheet
    let fragment = Util.create_fragment(styles);
    document.querySelector("head")?.lastElementChild?.after(fragment);
    // Add the notification, dialog and busy containers
    fragment = Util.create_fragment(containers);
    document.querySelector("body")?.firstElementChild?.before(fragment);
};

console.info(`INFO | Core | ${PROGNAME} : initializing...`);
Core.init().then((core: Core) => {
    nd_core = core;
});

const on_dom_loaded = (): void => {
    removeEventListener("DOMContentLoaded", on_dom_loaded);
    initialize_document();
    nd_core.set_main_container();
    console.info(`INFO | Core | ${PROGNAME} : ready !`);
    check_fragment(document.body);
    nd_core.handlers = [
        SourceProcessor.getInstance(),
        PollProcessor.getInstance(),
        TimerTracker.getInstance(),
        HandlerTracker.getInstance(),
        VersionHandler.getInstance(),
        NavProcessor.getInstance(),
        TestProcessor.getInstance(),
    ];
    Util.refresh(document.body);
};

addEventListener("DOMContentLoaded", on_dom_loaded);


// Other modules
// import { Util } from "../modules/util";
// import { SelectHandler } from "../handlers/select_handler";
// import { PollHandler } from "../handlers/poll_handler";
// import { SourceHandler } from "../handlers/source_handler";
// import { VersionHandler } from "../handlers/version_handler";
// import { LinkHandler } from "../handlers/link_handler";
// import { EventHandler } from "../handlers/event_handler";
// import { ZoneHandler } from "../handlers/zone_handler";
// import { EnvironmentHandler } from "../handlers/environment_handler";
// import { ContextHandler } from "../handlers/context_handler";
// import { HandlerTracker } from "../handlers/handler_tracker";
// import { TimerTracker } from "../handlers/timer_tracker";
// import { FormHandler } from "../handlers/form_handler";
// import { Fetcher } from "../modules/fetcher";
// import { Notification } from "../modules/notification";
// import { Dialog } from "../modules/dialog";
// import { QRScanner } from "../modules/qr_scanner";
// import { Formatters } from "../modules/formatters";
// import { DomOps } from "../modules/dom_ops";

/*
export class Core {
    static _instance: Core;
    logger!: Logger;
    debug!: Debug;
    infos!: { PROGNAME: string; VERSION: string; AUTHOR: string; LICENCE: string; INSPIREDBY: { HTMX: string; UNPOLY: string; }; };
    version!: string;
    notification: any;
    dialog: any;
    util!: typeof Util;
    main_container!: Element | null;
    context_handler!: ContextHandler | null;
    handlers!: any[];
    environment!: any[];
    constructor() {
        // Singleton pattern
        if (!!Core._instance) {
            return Core._instance;
        }
        Core._instance = this;

        this.logger = new Logger("Core", true);
        this.debug = new Debug(); // Create a new Debug singleton,

        this.infos = INFOS;
        this.version = `${INFOS.PROGNAME} ${INFOS.VERSION}`;

        this.notification = new Notification();
        this.dialog = new Dialog();
        this.util = Util;

        this.main_container = null;
        this.context_handler = null;
        this.handlers = [];
        this.environment = [];

        // Make this instance imutable !
        Object.preventExtensions(this);
    }

    #set_main_container = () => {
        const nd_init = document.querySelector("[nd-init]");
        nd_init ? (this.main_container = nd_init) : nd.logger.warn(`No 'nd-init' element found in the document !`);
    };

    #create_handlers = () => {
        this.handlers = [
            new PollHandler(),
            new SourceHandler(),
            new VersionHandler(),
            new LinkHandler(),
            new SelectHandler(),
            new EventHandler(),
            new ZoneHandler(),
            new FormHandler(),
            new HandlerTracker(),
            new TimerTracker(),
            new EnvironmentHandler(),
            new ContextHandler(),
        ];
        // Set the context handler class attribute
        this.handlers.forEach((h) => {
            h instanceof ContextHandler ? (this.context_handler = h) : {};
        });
    };

    qr_scanner = (scan_device_id = "", camera_selector = "camera", btn_ok = "scan", btn_close = "close", div_reader = "reader", post_to = "") => {
        return new QRScanner(scan_device_id, camera_selector, btn_ok, btn_close, div_reader, post_to);
    };

    finalize = () => {
        this.#set_main_container();
        this.#create_handlers();
        Util.refresh(document);
    };

    set_environment = (env: any[]) => {
        this.environment = env;
    };
}

// Instatiate the Core class
const core_init = () => {
    console.log(`INFO | Boot | ${PROG_INFO} : initializing...`);
    return new Promise((resolve) => {
        resolve(new Core());
    });
};

// Handle browser unload event
const on_before_unload = (e: { returnValue: string; }) => {
    var confirmationMessage = "\\o/";
    e.returnValue = confirmationMessage; // Gecko, Trident, Chrome 34+
    return confirmationMessage; // Gecko, WebKit, Chrome <34};
};

window.nd = null;

// DOM Content Loaded handler
const on_dom_loaded = () => {
    initialize_document();
    window.nd.finalize();
    removeEventListener("DOMContentLoaded", on_dom_loaded);
    console.log(`INFO | Boot | ${PROG_INFO} : ready !`);
};

core_init().then((nd_core) => {
    window.nd = nd_core;
});

addEventListener("DOMContentLoaded", on_dom_loaded);
*/