async function test() {
  return "hello";
}
const x = test();
console.log(x); //Promise { 'hello' } döner

const y = Promise.resolve(5);
console.log(y);//Promise { 5 } döner