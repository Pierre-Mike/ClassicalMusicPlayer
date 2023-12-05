import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import * as AdmZip from 'adm-zip';

const musicFolderPath = path.join(__dirname, 'music');
const zipUrl = 'https://ia802905.us.archive.org/zip_dir.php?path=/17/items/100ClassicalMusicMasterpieces.zip&formats=VBR%20MP3';

function checkIfMp3FilesExist(): boolean {
  const files = fs.readdirSync(musicFolderPath);
  return files.some(file => path.extname(file) === '.mp3');
}

function downloadAndUnzipMusic(): void {
  const zipFilePath = path.join(__dirname, 'music.zip');
  const zipFile = fs.createWriteStream(zipFilePath);

  https.get(zipUrl, response => {
    response.pipe(zipFile);

    zipFile.on('finish', () => {
      zipFile.close();

      const zip = new AdmZip(zipFilePath);
      zip.extractAllTo(musicFolderPath, true);

      fs.unlinkSync(zipFilePath);
    });
  });
}

if (!checkIfMp3FilesExist()) {
  downloadAndUnzipMusic();
}
