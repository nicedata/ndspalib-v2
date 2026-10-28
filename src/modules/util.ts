import { ND_EVENTS, CONTAINERS, OVERLAY_MODE } from "../main/constants";
import { check_fragment } from "../syntax/syntax";
import { Logger } from "./logger";
import { v4 as uuidv4 } from 'uuid';
import JSON5 from 'json5';

const logger = new Logger("Util", true);

export class Util {

    static randomUUID = (): string => {
        return uuidv4();
    };


    static to_json = (data: string): object => {
        let result: object = {};
        try {
            result = JSON5.parse(data);
        } catch (error) {
            logger.error(`Error: no valid json data supplied: '${data}'. Please see https://json5.org/.`);
        } finally {
            return result;
        }
    };

    static is_internal_url = (href: string): boolean => {
        // Élimine les chaînes vides, les ancres pures et les liens javascript/téléphone/mail
        if (!href || href.startsWith('#') || /^(javascript|mailto|tel):/i.test(href)) {
            return true;
        }

        try {
            // Utilise window.location.origin comme base pour résoudre automatiquement les liens relatifs
            const targetUrl = new URL(href, window.location.origin);

            // Compare l'origine (protocole + domaine + port)
            return targetUrl.origin === window.location.origin;
        } catch (error) {
            // Si l'URL ne peut pas être analysée, on considère par sécurité qu'elle n'est pas interne
            return false;
        }
    };

    static is_root_url = (url: string) => {
        const _url = url.trim();
        return _url === '/';
    };

    // Source - https://stackoverflow.com/questions/42406520/populate-an-html-form-from-a-formdata-object
    // Source - https://stackoverflow.com/questions/42406520/populate-an-html-form-from-a-formdata-object/79932100#79932100
    static serialize_form(form: HTMLFormElement) {
        const result: string[] = [];
        form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("[name]").forEach((e) => {
            switch (e.type) {
                case "checkbox":
                    if (e instanceof HTMLInputElement) {
                        result.push(`${e.name}=${e.checked}`);
                    }
                    break;
                default:
                    result.push(`${e.name}=${e.value}`);
                    break;
            }
        });
        return result.join("&");
    }

    static deserialize_form = (form: HTMLFormElement, serialized_form_data: string): void => {
        const entries = new URLSearchParams(serialized_form_data).entries();
        for (const [key, val] of entries) {
            const input = form.elements.namedItem(key);
            if (!input) continue;
            if (input instanceof RadioNodeList) {
                input.value = val;
            } else if (input instanceof HTMLInputElement) {
                if (input.type === "checkbox") {
                    input.checked = !val;
                } else {
                    input.value = val;
                }
            } else if (input instanceof HTMLSelectElement || input instanceof HTMLTextAreaElement) {
                input.value = val;
            }
        }
    };

    static truncate(input: string, len = 50) {
        if (typeof input !== "string") return input;
        const text = input.trim().replace(/\s+/g, " ").split(" ").join(" ").trim();
        return text.length > len ? `${text.substring(0, len)}...` : text;
    }

    static as_text(element: Element) {
        if (element !== null) {
            return element.outerHTML.replace("<", "&lt").replace(">", "&gt");
        }
        return "???";
    }

    /**
     *  get_targets - get all elements by a selector, eventually return the element (ifempty) if querySelectorAll returns nothing.
     *
     *  @selector: a string with the selector to query (e.g. '#my-id', '.my-class', 'div > p', etc.). If the string is empty or not a string, an empty array is returned.
     *  @ifempty: an element to return if the querySelectorAll returns nothing. If the selector is empty or not a string, this element is returned (if specified).
     *
     *  @return: an array of elements matching the selector, or an array with the element (ifempty) if querySelectorAll returns nothing.
     */
    static get_targets = (selector: string, ifempty: Element | null = null): Element[] => {
        // Check selector (must be a string)
        if (typeof selector !== "string") return ifempty ? [ifempty] : [];

        // Cleanup: remove duplicate spaces, split and produce a comma-separated string
        selector = selector.trim().replace(/\s+/g, " ").split(" ").join(",");

        // Get the elements, eventually add the element (ifempty) if querySelectorAll returns nothing
        return selector ? Array.from(document.querySelectorAll(selector)) : ifempty ? [ifempty] : [];
    };

    /**
     *  clear_node - delete a specific node.
     *
     *  @param {*} node - the node to clear.
     *  @return: nothing, the function modifies the node in place.
     */
    static clear_node = (node: Node) => {
        logger.info(`clear_node | node name: '${node.nodeName.toLowerCase()}'`);
        const range = document.createRange();
        range.selectNodeContents(node);
        range.deleteContents();
    };

    /**
     * create_fragment - create a document fragment from HTML code.
     */
    static create_fragment(html: string): DocumentFragment {
        logger.info(`create_fragment | Content: '${html ? Util.truncate(html) : ""}'`);
        return document.createRange().createContextualFragment(html);
    }

    static refresh(fragment: Element) {
        // Step 1 : process the fragment (update handlers)
        for (const [_, handler] of Object.entries(nd_core.handlers)) {
            logger.info(`Process by ${handler.constructor.name}`);
            handler.process(fragment);
        }

        check_fragment(fragment);

        // Step 2 : postprocess the (update handlers)
        for (const [_, handler] of Object.entries(nd_core.handlers)) {
            logger.info(`Postprocess by ${handler.constructor.name}`);
            handler.postprocess();
        }

        // If the fragment contains a form, we remove focus from the activeElement
        // to allow focus to be set somewhere in the form (autofocus)
        const form = fragment.querySelector<HTMLFormElement>("form");
        if (form) {
            const first_field = form.querySelector<HTMLElement>("[autofocus]");

            if (first_field) {
                if (document.activeElement instanceof HTMLElement) {
                    document.activeElement.blur();
                }
                first_field.focus();
            }
        }
        document.dispatchEvent(new CustomEvent(ND_EVENTS.REFRESH_AFTER, { detail: { fragment: fragment } }));
    }

    /**
     * insert_fragment - replace or append a fragment in a specific target.
     *
     * @param {*} target - the target element where the fragment will be inserted.
     * @param {*} fragment - the fragment to insert (must be a DocumentFragment).
     * @param {*} append - if true, the fragment will be appended to the target. If false, the target will be cleared before inserting the fragment. Default is false.
     * @param {*} refresh - if true, the 'refresh' method will be called on the target after inserting the fragment. Default is false.
     * @param {*} new_layer - if true, no global refresh will be triggered after inserting the fragment. Default is false.
     *
     * @return: nothing, the function modifies the DOM in place.
     */
    static insert_fragment = (target: Element, fragment: DocumentFragment, append = false, refresh = false, new_layer = false): HTMLElement => {
        logger.info(`insert_fragment | Target: '${target.tagName.toLowerCase()}'. Mode: ${append ? "append" : "replace"}. Refresh: ${refresh ? "yes" : "no"}.`);

        document.dispatchEvent(new CustomEvent(ND_EVENTS.FRAGMENT_BEFORE_INSERT, { detail: { target: target, fragment: fragment, append: append } }));
        // If append mode is false, clear the node before
        append ? {} : Util.clear_node(target);

        // See : https://www.miragecraft.com/blog/dynamically-insert-inline-script
        target.appendChild(fragment);
        const result = target.lastChild as HTMLElement;

        // No global refresh on new layers !
        if (new_layer) return result;

        // If refresh mode is true, refresh the node
        refresh ? Util.refresh(target) : {};
        document.dispatchEvent(new CustomEvent(ND_EVENTS.FRAGMENT_AFTER_INSERT, { detail: { target: target, data: fragment, append: append } }));
        return result;
    };

    /**
     * sleep_ms - sleep during a specific period (ms).
     */
    static async sleep_ms(ms: number) {
        logger.info(`sleep_ms | Timeout: ${ms}ms.`);
        await new Promise((resolve) => setTimeout(resolve, ms));
    }

    /**
     * compress - Compress a string (remove duplicate whitechars).
     */
    static compress(str: string) {
        if (typeof str !== "string") return str;
        logger.info(`compress | String: '${Util.truncate(str)}'.`);
        return str.replace(/\n+/g, " ").replace(/\r+/g, " ").replace(/  +/g, " ");
    }

    static navigate_to = async (new_url: string) => {
        let [method, url] = ["navigate", ""];
        if (new_url.includes("::")) {
            const [parsed_method, parsed_url] = new_url.split("::");
            method = parsed_method ?? "";
            url = parsed_url ?? "";
            if (!["get", "post"].includes(method)) {
                logger.error(`Only 'get::' or 'post::' url modifiers are allowed. Supplied method was '${method}:'.`);
                return;
            }
        } else {
            url = new_url;
        }

        // Get or Post...
        if (["get", "post"].includes(method)) {
            logger.info(`Fetching url '${url} with a '${method}' request.`);
            const request = new Request(url, { method: method.toUpperCase() });
            await nd_core.fetcher.execute_fetch(request);
            return;
        }

        // Navigate
        let result = false;
        document.querySelectorAll<HTMLElement>("[nd-link]").forEach((link) => {
            const nd_url = link.getAttribute("nd-url");
            const href = link.getAttribute("href");
            if (href === new_url || nd_url === new_url) {
                link.click();
                result = true;
                return;
            }
        });
        logger.warn(`navigate_to | Url: '${new_url}'. Link: ${result ? "found" : "not found"}.`);
        return result;
    };

    static open_layer = (html: string, mode: typeof OVERLAY_MODE[keyof typeof OVERLAY_MODE]): HTMLElement | null => {
        let container = null;
        const fragment = Util.create_fragment(html);

        // Get the DOM target
        switch (mode) {
            case OVERLAY_MODE.MODAL:
                container = document.querySelector(`[${CONTAINERS.DIALOGS}]`);
                break;
            case OVERLAY_MODE.TRANSIENT:
                container = document.querySelector(`[${CONTAINERS.NOTIFICATIONS}]`);
                break;
            default:
                logger.error(`Unknown layer mode : '${mode}'.`);
                return null;
        }

        if (!container)
            return null;

        // Insert the new fragment (append AND refresh)
        const new_element = Util.insert_fragment(container, fragment, true, true, true);

        if (new_element instanceof HTMLElement) Util.refresh(new_element);
        return new_element;
    };

    static action_detail_dict = (arr: any[]) => {
        let result: Record<string, any> = {};
        if (!(arr instanceof Array)) return result;

        let index = 0;
        arr.forEach((arg) => {
            if (arg instanceof Object && arg.length > 0) {
                result["detail"] = arg[0];
            } else {
                result[`arg${index++}`] = arg;
            }
        });
        return result;
    };
};
