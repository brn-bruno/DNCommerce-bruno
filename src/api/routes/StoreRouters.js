import { Router } from "express";
import ProductController from "../controllers/ProductController.js";
import SaleController from "../controllers/SaleController.js";

const StoreRoutes = Router();
let productController = new ProductController();
let saleController = new SaleController();

StoreRoutes.get('/products', productController.listProducts);

StoreRoutes.get('/products/:id', productController.listProductById);

StoreRoutes.post('/products', productController.createProduct);

StoreRoutes.put('/products/:id', productController.updateProduct);

StoreRoutes.delete('/products/:id', productController.deleteProduct);

StoreRoutes.get('/sales', saleController.listSales);

StoreRoutes.get('/sales/:id', saleController.listSaleById);

StoreRoutes.post('/sales', saleController.createSale);

StoreRoutes.delete('/sales/:id', saleController.deleteSale);

export default StoreRoutes;