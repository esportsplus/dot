function parse(keys: any): any[] {
    if (typeof keys === 'number') {
        keys = `${keys}`;
    }

    if ((typeof keys === 'string' || keys instanceof String) && keys.includes('.')) {
        keys = keys.split('.').map((k) => k.trim()).filter(k => k);
    }

    return Array.isArray(keys) ? keys : [keys];
}


const get = (data: { [key: number | string]: any }, keys: any, splice: boolean = false): any => {
    let value: any = undefined;

    keys = parse(keys);

    if (!keys) {
        return value;
    }

    let key: number | string = keys.shift();

    if (keys.length === 0) {
        value = data[key] || value;

        if (splice) {
            data[key] = undefined;
        }

        return value;
    }
    else if (!data.hasOwnProperty(key)) {
        return value;
    }

    return get(data[key], keys, splice);
};

const has = (data: { [key: number | string]: any }, keys: any): boolean => {
    return (get(data, keys) || false) !== false;
};

const set = (data: { [key: number | string]: any }, keys: any, value: any): void => {
    keys = parse(keys);

    let key = keys.shift();

    if (keys.length === 0) {
        if (key.endsWith('[]')) {
            key = key.substring(0, key.length - 2);

            if (!data.hasOwnProperty(key) || !data[key]) {
                data[key] = [];
            }

            data[key].push(value);
        }
        else {
            data[key] = value;
        }

        return;
    }
    else if (!data.hasOwnProperty(key)) {
        data[key] = {};
    }

    set(data[key], keys, value);
};


export default { get, has, set };
