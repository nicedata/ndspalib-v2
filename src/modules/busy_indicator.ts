// Busy indicator module
/**
 * This module provides a simple busy indicator that can be shown or hidden.
 * It creates a div with a spinner and appends it to the body if it doesn't exist.
 * The BusyIndicator class has static methods to set and reset the busy indicator.
 */


/**
 * Get or create the busy indicator container.
 * If it doesn't exist, create it and append it to the body.
 * @returns The busy indicator container element.
 */
const get_or_create_busy_indicator = () => {
    let container = document.querySelector<HTMLDivElement>('.nd-busy');
    if (!container) {
        container = document.createElement('div');
        container.classList.add('nd-busy');
        const spinner = document.createElement('div');
        spinner.classList.add('nd-spinner');
        container.appendChild(spinner);
        document.body.prepend(container);
    }
    return container;
};

/**
 * BusyIndicator class provides static methods to show and hide the busy indicator.
 */
export class BusyIndicator {

    static set = () => {
        const container = get_or_create_busy_indicator().style.display = "block";
    };

    static reset = () => {
        const container = get_or_create_busy_indicator().style.display = "none";
    };
}