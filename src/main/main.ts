import { BANNER, ND_STYLES, PROGNAME } from "./constants";
import { Core } from "./core";
import { Util } from "../modules/util";
import { SourceProcessor } from "../processors/source_processor";
import { EnvironmentProcessor } from "../processors/environment_processor";
import { check_fragment } from "../syntax/syntax";
import { PollProcessor } from "../processors/poll_processor";
import { TimerTracker } from "../trackers/timer_tracker";
import { HandlerTracker } from "../trackers/handler_tracker";
import { VersionProcessor } from "../processors/version_processor";
import { NavProcessor } from "../processors/nav_processor";
import { TestProcessor } from "../processors/test_processor";
import { ContextProcessor } from "../processors/context_processor";
import { SelectHandler } from "../processors/select_handler";

declare global {
    var nd_core: Core;
}

/**
 * Initialize the document with required elements and styles.
 */
const initialize_document = () => {
    const styles = `<style id="nd-style">${ND_STYLES}</style>`;
    // Add the custom style sheet
    let fragment = Util.create_fragment(styles);
    document.querySelector("head")?.lastElementChild?.after(fragment);
};

Core.init().then((core: Core) => {
    console.info(BANNER);
    console.info(`INFO | Core | ${PROGNAME} : initializing...`);
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
        VersionProcessor.getInstance(),
        NavProcessor.getInstance(),
        EnvironmentProcessor.getInstance(),
        TestProcessor.getInstance(),
        ContextProcessor.getInstance(),
        SelectHandler.getInstance(),


    ];
    Util.refresh(document.body);
};

addEventListener("DOMContentLoaded", on_dom_loaded);

