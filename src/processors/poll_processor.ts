/**
 * PollHandler class to handle polling of elements with the `nd-poll` attribute.
 * This class is a singleton and extends the BaseHandler class.
 * It processes fragments to find elements with the `nd-poll` attribute and starts polling them.
 * The polling is managed by the TimerTracker class to ensure timers are cleared when elements are removed from the DOM.
 *
 * @class PollHandler
 * @extends AbstractProcessor
 */

import { AbstractProcessor } from "./abstract_processor";
import { Poll } from "../modules/poll";
import { TimerTracker } from "../trackers/timer_tracker";

/**
 * PollHandler class to handle polling of elements with the `nd-poll` attribute.
 * This class is a singleton and extends the BaseHandler class.
 * It processes fragments to find elements with the `nd-poll` attribute and starts polling them.
 * The polling is managed by the TimerTracker class to ensure timers are cleared when elements are removed from the DOM.
 *
 * @class PollHandler
 * @extends AbstractProcessor
 */
export class PollProcessor extends AbstractProcessor {
    constructor() {
        super();
    }

    /**
     * Process a given fragment.
     */
    process = (fragment: Element) => {
        // this.checker.check(fragment);
        // Process this fragment
        fragment.querySelectorAll(`[nd-poll]`).forEach((element) => {
            // Handle element in the Poll class
            const poller = new Poll(element as HTMLElement);
            // Start polling
            this.start(poller);
        });
    };

    postprocess = () => { };

    /**
     * Start a timer to poll the given poller.
     * The timer is registered in the TimerTracker to be cleared if the element is removed from the DOM.
     * The timer is cleared and removed from the TimerTracker when the poller is executed.
     * The timer is restarted after the poller is executed.
     *
     * @param {Poll} poller - The Poll instance to be polled.
     * @returns {void}
     */
    start = (poller: Poll) => {
        // Start a timer to poll the given poller
        const timeout_id = setTimeout(() => {
            this.run_poller(poller);
        }, poller.interval_ms);
        TimerTracker.getInstance().register_timer(poller.element, timeout_id, poller.interval_ms);
    };

    /**
     * Run the poller and restart the timer.
     * The timer is cleared and removed from the TimerTracker when the poller is executed.
     * The timer is restarted after the poller is executed.
     *
     * @param {*} poller - The Poll instance to be polled.
     * @returns {void}
     */
    run_poller = (poller: Poll) => {
        this.logger.info(`Polling ${poller.url} for element ${poller.element.dataset.ndtimer}...`);
        // Keep memory stack clean !
        const timerId = poller.element.dataset.ndtimer;
        timerId !== undefined ? TimerTracker.getInstance().remove_timer(timerId) : {};
        // Execute the poll action
        poller.poll();
        // The start a new poll !
        this.start(poller);
    };
};
