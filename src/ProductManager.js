const fs = require('fs');

class ProductManager {
    static productId = 0;
    constructor(path) {
        this.path = path;
        this.products = [];
    }
    
    writeData(data) {
        try {
            let dataString = JSON.stringify(data);
            fs.writeFileSync(this.path, dataString);
        } catch (error) {
            throw new Error (error);
        }
    }

    readFile() {
        try {
            const data = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }

    addProduct(product) {
        product.id = ProductManager.productId++;

        if(!product.title || !product.description || !product.price || !product.thumnail || !product.code || !product.stock) {
            throw new Error('Todos los campos son obligatorios');
        } else if (this.products.find(p => p.code === product.code)) {
            throw new Error('El codigo ya existe');
        } else {
            this.products.push(product)
            this.writeData(this.products);
        }
    }


    getProducts() {
        let data = this.readFile();
        return data
    }

    getProductById(id) {
        const productById = this.getProducts().find(p => p.id === id);
        if(productById) {
            return productById;
        } else {
            throw new Error('Not found')
        }
    }

    updateProduct(id, product) {
        let productId = this.getProductById(id);
        if(productId) {
            let updatedProduct = this.readFile().filter(p => p.id !== id);
            product.id = id;
            updatedProduct.push(product);
            this.writeData(updatedProduct);  
        }
    }

    deleteProduct(id) {
        let productId = this.getProductById(id);
        if(productId) {
            let products = this.readFile().filter(p => p.id !== id);
            this.writeData(products);
        }
    }
}

const productList = new ProductManager('src/products.json');

const product = {
    title: 'title',
    description: 'description',
    price: 50,
    thumnail: 'thumnail',
    code: 455,
    stock: 588
}

const product2 = {
    title: 'title',
    description: 'description',
    price: 50,
    thumnail: 'thumnail',
    code: 458,
    stock: 588
}

const product3 = {
    title: 'title',
    description: 'description',
    price: 50,
    thumnail: 'thumnail',
    code: 4,
    stock: 588
}

// productList.addProduct(product);
// productList.addProduct(product2);
// productList.addProduct(product3);
// console.log(productList.getProductById(0))

// console.log(productList.getProducts());


module.exports = {
    productList
}