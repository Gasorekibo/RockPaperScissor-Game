const mongoose = require("mongoose");

// connecting to my database server using mongoose.

mongoose.connect("mongodb://localhost:27017/fruitsDB",{useNewUrlParser:true});

// creating a schema of our database collection 

const fruitSchema = new mongoose.Schema({
    // Here we are going to improve validation so that our data base want save the date if they doesn't meet criteria
    name: { 
            type: String,
            required:[true,"please check you data entry there is no name specified."]
        },

    rate : {
            type:Number,
            min: 1,
            max: 2
    },

    review: String
});

// creating a mongoose model, the first param of model will be a name of collection and second
// param is the schema of the collection. this is Fruit created is like a table created in sql database.
const Fruit = mongoose.model("fruit", fruitSchema);

// creating our new fruit document called apple.

const apple = new Fruit ({
    name: "apple",
    rating: 4,
    review: "very good"
});
const mango = new Fruit ({
    name: "mango",
    rating: 3,
    review: "Awesome"
});
const banana = new Fruit ({
    name: "Banana",
    rating: 5,
    review: "good"
});

// CREATING A PERSON DATA DOCUMENT WITH A person COLLECTION.

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    // this is used to create relationship in mongoose where we are going to link person with favorite fruit.
    favoriteFruit: fruitSchema,
});

const people = mongoose.model('Person', personSchema)

// Creating new person document.

const Person1 = new people({
    name: "John",
    age: 37,
    // linking to our person with favorite fruit i.e this means the fav fruit of john is banana.
    favoriteFruit: banana,
});

const Person2 = new people({
    name: "Gasore",
    age: 23,
    // linking to our person with favorite fruit i.e this means the fav fruit of john is banana.
    favoriteFruit: apple,
});
const Person3 = new people({
    name: "Eric",
    age: 43,
    // linking to our person with favorite fruit i.e this means the fav fruit of john is banana.
    favoriteFruit: mango,
});
// Person.save(); 
// apple.save();

// to save all of our fruits data we created at once use:

Fruit.insertMany([apple, mango, banana], function(error) {
    if (error) {
        console.log("here is the error:", error);
    } else {
        console.log("Fruits inserted successfully");
    }
});



// to Read the Fruit collection created before we should achieve this by:
Fruit.find(function(error, fruits) {
    if (error) {
        console.log(error);
        // This line of code will close the connection to our database server after completing what we want.
        // this will prevent us to use ctr c to close the connection every time we connected

        mongoose.connection.close();
    } else {

        // since the output fruits is an array of object we can use forEach() to loop through each element and retrieve data we want
        //  from our database.
        
        fruits.forEach(element => {
            names = element.name;
            console.log(names);
        });
    }
});

// Deleting data from our database using mongoose: Here we can use update(), updateOne() or updataMany() methods
// The _id we will use here is the id created to our data by mongodb automatically so you will find it by using .find() to our mongodb DB

Fruit.updateOne({_id:"jdhi938038eejfsk"}, {name:"lemon"}, function(error) {
    if (error) {
        console.log(error);
    } else {
        console.log("Fruit Updated Successfully");
    }
});

// to delete one of our database we can use deleteOne() or deleteMany() method based of the specified condition:

Fruit.deleteOne({name:"lemon"},(err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("successfully Deleted");
    }
});



// We can also use deleteMany() to delete many datas, eg let's delete all data with name:"john" and age:37

people.deleteMany({name:"john"}, {age:{$eq: 37}}, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Data deleted successfully.");
    }
})