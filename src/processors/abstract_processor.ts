import { Logger } from "../modules/logger";

export abstract class AbstractProcessor {
    // Stockage des instances par classe concrète
    private static instances = new Map<Function, AbstractProcessor>();
    logger!: Logger;

    protected constructor() {
        this.logger = new Logger(this.constructor.name.replace('_', ''), false);
    }

    abstract process(fragment: Element): void;

    abstract postprocess(): void;

    static getInstance<T extends AbstractProcessor>(this: new (...args: any[]) => T): T {
        if (!AbstractProcessor.instances.has(this)) {
            AbstractProcessor.instances.set(this, new this());
        }
        return AbstractProcessor.instances.get(this) as T;
    }
}