import { file } from '@kittycad/lib'
import fsp from 'fs/promises'

async function convertOBJtoSTEP() {
    const response = await file.create_file_conversion({
        output_format: 'step',
        src_format: 'obj',
        body: await fsp.readFile('./gear.obj', 'base64'),
    })
    //const decodedSTEPfile = atob(response.output)
    const decodedSTEPfile = Buffer.from(response.output, "base64").toString("utf-8")
    fsp.writeFile('gear.step', decodedSTEPfile, function (err) {
      if (err) throw err;
    })
    if ('error_code' in response) throw response
    else {
      console.log('File created successfully.');
    }
    
}

convertOBJtoSTEP()