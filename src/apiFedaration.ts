export{}
const request = require("request");

async function apiFedarationSpec(fedarationSpec:any , adpobj:any){
    return new Promise(async function(resolve, reject) {
        try {
            adpobj= await (fedarationSpec['x-global-cache'] != null)?addCache(fedarationSpec['x-global-cache'],adpobj):adpobj;
            adpobj= await resolve(adpobj)
        } 
        catch (err) {
            console.error
            reject(err)
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
  
  async function addCache(time:number,adpobj:any) {
    return new Promise(async function(resolve, reject) {
      try {
        adpobj.responseCachingEnabled = true
        adpobj.cacheTimeout = time
        resolve(adpobj)
      } catch (err) {
          console.error(err)
          reject(err)
      }
    });
  }

module.exports={apiFedarationSpec}