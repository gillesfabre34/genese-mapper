import { GeneseMapper } from '..';
import { isSameObject } from '../services/tools.service';


fdescribe('GENESE MAPPER geneseMapper', () => {


    // **************************************************************************
    // primitives
    // **************************************************************************


    class TestNumber {
        a ?= 5;
    }

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




        class TestString {
            a ?= '';
        }
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

        class TestBoolean {
            a ?= true;
        }
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


    // **************************************************************************
    // undefined
    // **************************************************************************

    describe('UNDEFINED', () => {

        class TestUndefined {
            a ?= undefined;
        }
        const geneseMapper = new GeneseMapper(TestUndefined);

        it('{a: 1} => {a: 1}', () => {
            expect(isSameObject(geneseMapper.map({a: 1}), {a: 1})).toBeTruthy();
        });
        it('{a: {b: 2}} => {a: {b: 2}}', () => {
            expect(isSameObject(geneseMapper.map({a: {b: 2}}), {a: {b: 2}})).toBeTruthy();
        });
    });


    // **************************************************************************
    // objects
    // **************************************************************************



    describe('OBJECTS', () => {

        describe('simple object', () => {

            class TestObject {
                a?: { b: string } = {b: ''};
            }

            const geneseMapper = new GeneseMapper(TestObject);

            it('{a: {b: 2}} => {a: {b: 2}}', () => {
                expect(isSameObject(geneseMapper.map({a: {b: 2}}), {a: {b: 2}})).toBeTruthy();
            });
            it('{a: 3} => {a: {b: ""}}', () => {
                expect(isSameObject(geneseMapper.map({a: 3}), {a: {b: ''}})).toBeTruthy();
            });
            it('{a: {c: 3}} => {a: {b: ""}}', () => {
                expect(isSameObject(geneseMapper.map({a: {c: 3}}), {a: {b: ''}})).toBeTruthy();
            });
            it('{a: {b: null}} => {a: {b: null}}', () => {
                expect(isSameObject(geneseMapper.map({a: {b: null}}), {a: {b: null}})).toBeTruthy();
            });
            it('{a: {b: undefined}} => {a: {b: ""}}', () => {
                expect(isSameObject(geneseMapper.map({a: {b: undefined}}), {a: {b: ''}})).toBeTruthy();
            });
        });

        // **************************************************************************

        describe('object with undefined', () => {

            class TestObjectWithUndefined {
                a?: { b: string } = {b: undefined};
            }

            const geneseMapper = new GeneseMapper(TestObjectWithUndefined);

            it('{a: {b: 2}} => {a: {b: 2}}', () => {
                expect(isSameObject(geneseMapper.map({a: {b: 2}}), {a: {b: 2}})).toBeTruthy();
            });
            it('{a: 3} => {a: {b: ""}}', () => {
                expect(isSameObject(geneseMapper.map({a: 3}), {a: {b: undefined}})).toBeTruthy();
            });
            it('{a: {c: 3}} => {a: {b: ""}}', () => {
                expect(isSameObject(geneseMapper.map({a: {c: 3}}), {a: {b: undefined}})).toBeTruthy();
            });
            it('{a: {b: null}} => {a: {b: null}}', () => {
                expect(isSameObject(geneseMapper.map({a: {b: null}}), {a: {b: null}})).toBeTruthy();
            });
            it('{a: {b: undefined}} => {a: {b: undefined}}', () => {
                expect(isSameObject(geneseMapper.map({a: {b: undefined}}), {a: {b: undefined}})).toBeTruthy();
            });
            it('{a: {b: {c: 3}}} => {a: {b: {c: 3}}}', () => {
                expect(isSameObject(geneseMapper.map({a: {b: {c: 3}}}), {a: {b: {c: 3}}})).toBeTruthy();
            });
        });

        // **************************************************************************

        describe('object with array', () => {

            class TestObjectWithArray {
                a?: { b: string[] } = {b: ['']};
            }

            const geneseMapper = new GeneseMapper(TestObjectWithArray);

            it('{a: {b: 2}} => {a: {b: [""]}}', () => {
                expect(isSameObject(geneseMapper.map({a: {b: 2}}), {a: {b: ['']}})).toBeTruthy();
            });
            it('{a: 3} => {a: {b: [""]}}', () => {
                expect(isSameObject(geneseMapper.map({a: 3}), {a: {b: ['']}})).toBeTruthy();
            });
            it('{a: {b: ["5"]}} => {a: {b: ["5"]}}', () => {
                expect(isSameObject(geneseMapper.map({a: {b: ['5']}}), {a: {b: ['5']}})).toBeTruthy();
            });
            it('{a: {b: [5]}} => {a: {b: [5]}}', () => {
                expect(isSameObject(geneseMapper.map({a: {b: [5]}}), {a: {b: ['5']}})).toBeTruthy();
            });
            it('{a: {b: [false]}} => {a: {b: [""]}}', () => {
                expect(isSameObject(geneseMapper.map({a: {b: [false]}}), {a: {b: ['']}})).toBeTruthy();
            });
            it('{a: {c: 3}} => {a: {b: [""]}}', () => {
                expect(isSameObject(geneseMapper.map({a: {c: 3}}), {a: {b: ['']}})).toBeTruthy();
            });
            it('{a: {b: null}} => {a: {b: null}}', () => {
                expect(isSameObject(geneseMapper.map({a: {b: null}}), {a: {b: null}})).toBeTruthy();
            });
            it('{a: {b: undefined}} => {a: {b: [""]}}', () => {
                expect(isSameObject(geneseMapper.map({a: {b: undefined}}), {a: {b: ['']}})).toBeTruthy();
            });
            it('{a: {b: {c: 3}}} => {a: {b: [""]}}', () => {
                expect(isSameObject(geneseMapper.map({a: {b: {c: 3}}}), {a: {b: ['']}})).toBeTruthy();
            });
        });
    });
});
