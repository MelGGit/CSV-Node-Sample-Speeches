import http from 'http'
import fsStatic from 'fs'
import { resolve } from 'path';

export default async function downloadFile(url:string, index: number) {
  return new Promise ((resolve) => {
    const path = `./files/file${index}.csv`;
        let filePath = fsStatic.createWriteStream(path);
        http.get(url,(res) => {
          res.on('end', function() {
            console.log("Download complete");
        });
        res.pipe(filePath);
        })
    return resolve(filePath)
    })
    return true
}