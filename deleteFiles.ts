import fs from 'fs'

export default function deleteFiles(fileAmount: number) {

  for(let i = 0; i <= fileAmount -1 ;i++) {
  fs.unlink(`files/file${i}.csv`, (err) => {    
    if (err) {
        throw err;
    }
  });
  }
}