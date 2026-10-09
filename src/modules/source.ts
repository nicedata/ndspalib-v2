import { ND_EVENTS } from "../main/constants";
import { ATTR_NAME, PARAM_NAME } from "../main/syntax";
import { HandlerTracker } from "../trackers/handler_tracker";
import { Fetcher } from "./fetcher";
import { Logger } from "./logger";
import { Util } from "./util";

export class Source {
    logger: Logger = new Logger("Source", true);
    url: string = '';
    target: string = '';
    targets: Element[] = [];

    constructor(public element: Element, public type: ATTR_NAME.MAIN | ATTR_NAME.SOURCE) {

        // Basic checks
        if (element.hasAttribute(ATTR_NAME.MAIN) && element.hasAttribute(ATTR_NAME.SOURCE)) {
            this.logger.error(`'${ATTR_NAME.MAIN}' and '${ATTR_NAME.SOURCE}' cannot appear on the same element`, element);
            return;
        }

        this.url = element.getAttribute(PARAM_NAME.URL)?.trim() ?? '';
        this.target = element.getAttribute(PARAM_NAME.TARGET)?.trim() ?? '';

        this.targets = this.target ? Array.from(document.querySelectorAll(this.target)) : [this.element];

        // Further checks
        if (!this.url) {
            this.logger.error(`No valid URL defined in '${this.type}' on element`, element);
            element.innerHTML = `<span style="color: red">Error: no valid url defined in '${this.type}' on element &lt;${element.tagName.toLowerCase()}.../"&gt;</span>`;
            return;
        }

        if (this.url === "/") {
            this.logger.error(`The URL in '${this.type}' cannot be the root url (/) !`, this.element);
            return;
        }

        // Add an event listener for reset events
        if (this.type === ATTR_NAME.SOURCE) {
            new HandlerTracker().add_listener(this.element as HTMLElement, ND_EVENTS.RESET, this.refresh);
        }

        this.refresh();

        if (this.type === ATTR_NAME.MAIN) {
            this.element.removeAttribute(ATTR_NAME.MAIN);
            this.element.removeAttribute(PARAM_NAME.URL);
        }
    }

    refresh = () => {
        // Get the data
        this.logger.info(`Fetching data from '${this.url}'...`);
        new Fetcher().fetch_data(this.url).then((data) => {
            if (data) {
                // Insert the fragment (replace the existing and refresh it)
                this.targets.forEach(element => {
                    const fragment = Util.create_fragment(data);
                    Util.insert_fragment(element, fragment, false, true);
                });
            } else {
                this.logger.warn(`Url '${this.url}' returned no data !`);
                this.element.innerHTML = `<span style="color: red">Error: url '${this.url}' returned no data for element ${Util.as_text(this.element)}</span>`;
            }
        });
    };
};
