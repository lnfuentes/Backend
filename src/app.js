const express = require('express');
const {productList} = require('./ProductManager');


const app = express();
const port = 8080;

const products = productList.getProducts();

app.get('/products', (req, res) => {
    const limit = req.query.limit;
    if(limit && !isNaN(Number(limit))) {
        const productsLimit = products.slice(0, limit);
        res.send(productsLimit);
    } else {
        res.send(products);
    }
})

app.get('/products/:pid', (req, res) => {
    const productId = products.find(p => p.id === Number(req.params.pid));
    res.send(productId);
})

app.listen(port, () => {
    console.log('servidor levantado en el puerto:', port);
})