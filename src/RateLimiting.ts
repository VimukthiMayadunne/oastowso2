const request = require("request");
const TimeConverter = require("./timeConverter")
async function upadateApi(apiObj:any , uri:string , key:string) {
    return new Promise(async function (resolve, reject) {
        try {
            var options = {
                method: 'PUT',
                url: uri+'/api/am/publisher/v1/apis/'+apiObj.id,
                headers:
                {
                    'cache-control': 'no-cache',
                    Connection: 'keep-alive',
                    Host: 'localhost:9443',
                    Authorization: key,
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: apiObj,
                json: true
            };

            request(options, function (error: string | undefined, response: any, body: any) {
                if (error) throw new Error(error);
                console.log(body);
                resolve(body)
            });

        }
        catch (err) {
            console.error(err)
            reject(err)
        }
    })
}

async function addRateLimiting(apiObj:any , uri:string , key:string ,rateLimtObj:any ) {
    return new Promise(async function (resolve, reject) {
        try {
            var rateLimiting = await TimeConverter.tominute(rateLimtObj.Interval, rateLimtObj.timeunit, rateLimtObj.quota, key, apiObj.name , uri)
            apiObj.apiThrottlingPolicy = rateLimiting
            var rslt = await upadateApi(apiObj,uri,key)
            resolve(rslt)
        }
        catch (err) {
            console.error(err)
            reject(err)
        }
    })
}



module.exports= {addRateLimiting}






