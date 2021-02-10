const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected")
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for(let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '601ee10e2ff6b63210937c49',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa doloribus excepturi alias, molestias suscipit porro molestiae illum hic.',
      price,
      images: [
        {
          url: 'https://res.cloudinary.com/pelyhescloud/image/upload/v1612996662/YelpCamp/ndp4nf0cm7aairdglcq4.jpg',
          filename: 'YelpCamp/ndp4nf0cm7aairdglcq4'
        }
      ]
      
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
});