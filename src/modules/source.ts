import { ND_EVENTS } from "../main/constants";
import { check_fragment, PARAMETERS, KEYWORDS } from "../syntax/syntax";
import { HandlerTracker } from "../trackers/handler_tracker";
import { Fetcher } from "./fetcher";
import { Logger } from "./logger";
import { Util } from "./util";

export class Source {
    logger: Logger;
    url: string = '';
    target: string = '';
    targets: Element[] = [];

    constructor(public element: Element) {
        check_fragment(element);
        let type = element.hasAttribute(KEYWORDS.MAIN.name) ? 'main' : '';
        type = element.hasAttribute(KEYWORDS.SOURCE.name) ? 'source' : type;

        this.logger = new Logger(`Source (${type})`, true);
        this.url = element.getAttribute(PARAMETERS.URL.name)?.trim() ?? '';
        this.target = element.getAttribute(PARAMETERS.TARGET.name)?.trim() ?? '';

        this.targets = this.target ? Array.from(document.querySelectorAll(this.target)) : [this.element];


        if (element.hasAttribute(KEYWORDS.SOURCE.name)) {
            // Add an event listener for reset events
            new HandlerTracker().add_listener(this.element as HTMLElement, ND_EVENTS.RESET, this.refresh);
        }

        this.refresh();

        if (element.hasAttribute(KEYWORDS.MAIN.name)) {
            this.element.removeAttribute(KEYWORDS.MAIN.name);
            this.element.removeAttribute(PARAMETERS.URL.name);
            this.element.removeAttribute(PARAMETERS.TARGET.name);
        }
    }

    refresh = () => {
        // Get the data
        this.logger.info(`Fetching data from '${this.url}'...`);
        Fetcher.get().fetch_data(this.url).then((data) => {
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
