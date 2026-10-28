import { ND_EVENTS } from "../main/constants";
import { Attribute, ATTRIBUTE, check_fragment, PARAMETER } from "../syntax/syntax";
import { HandlerTracker } from "../trackers/handler_tracker";
import { Fetcher } from "./fetcher";
import { Logger } from "./logger";
import { Util } from "./util";

export class Source {
    logger: Logger;
    url: string = '';
    target: string = '';
    targets: Element[] = [];

    constructor(public element: Element, public type: Attribute) {
        check_fragment(element);

        this.logger = new Logger(`Source (${type.name})`, true);
        this.url = element.getAttribute(PARAMETER.URL.name)?.trim() ?? '';
        this.target = element.getAttribute(PARAMETER.TARGET.name)?.trim() ?? '';

        this.targets = this.target ? Array.from(document.querySelectorAll(this.target)) : [this.element];

        // Further checks
        if (!this.url) {
            this.logger.error(`No valid URL defined in '${this.type.name}' on element`, element);
            element.innerHTML = `<span style="color: red">Error: no valid url defined in '${this.type.name}' on element &lt;${element.tagName.toLowerCase()}... /"&gt;</span>`;
            return;
        }

        if (this.url === "/") {
            this.logger.error(`The URL in '${this.type.name}' cannot be the root url (/) !`, this.element);
            return;
        }

        if (type === ATTRIBUTE.SOURCE) {
            // Add an event listener for reset events
            new HandlerTracker().add_listener(this.element as HTMLElement, ND_EVENTS.RESET, this.refresh);
        }

        this.refresh();


        if (this.type === ATTRIBUTE.MAIN) {
            this.element.removeAttribute(ATTRIBUTE.MAIN.name);
            this.element.removeAttribute(PARAMETER.URL.name);
            this.element.removeAttribute(PARAMETER.TARGET.name);
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
