const mongoose = require("mongoose");

const url = "mongod://localhost:27017/myDatabase";

mongoose.connect(url,{useNewUrlparser: true});

const personSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
    },
    age: {type:Number, min:18},
    email: {type:String, required: true},
    password: {type:String, required: true},
});

const Person = mongoose.model("Person", personSchema);

const person1 = new Person({
    name:"Gasore",
    age:21,
    email:"gasoremugwaneza@gmail.com",
    password:"Gasore@1234",
})

person1.save()

const orderSchema = new mongoose.Schema({
    name: {type:String, required:true},
    orderNumber: {type:Number, required:true},
    date: {type:Date},
    customer : personSchema,

})

const Orders = mongoose.model("Order", orderSchema);
const order1 = new Orders({
    name:"Apple",
    orderNumber: 1,
    date: '20-01-2023',
    customer: person1,
});

order1.save();

