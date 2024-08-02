const express = require("express");
const router = express.Router();
const Products = require('../models/ProductSchema')
const fs = require('fs');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });


router.use('/uploads', express.static(__dirname + '/uploads'));

router.post('/addproduct', uploadMiddleware.single('file'), async (req, res) => {
    try {
        // Validate request body
        const { name, category, new_price, old_price } = req.body;
        if (!name || !category || !new_price || !old_price) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Handle file upload
        if (req.file) {
            const { originalname, path } = req.file;
            const parts = originalname.split('.');
            const ext = parts[parts.length - 1];
            const newPath = path + '.' + ext;
            fs.renameSync(path, newPath);

            

                // Generate id
                let products = await Products.find({}).sort({ id: -1 }).limit(1);
                let id = 1;
                if (products.length > 0) {
                    id = products[0].id + 1;
                }

                // Create product
                const product = new Products({
                    id: id,
                    name: name,
                    image: newPath,
                    category: category,
                    new_price: new_price,
                    old_price: old_price
                });
                
                await product.save();
                console.log("Product saved");
                res.json({
                    success: true,
                    name: name,
                    image: newPath
                });
            } 
        }catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
})

router.post('/removeproduct', async(req, res) =>{
    await Products.findOneAndDelete({id:req.body.id});
    console.log("Removed")
    res.json({
        success: true,
        name: req.body.name
    })
})

//Creating API for getting all products
router.get('/allproducts', async(req, res)=>{
    let products = await Products.find({});
    console.log("All Products Fetched");
    res.send(products);
});

//creating endpoint for newcollection data
router.get('/newcollections', async(req, res) =>{
    let products = await Products.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("NewCollection Fetched");
    res.send(newcollection)
})


//create endpoint for popular in women section
router.get('/popularinwomen', async(req, res) =>{
    let products = await Products.find({category: "women"})
    let popular_in_women = products.slice(0,4);
    console.log("Popular in Women fetched");
    res.send(popular_in_women);
    
})



module.exports = router;