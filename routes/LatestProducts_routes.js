const latestProducts=require('../controller/LatestProducts')

function create_latestProducts_routes(app){
    app.get('/products/latest',latestProducts.getLatestProducts)
}

module.exports={create_latestProducts_routes}