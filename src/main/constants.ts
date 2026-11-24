const _INFOS = {
    PROGNAME: "NDS SPA utilities",
    VERSION: "1.0.17-dev",
    AUTHOR: "Martin Mohnhaupt <martin.mohnhaupt@etik.com>",
    COMPANY: "Nice Data Systems, https://www.nicedata.ch",
    LICENCE: "MIT License, https://mit-license.org/",
    INSPIREDBY: {
        HTMX: "HTMX : https://htmx.org/",
        UNPOLY: "UNPOLY : https://unpoly.com/",
    },
};

export const BANNER = `
 ██████   █████ ██████████    █████████  ███████████    █████████   █████       █████ ███████████ 
░░██████ ░░███ ░░███░░░░███  ███░░░░░███░░███░░░░░███  ███░░░░░███ ░░███       ░░███ ░░███░░░░░███
 ░███░███ ░███  ░███   ░░███░███    ░░░  ░███    ░███ ░███    ░███  ░███        ░███  ░███    ░███
 ░███░░███░███  ░███    ░███░░█████████  ░██████████  ░███████████  ░███        ░███  ░██████████ 
 ░███ ░░██████  ░███    ░███ ░░░░░░░░███ ░███░░░░░░   ░███░░░░░███  ░███        ░███  ░███░░░░░███
 ░███  ░░█████  ░███    ███  ███    ░███ ░███         ░███    ░███  ░███      █ ░███  ░███    ░███
 █████  ░░█████ ██████████  ░░█████████  █████        █████   █████ ███████████ █████ ███████████ 
 
 A library that makes it easy to develop single-page web applications.
 
 Copyright : ${_INFOS.AUTHOR} 
 Company   : ${_INFOS.COMPANY}  
 License   : ${_INFOS.LICENCE}
 Version   : ${_INFOS.VERSION}
`;


// General
export const WILDCARD: string = '*';
export const TRUNCATE_LENGTH = 100;
export const ND_PREFIX = 'nd-';
export const DATA_PREFIX = 'data-';

// Overlay modes
export enum OVERLAY_MODE {
    MODAL, // Modal dialogs
    TRANSIENT, // Alerts, toasts, ....
};


// export const INFOS = _INFOS;
export const PROGNAME = `${_INFOS.PROGNAME} ${_INFOS.VERSION}`;
export const VERSION = _INFOS.VERSION;
export const TARGET_NONE = ":none:";

export const ND_EVENTS = {
    // Core events
    POLL_START: "nd:poll:start",
    POLL_END: "nd:poll:end",
    FRAGMENT_BEFORE_INSERT: "nd:fragment:before_insert",
    FRAGMENT_AFTER_INSERT: "nd:fragment:after_insert",
    FETCH_BEFORE: "nd:fetch:before",
    FETCH_AFTER: "nd:fetch:after",
    FETCH_ERROR: "nd:fetch:error",
    REFRESH_AFTER: "nd:refresh:after",
    NAVIGATION: "nd:navigation",
    // Notifications
    ALERT: "nd:dialog:alert",
    TOAST: "nd:dialog:toast",
    INFO: "nd:dialog:info",
    DECISION: "nd:dialog:decision",
    SECURE: "nd:dialog:secure",
    CUSTOM: "nd:dialog:custom",
    DOWNLOAD: "nd:download",
    // Others
    REDIRECT: "nd:redirect",
    CONTEXT: "nd:context",
    ENVIRONMENT: "nd:environ",
    TITLE: "nd:title",
    CHANGE: "nd:change",
    FORM_RESET: "nd:form:reset",
    RESET: "nd:reset",
    UPDATE: "nd:update",
    ZONE: "nd:zone",
    ITEM: "nd:item",
    SORT: "nd:sort",
};

export const NO_CONTEXT = "::none::";
export const SELF = "::self::";
export const TOAST_DELAY_MS = 3000;
export const POLL_DEFAULT_INTERVAL_MS = 10000;

/**
 * Custom NDS Styles       
 */
export const ND_STYLES = `
    :root {
        --nd-border-radius: 5px;
        --nd-border-color: lightgray solid 1px;
    }

    .nd-notifications {
        position: absolute;
        left: 50%;
        top: 0;
        width: 100%;
        height: 0;
        transform: translate(-50%, 0%);
        margin-top: 0px;
        z-index: 9000;
    }

    .nd-busy {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100%;
        /* background: rgba(0, 0, 0, 0.1); */
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        cursor: progress;
    }  

    .nd-spinner {
        display: block;
        position: absolute;
        z-index: 1000;
        top: 50%;
        left: 50%;
        height: 100px;
        width: 100px;
        margin: -25px 0 0 -25px;
        border: 10px rgba(52, 101, 164, 0.25) solid;
        border-top: 10px #3465a4 solid;
        border-radius: 50%;
        -webkit-animation: spin2 1s infinite linear;
        animation: spin2 1s infinite linear;
    }

    @-webkit-keyframes spin2 {
        from {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }

        to {
            -webkit-transform: rotate(359deg);
            transform: rotate(359deg);
        }
    }

    @keyframes spin2 {
        from {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }

        to {
            -webkit-transform: rotate(359deg);
            transform: rotate(359deg);
            -webkit-transform: rotate(359deg);
            transform: rotate(359deg);
        }
    }

    .nd-modal {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.1);
        /*
        border-radius: var(--nd-border-radius);
        border-color: var(--nd-border-color);
        */
        z-index: 8000;
        cursor: not-allowed;
        /* display: block; */
        border: none;
    }

    .nd-modal-content {
        position: relative;
        left: 50%;
        width: 30%;
        transform: translate(-50%, 0%);

        height: fit-content;
        margin-top: 10px;
        padding: 15px;

        background-color: white;
        border: var(--nd-border-color);
        border-radius: var(--nd-border-radius);
        cursor: auto;
        box-shadow: 8.0px 16.0px 16.0px hsl(0deg 0% 0% / 0.25);
    }

    .nd-notification {
        position: relative;
        margin-bottom: 5px;
        left: 50%;
        width: 60%;
        transform: translate(-50%, 0%);

       margin-top: 5px;

        border: transparent solid 1px;
        border-radius: var(--nd-border-radius);
        padding-right: 10px;
        background-color: white;
        z-index: 10000;

        display: block; 
        width: 40%;

        box-shadow: 8.0px 16.0px 16.0px hsl(0deg 0% 0% / 0.25);
    }

    .nd-close {
        position: relative;
        left: 100%;
        top: -30;
        font-size: x-large;
        display: inline-block;
        line-height: 1;
        cursor: pointer;
    }

    .nd-content {
        margin-top: 10px;
        margin-bottom: 10px;
        margin-right: 10px;
    }

    .nd-header {
        padding-bottom: 3px;
        margin-bottom: 5px;
        border-bottom: var(--nd-border-color);
    }

    .nd-footer {
        padding-top: 10px;
        border-top: var(--nd-border-color);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .nd-toast {
        position: relative;
        margin-bottom: 5px;
        left: 50%;
        width: 30%;
        transform: translate(-50%, 0%);

        margin-top: 5px;

        border: var(--nd-border-color);
        border-radius: var(--nd-border-radius);
        padding-right: 10px;
        background-color: white;
        z-index: 10000;
        display: block;
        box-shadow: 8.0px 16.0px 16.0px hsl(0deg 0% 0% / 0.25);
    }

    .nd-toast-header {
        display: inline-block;
    }

    .nd-toast-content {
        margin-left: 20px;
        padding-top: 10px;
        border-top: var(--nd-border-color);
`
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .join(" ");
