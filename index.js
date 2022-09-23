const { Console } = require('console');
const express =require('express');
const mongoose=require('mongoose');


const db=require('./config/mongoose');

const Contact=require('./models/datacontact')

const path=require('path');
 const port=8000;
 
 const app =express();




app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));
app.use('/css',express.static(__dirname + 'assets/css'))
app.use('/js',express.static(__dirname + 'assets/js'))
app.use('/img',express.static(__dirname + 'assets/img'))
app.use(express.static('views'));
app.use('/views',express.static(__dirname +'views/admin.ejs'))








var contactList=[
     {
        name: "Arpan",
        email: "898989@gmail.com",
        message: "hello"
        },
        {
            name: "Arpan",
            email: "898989@gmail.com",
            message: "hello"

        },
        {
                name: "Arpan",
                email: "xyz@gmail.com",
                message: "hello"
      }   
]
  





app.get('/',function(req,res){
   
    
        return res.render('home',{title:'Resume'})
        
    

});

app.get('/admin',function(req,res){
    //console.log(__dirname);
    Contact.find({},function(err ,contactSchema){
        if(err){
            console.log('error in fetching in contact');
            return;
        }
        return res.render('admin',{
            title:"Contact List",
            contact_List:contactSchema,
        });
        
    
    })
});
  
app.post('/add_data',function(req,res){
 
        Contact.create({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
             }, function(err,Contact)
        {
            if(err)
            
            {
                console.log('Error in creating a contact!');
                return;
            }    
                console.log('******',Contact);
                return res.redirect('back');
        });
    
    });






    app.get('/delete-contact/', function(req, res){
        //get the id from query in the url
        let id=req.query.id;
        //find the contact into the databae
        Contact.findByIdAndDelete(id,function(err){
            if(err){
                console.log('error in deleting a contact');
                return;
            }
            return res.redirect('back');
        });
    });    
    






app.listen(port,function(err){
    if(err){console.log('error',err)}
    console.log('the server is running on port :',port)
});