import { Logger } from "../modules/logger";

export class BaseTracker {
    logger: Logger;

    /**
     * Constructor for the BaseHandler class.
     * @param class_name - Optional name of the class for logging purposes.
     */
    constructor(class_name: string) {
        this.logger = new Logger(class_name, true);
    }
}
