const express = require('express')
const app = express()
const Shopify = require('shopify-api-node');
const path = require('path')
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({extended:true}))
app.use( "/public",express.static(__dirname + '/public'));



const shopify = new Shopify({
  shopName: 'arham-development-store-2',
  apiKey: '9bd540a8429f874c3f39208a2c776f49',
  password: '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'
});
let shopname = shopify.baseUrl.hostname

console.log(shopname)

  
app.get("/", (req, res) => {
    shopify.product.list()
      .then((products) => {
        return res.render('index', {products,shopname})
      })
      .catch(() => {
        return res.status(500).send("Something broke.");
      });
  });

  app.get('/createproduct', (req,res) =>{
    res.render('createproduct')
  })
  app.post('/createproduct', (req,res)=>{
    const productTitle = req.body.title
    const productVendor = req.body.vendor 
    shopify.product.create(
        {
            title : `${productTitle}`,
            vendor : `${productVendor}`
        }
    )
  })



  app.listen(3000,()=>{
    console.log(`your app is running on http://localhost:3000`)
  })