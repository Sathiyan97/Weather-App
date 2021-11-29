const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://sathi:abcd123@cluster0.finnw.mongodb.net/weatherapp?retryWrites=true&w=majority",
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('mongoDB connected successfully');
}).catch((e) => {
    console.log({message: 'something wrong connecting database server', error: e});
});

// mongoose.connect('mongodb://127.0.0.1:27017/weatherapp', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
// }).then(() => {
//     console.log('mongoDB connected successfully');
// }).catch(() => {
//     console.log('something wrong connecting database server');
// });

