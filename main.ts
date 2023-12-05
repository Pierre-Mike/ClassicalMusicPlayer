// main.js

const fs = require('fs');
const player = require('play-sound')();

const musicFolder = './music/';

function searchMusicByArtist(artist) {
  const artistFolder = musicFolder + artist + '/';
  fs.readdir(artistFolder, (err, files) => {
    if (err) {
      console.error('Error reading artist folder:', err);
      return;
    }
    console.log(`Songs by ${artist}:`);
    files.forEach((file) => {
      console.log(file);
    });
  });
}

function playMusic(artist, song) {
  const artistFolder = musicFolder + artist + '/';
  const songPath = artistFolder + song;
  player.play(songPath, (err) => {
    if (err) {
      console.error('Error playing music:', err);
    }
  });
}

// Example usage
const artist = 'artist1';
const song = 'song1.mp3';

searchMusicByArtist(artist);
playMusic(artist, song);