export{}
const request = require("request");
const Time = require('./timeConverter')

async function apiFedarationSpec(fedarationSpec:any , adpobj:any ,name:string ,uri:string , key:any){
    return new Promise(async function(resolve, reject) {
        try {
            adpobj= (fedarationSpec['x-global-cache'] != null)?await addCache(fedarationSpec['x-global-cache'],adpobj):adpobj;
            adpobj= (fedarationSpec['x-global-cors'].corsConfigurationEnabled == true)?await addCORS(fedarationSpec['x-global-cors'],adpobj):adpobj;
            // adpobj= (fedarationSpec['x-global-rateLimiting'] != null)?await addRateLimiting(fedarationSpec['x-global-rateLimiting'],adpobj,key,name,uri):adpobj;
            resolve(adpobj)
        } 
        catch (err) {
            console.error
            reject(err)
        }
      });
}


async function addRateLimiting(rateLimiting:any , adpobj:any ,key:string , name: string, uri: string) {
    return new Promise(async function(resolve, reject) {
      try {
        console.log("Rate Limiting",rateLimiting)
        var permin:string = await Time.tominute(rateLimiting.Interval, rateLimiting.timeunit , rateLimiting.quota ,key,name,uri)
        adpobj.apiThrottlingPolicy= await permin
        console.info(adpobj)
        resolve(adpobj)
      } catch (err) {
          console.error(err)
          reject(err)
      }
    });
  }
  
  async function addCORS(fedarationSpec:any ,adpobj:any) {
    return new Promise(async function(resolve, reject) {
      try {
        adpobj.corsConfiguration = fedarationSpec
        resolve(adpobj)
      } 
      catch (err) {
        console.error(err)
        reject(err)
      }
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