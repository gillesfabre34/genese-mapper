import * as chalk from 'chalk';
import { isSameObject } from './services/tools.service';

const zzz = isSameObject({a: 0}, 'aaa');

console.log(chalk.yellow('zzz', zzz));
