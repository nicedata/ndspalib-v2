import { DialogFactory } from "../components/dialogs/dialog_factory";
import { Alert } from "../components/notifications/alert";
import { Toast } from "../components/notifications/toast";
import { AlertSeverity, DialogResult } from "../main";
import { PARAMETER } from "../syntax/syntax";
import { HandlerTracker } from "../trackers/handler_tracker";
import { Fetcher } from "./fetcher";
import { Logger } from "./logger";
import { Util } from "./util";


const logger = new Logger('Nav');
const handler_tracker = HandlerTracker.getInstance();

export class Nav {
    private url: string = '';
    private targets: Element[] = [];
    // private confirm_dialog: DlgConfirm | null = null;

    constructor(private element: Element) {
        const url = (element.getAttribute(PARAMETER.URL.name) || '').trim();
        const target = (element.getAttribute(PARAMETER.TARGET.name) || '').trim();

        // Check URL
        if (!Util.is_internal_url(url)) {
            logger.error(`Invalid URL '${url}' on element '${element.outerHTML}'.`);
            return;
        }

        // Set private attributes
        this.url = url;
        this.targets = Util.get_targets(target);

        // Add an href attribute on <a/> tags if missing
        (element instanceof HTMLAnchorElement) ? element.setAttribute('href', url) : {};

        // Set the element cursor style
        (this.element as HTMLElement).style.cursor = "pointer";

        // Add our own click handler
        handler_tracker.add_listener(element as HTMLElement, "click", this.click_handler);
    }

    click_handler = async (event: Event) => {
        event.preventDefault(); // Intercept the default (click) handler

        // Eventually set up a dialog
        const dialog = DialogFactory.create(this.element);
        const do_proceed = dialog ? await dialog.execute() === DialogResult.ACCEPT : true;

        if (!do_proceed)
            return;

        const payload = {}; // ! To adapt !

        Fetcher.get()
            .fetch_data(this.url, payload)
            .then((data) => {
                // Process data if any
                if (data) {
                    this.targets.forEach((target) => {
                        switch (target.tagName) {
                            case 'INPUT':
                                (target as HTMLInputElement).value = data;
                                break;
                            default:
                                const fragment = Util.create_fragment(data);
                                // Replace target fragment and refresh it
                                Util.insert_fragment(target, fragment, false, true);
                        }
                    });
                }
                // Action after fetch when data is present
                // if (this.action && this.action.when == "after") this.action.excecute(data ?? undefined);
            });
    };
};