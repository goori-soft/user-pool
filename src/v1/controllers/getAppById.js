const App = require('../../models/app')

module.exports = async (id)=>{
    let app = null
    if(id) app = await App.findOne({id})
    return app
}