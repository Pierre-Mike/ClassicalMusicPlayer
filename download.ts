import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import extract from 'extract-zip';

const musicFolderPath = path.join(__dirname, 'music');
const zipUrl = 'https://ia802905.us.archive.org/zip_dir.php?path=/17/items/100ClassicalMusicMasterpieces.zip&formats=VBR%20MP3';

function checkIfMp3FilesExist(): boolean {
  const files = fs.readdirSync(musicFolderPath);
  return files.some((file: string) => path.extname(file) === '.mp3');
}

const extractZipFile = (zipFilePath: string): Promise<void> => extract(zipFilePath, { dir: musicFolderPath })
  
function downloadAndUnzipMusic(): void {
  const zipFilePath = path.join(__dirname, '100ClassicalMusicMasterpieces.zip');

  if (fs.existsSync(zipFilePath)) {
    console.log('Music zip file already exists. Skipping download.');
    extractZipFile(zipFilePath)
      .then(() => {
        console.log('Download and unzipping completed!');
      })
      .catch((error) => {
        console.error('Error during download and unzipping:', error);
      });
    return;
  }

  const zipFile = fs.createWriteStream(zipFilePath);

  https.get(zipUrl, response => {
    const totalSize = parseInt(response.headers['content-length'] || '0', 10);
    let downloadedSize = 0;

    response.on('data', chunk => {
      downloadedSize += chunk.length;
      const progress = (downloadedSize / totalSize) * 100;
      process.stdout.write(`Downloading classical music: ${progress.toFixed(2)}% \r`);
    });

    response.pipe(zipFile);

    zipFile.on('finish', () => {
      zipFile.close();
      extractZipFile(zipFilePath)
        .then(() => {
          console.log('Download and unzipping completed!');
        })
        .catch((error) => {
          console.error('Error during download and unzipping:', error);
        });
    });
  }).on('error', (error) => {
    console.error('Error during download:', error);
    fs.unlinkSync(zipFilePath);
  });
}

// Create the music folder if it doesn't exist
if (!fs.existsSync(musicFolderPath)) {
  fs.mkdirSync(musicFolderPath);
}

if (!checkIfMp3FilesExist()) {
  downloadAndUnzipMusic();
}
