import fs from 'fs';
import path from 'path';

class FileServise {
  async deleteFile(filename) {
    try {
      const __dirname = path.resolve();
      const filepath = path.join(__dirname, 'public', filename);
      console.log(filepath, 'delete file');
      fs.unlink(filepath, (e) => {
        if (e) {
          console.log(e);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default new FileServise();
