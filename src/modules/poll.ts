/**
 * Class Poll
 *
 * Represents an element bearing the nd-poll attribute.
 *
 * Usage:
 *    <tag nd-poll nd-url="url" nd-target="selector" nd-interval="msec" nd_action="my_action(arguments)"><tag>
 *
 * Attributes:
 *    nd-poll :     identifies an element to which a data poller will be associated
 *    nd-url  :     url from which data will be fetched
 *    nd-interval : polling interval in msec, defaults to 10s if not present
 *    nd-target :   css selector to identify the target(s). If ommitted, the element iself is the target.
 *    nd-action :   an action to be executed befor or after the poliing
 */
import { POLL_DEFAULT_INTERVAL_MS } from "../main/constants";
import { Action } from "./action";
import { Fetcher } from "./fetcher";
import { Logger } from "./logger";
import { Util } from "./util";

const LOGGER = new Logger("Poll", true);

export class Poll {
    logger: Logger;
    element: HTMLElement;
    uuid: string;
    url: string;
    interval_ms: number;
    targets_selector: string;
    action: Action | null;
    can_poll: boolean;

    constructor(element: HTMLElement) {
        this.logger = LOGGER;
        this.element = element;
        this.uuid = '';
        this.url = '';
        this.interval_ms = 0;
        this.targets_selector = '';
        this.action = null;
        this.can_poll = false;

        // Checks
        const has_url = element.hasAttribute("href") || element.hasAttribute("nd-url");
        const has_action = element.hasAttribute("nd-action");

        if (!(has_url || has_action)) {
            this.logger.error(`No 'nd-url' or 'nd-action' is defined on element`, element);
            return;
        }

        // Use the href attribute first. Fallback to nd-url
        const href = element.getAttribute("href");
        this.url = href ? href : element.getAttribute("nd-url") || "";

        // Get the interval
        const interval = element.getAttribute("nd-interval");
        let interval_ms: number;
        if (!interval || isNaN(Number(interval))) {
            interval_ms = POLL_DEFAULT_INTERVAL_MS;
        } else {
            interval_ms = Number(interval);
            interval_ms = interval_ms < 1000 ? 1000 : interval_ms;
        }
        this.interval_ms = interval_ms;

        // Get the target(s)
        this.targets_selector = element.getAttribute("nd-target") || "";

        // Process nd-action
        this.action = has_action ? new Action(element) : null;
        this.can_poll = true;
    }

    poll = () => {
        if (!this.can_poll) {
            this.logger.info("Element not fully initialized. Poll skipped.");
            return;
        }
        if (document.hidden) {
            this.logger.info("The document is hidden. Poll skipped.");
            return;
        }

        // Dynamically get the targets
        const targets = Util.get_targets(this.targets_selector, this.element);
        this.action ? this.action.set_targets(targets) : {};

        // Action before fetch
        if (this.action && this.action.when == "before") {
            this.logger.info(`Executing action 'before::${this.action.code}'`);
            this.action.excecute();
        }

        // Fetch if an URL is present
        if (this.url) {
            this.logger.info(`Fetching url '${this.url}'...`);
            new Fetcher().fetch_data(this.url).then((data) => {
                targets.forEach((t) => {
                    if (data) {
                        const fragment = Util.create_fragment(data);
                        Util.insert_fragment(t, fragment, false, true);
                    } else {
                        this.logger.warn(`Fetching url '${this.url}' returned no data.`, this);
                    }
                    // Action after fetch when data is present
                    if (this.action && this.action.when == "after") this.action.excecute(data ?? undefined);
                });
            });
        }
    };
};
