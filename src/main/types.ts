export interface KeyValuePair<K, V> {
    key: K;
    value: V;
}

export type KVPair = Record<string, any>;

export enum CheckResult {
    SUCCESS = 'SUCCESS',
    FAILURE = 'FAILURE',
}

export enum DialogResult {
    NONE = '',
    ACCEPT = 'ACCEPT',
    DISMISS = 'DISMISS',
    APPLY = 'APPLY',
}

export enum AlertSeverity {
    INFO = 'info',
    SUCCESS = 'success',
    WARNING = 'warning',
    DANGER = 'danger',
}
