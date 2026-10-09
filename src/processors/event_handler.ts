const { ND_EVENTS } = require("../constants.js");
const { InformationDialog, DecisionDialog, SecureDecisionDialog, Toast, Alert } = require("../components/dialogs.js");
const { Download } = require("../components/download.js");
const { DomOps } = require("../modules/dom_ops.js");
const { BaseHandler } = require("./base_handler.js");

exports.EventHandler = class EventHandler extends BaseHandler {
    constructor() {
        super("EventHandler");
        // Singleton !
        if (!!EventHandler._instance) {
            return EventHandler._instance;
        }
        EventHandler._instance = this;

        const events = [
            ND_EVENTS.ALERT,
            ND_EVENTS.TOAST,
            ND_EVENTS.INFO,
            ND_EVENTS.DECISION,
            ND_EVENTS.SECURE,
            ND_EVENTS.CUSTOM,
            ND_EVENTS.DOWNLOAD,
            ND_EVENTS.REDIRECT,
            ND_EVENTS.TITLE,
            ND_EVENTS.ITEM,
            ND_EVENTS.SORT,
        ];

        // Add event listeners (event list)
        events.forEach((event) => {
            this.logger.info(`Adding a listener to handle '${event}' events.`);
            document.addEventListener(event, this._event_handler);
        });
    }

    // Todo : remove
    process = (fragment) => {};

    // Todo : remove
    postprocess = () => {};

    _event_handler = async (event) => {
        this.logger.info(`Event ${event.type}, detail: ${JSON5.stringify(event.detail)}.`);
        const detail = event.detail;
        let data = null;

        switch (event.type) {
            case ND_EVENTS.TITLE:
                document.title = detail.title;
                break;
            case ND_EVENTS.ALERT:
                new Alert(detail).show();
                break;
            case ND_EVENTS.TOAST:
                new Toast(detail).show();
                break;
            case ND_EVENTS.INFO:
                new InformationDialog(detail).show();
                break;
            case ND_EVENTS.DECISION:
                new DecisionDialog(detail).show();
                break;
            case ND_EVENTS.SECURE:
                new SecureDecisionDialog(detail).show();
                break;
            case ND_EVENTS.DOWNLOAD:
                new Download(detail.data, detail.offset, detail.size, detail.filename, detail.mimetype, detail.mode === "preview").show();
                break;
            case ND_EVENTS.ITEM:
            case ND_EVENTS.SORT:
                new DomOps().dispatcher(event.detail);
                break;
        }
    };
};
