import Product from '../model/Product.js';
const productModel = new Product();
// const stockProductModel = new Stock();

class ProductController {
    async listProducts(req, res) {
        const PRODUCTS = await productModel.list();

        return res.status(PRODUCTS.status).send(PRODUCTS.response);

    }

    async listProductById(req, res) {
        const ID = parseInt(req.params.id);
        const PRODUCT = await productModel.listById(ID);

        return res.status(PRODUCT.status).send(PRODUCT.response);
        
    }

    async createProduct(req, res) {
        const ITEM = req.body;

        const REGISTER_PRODUCT = await productModel.create(ITEM);

        return res.status(REGISTER_PRODUCT.status).send(REGISTER_PRODUCT.response);
    }

    async updateProduct(req, res) {
        const ITEM = req.body;
        const ID = parseInt(req.params.id);
        const UPDATE = await productModel.update(ITEM, ID);

        return res.status(UPDATE.status).send(UPDATE.response);
        
    }

    async deleteProduct(req, res) {
        const ID = parseInt(req.params.id);
        const DELETE = await productModel.delete(ID);

        return res.status(DELETE.status).send(DELETE.response);
        
    }

}

export default ProductController;