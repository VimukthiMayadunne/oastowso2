export{}
const request = require("request");
const readYaml = require("read-yaml");
const apiFedarationSpec = require ('./apiFedaration');
const fs = require('fs');
const AdditionalProperties=require('./models/additionalProperties')
const EndpointConfig = require('./models/endpoitConfig')
const RateLimiting = require('./RateLimiting')

async function sendRequest(data: any) {
  return new Promise(async function(resolve, reject) {
    try {
      request(data, async function(error: string | undefined,response: any,body: any
      ) {
        if (error) throw new Error(error);
        var rBody= await JSON.parse(body)
        if(rBody.code != null){
          console.log("error")
          reject(rBody)
        }
        else{
         resolve(rBody);
        }
      });
    } catch (err) {
      console.error(err)
      reject(err);
    }
  });
}

async function readSwagger(filename: string,key:string ,uri:string) {
  return new Promise(async function(resolve, reject) {
    try {
      readYaml(filename, async function(err: any, data: any) {
        if (err) {
          console.log("Unable To Read the Swagger File");
          reject(err)
        } else {
          var swagger = await data;
          var rslt =
            swagger.openapi != null ? oas3(swagger,key,uri,filename) : swagger2(swagger,key,uri,filename);
          resolve(rslt);
        }
      });
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
}

async function sendSwagger(apo:any,  key: string , filename:string,uri:string , swagger:any) {
  return new Promise(async function(resolve, reject) {
    try {
      var rslt = JSON.stringify(apo)
      var options = {
        method: "POST",
        url: uri+'/api/am/publisher/v1/apis/import-openapi',
        headers: {
          Accept: 'application/json',
          Authorization: key,
          "content-type":
            "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
        },
        formData:{ 
           file : fs.createReadStream(filename),
          //'additionalProperties': `{ "name": "${name}", "context" : "${context}", "version" : "${version}", "description":"${description}" , "endpointConfig":{"production_endpoints":{"url":"${endpoint}","config":"null"},"sandbox_endpoints":{"url":"${endpoint}","config":"null"},"endpoint_type":"http"},	"responseCachingEnabled": true,  "cacheTimeout": 550 }`,
          additionalProperties:rslt
        }     
      }
      var res:any=await sendRequest(options);
      var rsls = (res.id != null && swagger['x-global-spec']['x-global-rateLimiting'] != null)?await RateLimiting.addRateLimiting(res , uri , key ,  swagger['x-global-spec']['x-global-rateLimiting']):reject("Unable To add Rate Limiting")
      resolve(rsls)
    }
    catch (err) {
      reject(err);
    }
  });
}



async function oas3(swagger: any , key:string ,uri:string ,filename:string) {
  return new Promise(async function(resolve, reject) {
    try {
      var host = await swagger.servers["0"].url + "/";
      var name = await swagger.info.title;
      var Bname = await name.replace(/\W/g, "");
      var tags = (swagger.tags != null) ? await addtags(swagger.tags) : [];
      var endpoint = await new EndpointConfig()
      endpoint.production_endpoints.url = host
      endpoint.sandbox_endpoints.url = host
      var additionalProperties = await new AdditionalProperties({name:name,description:swagger.info.description,context:Bname,version:swagger.info.version , endpointConfig:endpoint, tags:tags  })
      var adpobj:any = await apiFedarationSpec.apiFedarationSpec(swagger['x-global-spec'] ,additionalProperties,name,uri,key )
      var reslt:any = await sendSwagger(adpobj,key,filename,uri ,swagger)
      resolve(reslt);

    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

async function swagger2(swagger: any , key:string , uri:string , filename:string) {
  return new Promise(async function(resolve, reject) {
    try {
      var host =
        swagger.schemes["0"] + "://" + swagger.host + swagger.basePath + "/";
      var name = await swagger.info.title;
      var Bname = name.replace(/\W/g, "");
      var tags = (swagger.tags != null) ? await addtags(swagger.tags) : [];
      var endpoint = await new EndpointConfig()
      endpoint.production_endpoints.url = host
      endpoint.sandbox_endpoints.url =host
      var additionalProperties = await new AdditionalProperties({name:name,description:swagger.info.description,context:Bname,version:swagger.info.version , tags:tags  })
      var adpobj:any = await apiFedarationSpec.apiFedarationSpec(swagger['x-global-spec'] ,additionalProperties )
      var reslt:any = await sendSwagger(adpobj,key,filename,uri,swagger)
      resolve(reslt);
    } 
    catch (error) {
      console.log(error);
      reject(error);
    }
  });
}


async function addtags(data: any) {
  try {
    var tags = [];
    for (var tag in data) {
      tags.push(data[tag].name);
    }
    return tags;
  } catch (e) {
    console.log("No tags in the Swagger File");
    return null;
  }
}


module.exports = { sendSwagger , readSwagger };
