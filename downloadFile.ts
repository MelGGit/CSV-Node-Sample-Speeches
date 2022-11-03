import http from 'http'
import fs from 'fs'

export default async function downloadFile(url:string, index: number) {
  return await new Promise ((resolve) => {
    const path = `./files/file${index}.csv`;
        let filePath = fs.createWriteStream(path);
        http.get(url,(res) => {
          res.pipe(filePath);
          res.on('end', function() {
            resolve(true)
        });
        })
    })
}