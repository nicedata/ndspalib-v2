import { Logger } from "../modules/logger";
import { Util } from "../modules/util";

const logger = new Logger("Download");

export class Download {
    private href: string;
    private element!: HTMLElement;
    private html: string;

    constructor(blob: Blob, offset: number, size: number, out_filename: string, mimetype: string, private preview: boolean = false) {
        const blob_slice = blob.slice(offset, offset + size, mimetype);
        this.href = URL.createObjectURL(blob_slice);
        this.preview = preview;
        this.html = this.preview ? "" : `<a style="display: none" href="${this.href}", download="${out_filename}"></a>`;
    }

    _cleanup = () => {
        logger.info("Cleanup", this.element ? this.element : "");
        URL.revokeObjectURL(this.href);
        this.element ? this.element.remove() : {};
    };

    show = () => {
        if (this.preview) {
            logger.info("Preview mode !");
            window.open(this.href, "_blank");
            this._cleanup();
            return;
        }

        logger.info("Download mode !");

        // Create a fragment
        const fragment = Util.create_fragment(this.html);

        // Append to the document
        this.element = Util.insert_fragment(document.body, fragment, true, false);

        // Click to initiate download
        this.element?.click();

        // Remove the link element after 100 msec
        setTimeout(() => {
            this._cleanup();
        }, 100);
    };
};
