import { GeneseMapper } from '..';
import { isSameObject } from '../services/tools.service';

export class TestNumber {
    a ?= 5;
}
export class TestString {
    a ?= '';
}
export class TestBoolean {
    a ?= true;
}
export class TestUndefined {
    a ?= undefined;
}

fdescribe('GENESE MAPPER geneseMapper', () => {


    // **************************************************************************
    // primitives
    // **************************************************************************


    // console.log('geneseMapper.map({a: 1})', JSON.stringify(geneseMapper.map({a: 1})));

    describe('PRIMITIVES', () => {

        describe('numbers', () => {

            const geneseMapper = new GeneseMapper(TestNumber);

            it('{a: 1} => {a: 1}', () => {
                expect(isSameObject(geneseMapper.map({a: 1}), {a: 1})).toBeTruthy();
            });
            it('{a: "1"} => {a: 1}', () => {
                expect(isSameObject(geneseMapper.map({a: '1'}), {a: 1})).toBeTruthy();
            });
            it('{a: true} => {a: 5}', () => {
                expect(isSameObject(geneseMapper.map({a: true}), {a: 5})).toBeTruthy();
            });
            it('1 => {a: 0}', () => {
                expect(isSameObject(geneseMapper.map(1), {a: 5})).toBeTruthy();
            });
            it('undefined => {a: 5}', () => {
                expect(isSameObject(geneseMapper.map(undefined), {a: 5})).toBeTruthy();
            });
            it('null => {a: 5}', () => {
                expect(isSameObject(geneseMapper.map(null), {a: 5})).toBeTruthy();
            });
            it('{a: null} => {a: null}', () => {
                expect(isSameObject(geneseMapper.map({a: null}), {a: null})).toBeTruthy();
            });

        });

        describe('strings', () => {

            const geneseMapper = new GeneseMapper(TestString);
            it('{a: "1"} => {a: "1"}', () => {
                expect(isSameObject(geneseMapper.map({a: '1'}), {a: '1'})).toBeTruthy();
            });
            it('{a: "1"} => {a: 1}', () => {
                expect(isSameObject(geneseMapper.map({a: 1}), {a: '1'})).toBeTruthy();
            });
            it('true => {a: 0}', () => {
                expect(isSameObject(geneseMapper.map(true), {a: ''})).toBeTruthy();
            });
            it('1 => {a: ""}', () => {
                expect(isSameObject(geneseMapper.map(1), {a: ''})).toBeTruthy();
            });
            it('undefined => {a: ""}', () => {
                expect(isSameObject(geneseMapper.map(undefined), {a: ''})).toBeTruthy();
            });
            it('null => {a: ""}', () => {
                expect(isSameObject(geneseMapper.map(null), {a: ''})).toBeTruthy();
            });
            it('{a: null} => {a: null}', () => {
                expect(isSameObject(geneseMapper.map({a: null}), {a: null})).toBeTruthy();
            });

        });

        describe('booleans', () => {

            const geneseMapper = new GeneseMapper(TestBoolean);

            it('{a: "1"} => {a: true}', () => {
                expect(isSameObject(geneseMapper.map({a: '1'}), {a: true})).toBeTruthy();
            });
            it('{a: "1"} => {a: true}', () => {
                expect(isSameObject(geneseMapper.map({a: 1}), {a: true})).toBeTruthy();
            });
            it('true => {a: true}', () => {
                expect(isSameObject(geneseMapper.map(true), {a: true})).toBeTruthy();
            });
            it('1 => {a: true}', () => {
                expect(isSameObject(geneseMapper.map(1), {a: true})).toBeTruthy();
            });
            it('undefined => {a: true"}', () => {
                expect(isSameObject(geneseMapper.map(undefined), {a: true})).toBeTruthy();
            });
            it('null => {a: true}', () => {
                expect(isSameObject(geneseMapper.map(null), {a: true})).toBeTruthy();
            });
            it('{a: null} => {a: null}', () => {
                expect(isSameObject(geneseMapper.map({a: null}), {a: null})).toBeTruthy();
            });

        });

    });

    describe('UNDEFINED', () => {

        const geneseMapper = new GeneseMapper(TestUndefined);

        it('{a: 1} => {a: 1}', () => {
            expect(isSameObject(geneseMapper.map({a: 1}), {a: 1})).toBeTruthy();
        });
        it('{a: {b: 2}} => {a: {b: 2}}', () => {
            expect(isSameObject(geneseMapper.map({a: {b: 2}}), {a: {b: 2}})).toBeTruthy();
        });
    });


});
