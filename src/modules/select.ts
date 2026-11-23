import { CheckResult } from "../main";
import { ND_EVENTS } from "../main/constants";
import { check_fragment, KEYWORDS, PARAMETERS } from "../syntax/syntax";
import { HandlerTracker } from "../trackers/handler_tracker";
import { Fetcher } from "./fetcher";
import { Link } from "./link";
import { Logger } from "./logger";
import { Util } from "./util";

const logger = new Logger('Select');

export class Select {
    private id!: string;
    private targets: HTMLElement[] = [];
    private inform: HTMLElement[] = [];
    private nd_default!: string;
    private nd_selected!: string;

    constructor(private element: HTMLSelectElement) {


        // if (check_fragment(element) === CheckResult.FAILURE) {
        //     console.error('S> FAILURE');
        //     return;
        // }

        // Process the nd-default attribute an set the initial select content
        const dflt = element.getAttribute(PARAMETERS.DEFAULT.name);
        this.nd_default = dflt ? `<option>${dflt}</option>` : '';
        this.nd_default ? (element.innerHTML = this.nd_default) : {};

        // Process the nd-selected attribute
        this.nd_selected = element.getAttribute(PARAMETERS.SELECTED.name) ?? '';

        // Find target(s)
        let selector = element.getAttribute(PARAMETERS.TARGET.name) ?? '';
        let targets = Util.get_targets(selector);

        targets.forEach((target) => {
            // Hide the target. It will be updated by the change events
            target.hidden = target.hasAttribute(PARAMETERS.SHOWFOR.name) || target.hasAttribute(PARAMETERS.HIDEFOR.name);
            logger.info(`Found target '${Util.truncate(target.outerHTML)}'`);
            this.targets.push(target);
        });

        // Find targets to inform
        selector = element.getAttribute(PARAMETERS.INFORM.name) ?? '';
        targets = Util.get_targets(selector);

        targets.forEach((target) => {
            if (target.tagName !== "SELECT") {
                logger.error(`The 'nd-inform' attribute may reference <select> elements only, not '${target.tagName}' elements.`, target);
            } else {
                logger.info(`Found inform target '${target.outerHTML}'`);
                this.inform.push(target);
            }
        });

        // Add tracked event listeners
        // 1.- For the local 'change' event
        // 2.- For an remote 'change' event
        const handler_tracker = new HandlerTracker();
        handler_tracker.add_listener(element, "change", this.update_targets); // For the local 'change' event
        handler_tracker.add_listener(element, ND_EVENTS.CHANGE, this.on_nd_inform);
        handler_tracker.add_listener(element, ND_EVENTS.RESET, this.reset);

        // Get the options from the server if the 'nd-url' endpoint is specified
        const nd_options_url = element.getAttribute("nd-url");
        if (nd_options_url) {
            logger.info(`Getting select option from url '${nd_options_url}'.`);
            Fetcher.get()
                .fetch_data(nd_options_url)
                .then((data) => {
                    const fragment = Util.create_fragment(data ?? '<option>Error</option>');
                    Util.insert_fragment(element, fragment);
                    // Do a first time update
                    this.setup();
                    return;
                });
        }
        // Trigger the first "change" event
        this.setup();
    }

    private reset = () => {
        this.element.selectedIndex = 0;
        this.update_targets();
    };

    private setup = () => {
        const nd_selected = this.element.querySelector(`option[value="${this.nd_selected}"]`) as HTMLOptionElement;
        // Set the selection to the first option
        nd_selected ? (this.element.value = nd_selected.value) : (this.element.selectedIndex = 0);
        // Initial update !
        this.element.dispatchEvent(new Event("change"));
    };

    private send_event = () => {
        if (!this.inform) return;

        const option = this.element.options[this.element.selectedIndex];
        const value = option.getAttribute("value") || null;
        const url = option.getAttribute("nd-url") || null;

        const payload = { source: this.id, value: value, url: url };

        this.inform.forEach((e) => {
            e.dispatchEvent(new CustomEvent(ND_EVENTS.CHANGE, { detail: payload }));
        });
    };

    private on_nd_inform = (event: Event) => {
        const detail = (event as CustomEvent).detail;
        if (!detail.url) {
            Util.clear_node(this.element);
            if (this.nd_default) {
                const fragment = Util.create_fragment(this.nd_default);
                Util.insert_fragment(this.element, fragment, false, true);
            }
            this.update_targets();
        } else {
            Fetcher.get()
                .fetch_data(detail.url)
                .then((data) => {
                    // Append the data to the first option if any
                    data = this.nd_default ? this.nd_default + data : data ?? '';
                    // Clear the <select../> content
                    Util.clear_node(this.element);
                    // Create and insert the new fragment
                    const fragment = Util.create_fragment(data ?? '');
                    Util.insert_fragment(this.element, fragment, false, true);
                    // Update the targets !
                    this.update_targets();
                });
        }
    };

    private update_targets = () => {
        if (this.element.selectedIndex < 0) return;

        // Get the value
        const option = this.element.options[this.element.selectedIndex];
        const value = option.getAttribute("value") ?? '';
        const url = option.getAttribute(PARAMETERS.URL.name);

        this.targets.forEach((target) => {
            const target_html = Util.truncate(target.outerHTML, 80);


            // Values
            const nd_show_for = target.getAttribute(PARAMETERS.SHOWFOR.name);
            const nd_hide_for = target.getAttribute(PARAMETERS.HIDEFOR.name);

            // Booleans
            const nd_follow = target.hasAttribute(PARAMETERS.FOLLOW.name);
            const nd_sync = target.hasAttribute(PARAMETERS.SYNC.name);
            const nd_activate = target.hasAttribute(PARAMETERS.ACTIVATE.name);

            // nd-sync, nd-follow and nd-activate cannot appear together !
            if ([nd_follow, nd_sync, nd_activate].filter(Boolean).length > 1) {
                logger.error(`'${PARAMETERS.SYNC.name}', '${PARAMETERS.FOLLOW.name}' and '${PARAMETERS.ACTIVATE.name}' are mutually exclusive.  Element : ${target_html}`);
                return;
            }


            // Composite
            const nd_url = target.getAttribute(PARAMETERS.URL.name);
            const has_nd_url = nd_url ? true : false;

            const show_targets = nd_show_for ? nd_show_for.split(" ") : [];
            const hide_targets = nd_hide_for ? nd_hide_for.split(" ") : [];


            if (nd_activate) {
                target.innerHTML = value ?? "";
                url ? Link.create_link(target, url) : Link.clear_link(target);
                // Refresh the fragment
                Util.refresh(target);
            }


            // If nd-sync is specified, set the element content from the nd-select source
            if (nd_sync) {
                target.hidden != (target as HTMLElement).hidden;
                if (has_nd_url && value) {
                    const url = `${nd_url}/${value}`;
                    Fetcher.get()
                        .fetch_data(url)
                        .then((data) => {
                            console.log('DATA', data);
                            const fragment = Util.create_fragment(data ?? '');
                            Util.insert_fragment(target, fragment);
                        });
                } else {
                    target.innerText = value ? value : '';
                }
                target.hidden != target.hidden;
            }

            // If nd-follow is specified, set the element content from the selected nd-select option
            if (nd_follow && value) {
                Fetcher.get()
                    .fetch_data(value)
                    .then((data) => {
                        console.log('DATA', data);
                        const fragment = Util.create_fragment(data ?? '');
                        Util.insert_fragment(target, fragment, false, true);
                    });
            }


            // Show wildcards
            if (show_targets.includes("*")) {
                target.hidden = value ? false : true;
                show_targets.splice(show_targets.indexOf("*"), 1);
            }

            // Hide wildcards
            if (hide_targets.includes("*")) {
                target.hidden = value ? true : false;
                hide_targets.splice(hide_targets.indexOf("*"), 1);
            }

            // Specific shows
            if (show_targets.length) target.hidden = !show_targets.includes(value);

            // Specific hides
            if (hide_targets.length) target.hidden = hide_targets.includes(value);
        });
        this.send_event();
    };
};
