import { TConstructor } from '../models/t-constructor.model';
import { PRIMITIVES } from '../models/primitive.model';
import { clone, isPrimitive } from '..';

export class GeneseMapper<T> {

    // --------------------------------------------------
    //                     PROPERTIES
    // --------------------------------------------------

    readonly tConstructor: TConstructor<T>;

    // --------------------------------------------------
    //                     CONSTRUCTOR
    // --------------------------------------------------

    /**
     * The constructor takes a Class as parameter.
     * The tConstructor property is an object with the Type corresponding to this Class
     */
    constructor(tConstructor: TConstructor<T>) {
        this.tConstructor = tConstructor;
    }


    // --------------------------------------------------
    //                     METHODS
    // --------------------------------------------------

    /**
     * The core of the generic mapper
     * If uConstructor is undefined, U equals T and this methodName returns a mapped T object
     * If not, it returns a mapped U object
     * uConstructor is useful for extraction of given fields of a T class object
     */
    public map(data: any): T {
        const target = new this.tConstructor();
        if (!data) {
            return target;
        }
        if (this.tConstructor.hasOwnProperty('gnRename')) {
            data = this._rename(this.tConstructor, data);
        }
        return Object.assign(target, this._diveMap<T>(target, data));
    }


    /**
     * Returns array of mapped results
     */
    public arrayMap(data: any[]): T[] {
        if (!Array.isArray(data)) {
            return [];
        }
        const results: any[] = [];
        if (PRIMITIVES.includes(this.tConstructor.name)) {
            data.forEach(e => {
                if (typeof e === this.tConstructor.name.toLowerCase()) {
                    results.push(e);
                } else if (this.tConstructor.name === 'String' && typeof e === 'number') {
                    results.push(e.toString());
                } else if (this.tConstructor.name === 'Number' && typeof e === 'string' && !isNaN(Number(e))) {
                    results.push(+e);
                } else if (e === null) {
                    results.push(null);
                }
            });
        } else {
            data.forEach(e => {
                results.push(this.map(e));
            });
        }
        return results;
    }


    // --------------------------------------------------
    //                 INTERNAL METHODS
    // --------------------------------------------------


    /**
     * Check if two objects are both string or number.
     * In this case, returns true.
     */
    _areStringOrNumber(target: any, source: any): boolean {
        return ((typeof target === 'string' || typeof target === 'number') && (typeof source === 'number' || typeof source === 'string'));
    }


    /**
     * If source and target are both string or number, we cast source into the target's type and returns it.
     * This methodName adds a tolerance for http requests which returns numbers instead of strings and inversely
     * Caution : params target and source should not be falsy values
     */
    _castStringAndNumbers(target: any, source: any): any {
        if ((typeof target !== 'string' && typeof target !== 'number') || source === undefined) {
            console.warn('Genese _castStringAndNumbers : source or target undefined');
            return undefined;
        } else if (source === null) {
            return null;
        } else if (typeof target === 'string' && (typeof source === 'number' || typeof source === 'string')) {
            return  source.toString();
        } else if (typeof target === 'number' && typeof source === 'number') {
            return source;
        } else if (typeof target === 'number' && typeof source === 'string') {
            return isNaN(Number(source)) ? target : +source;
        } else {
            console.warn('Genese _castStringAndNumbers : impossible to cast this elements');
            return undefined;
        }
    }

    /**
     * For a given object with U type (the target model), returns the source object mapped with the U model
     * If source === null, it returns null
     * CAUTION: param "target" can't be undefined
     */
    _diveMap<U>(target: U, source: any): any {
        if (source === undefined) {
            return target;
        } else if (source === null) {
            return source;
        } else {
            if (isPrimitive(target)) {
                if (isPrimitive(source)) {
                    if (this._areStringOrNumber(target, source)) {
                        return this._castStringAndNumbers(target, source);
                    } else {
                        return (typeof source === 'boolean' && typeof target === 'boolean') ? source : target;
                    }
                } else {
                    return target;
                }
            } else {
                return this._mapNotPrimitive(target, source);
            }
        }
    }


    /**
     * For non-primitive objects, returns source object mapped with the type of the target (U)
     * If source === null, it returns null
     * CAUTION: param "target" can't be undefined
     */
    _mapNotPrimitive<U>(target: U, source: any): any {
        if (source === undefined) {
            return target;
        } else if (source === null) {
            return null;
        } else {
            let cloneTarget = Object.assign({}, target);
            for (const key of Object.keys(target)) {
                if (key === 'gnIndexableType') {
                    // console.log('%c _mapNotPrimitive target', 'font-weight: bold; color: orange;', target);
                    // console.log('%c _mapNotPrimitive source', 'font-weight: bold; color: orange;', source);
                    cloneTarget = this._mapIndexableType(target as unknown as IndexableType, source);
                    // console.log('%c _mapNotPrimitive cloneTarget', 'font-weight: bold; color: black;', cloneTarget);
                    // cloneTarget = this._mapIndexableType(target[key] as unknown as IndexableType, source);
                } else {
                    if (target[key] !== undefined) {
                        console.log('%c _mapNotPrimitive key', 'font-weight: bold; color: red;', key);
                        console.log('%c _mapNotPrimitive cloneTarget', 'font-weight: bold; color: red;', cloneTarget);
                        if (source[key] === null) {
                            cloneTarget[key] = null;
                        } else if (source[key] === undefined) {
                            cloneTarget[key] = target[key];
                        } else {
                            if (Array.isArray(target[key])) {
                                cloneTarget[key] = Array.isArray(source[key])
                                    ? this._mapArrayOfObjects(target[key], source[key])
                                    : cloneTarget[key];
                            } else {
                                if (this._areStringOrNumber(target[key], source[key])) {
                                    cloneTarget[key] = this._castStringAndNumbers(target[key], source[key]);
                                } else {
                                    cloneTarget[key] = this._diveMap(target[key], source[key]);
                                }
                            }
                        }
                    } else {
                        return source;
                    }
                }
            }
            return cloneTarget;
        }
    }


    /**
     * When an object haves a field named 'gnIndexableType', that means that this object haves a model like this :
     * {
     *   [key: string]: {
     *       country: string
     *      }
     *   } = {
     *      gnIndexableType: {
     *           country: ''
     *      }
     *  };
     * For each key of gnIndexableType field, this method returns the corresponding mapped object with the target model
     * For example, this method can return something like :
     * {
     *     fr: {
     *         country: 'France'
     *     },
     *     en: {
     *         country: 'England'
     *     }
     * }
     * Caution: param target should be defined
     */
    _mapIndexableType(target: any, source: any): any {
        // console.log('%c _mapIndexableType target', 'font-weight: bold; color: green;', target);
        // console.log('%c _mapIndexableType source', 'font-weight: bold; color: green;', source);
        if (target === undefined || target.gnIndexableType === undefined) {
            console.warn('Impossible to map indexable types with undefined target.');
            return undefined;
        }
        if (source === undefined) {
            return target;
        }
        if (source === null) {
            return null;
        }
        const zzz = Object.assign({}, this._mapIndexableTypeObject(target.gnIndexableType, source));
        console.log('%c _mapIndexableType zzz', 'font-weight: bold; color: fuchsia;', zzz);
        // return zzz;
        return Array.isArray(target.gnIndexableType) && target.gnIndexableType.length > 0
            ? this._mapIndexableTypeArray(target.gnIndexableType[0], source)
            : zzz;
    }


    _mapIndexableTypeArray(target: any[], source: any): any {
        const mappedObject: any = {};
        for (const key of Object.keys(source)) {
            const deepMapped = this._diveMap({[key]: [target]}, source);
            Object.assign(mappedObject, {[key]: deepMapped[key]});
        }
        return mappedObject;
    }



    _mapIndexableTypeObject(target: any, source: any): any {
        const mappedObject: any = {};
        console.log('%c _mapIndexableTypeObject target', 'font-weight: bold; color: blue;', target);
        console.log('%c _mapIndexableTypeObject source', 'font-weight: bold; color: blue;', source);
        for (const key of Object.keys(source)) {
            Object.assign(mappedObject, { [key]: this._diveMap(target, source[key])});
        }
        console.log('%c _mapIndexableTypeObject mappedObject', 'font-weight: bold; color: blue;', mappedObject);
        return mappedObject;
    }


    /**
     * Mapper to array of objects by calling _diveMap for each object of the array
     */
    _mapArrayOfObjects(target: {[key: string]: any}[], source: {[key: string]: any}[]): {[key: string]: any}[] {
        if (!Array.isArray(target) || target.length === 0 || !Array.isArray(source)) {
            console.warn('Impossible to map array of objects with undefined or empty array');
            return undefined;
        }
        const arrayOfObjects: any[] = [];
        const model = clone(target[0]);
        for (const element of source) {
            arrayOfObjects.push(this._diveMap(model, element));
        }
        return arrayOfObjects;
    }


    /**
     * If a property of the U class have the decorator @GnRename, this methodName replaces the key of the gnRename http param
     * This methodName is useful when the backend renamed some DTO properties :
     * with @GnRename decorator, you can get values from backend without changing the property name of your T objects in every file
     */
    _rename<U>(uConstructor: TConstructor<U>, data: any): any {
        const constr: any = uConstructor;
        Object.keys(constr.gnRename).map(oldKey => {
            const newKey = constr.gnRename[oldKey];
            if (data[newKey]) {
                data[oldKey] = data[newKey];
                delete data[newKey];
            }
        });
        return data;
    }



    /**
     * If data object with type U have keys 'gnTranslate', this methodName returns the same object removing gnTranslate key
     * and preserving only the gnTranslate[language] objects
     * Example :
     * if data is like
     * {
     *     gnTranslate: {
     *         fr: {
     *             country: 'Allemagne'
     *         },
     *         en: {
     *             country: 'Germany'
     *         }
     *     }
     * }
     * and if language is 'fr', his methodName will return
     * {
     *     country: 'Allemagne'
     * }
     */
    public translate(data: any, language: string): any {
        if (!data || !language) {
            console.error('No data or no language : impossible to translate element');
            return undefined;
        } else {
            const result = clone(data);
            Object.keys(result).map(key => {
                if (key === 'gnTranslate') {
                    Object.assign(result, result.gnTranslate[language]);
                    delete result.gnTranslate;
                } else {
                    if (typeof result[key] === 'object') {
                        const copy = clone(result[key]);
                        result[key] = this.translate(copy, language);
                    }
                }
            });
            return result;
        }
    }
}

export interface IndexableType {
    gnIndexableType: {[key: string]: any};
}
