export{}
const request = require("request");

async function apiFedarationSpec(fedarationSpec:any ,key:string){
    return new Promise(async function(resolve, reject) {
        try {
            (fedarationSpec['x-global-cache'] != null)?addCache(fedarationSpec['x-global-cache'],key):null;
            resolve(0)
        } 
        catch (err) {
            console.error
            reject(err)
        }
      });
}

async function sendRequest(data: any) {
    return new Promise(async function(resolve, reject) {
      try {
        request(data, async function(
          error: string | undefined,
          response: any,
          body: any
        ) {
          if (error) throw new Error(error);
          console.log(body);
          resolve(body);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

async function addRateLimiting() {
    return new Promise(async function(resolve, reject) {
      try {
      } catch (err) {}
    });
  }
  
  async function addCORS() {
    return new Promise(async function(resolve, reject) {
      try {
      } catch (err) {}
    });
  }
  
  async function addCache(time:number,key:string) {
    return new Promise(async function(resolve, reject) {
      try {
          console.info(time)
          console.info(key)
      } catch (err) {}
    });
  }

module.exports={apiFedarationSpec}