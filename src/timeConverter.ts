export{}

async function tominute(interval:number ,timeUnit:string , quota:number , key:any, name:string,uri:string){
    return new Promise(async function(resolve,reject){
        try{
            var advancedPolicies= await getPolicies(key)
            var policyName =await checkPolicy(advancedPolicies,interval,timeUnit,quota)
            var policy=(policyName == 'noPolicy')?await createPolicy(interval,timeUnit,quota,key,name,uri):policyName
            resolve(policy)
        }
        catch(err){
            console.error(err)
            reject(err)
        }
    })
}









async function createPolicy(interval:number ,timeUnit:string , quota:number, key:any, name:string,uri:string){
    return new Promise(async function(resolve,reject){
        try{

        }
        catch(err){

        }
    })
}



async function getPolicies(key:any){
    return new Promise(async function(resolve,reject){
        try{

        }
        catch(err){

        }
    })
}

async function checkPolicy(advancedPolicies:any ,interval:number ,timeUnit:string , quota:number ){
    return new Promise(async function(resolve,reject){
        try{

        }
        catch(err){

        }
    })
}