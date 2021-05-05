export interface ImageApiResponseData {
    fullRes: FullRes;
    thumb:   FullRes;
}

export interface FullRes {
    ok:    boolean;
    value: Value;
}

export interface Value {
    cid:     string;
    size:    number;
    created: Date;
    type:    string;
    scope:   string;
    files:   any[];
    pin:     Pin;
    deals:   Deals;
}

export interface Deals {
    status: string;
    deals:  any[];
}

export interface Pin {
    cid:     string;
    size:    number;
    status:  string;
    created: Date;
}
