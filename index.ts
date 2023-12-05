// main.ts

import * as fs from 'fs';
import player from 'play-sound';
import { PlayOptions } from 'play-sound';

const musicFolder: string = './music/';

function searchMusicByArtist(artist: string): void {
    const artistFolder: string = musicFolder + artist + '/';
    fs.readdir(artistFolder, (err: Error | null, files: string[]) => {
        if (err) {
            console.error('Error reading artist folder:', err);
            return;
        }
        console.log(`Songs by ${artist}:`);
        const randomIndex = Math.floor(Math.random() * files.length);
        const randomSong = files[randomIndex];
        console.log(randomSong);
        playMusic(artist, randomSong);
    });
}

function playMusic(artist: string, song: string): void {
    const artistFolder: string = musicFolder + artist + '/';
    const songPath: string = artistFolder + song;
    const playOptions: PlayOptions = { player: 'afplay', options: ['-v', '1'] /* lower volume for afplay on OSX */ };
    player(playOptions).play(songPath, (err: Error | null) => {
        if (err) {
            console.error('Error playing music:', err);
        }
    });
}

// Example usage
const artist1: string = 'artist1';

searchMusicByArtist(artist1);
