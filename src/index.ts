import 'module-alias/register';
import { example } from '~/lib/example';

const a = 1;
const b = 2;

const result = example(a, b);

console.log('It is working!');
console.log(`The example function lib returned '${result}' as result`);
