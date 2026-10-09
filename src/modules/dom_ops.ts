import { Logger } from "./logger";
import { Formatters } from "./formatters";

export class DomOps {
    static OPS = ["add", "sort", "delete", "replace", "clear"];
    static _instance: DomOps;
    logger!: Logger;

    constructor() {
        // Singleton !
        if (!!DomOps._instance) {
            return DomOps._instance;
        }
        DomOps._instance = this;
        this.logger = new Logger("DomOps");
    }

    dispatcher = (detail) => {
        const errors = [];
        this.logger.info(`Dispatch details`, detail);
        const action = detail.action;
        const target_id = detail.list_id;
        const item_id = detail.item_id;
        const sort = detail.sort;
        const data = detail.data;

        let target_el = null;
        let item_el = null;

        if (!DomOps.OPS.includes(action)) {
            errors.push(`Unknown action: '${action}'`);
        }

        if (target_id) {
            target_el = document.getElementById(target_id);
            if (!target_el) errors.push(`Target element '${target_id}' not found.`);
        } else {
            errors.push(`No target specified.`);
        }

        if (errors.length) {
            errors.forEach((e) => {
                this.logger.error(e);
            });
            return;
        }

        switch (action) {
            case "clear":
                const elements = target_el.querySelectorAll("[nd-item]");
                elements.forEach((e) => {
                    this.delete_node(e);
                });
                break;
            case "sort":
                const order = sort.order;
                const columns = sort.columns;
                Formatters.sort(target_id, columns, order);
                break;
            case "add":
                if (!data) {
                    this.logger.error(`Action: ${action}. No data supplied.`);
                    return;
                }
                this.add_node(target_el, data);
                if (sort && sort.order && sort.columns) {
                    const order = sort.order;
                    const columns = sort.columns;
                    Formatters.sort(target_id, columns, order);
                }
                break;
            case "delete":
                item_el = target_el.querySelector(`[id="${item_id}"]`);
                if (!item_el) {
                    this.logger.error(`Action: ${action}. Item with id="${item_id}" not found in list '${target_id}'.`);
                    return;
                }
                this.delete_node(item_el);
                break;
            case "replace":
                item_el = target_el.querySelector(`[id="${item_id}"]`);
                if (!item_el) {
                    this.logger.error(`Action: ${action}. Item with id="${item_id}" not found in list '${target_id}'.`);
                    return;
                }
                this.delete_node(item_el);
                this.add_node(target_el, data);
                break;
        }
    };

    delete_node = (target) => {
        nd.util.clear_node(target); // Clear the content
        nd.util.refresh(target); // Remove obsolete handlers
        target.remove(); // Remove the item from the DOM
    };

    add_node = (target, data) => {
        let anchor = null;
        switch (target.tagName.toLowerCase()) {
            case "table":
                anchor = target.querySelector("tbody");
                if (!anchor) anchor = target.createTBody();
                break;
            default:
                anchor = target;
        }
        this.logger.info(`Adding a new node to '${target.id}'. Anchor: '${anchor.tagName.toLowerCase()}'.`);

        const template = document.createElement("template");
        template.innerHTML = data;
        const fragment = template.content;
        template.remove();
        anchor.append(fragment);
        nd.util.refresh(anchor.lastChild);
    };
};