import { Tools } from './services/tools.service';
import * as chalk from 'chalk';

const zzz = Tools.isSameObject({a: 0}, 'aaa');

console.log(chalk.yellow('zzz', zzz));
