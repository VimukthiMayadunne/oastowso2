export{}
const request = require("request");
const readYaml = require("read-yaml");
const FormData = require('form-data');
const apiFedarationSpec = require ('./apiFedaration');
const fs = require('fs');

async function sendRequest(data: any) {
  return new Promise(async function(resolve, reject) {
    try {
      request(data, async function(
        error: string | undefined,
        response: any,
        body: any
      ) {
        if (error) throw new Error(error);
        resolve(body);
      });
    } catch (err) {
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
        } else {
          var swagger = await data;
          var rslt =
            swagger.openapi != null ? oas3(swagger,key,uri,filename) : swagger2(swagger,key,uri,filename);
          var spec = await apiFedarationSpec.apiFedarationSpec(swagger['x-global-spec'] ,key )
          resolve(rslt);
        }
      });
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
}

async function sendSwagger(key: string , endpoint: string , name:string , context:string , version:any,filename:string,uri:string) {
  return new Promise(async function(resolve, reject) {
    try {
      var options = {
        method: "POST",
        url: uri+'/api/am/publisher/v1/apis/import-openapi',
        headers: {
          Authorization: key,
          "content-type":
            "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
        },
        formData:{ 
           file : fs.createReadStream(filename),
          'additionalProperties': `{ "name": "${name}", "context" : "${context}", "version" : "${version}", "endpointConfig":{"production_endpoints":{"url":"${endpoint}","config":"null"},"sandbox_endpoints":{"url":"${endpoint}","config":"null"},"endpoint_type":"http"}}`
         }     
      }
      var res=sendRequest(options);
      resolve(res)
    }
    
    catch (err) {
      reject(err);
    }
  });
}



async function oas3(swagger: any , key:string ,uri:string ,filename:string) {
  return new Promise(async function(resolve, reject) {
    try {
      console.log("Swagger", swagger.servers["0"]);
      var host = swagger.servers["0"].url + "/";
      var name = swagger.info.title;
      var Bname = name.replace(/\W/g, "");
      var reslt = await sendSwagger(key , host , name , Bname ,swagger.info.version ,filename,uri)
      resolve(reslt)
    } catch (error) {
      console.log(
        "Please make sure the Swagger filr contains the following fileds"
      );
      console.log("1.Schemse 2.Host 3.BasePath");
      reject(error);
    }
  });
}

async function swagger2(swagger: any , key:string , uri:string , filename:string) {
  return new Promise(async function(resolve, reject) {
    try {
      var host =
        swagger.schemes["0"] + "://" + swagger.host + swagger.basePath + "/";
      var name = swagger.info.title;
      var Bname = name.replace(/\W/g, "");
      console.log(key , host , name , Bname ,swagger.info.version)
      var reslt = await sendSwagger(key , host , name , Bname ,swagger.info.version ,filename,uri)
      resolve(reslt);
    } catch (error) {
      console.log(
        "Please make sure the Swagger filr contains the following fileds"
      );
      console.log("1.Schemse 2.Host 3.BasePath");
      reject(error);
    }
  });
}


async function sendRequestts(data:any){
  return new Promise(async function(resolve,reject){
      try{
      request(data,async function (error: string | undefined, response: any, body: any) {
          if (error)
          throw new Error(error);
          resolve(body);
        });
      }
      catch(err){
          console.error(err)
          reject(err)
      }  
  })
}


module.exports = { sendSwagger , readSwagger };
