"use strict";

/* -------------------------------------------------------
                        OOP & CLASSES
------------------------------------------------------- *
//? OOP: Object Oriented Programming
//? DRY: Don't Repeat Yourself
//? BLUEPRINT: Taslak (Mimarların kullandığı mavi şablon kağıdı)
//? CLASS: Obje türetmek için kullanılacak şablon.

//* Class Declaration:
// class PascalCaseClassName {....}

//* Class Expression:
const PascalCaseClassName = class {
    undefinedProperty // only defination (does not value)

    propertyName = 'value'

    constructor (parametre1, parameter2 = 'default-value'){
        this.parametre1 = parametre1
        this.parametre2 = parameter2
    }

    methodName(){
        return this
    }
}

//* INSTANCE - bir classtan turetilen objedir
const PascalCaseInstanceName = new PascalCaseClassName(0,1)
console.log(PascalCaseInstanceName);
console.log(PascalCaseInstanceName.propertyName);
console.log(PascalCaseInstanceName.parametre1);
console.log(PascalCaseInstanceName.methodName());

/*----------------------------------------------------- *

class Car {
  isRunning = false;

  constructor(brand, model, year) {
    this.brand = brand;
    this.model = model;
    this.year = year;
  }

  runEngine() {
    this.isRunning = true;
    console.log("Engine started bran bran...");
    return this.isRunning;
  }
}

const Ford = new Car("Ford", "Mustang", 1967);
console.log(Ford);
// Ford.isRunning = true;
// console.log(Ford);
Ford.runEngine()
console.log(Ford);

const Opel = new Car('Opel', 'Astra', 2020);
console.log(Opel);
Opel.runEngine()
console.log(Opel);

/*----------------------------------------------------- *
// * INHERTANCE - Miras alma. Baska bir class'in tum ozelliklerini/methodlarini devralma. (parent-child ilisikisi kurulur)
// * SUPER: Parent Class - THIS: Child Class 
class Vehicle {
  vehicleIsActive = false;

  constructor(vehicleType) {
    this.vehicleType = vehicleType;
  }
}

class Car extends Vehicle {
  isRunning = false;

  constructor(brand, model, year, vehicleType = 'Car') {
    super(vehicleType) //? super() parametresi en tepede olmali. Once parent constructor beslememiz gerekiyor 
    this.brand = brand;
    this.model = model;
    this.year = year;
  }

  runEngine() {
    this.isRunning = true;
    console.log("Engine started bran bran...");
    return this.isRunning;
  }
}

const Ford = new Car("Ford", "Mustang", 1967);
console.log(Ford.runEngine());

class Accessory extends Car{
    constructor(accessoryName, brand, model, year, vehicleType){
        super(brand, model, year, vehicleType)
        this.accessoryName = accessoryName
    }
}

const FordClimate = new Accessory('Bosh Climate', 'Ford', 'Mustang', 1967, 'Car')
console.log(FordClimate);

/*----------------------------------------------------- *
// * POLYMORPHISM : Miras aldigimiz sinifin ozellik/methodlarini yeniden yazabilme
// Override: ust metodla ayni isim ve yapida yeni bir mthod yazma (ezme / iptal etme / onceligini alma)
// Overload: ust metodla ayni isimde ama farkli yapida (farkli adet/tip) yeni method olusturma. (ayni anda ikiside aktif) (JS destlemez)

class Vehicle {
  vehicleIsActive = false;

  constructor(vehicleType) {
    this.vehicleType = vehicleType;
  }

  getDetails() {
    console.log("vehicle.getDetails started..");
    return this.vehicleType;
  }
}

class Car extends Vehicle {
  isRunning = false;

  constructor(brand, model, year, vehicleType = "Car") {
    super(vehicleType);
    this.brand = brand;
    this.model = model;
    this.year = year;
  }

  runEngine() {
    this.isRunning = true;
    console.log("Engine started bran bran...");
    return this.isRunning;
  }

  // ? Override
  getDetails() { //? usteki method ismi ile ayni oldugundan parent classtaki method ezildi.
    console.log("car.getDetails started..");
    return this.isRunning;
  }
}

const Ford = new Car("Ford", "Mustang", 1967);
console.log(Ford.getDetails());

/*----------------------------------------------------- *
// * Access Modifiers:
// Public: Genele erisme acik. (parent: yes, child: yes, instance: yes)
// Procted: Sadece tanimli oldugu class ve inherit edilen child class erisebilir. (parent: yes, child: yes, instance: no) (js desteklemez)
// Private: sadece tanimli oldugu class icinde erisim varidr. (parent: yes, child: no, instance: no)

class Vehicle {
  // Public property
  vehicleIsActive = false;

  // protected property
  _protectedProperty = "protected-value";

  // protected method
  _protectedMethod() {
    return this;
  }

  // private propperty
  #privateProperty = "private-value";

  // private method
  #privateMethod() {
    return this;
  }

  constructor(vehicleType) {
    this.vehicleType = vehicleType;
    console.log("privateProperty", this.#privateProperty);
  }

  getDetails() {
    console.log("vehicle.getDetails started..");
    return this.vehicleType;
  }
}

class Car extends Vehicle {
  isRunning = false;

  constructor(brand, model, year, vehicleType = "Car") {
    super(vehicleType);
    this.brand = brand;
    this.model = model;
    this.year = year;
    // console.log('privateProperty', this.#privateProperty); // no access
    console.log("protectedProperty", this._protectedProperty);
  }

  runEngine() {
    this.isRunning = true;
    console.log("Engine started bran bran...");
    return this.isRunning;
  }

  getDetails() {
    console.log("car.getDetails started..");
    return this.isRunning;
  }
}

const Ford = new Car("Ford", "Mustang", 1967);
Ford._protectedProperty = "value changed for protected";
// console.log(Ford.#privateProperty);

/*----------------------------------------------------- */
// * GETTER & SETTER METHOD: Gorevi veri getirme (getter) ver veri guncelleme (setter) olan methodlardir.
// * STATIC : Class'dan direkt erisim. (instance erisemez)

class Car {
  isRunning = false;

  #price = 4000;

  constructor(brand, model, year) {
    this.brand = brand;
    this.model = model;
    this.year = year;
  }

  runEngine() {
    this.isRunning = true;
    console.log("Engine started bran bran...");
    return this.isRunning;
  }

  get getPrice() {
    console.log("fiyat goruntulendi");
    return this.#price;
  }

  set setPrice(newPrice) {
    console.log("fiyat guncellendi.");
    this.#price = newPrice;
  }
}

const Ford = new Car("Ford", "Mustang", 1967);
console.log(Ford);
// getter ve setter methodlari bir propery gibi kullanilir.
console.log(Ford.getPrice);
// Ford.setPrice(5000) // setter method normal method gibi cagrilmaz.
Ford.setPrice = 5000;
console.log(Ford.getPrice);

class Accessory extends Car {
  static staticProp = "static-value"; // direkt class ile erisme istediklerimizi static ile isaretleriz.

//   static methodlarda this ifadesi sadece statikleri cagirir.
  static staticMethod (){
    return this
  }

  static staticSum (a, b){
    return a + b
  }

  constructor(accessoryName, brand, model, year) {
    super(brand, model, year);
    this.accessoryName = accessoryName;
  }

  getPriceFromChild() {
    return this.getPrice;
  }
}

const FordClimate = new Accessory("Bosh Climate", "Ford", "Mustang", 1967);
console.log(FordClimate);
// console.log(FordClimate.getPriceFromChild());
console.log(FordClimate.getPrice);
FordClimate.setPrice = 5000;
console.log(FordClimate.getPrice);

// console.log(Accessory.model); // static degil bu sekilde erisilemez
console.log('---static exp----');
console.log(Accessory.staticProp);
console.log(Accessory.staticMethod());
console.log(Accessory.staticSum(2,2));

console.log(Array.isArray([]));

/* ------------------------------------------------------- */
//? ABSTRACTION: Soyutlama/Modelleme (Class ile obje üretebilme. Aynı amaç için kullanılan değişken ve methodların bir class içinde yazıyor olması)
//? ENCAPCULLATION: Kapsülleme/Ayrıştırma (Kodların gizliliği, private değişkenlere erişilemiyor olması ve birbirinden bağımsız çalışmaları.)
/* ------------------------------------------------------- */

// * HAPPY CODING...
