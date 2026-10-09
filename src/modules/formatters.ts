const { Logger } = require("./logger.js");

exports.Formatters = class Formatters {
    static logger = new Logger("Formatters", true);

    static sort = (list_id, sort_cols, order = "asc") => {
        // Check column names
        if (!Array.isArray(sort_cols)) {
            Formatters.logger.error(`A valid list of column names must be supplied for sorting.`);
            return;
        }
        if (sort_cols.includes("_")) {
            Formatters.logger.error(`The underscore character (_) is a reserved column name. Do not use it.`);
            return;
        }

        // Check ordering
        if (!["asc", "desc"].includes(order)) {
            Formatters.logger.error(`Ordering must be one of 'asc', 'desc'. Supplied value: '${order}'.`);
            return;
        }
        // Set ordering
        const ascending = order === "asc";

        // Get the targeted list by its id
        const list = document.getElementById(list_id);
        if (!list) {
            Formatters.logger.error(`The list to order '${list_id}' was not found.`);
            return;
        }

        // Get the list items
        const items = list.querySelectorAll("[nd-item]");

        // Check list length
        if (items.length === 0) {
            Formatters.logger.warn(`No list elements with an 'nd-item' atttribute  were found in the '${list_id}' list.`);
            return;
        }

        // Check if all colums to sort bear an 'nd-col' attribute
        let can_sort = true;
        sort_cols.forEach((col) => {
            const cols = list.querySelectorAll(`[nd-col="${col}"]`);
            cols.length !== items.length ? (can_sort = false) : {};
        });
        if (!can_sort) {
            Formatters.logger.error(`Not all list elements bear an 'nd-col' attribute in list '${list_id}'.`);
            return;
        }

        Formatters.logger.info(`Sorting target '${list_id}'. Sort order: ${order}. Columns: ${sort_cols.join(", ")}.`);
        const start_stamp = Date.now();
        Formatters.logger.info(`Sorting started...`);

        // Build a list of dicts with the attributes to sort
        const dict_list = [];
        items.forEach((item) => {
            const dict = {};
            dict["_"] = item;
            sort_cols.forEach((col) => {
                let el = item.querySelector(`[nd-col="${col}"]`);
                // No element found => the nd-col is in 'item' itself !
                dict[col] = el ? el.innerHTML : item.innerHTML;
            });
            dict_list.push(dict);
        });

        // Construct a dynamic sort function
        const sort_function = (a, b) => {
            const results = [];
            let result = null;

            sort_cols.forEach((col) => {
                let result = null;
                const value_a = a[col];
                const value_b = b[col];
                const is_numeric = !(isNaN(value_a) && isNaN(value_b));

                // Compare !
                if (is_numeric) {
                    result = ascending ? value_a - value_b : value_b - value_a;
                } else {
                    result = ascending ? value_a.localeCompare(value_b) : value_b.localeCompare(value_a);
                }
                // Store the result
                results.push(result);
            });

            // Prepare the comparison return value
            for (const crit in results) {
                const value = results[crit];
                if (value === 0) continue; // No sort needed
                result = value;
                return result;
            }
            // Unhandled results
            return result;
        };

        // Perform the sort (the original array is mutated)
        dict_list.sort(sort_function);

        // Finally reorder the DOM
        items.forEach((item, index) => {
            const replacement = dict_list[index]["_"];
            item.parentNode.append(replacement);
        });
        const end_stamp = Date.now();
        Formatters.logger.info(`Sorting done. Sorted ${items.length} rows in ${end_stamp - start_stamp}ms.`);
    };
};
