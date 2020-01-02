import { resolve } from 'dns'
import { rejects } from 'assert'

export{}

async function tominute(interval:number ,timeUnit:string , quota:number , key:any, name:string){
    return new Promise(async function(resolve,reject){
        try{
            var advancedPolicies= await getPolicies(key)
            var policyName =await checkPolicy(advancedPolicies,interval,timeUnit,quota)
        }
        catch(err){

        }
    })
}









async function ft(interval:number ,timeUnit:string , quota:number){
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