import { GeneseMapper } from '../mapper/genese.mapper';
import { isSameObject } from '../services/tools.service';

describe('GENESE MAPPER _mapArrayOfObjects', () => {
    const gmp = new GeneseMapper(Object);


    // **************************************************************************
    // _mapArrayOfObjects
    // **************************************************************************



    it('[{a: 1}], undefined => [{a: 1}]', () => {
        expect(isSameObject(gmp._mapArrayOfObjects([{a: 1}], undefined), [{a: 1}])).toBeTruthy();
    });

    it('[{a: 1}], null => []', () => {
        expect(isSameObject(gmp._mapArrayOfObjects([{a: 1}], null), null)).toBeTruthy();
    });

    it('undefined, [{a: 1}] => undefined', () => {
        expect(gmp._mapArrayOfObjects(undefined, [{a: 1}]) === undefined).toBeTruthy();
    });

    it('[], [{a: 1}] => undefined', () => {
        expect(gmp._mapArrayOfObjects([], [{a: 1}]) === undefined).toBeTruthy();
    });

    it('[{a: 1}], [{a: 1}] => [{a: 1}]', () => {
        expect(isSameObject(gmp._mapArrayOfObjects([{a: 1}], [{a: 1}]), [{a: 1}])).toBeTruthy();
    });

    it('[{a: 1}], [{a: 1}] => [{a: 1}]', () => {
        expect(isSameObject(gmp._mapArrayOfObjects([{a: 1}], [{a: 1}]), [{a: 1}])).toBeTruthy();
    });

    it('[[{a: 1}, {b: 2}], [{c: 3}]], [{a: 1}] => [[{a: 1}, {b: 2}], [{c: 3}]], [{a: 1}]', () => {
        expect(isSameObject(gmp._mapArrayOfObjects([[{a: 0}]], [[{a: 1}, {b: 2}], [{c: 3}]]),
            [[{a: 1}, {a: 0}], [{a: 0}]])).toBeTruthy();
    });

    it('[[{a: 0}]], [[{a: 1}, {a: 2}], []] => [[{a: 1}, {a: 2}], []]', () => {
        expect(isSameObject(gmp._mapArrayOfObjects([[{a: 0}]], [[{a: 1}, {a: 2}], []]),
            [[{a: 1}, {a: 2}], []])).toBeTruthy();
    });

    it('[[{a: 0}]], [[{a: 1}, {a: 2}], null]] => [[{a: 1}, {a: 2}], null]]', () => {
        expect(isSameObject(gmp._mapArrayOfObjects([[{a: 0}]], [[{a: 1}, {a: 2}], null]),
            [[{a: 1}, {a: 2}], null])).toBeTruthy();
    });

    it('[[{a: 0}]], [[{a: 1}, {a: 2}], undefined] => [[{a: 1}, {a: 2}], [{a: 0}]]', () => {
        expect(isSameObject(gmp._mapArrayOfObjects([[{a: 0}]], [[{a: 1}, {a: 2}], undefined]),
            [[{a: 1}, {a: 2}], [{a: 0}]])).toBeTruthy();
    });

});
