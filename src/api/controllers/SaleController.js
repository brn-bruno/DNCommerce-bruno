import Sale from '../model/Sale.js';
const saleModel = new Sale();
// const stockProductModel = new Stock();

class SaleController {
    async listSales(req, res) {
        const SALES = await saleModel.list();

        return res.status(SALES.status).send(SALES.response);

    }

    async listSaleById(req, res) {
        const ID = parseInt(req.params.id);
        const SALE = await saleModel.listById(ID);

        return res.status(SALE.status).send(SALE.response);
        
    }

    async createSale(req, res) {
        const ITEM = req.body;

        const REGISTER_SALE = await saleModel.create(ITEM);

        return res.status(REGISTER_SALE.status).send(REGISTER_SALE.response);   
    }

    async deleteSale(req, res) {
        const ID = parseInt(req.params.id);
        const DELETE = await saleModel.delete(ID);

        return res.status(DELETE.status).send(DELETE.response);
        
    }
}

export default SaleController;