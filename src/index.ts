import place from './place'

const begin = (new Date()).getTime()

place()

const end = (new Date()).getTime()
// tslint:disable-next-line no-console
console.log(`Time used: approx. ${((end - begin) / 1000).toFixed(2)} sec`)
