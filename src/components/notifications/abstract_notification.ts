import { OVERLAY_MODE, TOAST_DELAY_MS } from "../../main/constants";
import { AlertSeverity } from "../../main/types";
import { Fetcher } from "../../modules/fetcher";
import { Logger } from "../../modules/logger";
import { Util } from "../../modules/util";

const logger = new Logger('Notification');


export abstract class AbstractNotification {
    protected uuid: string = Util.randomUUID();
    protected html!: string;

    private dialog_instance!: HTMLDialogElement;
    private close_btn!: HTMLElement;

    private on_close_handler = (): void => {
        this.close_btn?.removeEventListener("click", this.on_close_handler);
        this.dialog_instance.remove();

        // TODO : handle redirections !
    };

    public render = (): void => {
        // Display in browser as modal
        this.dialog_instance = Util.open_layer(this.html, OVERLAY_MODE.TRANSIENT) as HTMLDialogElement;

        // Get the close element (nd-close)
        this.close_btn = this.dialog_instance.querySelector("[nd-close]") as HTMLElement;
        this.close_btn?.addEventListener("click", this.on_close_handler);

        // Automatically close after a given delay
        setTimeout(() => {
            this.on_close_handler();
        }, TOAST_DELAY_MS);

    };

}