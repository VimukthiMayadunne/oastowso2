export { }
const request = require("request");

async function tominute(interval: number, timeUnit: string, quota: number, key: any, name: string, uri: string) {
    return new Promise(async function (resolve, reject) {
        try {
            var advancedPolicies = await getPolicies(uri,key)
            var policyName = await checkPolicy(advancedPolicies, interval, timeUnit, quota)
            var policy = (policyName == 'noPolicy') ? await createPolicy(interval, timeUnit, quota, key, name, uri) : policyName
            resolve(policy)
        }
        catch (err) {
            console.error(err)
            reject(err)
        }
    })
}

async function createPolicy(interval: number, timeUnit: string, quota: number, key: any, name: string, uri: string) {
    return new Promise(async function (resolve, reject) {
        try {
            var options = {
                method: 'POST',
                url: uri + '/api/am/admin/v0.15/throttling/policies/advanced',
                headers:
                {
                    Authorization: key,
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                },
                body:
                {
                    policyName: quota+'Per'+timeUnit,
                    displayName: quota+'Per'+timeUnit,
                    description: 'Custom Ploicy created under API Fedaration Spec',
                    isDeployed: false,
                    defaultLimit:
                    {
                        type: 'RequestCountLimit',
                        timeUnit: timeUnit,
                        unitTime: interval,
                        requestCount: quota
                    }
                },
                json: true
            };

            request(options,async function (error: string | undefined, response: any, body: any) {
                if (error)
                    reject(error);
               resolve(body.policyName)
            });
        }
        catch (err) {
            console.error(err)
            reject(err)
        }
    })
}



async function getPolicies(uri:string,key: any) {
    return new Promise(async function (resolve, reject) {
        try {
            var options = {
                method: 'GET',
                url: uri+'/api/am/admin/v0.15/throttling/policies/advanced',
                headers:
                {
                    Authorization: key,
                    Accept: 'application/json',
                    accept: 'application/json'
                }
            };

            request(options,async function (error: string | undefined, response: any, body: any) {
                if (error) 
                    throw new Error(error);
                var policy =await JSON.parse(body)
                var policilist =await policy.list
                resolve(policilist)
            });

        }
        catch (err) {
            console.error(err)
            reject(err)
        }
    })
}

async function checkPolicy(advancedPolicies: any, interval: number, timeUnit: string, quota: number) {
    return new Promise(async function (resolve, reject) {
        try {
            var policy= 'noPolicy'
            for(var i in advancedPolicies){
                if(advancedPolicies[i].defaultLimit.timeUnit == timeUnit && advancedPolicies[i].defaultLimit.unitTime == interval && advancedPolicies[i].defaultLimit.requestCount == quota){
                    console.log("Match Found")
                    policy = advancedPolicies[i].policyName
                    break
                } 
            }
            resolve(policy)
        }
        catch (err) {
            console.error(err)
            reject(err)
        }
    })
}
module.exports = { tominute }