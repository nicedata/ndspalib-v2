import { AbstractDialog } from "./abstract_dialog";
import { DialogResult } from "../../main/types";

const HTML_TEMPLATE = `
<dialog id="$id" class="nd-modal" role="document">
    <div class="nd-modal-content">
        <h5 class="nd-header">$title</h5>
        <div class="mb-1">$message</div>
        <div class="nd-footer">
            <div class="col-6">
                <input nd-confirm type="checkbox"><label><i class="bi bi-arrow-left ms-2 me-1"></i>$confirm_label</label>
            </div>
            <div class="col-6 text-end">
                <button nd-accept class="btn btn-danger me-2" style="width: 7rem" disabled>$accept_label</button>
                <button nd-dismiss class="btn btn-primary" style="width: 7rem">$dismiss_label</button>
            <div>
        </div>
    </div>
</dialog>`;

const DEFAULTS: Record<string, string> = {
    title: 'Confirm dialog title (unset)',
    message: 'Confirm message (unset)',
    confirm_label: 'Please confirm !',
    accept_label: '?Confirm',
    dismiss_label: '?Dismiss',
};

export class DlgSecureConfirm extends AbstractDialog {
    private accept_btn?: HTMLButtonElement;
    private dismiss_btn?: HTMLButtonElement;
    private confirm_cb?: HTMLInputElement;

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

    private dismiss_handler = () => {
        this.return_value = DialogResult.DISMISS;
        this.close();
    };

    // Confirmation checkbox event handler
    private confirm_cb_handler = () => {
        if (this.confirm_cb?.checked) {
            this.accept_btn ? this.accept_btn.disabled = false : {}; // Enable the accept button
        } else {
            this.accept_btn ? this.accept_btn.disabled = true : {}; // Disable the accept buttons
        }
    };


    attach_event_handlers = (): void => {
        this.accept_btn = this.dialog_instance?.querySelector('[nd-accept]') as HTMLButtonElement;
        this.dismiss_btn = this.dialog_instance?.querySelector('[nd-dismiss]') as HTMLButtonElement;
        this.confirm_cb = this.dialog_instance?.querySelector('[nd-confirm]') as HTMLInputElement;
        this.accept_btn?.addEventListener('click', this.accept_handler);
        this.dismiss_btn?.addEventListener('click', this.dismiss_handler);
        this.confirm_cb.addEventListener('click', this.confirm_cb_handler);
    };


    close = (): void => {
        this.accept_btn?.removeEventListener('click', this.accept_handler);
        this.dismiss_btn?.removeEventListener('click', this.dismiss_handler);
        this.dismiss_btn?.removeEventListener('click', this.confirm_cb_handler);
        this.dialog_instance?.remove();
    };

}
