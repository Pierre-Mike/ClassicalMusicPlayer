// main.ts

import * as fs from 'fs';
import * as player from 'play-sound';

const musicFolder: string = './music/';

function searchMusicByArtist(artist: string): void {
  const artistFolder: string = musicFolder + artist + '/';
  fs.readdir(artistFolder, (err: NodeJS.ErrnoException | null, files: string[]) => {
    if (err) {
      console.error('Error reading artist folder:', err);
      return;
    }
    console.log(`Songs by ${artist}:`);
    files.forEach((file: string) => {
      console.log(file);
    });
  });
}

function playMusic(artist: string, song: string): void {
  const artistFolder: string = musicFolder + artist + '/';
  const songPath: string = artistFolder + song;
  player.play(songPath, (err: Error | null) => {
    if (err) {
      console.error('Error playing music:', err);
    }
  });
}

// Example usage
const artist: string = 'artist1';
const song: string = 'song1.mp3';

searchMusicByArtist(artist);
playMusic(artist, song);
