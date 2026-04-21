// const math = require('./math')
// const x= require('./math')

// console.log(math);
// console.log(x);

// function add( a,b ){
//     return a+b
// }
// console.log(math.add(3,5));


//?fs modulu import ediyoruz
//! yeni dosya olusturma yazma okuma islemleri async ve sync verrsiyonlari ile olusturabiliriz.
const fs = require('fs')
// console.log(fs);

// fs.writeFileSync('log.txt', "text")//sync olarak dosya olusturup icini doldurduk

// fs.writeFile('log.txt', "text2", (err)=>{})// async olarak dosya olusturmak istedigimizde ucuncu parametre olarak cb ister bizden

//!yazdirilan dosyanin okunmasi

// const readF = fs.readFileSync('./log.txt', "utf-8")
// console.log(readF);


// fs.readFile('./log.txt', "utf-8",(err,html)=>{
// console.log(html);
// })//async vesyionu ile okumus olduk

//!Klasör olusturmak

// fs.mkdirSync('test/test2')

// fs.writeFileSync('server.js', 'test')
