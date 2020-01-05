

/**
 * clone object with deep copy
 */
export function clone(model: any): any {
    if (model) {
        if (Array.isArray(model)) {
            const newArray = [];
            model.forEach(item => newArray.push(this.clone(item)));
            return newArray;
        } else if (typeof model === 'object') {
            const newObject = {};
            Object.keys(model).forEach(key => newObject[key] = this.clone(model[key]));
            return newObject;
        } else {
            return model;
        }
    } else {
        return model;
    }
}


/**
 * Check if an object is a primitive or not
 */
export function isPrimitive(target: any): boolean {
    return typeof target === 'string'
        || typeof target === 'number'
        || typeof target === 'boolean';
}

/**
 * Check if two objects have the same values for every key
 */
export function isSameObject(obj1: any, obj2: any): boolean {
    console.log('%c IS_SAME_OBJECT obj1', obj1);
    console.log('%c IS_SAME_OBJECT obj2', obj2);
    if (obj1 === obj2) {
        return true;
    }
    if (typeof obj1 === 'number' && obj1.toString() === obj2.toString()) {
        return true;
    }
    if (
        (obj1 === undefined || obj2 === undefined)
        || (Array.isArray(obj1) && !Array.isArray(obj2))
        || (!Array.isArray(obj1) && Array.isArray(obj2))
        || (Array.isArray(obj1) && Array.isArray(obj2) && obj1.length !== obj2.length)
        || obj1 === !obj2
    ) {
        return false;
    }
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
        let index = 0;
        for (const element of obj1) {
            if (!this.isSameObject(element, obj2[index])) {
                return false;
            }
            index++;
        }
        return true;
    } else {
        for (const key of Object.keys(obj1)) {
            console.log('%c IS_SAME_OBJECT key', key);
            console.log('%c IS_SAME_OBJECT obj1', obj1);
            console.log('%c IS_SAME_OBJECT obj2', obj2);
            console.log('%c IS_SAME_OBJECT JSON.stringify(obj1)', JSON.stringify(obj1));
            console.log('%c IS_SAME_OBJECT JSON.stringify(obj2)', JSON.stringify(obj2));
            if (!obj2.hasOwnProperty(key) || (!obj2[key] && !!obj1[key]) || (!!obj2[key] && !obj1[key])) {
                console.log('%c IS_SAME_OBJECT FALSE1');
                return false;
            }
            if (Array.isArray(obj1[key])) {
                if (!this.isSameObject(obj1[key], obj2[key])) {
                    console.log('%c IS_SAME_OBJECT FALSE2');
                    return false;
                }
            } else {
                if (typeof obj1[key] === 'object') {
                    console.log('%c IS_SAME_OBJECT obj1[key] === \'object\' obj1', obj1[key]);
                    console.log('%c IS_SAME_OBJECT obj1[key] === \'object\' obj2', obj2[key]);
                    if (!this.isSameObject(obj1[key], obj2[key])) {
                        console.log('%c IS_SAME_OBJECT FALSE3');
                        return false;
                    }
                } else {
                    if (obj1[key] && obj2[key] && obj1[key].toString() !== obj2[key].toString()) {
                        console.log('%c IS_SAME_OBJECT FALSE4');
                        return false;
                    }
                }
            }
        }
    }
    console.log('%c IS_SAME_OBJECT TRUE');
    return true;
}
