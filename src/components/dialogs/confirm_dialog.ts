import { AbstractDialog } from "./abstract_dialog";
import { DialogResult } from "../../main/types";

const HTML_TEMPLATE = `
<dialog id="$id" class="nd-modal" role="document">
    <div class="nd-modal-content">
        <h5 class="nd-header">$title</h5>
        <div class="mb-1">$message</div>
        <div class="nd-footer">
            <button nd-accept class="btn btn-danger me-2" style="width: 7rem">$accept_label</button>
            <button nd-dismiss class="btn btn-primary" style="width: 7rem">$dismiss_label</button>
        </div>
    </div>
</dialog>`;

const DEFAULTS: Record<string, string> = {
    title: 'Confirm dialog title (unset)',
    message: 'Confirm message (unset)',
    accept_label: '?Confirm',
    dismiss_label: '?Dismiss',
};

export class DlgConfirm extends AbstractDialog {
    private accept_btn?: HTMLButtonElement;
    private dismiss_btn?: HTMLButtonElement;

    constructor(private element: Element) {
        super(element, HTML_TEMPLATE);

        // Set eventually unset values    
        for (let key in DEFAULTS) {
            this.params.set(key, DEFAULTS[key]);
        }
    }

    private accept_handler = (e: Event) => {
        this.return_value = DialogResult.ACCEPT;
        this.close();
    };

    private dismiss_handler = (e: Event) => {
        this.return_value = DialogResult.DISMISS;
        this.close();
    };

    attach_event_handlers = (): void => {
        this.accept_btn = this.dialog_instance?.querySelector('[nd-accept]') as HTMLButtonElement;
        this.dismiss_btn = this.dialog_instance?.querySelector('[nd-dismiss]') as HTMLButtonElement;
        this.accept_btn?.addEventListener('click', this.accept_handler);
        this.dismiss_btn?.addEventListener('click', this.dismiss_handler);
    };


    close = (): void => {
        this.accept_btn?.removeEventListener('click', this.accept_handler);
        this.dismiss_btn?.removeEventListener('click', this.dismiss_handler);
        this.dialog_instance?.remove();
    };

}
