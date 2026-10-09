const { Logger } = require("../modules/logger.js");
const { Util } = require("../modules/util.js");
const { Fetcher } = require("../modules/fetcher.js");
const { HandlerTracker } = require("../handlers/handler_tracker.js");
const { TOAST_DELAY_MS, OVERLAY_MODE } = require("../constants.js");

class BaseDialog {
    constructor(logger_name, args) {
        this.logger = new Logger(logger_name); // The dialog's logger
        this.id = crypto.randomUUID(); // The dialog's ID (UUID)
        this.args = args; // The dialog's arguments (content, buttons, urls, etc.)
        this.dialog = null; // The dialog element (DOM element)
        this.html = null; // The dialog's HTML content (string)
        this.return_value = null; // The dialog's return value (the button that was clicked by the user or the action that was performed).
    }

    /**
     * Inject the dialog into the DOM tree.
     *
     * This method is called by the show() method to inject the dialog into the DOM tree before displaying it.
     *
     * The inject() method checks if the dialog can be opened by calling the nd.layer.can_open() method with the dialog type.
     * If the dialog can be opened, it is injected into the DOM tree by calling the nd.layer.open() method with the dialog's content, id and type.
     * The inject() method returns a boolean indicating if the dialog was successfully injected into the DOM tree or not.
     *
     * The inject() method is responsible for checking if the dialog can be opened and for injecting it into the DOM tree.
     *
     * @returns {boolean} A boolean indicating if the dialog was successfully injected into the DOM tree or not.
     *
     */
    inject = () => {
        const instance_type = this.constructor.name;
        let mode = OVERLAY_MODE.NONE;
        ["Alert", "Toast"].includes(instance_type) ? (mode = OVERLAY_MODE.TRANSIENT) : {};
        ["InformationDialog", "DecisionDialog", "SecureDecisionDialog", "CustomDialog"].includes(instance_type) ? (mode = OVERLAY_MODE.MODAL) : {};
        this.dialog = Util.open_layer(this.html, mode);
    };

    /**
     * Show the dialog.
     *
     * This method must be implemented in child classes to display the dialog and add the necessary event listeners to
     * handle the user interactions (button clicks, etc.).
     *
     * The show() method is called by the run() method to display the dialog and wait for an action to occur (button click, etc.)
     * to resolve the promise with the dialog's return value.
     *
     * The return value is set by the show() method when an action is performed (button click, etc.) to resolve the promise returned by the run() method.
     *
     * The return value can be used to perform a redirection or an action based on the user's choice.
     *
     * The dialog's return value can be one of the following:
     * - "accept" : The user accepted the action (clicked the accept button).
     * - "dismiss" : The user dismissed the action (clicked the dismiss button).
     * - "apply" : The user applied the action (clicked the apply button).
     */
    show() {
        this.logger.error("Method show() is not implemented !");
    }

    /**
     * Run the dialog and wait for an action to occur (button click, etc.) to resolve the promise with the dialog's return value.
     * The dialog is displayed by calling the show() method, which must be implemented in child classes.
     *
     * The return value is set by the show() method when an action is performed (button click, etc.) to resolve the promise returned by the run() method.
     *
     * @returns {Promise} A promise that resolves with the dialog's return value when an action is performed (button click, etc.).
     *
     * The return value can be used to perform a redirection or an action based on the user's choice.
     *
     * The dialog's return value can be one of the following:
     * - "accept" : The user accepted the action (clicked the accept button).
     * - "dismiss" : The user dismissed the action (clicked the dismiss button).
     * - "apply" : The user applied the action (clicked the apply button).
     */
    run = () => {
        //
        // Run a modal until there is a value
        //
        this.logger.info("Awaiting an action...");
        const dialog = this;
        return new Promise(async (resolve) => {
            // Reset the return value !
            dialog.return_value = null;
            dialog.show();

            // Wait for an accion to occur
            while (!dialog.return_value) {
                await new Promise((res) => setTimeout(res, 100));
            }

            // Resolve
            this.logger.info(`Resolving promise. Result: '${dialog.return_value}'.`);
            resolve(dialog.return_value);
        });
    };

    on_close_handler = () => {
        this.logger.error("Method on_close_handler() is not implemented !");
    };
}

exports.SecureDecisionDialog = class SecureDecisionDialog extends BaseDialog {
    constructor(args) {
        super("SecureDecisionDialog", args);

        // Close event
        this.close_event = `nd:close:${this.id}`;

        // HTML elements
        this.btn_dismiss = null; // Dismiss button
        this.btn_accept = null; // Accept button
        this.cb_confirm = null; // The confirmation checkbox

        const css_class = `nd-modal`;
        const css_style = `width: 30%`;

        // Build buttons
        const buttons = Util.compress(`
            <button nd-dismiss class="btn btn-primary" style="width: 7rem">
                ${this.args.dismiss}
            </button>
            <button nd-accept class="btn btn-secondary" style="width: 7rem" disabled>
                ${this.args.accept}
            </button>`);

        this.html = Util.compress(`
            <div id="${this.id}" class="${css_class}" role="document">
                <div class="nd-modal-content" style="${css_style}">
                    <h5 class="nd-header">${this.args.title}</h5>
                    <div>
                        ${this.args.message}
                    </div>
                    <div class="nd-footer">
                        <div class="col-6">
                            <!-- Confirmation checkbox -->
                                <input type="checkbox"><label><i class="bi bi-arrow-left ms-2 me-1"></i>${this.args.confirm}</label>
                        </div>
                        <div class="col-6 text-end">
                            ${buttons}
                        </div>
                    </div>
                </div>
            </div>`);
    }

    // The 'close' event handler
    on_close_handler = (event) => {
        this.logger.info(`Hiding component (${this.return_value})...`);

        // Clean local event listeners
        this.btn_accept.removeEventListener("click", this.action_handler);
        this.btn_dismiss.removeEventListener("click", this.action_handler);
        this.cb_confirm.removeEventListener("click", this.confirm_cb_handler);

        // Remove the global close event listener
        document.removeEventListener(this.close_event, this.on_close_handler);

        // Remove dialog from DOM tree
        this.dialog.remove();

        let redirect_url = null;
        switch (this.return_value) {
            case "accept":
                redirect_url = this.args.accept_url;
                break;
            case "dismiss":
                redirect_url = this.args.dismiss_url;
                break;
        }

        // Redirect if an url is specified
        if (redirect_url) {
            this.logger.info(`Redirecting to '${redirect_url}'`);
            new Fetcher().redirect(redirect_url);
        }
    };

    action_handler = (event) => {
        switch (event.srcElement) {
            case this.btn_accept:
                this.return_value = "accept";
                break;
            case this.btn_dismiss:
                this.return_value = "dismiss";
                break;
        }
        document.dispatchEvent(new Event(this.close_event));
    };

    // Confirmation checkbox event handler
    confirm_cb_handler = () => {
        if (this.cb_confirm.checked) {
            this.btn_accept.classList.add("btn-danger"); // Add accept button style (red)
            this.btn_accept.disabled = false; // Enable the accept button
        } else {
            this.btn_accept.classList.remove("btn-danger"); // remove accept button style (red)
            this.btn_accept.disabled = true; // Disable the accept buttons
        }
    };

    show = () => {
        // Inject the dialog into the DOM tree (returns a booleam)
        this.inject();

        this.logger.info("Showing component");

        // Get the elements we need
        this.cb_confirm = this.dialog.querySelector("input"); // Checkbox
        this.btn_accept = this.dialog.querySelector("[nd-accept]"); // Accept button
        this.btn_dismiss = this.dialog.querySelector("[nd-dismiss]"); // Dismiss button

        // Add local event listeners
        this.btn_accept.addEventListener("click", this.action_handler);
        this.btn_dismiss.addEventListener("click", this.action_handler);
        this.cb_confirm.addEventListener("click", this.confirm_cb_handler);

        // Add a global close event listener
        document.addEventListener(`nd:close:${this.id}`, this.on_close_handler);

        // Show the dialog
        this.dialog.style.display = "block";
    };
};

exports.InformationDialog = class InformationDialog extends BaseDialog {
    constructor(args) {
        super("InformationDialog", args);
        this.close_event = `nd:close:${this.id}`; // Close event to listen to
        this.btn_accept = null; // Accept button

        const css_class = `nd-modal`;
        const css_style = `width: 30%`;

        const buttons = Util.compress(`
            <button nd-accept class="btn btn-primary" style="width: 7rem">
                    ${this.args.accept}
            </button>`);

        // Set the HTML content of the dialog
        this.html = Util.compress(`
                <div id="${this.id}" class="${css_class}" role="document">
                    <div class="nd-modal-content" style="${css_style}">
                        <h5 class="nd-header">${this.args.title}</h5>
                        <div class="mb-1">${this.args.message}</div>
                        <div class="nd-footer"> ${buttons}</div>
                    </div>
                </duv>`);
    }

    // The 'close' event handler
    on_close_handler = (event) => {
        this.logger.info(`Hiding component (${this.return_value})...`);

        // Clean local event listeners
        this.btn_accept.removeEventListener("click", this.action_handler);

        // Remove the global close event listener
        document.addEventListener(this.close_event, this.on_close_handler);

        // Remove dialog from DOM tree
        this.dialog.remove();

        // Redirect if an url is specified
        const redirect_url = this.args.accept_url;
        if (redirect_url) {
            this.logger.info(`Redirecting to '${redirect_url}'`);
            new Fetcher().redirect(redirect_url);
        }
    };

    action_handler = (event) => {
        switch (event.srcElement) {
            case this.btn_accept:
                this.return_value = "accept";
                break;
        }
        document.dispatchEvent(new Event(this.close_event));
    };

    // Show the dialog
    show() {
        // Inject the dialog into the DOM tree (returns a boolean)
        this.inject();

        this.logger.info("Showing component");

        // Get the buttons
        this.btn_accept = this.dialog.querySelector("[nd-accept]");

        // Add local event listeners
        this.btn_accept.addEventListener("click", this.action_handler);

        // Add a global close event listener
        document.addEventListener(`nd:close:${this.id}`, this.on_close_handler);

        // Show the dialog
        this.dialog.style.display = "block";
    }
};

exports.DecisionDialog = class DecisionDialog extends BaseDialog {
    constructor(args) {
        super("DecisionDialog", args);

        this.close_event = `nd:close:${this.id}`;

        // Buttons
        this.btn_dismiss = null; // Dismiss button
        this.btn_accept = null; // Accept button

        const css_class = `nd-modal`;
        const css_style = `width: 30%`;

        // Build buttons
        const buttons = Util.compress(`
            <button nd-accept class="btn btn-danger me-2" style="width: 7rem">
                ${this.args.accept}
            </button>
            <button nd-dismiss class="btn btn-primary" style="width: 7rem">
                ${this.args.dismiss}
            </button>`);

        // Set the HTML content of the dialog
        this.html = Util.compress(`
                <div id="${this.id}" class="${css_class}" role="document">
                    <div class="nd-modal-content" style="${css_style}">
                        <h5 class="nd-header">${this.args.title}</h5>
                        <div class="mb-1">${this.args.message}</div>
                        <div class="nd-footer"> ${buttons}</div>
                    </div>
                </div>`);
    }

    // The 'close' event handler
    on_close_handler = (event) => {
        this.logger.info(`Hiding component (${this.return_value})...`);

        // Clean local event listeners
        this.btn_accept.removeEventListener("click", this.action_handler);
        this.btn_dismiss.removeEventListener("click", this.action_handler);

        // Remove the global close event listener
        document.addEventListener(this.close_event, this.on_close_handler);

        // Remove dialog from DOM tree
        this.dialog.remove();

        let redirect_url = null;
        switch (this.return_value) {
            case "accept":
                redirect_url = this.args.accept_url;
                break;
            case "dismiss":
                redirect_url = this.args.dismiss_url;
                break;
        }

        // Redirect if an url is specified
        if (redirect_url) {
            this.logger.info(`Redirecting to '${redirect_url}'`);
            new Fetcher().redirect(redirect_url);
        }
    };

    action_handler = (event) => {
        switch (event.srcElement) {
            case this.btn_accept:
                this.return_value = "accept";
                break;
            case this.btn_dismiss:
                this.return_value = "dismiss";
                break;
        }
        document.dispatchEvent(new Event(this.close_event));
    };

    // Show the dialog
    show() {
        // Inject the dialog into the DOM tree (returns a booleam)
        this.inject();

        this.logger.info("Showing component");

        // Get the buttons
        this.btn_dismiss = this.dialog.querySelector("[nd-dismiss]");
        this.btn_accept = this.dialog.querySelector("[nd-accept]");

        // Add local event listeners
        this.btn_accept.addEventListener("click", this.action_handler);
        this.btn_dismiss.addEventListener("click", this.action_handler);

        // Add a global close event listener
        document.addEventListener(`nd:close:${this.id}`, this.on_close_handler);

        // Show the dialog
        this.dialog.style.display = "block";
    }
};

exports.CustomDialog = class CustomDialog extends BaseDialog {
    static serializer = new XMLSerializer();
    constructor(args) {
        super("CustomDialog", args);
        this.btn_accept = null; // Accept button
        this.btn_dismiss = null; // Dismiss button
        this.accept_url = null; // Accept url
        this.dismiss_url = null; // Dismiss url

        // Close event
        this.close_event = `nd:close:custom`;

        const css_class = `nd-modal`;
        const css_style = `width: ${this.args.width_pc}%`;

        // Title if present
        const header = this.args.title ? `<h5 class="nd-header">${this.args.title}</h5>` : "";

        this.html = `
            <div id="${this.id}" class="${css_class}" role="document">
                <div class="nd-modal-content" style="${css_style}">
                   ${header}
                   ${this.args.fragment ? CustomDialog.serializer.serializeToString(this.args.fragment).replace(/xmlns="[^"]*"/g, "") : "No data ! Check your template ! Press ESC to exit."}
                </div>
            </div>`;
    }

    on_close_handler = (event) => {
        this.logger.info(`Hiding component (${this.return_value})...`);

        // Clean local event listeners
        this.btn_accept ? this.btn_accept.removeEventListener("click", this.action_handler) : {};
        this.btn_dismiss ? this.btn_dismiss.removeEventListener("click", this.action_handler) : {};

        // Remove event listeners
        document.removeEventListener(this.close_event, this.on_close_handler);
        document.removeEventListener("keydown", this.esc_key_handler);

        // Remove dialog from DOM tree
        this.dialog.remove();

        // Postprocess tracked events
        new HandlerTracker().postprocess();

        let redirect_url = null;
        switch (this.return_value) {
            case "accept":
                redirect_url = this.accept_url;
                break;
            case "dismiss":
                redirect_url = this.dismiss_url;
                break;
        }

        // Redirect if an url is specified
        if (redirect_url) {
            this.logger.info(`Redirecting to '${redirect_url}'`);
            new Fetcher().redirect(redirect_url);
        }
    };

    esc_key_handler = (event) => {
        if (event.key === "Escape") {
            this.args.escape ? document.dispatchEvent(new CustomEvent(this.close_event)) : {};
        }
    };

    action_handler = (event) => {
        switch (event.srcElement) {
            case this.btn_accept:
                this.return_value = "accept";
                break;
            case this.btn_dismiss:
                this.return_value = "dismiss";
                break;
        }
        document.dispatchEvent(new Event(this.close_event));
    };

    show() {
        // Inject the dialog into the DOM tree (returns a booleam)
        this.inject();

        this.logger.info("Showing component", this.dialog);

        // Get the buttons
        this.btn_dismiss = this.dialog.querySelector("[nd-dismiss]");
        this.btn_accept = this.dialog.querySelector("[nd-accept]");

        // Add local event listeners
        this.btn_accept ? this.btn_accept.addEventListener("click", this.action_handler) : {};
        this.btn_dismiss ? this.btn_dismiss.addEventListener("click", this.action_handler) : {};

        this.btn_accept ? (this.accept_url = this.btn_accept.getAttribute("nd-url")) : {};
        this.btn_dismiss ? (this.dismiss_url = this.btn_dismiss.getAttribute("nd-url")) : {};

        // Add an 'ESC' key handler if no closing elements are present
        if (this.dialog.querySelectorAll("[nd-accept], [nd-dismiss]").length === 0) {
            document.addEventListener("keydown", this.esc_key_handler);
        }

        // Add a 'close' listener to perform cleanup
        document.addEventListener(this.close_event, this.on_close_handler);

        // Show the dialog
        this.dialog.style.display = "block";
    }
};

exports.Alert = class Alert extends BaseDialog {
    constructor(args) {
        super("Alert", args);
        console.log("Alert args", args);
        this.close_btn = null;

        const css_class = `nd-notification bg-${this.args.severity}-subtle`;
        const css_style = `display: inline-block; width: 40%`;

        this.html = Util.compress(`
            <div nd-notification id="${this.id}" class="${css_class}" style="${css_style}">
                <div class="nd-content">
                    <span nd-close class="nd-close">&times;</span>
                    ${args.message}
                </div>
            </div>`);
    }

    on_close_handler = (event) => {
        this.logger.info(`Hiding component.`, this.dialog);

        // Clean event listeners
        this.close_btn.removeEventListener("click", this.on_close_handler);

        // Remove dialog from DOM tree
        this.dialog.remove();

        // Get the URL associated with the action
        const redirect_url = this.args.url;

        // Redirect if an url is specified
        if (redirect_url) {
            this.logger.info(`Redirecting to '${redirect_url}'`);
            new Fetcher().redirect(redirect_url);
        }
    };

    show() {
        // Inject the dialog into the DOM tree (returns a booleam)
        this.inject();

        this.logger.info("Showing component", this.dialog);

        // Get the close element (nd-close)
        this.close_btn = this.dialog.querySelector("[nd-close]");
        this.close_btn.addEventListener("click", this.on_close_handler);

        // Show the dialog
        this.dialog.style.display = "block";

        // Automatically close after a given delay
        setTimeout(() => {
            this.on_close_handler();
        }, TOAST_DELAY_MS);
    }
};

exports.Toast = class Toast extends BaseDialog {
    constructor(args) {
        super("Toast", args);

        this.close_btn = null;

        const css_class = "nd-toast";
        const css_style = `width: 30%`;

        this.html = Util.compress(`
            <div nd-notification id="${this.id}" class="${css_class}" style="${css_style}" role="alert">
                <div class="nd-content">
                    <span nd-close class="nd-close">&times;</span>
                    <h5 class="nd-toast-header">${this.args.title}</h5>
                    <div class="nd-toast-content">${this.args.message}</div>
                </div>
            </div>`);
    }

    on_close_handler = () => {
        this.logger.info(`Hiding component (${this.dialog.returnValue ? "user dismiss" : "auto dismiss"}).`);

        // Clean event listeners
        this.close_btn.removeEventListener("click", this.on_close_handler);

        // Remove dialog from DOM tree
        this.dialog.remove();

        // Get the URL associated with the action
        const redirect_url = this.args.url;

        // Redirect if an url is specified
        if (redirect_url) {
            this.logger.info(`Redirecting to '${redirect_url}'`);
            new Fetcher().redirect(redirect_url);
        }
    };

    show() {
        // Inject the dialog into the DOM tree (returns a booleam)
        this.inject();

        this.logger.info("Showing component");

        // Get the close element (nd-close)
        this.close_btn = this.dialog.querySelector("[nd-close]");
        this.close_btn.addEventListener("click", this.on_close_handler);

        // Show the dialog
        this.dialog.style.display = "block";

        // Automatically close after a given delay
        setTimeout(() => {
            this.close_btn.click();
        }, TOAST_DELAY_MS);
    }
};
