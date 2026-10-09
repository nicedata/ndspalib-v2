import { ND_EVENTS, VERSION, CONTAINERS } from "../main/constants";
import { Logger } from "./logger";
import { EnvironmentHandler } from "../processors/environment_handler";
import JSON5 from 'json5';

export class Fetcher {
    static ALLOW_ORIGIN = "http://localhost:8000";
    static ALLOW_METHODS = "GET,POST,PUT,DELETE";
    static METHODS = ["get", "post", "delete", "nav"];
    static _instance: Fetcher;

    logger = new Logger("Fetcher", true);
    events: CustomEvent[] = [];
    busy_indicator: HTMLElement | null = document.querySelector(`[${CONTAINERS.BUSY}]`);
    environment_handler: EnvironmentHandler = new EnvironmentHandler();

    // Singleton constructor !
    constructor() {
        if (!!Fetcher._instance) {
            return Fetcher._instance;
        }
        Fetcher._instance = this;
    }

    static get = () => {
        return new Fetcher();
    };

    set_busy = () => {
        this.busy_indicator ? (this.busy_indicator.style.display = "block") : {};
    };

    set_idle = () => {
        this.busy_indicator ? (this.busy_indicator.style.display = "none") : {};
    };

    _process_headers = (headers: Headers) => {
        let headers_dump: string[] = [];
        headers.forEach((v, k) => {
            headers_dump.push(`'${k}'->'${v}'`);
            const sse = k.toLowerCase();
            switch (sse) {
                case "x-nd-environment":
                    const data = JSON5.parse(v);
                    this.logger.info(`Received server environment '${sse}'. Content: '${v}'.`);
                    document.dispatchEvent(new CustomEvent(ND_EVENTS.ENVIRONMENT, { detail: data }));
                    break;
                case "x-nd-event":
                    this.events = JSON5.parse(v);
                    this.logger.info(`Received server messages '${sse}'. Content: '${v}'.`);
                    break;
                case "x-nd-url":
                    break;
            }
        });
        this.logger.info(`Headers : \n${headers_dump.join("\n")}`);
    };

    // Dispatch received events !
    _process_events = (payload: Blob) => {
        this.logger.info(`Processing events...`);
        this.events.forEach((event) => {
            this.logger.info(`Event: `, event);
            const type = event.type;
            let target: Document | Element | null = document;

            switch (type) {
                case ND_EVENTS.DOWNLOAD:
                    event.detail.data = payload;
                    break;
                case ND_EVENTS.FORM_RESET:
                    // Find the form
                    const form_id = event.detail.form_id;
                    target = document.querySelector(`[data-ndtrack="${form_id}"]`);
                    // If not found, try the form id
                    !target ? (target = document.getElementById(`${form_id}`)) : {};
                    break;
            }

            const detail = JSON5.stringify(event.detail);
            if (target) {
                this.logger.info(`Dispatching event '${type}'. Detail: '${detail}'.`);
                target.dispatchEvent(new CustomEvent(type, { detail: event.detail }));
            } else {
                this.logger.warn(`No target found for event '${type}'. Detail: '${detail}'.`);
            }
        });
        return payload;
    };

    async execute_fetch(request: Request) {
        const url = request.url;
        this.events = [];
        let status = null;
        let data = null;

        // Add our own headers
        request.headers.append("X-Nd-Version", `"${VERSION}"`);
        request.headers.append("X-Nd-Url", `"${request.url}"`);
        request.headers.append("X-Nd-Environment", `${JSON.stringify(this.environment_handler.envs)}`);
        // ! request.headers.append("X-Nd-Context", `${JSON.stringify(nd_core.context_handler.get_current_context())}`);
        // CORS
        // request.headers.append("Access-Control-Allow-Origin", Fetcher.ALLOW_ORIGIN);
        // request.headers.append("Access-Control-Allow-Methods", Fetcher.ALLOW_METHODS);
        // request.headers.append("Access-Control-Allow-Credentials", true);
        // Trigger before fetch event
        document.dispatchEvent(new CustomEvent(ND_EVENTS.FETCH_BEFORE, { detail: { url: url, data: null, status: status } }));

        try {
            this.set_busy();
            // ! const response = await fetch(request, { smode: "cors" });
            const response = await fetch(request);
            this.logger.info(`Response status: ${response.status}`);

            if (!response.ok) {
                document.dispatchEvent(new CustomEvent(ND_EVENTS.FETCH_ERROR, { detail: { url: url, data: null, status: response.status } }));
                this.logger.error(`Response status: ${response.status}`);
                this.set_idle();
                return null;
            }

            // Process the response headers
            this._process_headers(response.headers);

            // Get the response payload as a Blob
            const payload = await response.blob();
            this.logger.info(`Result is of type '${payload.type}'.`);

            // Process events
            const data = await this._process_events(payload).text();

            document.dispatchEvent(new CustomEvent(ND_EVENTS.FETCH_AFTER, { detail: { url: url, data: data, status: status } }));
            this.set_idle();
            return data;
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            document.dispatchEvent(new CustomEvent(ND_EVENTS.FETCH_ERROR, { detail: { url: url, data: message, status: status } }));
            this.logger.error(`Error on url '${url}':  ${message}`);
        }
        this.set_idle();
        return null;
    }

    async send_form(form: HTMLFormElement, operation = "accept") {
        const formdata = new FormData(form);
        formdata.append("nd-form_id", form.dataset.ndtrack ?? "");
        formdata.append("nd-form_operation", operation);

        const request = new Request(form.action, {
            method: form.method,
            body: formdata,
        });
        return await this.execute_fetch(request);
    }

    async post_form_data(formdata: FormData, url: string) {
        const request = new Request(url, {
            method: "post",
            body: formdata,
        });
        return await this.execute_fetch(request);
    }

    _redirect_to = async (url: string) => {
        if (!url.startsWith("/")) {
            this.logger.error(`Cannot navigate to '${url}'. Only relative URLs are allowed !`);
            return;
        }

        if (url === "/") {
            this.logger.error(`Navigation to '/' is not allowed !`);
            return;
        }

        // ! if (!nd.main_container) {
        //     this.logger.error(`Cannot navigate to '${url}'. No main container defined !`);
        //     return;
        // }

        const request = new Request(url);
        this.logger.info(`Fetching '${url}' in a 'get' request.`);
        const data = await this.execute_fetch(request);
        if (data) {
            // ! nd.util.clear_node(nd.main_container);
            // ! const fragment = nd.util.create_fragment(data);
            // ! nd.util.insert_fragment(nd.main_container, fragment, false, true);
        }
        document.dispatchEvent(new CustomEvent(ND_EVENTS.NAVIGATION, { detail: { url: url, data: data } }));
    };

    /**
     * fetch_data - fetch data from server as text
     */
    async fetch_data(url: string, payload: Record<string, any> = {}) {
        // Default method is GET !
        let [_method, _url] = ["get", url];

        // Handle URL prefxes
        if (url.includes("::")) {
            const [method, target] = url.split("::");
            _method = method ?? "";
            _url = target ?? "";
            if (!Fetcher.METHODS.includes(_method)) {
                this.logger.error(`Only ${Fetcher.METHODS.join(" or ")} URL modifiers are allowed. Supplied method was '${_method}:'.`);
                return;
            }
        }

        if (_method === "nav") {
            await this._redirect_to(_url);
            return;
        }

        let request = null;
        if (_method == "get") request = new Request(_url, { method: _method });
        else request = new Request(_url, { method: _method, body: JSON5.stringify(payload) });

        this.logger.info(`Fetching '${_url}' in a '${_method}' request.`);

        return await this.execute_fetch(request);
    }

    redirect = async (url: string) => {
        if (!url) return;
        url.startsWith("nav::") ? {} : (url = "nav::" + url);
        return await this.fetch_data(url);
    };
};