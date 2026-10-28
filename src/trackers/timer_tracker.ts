/**
 * TimerTracker class to manage timers associated with elements in the DOM.
 * It provides methods to register and remove timers, and to clean up unused timers.
 * The timers are cleared when the associated elements are removed from the DOM.
 *
 * @class TimerTracker
 */

import { BaseTracker } from "./base_tracker";
import { Util } from "../modules/util";
import { AbstractProcessor } from "../processors/abstract_processor";
import { Logger } from "../modules";

/**
 * TrackedTimer class to represent a timer associated with an element in the DOM.
 * It stores the timer ID, timeout duration, and the UUID of the associated element.
 */
class TrackedTimer {
    timer_id: number;
    timeout_ms: number;
    uuid: string;

    constructor(element: HTMLElement, timer_id: number, timeout_ms: number) {
        this.uuid = element.dataset.ndtimer ?? Util.randomUUID();
        element.dataset.ndtimer = this.uuid;
        this.timer_id = timer_id; // The ID of the timer returned by setTimeout or setInterval
        this.timeout_ms = timeout_ms; // The timeout duration in milliseconds (optional)
    }
}

/**
 * TimerTracker class to manage timers associated with elements in the DOM.
 * It provides methods to register and remove timers, and to clean up unused timers.
 * The timers are cleared when the associated elements are removed from the DOM.
 *
 * @class TimerTracker
 * @extends BaseHandler
 */
export class TimerTracker extends AbstractProcessor {
    private timers: TrackedTimer[] = [];
    constructor() {
        super();
    }

    process = (fragment: Element) => { };

    /**
     * Postprocess method to clean up timers associated with elements that are no longer in the DOM.
     * It iterates through the list of tracked timers and removes any timers associated with elements that are not present in the document.
     */
    postprocess = () => {
        this.logger.info(`Postprocessing : ${this.timers.length} timer(s) to check.`);
        if (this.timers.length === 0) return;

        // We use slice() to create a copy of the timers array because we will modify the original array while iterating.
        this.timers.slice().forEach((timer, index) => {
            // find the uuid of elements NOT present in the document
            if (!document.querySelector(`[data-ndtimer="${timer.uuid}"]`)) {
                this.remove_timer(timer.uuid);
            }
        });
        this.logger.info(`Postprocessing : ${this.timers.length} timer(s) remaining.`);
    };

    /**
     * Register a timer associated with an element in the DOM.
     *
     * @param {Element} element - The DOM element associated with the timer.
     * @param {number} timer_id - The ID of the timer returned by setTimeout or setInterval.
     * @param {number} timeout_ms - The timeout duration in milliseconds (optional).
     * @returns {void}
     */
    register_timer = (element: Element, timer_id: number, timeout_ms: number) => {
        const _element = element as HTMLElement;
        const tracked_item = new TrackedTimer(_element, timer_id, timeout_ms);
        this.timers.push(tracked_item);
        this.logger.info(`Now tracking timer '${timer_id}' (${timeout_ms}ms) on element '${_element.tagName.toLowerCase()}' (${_element.dataset.ndtimer}).`);
        this.logger.info(`Total timer(s): ${this.timers.length}.`);
    };

    /**
     * Remove a timer associated with an element in the DOM.
     * The timer is cleared and removed from the list of tracked timers.
     *
     * @param {string} uuid - The UUID of the element associated with the timer to be removed.
     * @returns {void}
     */
    remove_timer = (uuid: string) => {
        const tracked_item = this.timers.find((t) => t.uuid === uuid);
        if (tracked_item) {
            clearTimeout(tracked_item.timer_id);
            const index = this.timers.indexOf(tracked_item);
            this.timers.splice(index, 1);
            this.logger.info(`Cleared and removed timer #${tracked_item.timer_id} (${tracked_item.timeout_ms}ms) on element ${tracked_item.uuid}.`);
            this.logger.info(`Timer(s) remaining: ${this.timers.length}.`);
        } else {
            this.logger.warn(`Timer with nduuid=${uuid} not found.`);
        }
    };
};
