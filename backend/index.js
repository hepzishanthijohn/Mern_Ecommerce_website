const port = 4000;
const express = require('express')
const app = express();
const path = require("path");
const cors = require("cors");
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config()

const PORT = process.env.PORT || port;
app.use(express.json());
app.use(cors({
    origin: 'https://mern-e-commerce-website-indol.vercel.app', // Replace with your frontend URL
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
}));
const connectDB = require('./db');
connectDB();


app.get("/",(req, res) =>{
    res.send("Hello yepsi")
})

app.use('/uploads', express.static(__dirname + '/uploads'));

app.use('/',productRoutes);
app.use('/',userRoutes);

  
// //Image Storage Engine
// const storage = multer.diskStorage(
//     {
//         destination: "./upload/images",
//         filename: (req, file, cb) =>{
//             return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//         }
//     })
//     const upload = multer({
//         storage: storage,
//         limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
//       });

//Creating Upload endpoint for images 
// app.use('/images', express.static(path.join(__dirname, 'upload/images')));


// app.post('/upload', upload.single('product'), (req, res) => {
//     if (!req.file) {
//       return res.status(400).json({ success: 0, message: 'No file uploaded' });
//     }
//     res.json({
//       success: 1,
//       image_url: `https://mern-e-commerce-website-7.onrender.com/images/${req.file.filename}`
//     });
//   });
  





//schema creating for user model



app.listen(PORT, (error)=>{
   if(!error){
    console.log(`server running on ${PORT}`)
   }else{
    console.log("Error>" +error)
   }
})
