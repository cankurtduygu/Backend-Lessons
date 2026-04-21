"use strict";
/* ------------------------------------------ * 
                OBJECTS
/* ------------------------------------------ *

// * core object structure in oop
const expObj = {
    propertName : 'value', // attribute, filed

    methodName: function(){
        return 'methodName() is a method'
    },

    methodAlternative(){
        return 'methodAlternative() is a method'
    }
}

console.log(expObj.propertName);
console.log(expObj.methodName());
console.log(expObj.methodAlternative());

/* ------------------------------------------ *

const Car = {
    brand: "Ford",
    model: 'Mustang',
    year: 1967,
    isAutoGear: false,
    colors: ['yellow', 'navy blue'],
    details:{
        color1: 'yellow',
        color2: 'navy blue',
        engineSize: 4900
    },
    startEngine(param1){
        console.log(param1);
        return 'Engine started'
    }
}

console.log(Car.brand);
console.log(Car.model);
console.log(Car.year);
console.log(Car.isAutoGear);
console.log(Car.colors);
console.log(Car.details);

// Alternative style:
console.log(Car['brand']);
console.log(Car['colors']);
console.log(Car['startEngine'](0));

/* ------------------------------------------ *

// * 'THIS' keyword

const Car = {
  brand: "Ford",
  model: "Mustang",
  year: 1967,
  isAutoGear: false,
  colors: ["yellow", "navy blue"],
  details: {
    color1: "yellow",
    color2: "navy blue",
    engineSize: 4900,
  },
  startEngine(param1) {
    console.log(param1);
    return "Engine started";
  },
  getDetails: function () {
    // return this
    return this.details;
  },
  arrowMethod: () => {
    // Arrow function is globalScope (this keyword needs local scope)
    return this;
  },
};

console.log(Car.getDetails());
console.log(Car.arrowMethod());

/* ------------------------------------------ *
// * Array desctructuring

const testArray = ['value1', 'value2', 'value3']

// const var1 = testArray[0]
// const var2 = testArray[1]
// const var3 = testArray[2]
// console.log(var1, var2, var3);

// order is important
const [var1, var2, var3] = testArray
console.log(var1, var2, var3);

// rest operator 
const [firstItem, ...others] = testArray
console.log(firstItem);
console.log(others);

// spread operator
const newArray = ['value4', ...testArray, 'value5']
console.log(newArray);

/* ------------------------------------------ *
// * Object desctructuring

const Car = {
    brand: "Ford",
    model: "Mustang",
    year: 1967,
    isAutoGear: false,
    colors: ["yellow", "navy blue"],
    details: {
        color1: "yellow",
        color2: "navy blue",
        engineSize: 4900,
    },
    startEngine(param1) {
        console.log(param1);
        return "Engine started";
    },
};

// rest operator. Key is important
// const {year, colors, brand, ...others} = Car
// console.log(year, colors, brand, others);

// rename the key
// const {year, colors: renkler, brand, ...others} = Car
// console.log(year, renkler, brand, others);

// nested desctructuring
const {
    year,
    colors: renkler,
    brand,
    details: { color1, color2, engineSize },
    ...others
} = Car;
console.log(color1, color2, engineSize, year, renkler, brand, others);

// spread operator
const newObj = {
    newKey: 'new value',
    ...Car
}

console.log(newObj);

// object to json
const json = JSON.stringify(Car)
console.log(typeof json, json);

// json to object
const obj = JSON.parse(json)
console.log(typeof obj, obj);

// object to array
const arr1 = Array.of(Car) // add object to array
console.log(arr1);

// keys
const arrKey = Object.keys(Car)
console.log(arrKey);

// values
const arrValues = Object.values(Car)
console.log(arrValues);

// entries
const arrAll = Object.entries(Car)
console.log(arrAll);

/* ------------------------------------------ */
// * Constructors - a function stores variables
const constructorFunction = function () {
  this.poperty = "value";
};
/* ------------------------------------------ */
// * 'NEW' keyword

const carConstructor = function (brand, model, year, gear) {
  this.brand = brand;
  this.model = model;
  this.year = year;
  this.isAutoGear = gear

  this.startEngine = function(param1) {
        console.log(param1);
        return "Engine started";
    }
};

const newCar = new carConstructor('Ford', 'Mustang', 1967, true);
console.log(typeof newCar, newCar);
console.log(newCar.brand);
console.log(newCar.model);
console.log(newCar.year);
console.log(newCar.startEngine(0));

const opel = new carConstructor('Opel', 'Astra', 2020, true)
console.log(opel);
console.log(opel.startEngine(100));






