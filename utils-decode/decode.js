import pkg from 'bs58';
const { decode } = pkg;

const args = process.argv.slice(2);
if (!args.length) {
  throw new Error('No key provided')
}

const key = args[0];
const decoded = decode(key)
console.log(JSON.stringify(Array.from(decoded)))
