import { string } from '@oclif/parser/lib/flags';


export{};
const mongoose = require('mongoose');
const Schema =mongoose.Schema;

let AdditionalPropertiesSchema = new Schema({
    "name":{
        type:String,
        require: true,
    },
    'description':{
        type:String
    },
    'context':{
        type:String,
        require:true
    },
    'version':{
        type:String,
        require:true
    },
    'endpointConfig':{
        'production_endpoints':{
            'url':{
                type:String,
                default:"url"
            },
            'config':{
                type:String,
                default:null
            }
        },
        "sandbox_endpoints":{
            'url':{
                type:String,
                default:"url"
            },
            'config':{
                type:String,
                default:null
        }
    },
        "endpoint_type":{
            type:String,
            default:"http"
        }
    },
    'tags':{
        type:Array
    },
    'responseCachingEnabled':{
        type:Boolean,
        default:false
    },
    'cacheTimeout':{
        type:Number,
        default:300
    },

    'apiThrottlingPolicy':{
        type:String,
        default:"10KPerMin",
        description:"The API level throttling policy selected for the particular API"
    },
    'corsConfiguration':{
        'corsConfigurationEnabled':{
            type:Boolean,
            default:false
        },
        'accessControlAllowOrigins':{
            type:Array,
            default:["*"]
        },
        'accessControlAllowCredentials':{
            type:Boolean,
            default:false
        },
        'accessControlAllowHeaders':{
            type:Array,
        },
        'accessControlAllowMethods':{
            type:Array,
            default: [ "GET", "HEAD", "PUT", "PATCH", "POST" ]
        }
    },
    _id : false 
});

const AdditionalProperties =mongoose.model('additionalProperties',AdditionalPropertiesSchema);
module.exports = AdditionalProperties
