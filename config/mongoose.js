//require the library
const mongoose=require('mongoose');
//connect to db
mongoose.connect('mongodb+srv://ashu:1234@cluster1.1iakot6.mongodb.net/?retryWrites=true&w=majority');
///connection checking error
const db=mongoose.connection;
///for error
db.on('error',console.error.bind(console,'error connecting on db'));
///up and running and tyhen print the msg
db.once('open',function(){
    console.log('successfully connected to the db');
});