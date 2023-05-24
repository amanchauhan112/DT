const mongoose = require("mongoose");

const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

    .then(() => {
        console.log('connected to db\n');
    })

    .catch((err) => {
        console.log('no db connection \n' + err)
    })

