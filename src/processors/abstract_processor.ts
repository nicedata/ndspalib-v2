/**
 * AbstractProcessor class for handling fragments.
 * This class serves as a base for other handlers and provides logging functionality.
 */
import { Logger } from "../modules/logger";

export abstract class AbstractProcessor {
    logger: Logger;

    /**
     * Constructor for the AbstractProcessor class.
     */
    constructor(logger_name: string = '') {
        this.logger = new Logger(logger_name ? logger_name : this.constructor.name, false);
    }

    /**
     * Process a fragment.
     * This method should be overridden by subclasses to provide specific processing logic.
     * @param fragment - The HTML fragment to be processed.
     */
    abstract process(fragment: Element): void;

    /**
     * Postprocess a fragment.
     * This method should be overridden by subclasses to provide specific postprocessing logic.
     */
    abstract postprocess(): void;
};
