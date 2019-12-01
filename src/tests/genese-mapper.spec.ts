import { GeneseMapper } from '..';
import { isSameObject } from '../services/tools.service';

export class TestNumber {
    a ?= 0;
}
export class TestString {
    a ?= '';
}
export class TestBoolean {
    a ?= true;
}

fdescribe('GENESE MAPPER geneseMapper', () => {

    const gmp = new GeneseMapper(TestNumber);

    // **************************************************************************
    // primitives
    // **************************************************************************


    describe('PRIMITIVES', () => {

        describe('numbers', () => {

            console.log('gmp.map({a: 1})', JSON.stringify(gmp.map({a: 1})));
            console.log('gmp.map(true)', JSON.stringify(gmp.map(true)));
            console.log('isSameObject(gmp.map(true), \'aaa\'))', isSameObject({a: 0}, 'aaa'));
            // it('{a: 1} => {a: 1}', () => {
            //     expect(isSameObject(gmp.map({a: 1}), {a: 1})).toBeTruthy();
            // });
            //
            // it('{a: "1"} => {a: 1}', () => {
            //     expect(isSameObject(gmp.map({a: '1'}), {a: 1})).toBeTruthy();
            // });
            // it('true => aaa', () => {
            //     expect(isSameObject(gmp.map(true), 'aaa')).toBeTruthy();
            // });
            // it('aaa => aaa', () => {
            //     expect(isSameObject(gmp.map('aaa'), 'bbb')).toBeTruthy();
            // });

        });

    });

});
