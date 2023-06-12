const searchProducts=require('../controller/searchProducts')

function create_searchProducts_routes(app){
    app.post('/search',searchProducts.searchProducts)
}

module.exports={create_searchProducts_routes}