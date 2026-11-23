import { OVERLAY_MODE } from "../../main/constants";
import { DialogResult } from "../../main/types";
import { Logger } from "../../modules/logger";
import { Parameter } from "../../modules/parameter";
import { Util } from "../../modules/util";
import { PARAMETERS } from "../../syntax/syntax";

const logger = new Logger('Dialog');

export abstract class AbstractDialog {
    protected uuid: string = Util.randomUUID();
    protected template!: HTMLTemplateElement;
    protected params!: Parameter;
    protected dialog_instance!: HTMLDialogElement;
    protected return_value: DialogResult = DialogResult.NONE;
    protected dismiss_url?: string;


    protected constructor(element: Element, private dialog_template: string) {
        const template_id = (element.getAttribute(PARAMETERS.DIALOG.name) || '').trim();

        // Get the template and parameters
        this.template = document.getElementById(template_id) as HTMLTemplateElement;
        this.params = new Parameter(element);

        if (this.template) {
            // Process and overide parameters
            for (var p in this.template.dataset) {
                this.params.set(p, this.template.dataset[p]);
            }
        } else {
            logger.error(`Template '${template_id}' not found, using default values.`);
        }
        this.dismiss_url = this.params.get('dismiss_url', undefined);
    }

    abstract close(): void;

    abstract attach_event_handlers(): void;

    private render = () => {
        let html = this.dialog_template;

        // Set base values
        html = html.replace('$id', this.uuid);

        // Set parameters
        for (const key in this.params.all()) {
            html = html.replace('$' + key, this.params.get(key));
        }

        // Display in browser as modal
        this.dialog_instance = Util.open_layer(html, OVERLAY_MODE.MODAL) as HTMLDialogElement;

        // Attach event handlers
        this.attach_event_handlers();

        // Show the dialog by setting the 'open' attribute
        this.dialog_instance?.setAttribute('open', '');
    };


    public execute = (): Promise<DialogResult> => {
        return new Promise<DialogResult>(async (resolve) => {
            logger.info(`Executing dialog '${this.uuid}'...`);

            // Render the dialog in the browser
            this.render();

            logger.info("Awaiting an action...");
            while (this.return_value === DialogResult.NONE) {
                await new Promise((res) => setTimeout(res, 100));
            }

            // Resolve
            logger.info(`Resolving promise (${this.uuid}) . Result: '${this.return_value}'.`);
            resolve(this.return_value);
        });
    };

}
