import { AbstractDialog } from "./abstract_dialog";
import { DialogResult } from "../../main/types";


const HTML_TEMPLATE = `
<dialog id="$id" class="nd-modal" role="document">
    <div class="nd-modal-content">
        <h5 class="nd-header">$title</h5>
        <div class="mb-1">$message</div>
        <div class="nd-footer">
            <button nd-accept class="btn btn-danger me-2" style="width: 7rem">$accept_label</button>
        </div>
    </div>
</dialog>`;

const DEFAULTS: Record<string, string> = {
    title: 'Info dialog title (unset)',
    message: 'Info message (unset)',
    accept_label: '?Confirm',
};


export class DlgInfo extends AbstractDialog {
    private accept_btn?: HTMLButtonElement;

    constructor(private element: Element) {
        super(element, HTML_TEMPLATE);

        // Set eventually unset values    
        for (let key in DEFAULTS) {
            this.params.set(key, DEFAULTS[key]);
        }
    }

    private accept_handler = () => {
        this.return_value = DialogResult.ACCEPT;
        this.close();
    };

    close = () => {
        this.accept_btn?.removeEventListener('click', this.accept_handler);
        this.dialog_instance?.remove();
    };



    attach_event_handlers = (): void => {
        this.accept_btn = this.dialog_instance?.querySelector('[nd-accept]') as HTMLButtonElement;
        this.accept_btn?.addEventListener('click', this.accept_handler);
    };
}
