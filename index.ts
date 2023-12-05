// main.ts

import * as fs from 'fs';
import player from 'play-sound';

const musicFolder: string = './music/';

function searchMusicByArtist(artist?: string): void {
    fs.readdir(musicFolder, (err: Error | null, files: string[]) => {
        if (err) {
            console.error('Error reading music folder:', err);
            return;
        }
        console.log(`Songs by ${artist || 'any artist'}:`);
        const artistSongs = artist ? files.filter(file => file.includes(artist)) : files;
        if (artistSongs.length === 0) {
            console.log(`No songs found for ${artist || 'any artist'}`);
            return;
        }
        const randomIndex = Math.floor(Math.random() * artistSongs.length);
        const randomSong = artistSongs[randomIndex];
        console.log(randomSong);
        playMusic(randomSong);
    });
}

function playMusic(song: string): void {
    const songPath: string = musicFolder + song;

    player().play(songPath, (err: Error | null) => {
        if (err) {
            console.error('Error playing music:', err);
        }
    });
}

// Example usage
const artist1: string = 'artist1';

searchMusicByArtist(artist1);
