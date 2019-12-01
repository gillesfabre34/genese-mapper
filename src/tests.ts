
import { isSameObject } from './services/tools.service';
import { GeneseMapper } from './mapper/genese.mapper';
export class TestNumber {
    a ?= 0;
}
const geneseMapper = new GeneseMapper<TestNumber>(TestNumber);
const zzz = isSameObject({a: 0}, 'aaa');

console.log('geneseMapper.map(true)', geneseMapper.map(true));
