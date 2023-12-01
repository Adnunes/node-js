const fs = require('fs')

// read stream
const readStream = fs.createReadStream('./docs/blog3.txt')

const writeStream = fs.createWriteStream('./docs/blog4.txt')


// readStream.on('data', (chunk)=>{
//     console.log('----new chunk------')
//     console.log(chunk.toString())
//     writeStream.write('\n NEW CHUNK \n')
//     writeStream.write(chunk)
// })

// pipíng
readStream.pipe(writeStream)