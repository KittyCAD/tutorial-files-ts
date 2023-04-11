import { file } from '@kittycad/lib'
import fsp from 'fs/promises'

async function convertOBJtoSTEP() {
  // Use KittyCAD client library to output base64 string from OBJ to STEP
    const response = await file.create_file_conversion({
        output_format: 'step',
        src_format: 'obj',
        body: await fsp.readFile('./gear.obj', 'base64'),
    })
    // Decode the base64 string
    const decodedSTEPfile = Buffer.from(response.output, "base64").toString("utf-8")

    // Use fs/promises library to write a new STEP file using the decoded base64 string
    fsp.writeFile('gear.step', decodedSTEPfile, function (err) {
      if (err) throw err;
    })
    if ('error_code' in response) throw response
    else {
      console.log('File created successfully.');
    }
}

convertOBJtoSTEP()