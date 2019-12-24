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
    name: flags.string({char: 'n', description: 'name to the OAS file'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(Oastowso2)
    const name = flags.name || 'swagger.yaml'
    var rslt=await apiToken.getCredintials();
    var key = 'Bearer '+await rslt
    var rep = await readSwagger.readSwagger(name,key);
    console.log(rep)
  }

}

export = Oastowso2
