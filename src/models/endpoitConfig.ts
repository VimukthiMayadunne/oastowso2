export{};
const mongoose = require('mongoose');
const Schema =mongoose.Schema;

let EndpointsConfigSchema = new Schema({
        'production_endpoints':{
            'url':{
                type:String,
                default:null
            },
            'config':{
                type:String,
                default:null
            }
        },
        "sandbox_endpoints":{
            'url':{
                type:String,
                default:null
            },
            'config':{
                type:String,
                default:null
            }
        },
        "endpoint_type":{
            type:String,
            default:"http"
        },
        _id : false 
});
const EndpointsConfig =mongoose.model('endPointsConfig',EndpointsConfigSchema);
module.exports = EndpointsConfig
