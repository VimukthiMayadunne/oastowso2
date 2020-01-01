

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
        default:"Unlimited",
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
