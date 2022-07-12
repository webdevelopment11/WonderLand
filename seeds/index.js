const express = require('express');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const { default: mongoose } = require('mongoose');
const app = express();
const path  = require('path');
const Campground = require('../models/campground');
const campground = require('../models/campground');
mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser: true,
    // useCreateIndex: true, 
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error",console.error.bind(console,"Connnection error:"));
db.once("open",() => {
    console.log("Database connected");
});

const sample =(array) => array[Math.floor(Math.random()* array.length)];


const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i=0;i<200;i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20)+10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title : `${sample(descriptors)} ${sample(places)}`,

            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, nam? Dolorum excepturi ipsa iusto, quasi aspernatur dolores sed dicta officiis consequuntur sapiente. Sunt aperiam nobis quae, est dolorum quo sit.',
            price:price,
            geometry:{
                type:"Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,

                ]

            },
            images:  [
                {
                    url: 'https://res.cloudinary.com/dn5rtyoeh/image/upload/v1656434285/YelpCamp/pdfshazrrms0utbxyfor.jpg',
                    filename: 'YelpCamp/pdfshazrrms0utbxyfor',
                  
                },
                {
                    url: 'https://res.cloudinary.com/dn5rtyoeh/image/upload/v1656434285/YelpCamp/pdfshazrrms0utbxyfor.jpg',
                    filename: 'YelpCamp/pdfshazrrms0utbxyfor',
                 
                }
              ]
        })
        await camp.save();
    }
}
seedDB().then(() => {
     mongoose.connection.close();
}) ;