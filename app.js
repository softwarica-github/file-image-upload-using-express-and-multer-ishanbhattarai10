


const express =require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
//set storage engine
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function(req, file, cb){
        cb(null, file.fieldname+'-'+ Date.now()+ path.extname(file.originalname));
    }
});
//upload init
const upload =multer({
    storage: storage
}).single('myImage');

//init app
const app=express();

//ejs
app.set('view engine', 'ejs');

//public folder
app.use(express.static('./public'));

app.get('/', (req, res)=> res.render('index'));

app.post('/upload', (req, res)=> {
    upload(req, res, (err)=>{
        if(err){
            res.render('index', {
                msg: err
            });}
            else{

            res.render('index',{
                msg: "Uploaded",
                file: `uploads/${req.file.filename}`
            });
        }
    })
});
const port=3000;
app.listen(port, ()=>console.log(`Server started on port ${port}`));