import { Command, flags } from '@oclif/command'
import SendReqSdra from './sendReqSdra';
import Args from './args';

class Pala extends Command {

  static args = [
      { name: 'from' }, 
      { name: 'to' },
      { name: 'output' }
    ];

  async run() {
    const { args } = this.parse(Pala);
    let palaArgs = new Args(args.from, args.to, args.output);
    let reqSdra = new SendReqSdra();

    let dateRange = GenerateDateRange(args.from, args.to);
    
    for (let date in dateRange) {
      let result = reqSdra.sendReq(date);
      if (result.Error != undefined){
        console.log(result.Error);
        continue;
      }

      let handler = new DataHandler();
      handler.saveToFile(result.Data, args.output);
    }
  }

  GenerateDateRange(from: string, to: string): string[] {
    // we need a shamsi date package
    '89-09'
    '90-12'

    '1389-09-01', '1389-09-02', '1389-09-03', ..., '1390-12-30'
  }
}

export = Pala
