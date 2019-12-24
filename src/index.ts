import {Command, flags} from '@oclif/command'



process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
const apiToken = require('./apiToken')
const readSwagger = require('./apiDetails')



class Oastowso2 extends Command {
  static description = 'describe the command here'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    file: flags.string({char: 'f', description: 'name to the OAS file'}),
    uri: flags.string ({char: 'u', description: 'URL for the wso2 API-M'}),
    username: flags.string ({char: 'n', description: 'User Name'}),
    password: flags.string ({char: 'p', description: 'Password'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(Oastowso2)
    const name = flags.file || 'swagger.yaml'
    const uri = flags.uri || 'https://localhost:9443'
    const userName = flags.username || 'admin'
    const password = flags.username || 'admin'
    var rslt=await apiToken.getCredintials(uri,userName,password);
    var key = 'Bearer '+await rslt
    var rep = await readSwagger.readSwagger(name,key,uri);
    console.log(rep)
  }

}

export = Oastowso2
