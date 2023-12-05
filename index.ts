// main.ts

import * as fs from 'fs';
import player from 'play-sound';

const musicFolder: string = './music/';
const cliPlayer = player()
async function searchMusicByArtist(artist?: string): Promise<void> {
    fs.readdir(musicFolder, async (err: Error | null, files: string[]) => {
        if (err) {
            console.error('Error reading music folder:', err);
            return;
        }
        console.log(`Songs by ${artist || 'any artist'}:`);
        const artistSongs = artist ? files.filter(file => file.toLocaleLowerCase().includes(artist.toLocaleLowerCase())) : files;
        if (artistSongs.length === 0) {
            console.log(`No songs found for ${artist || 'any artist'}`);
            return;
        }
        const randomIndex = Math.floor(Math.random() * artistSongs.length);
        const randomSong = artistSongs[randomIndex];
        console.log(randomSong);
        await playMusic(randomSong);
        await searchMusicByArtist(artist)
    });
}

function playMusic(song: string): Promise<void> {
    const songPath: string = musicFolder + song;
    console.log(`Playing ${songPath}`);
    return new Promise((resolve, reject) => {
        cliPlayer.play(songPath, (err: Error | null) => {
            if (err) {
                console.error('Error playing music:', err);
                reject(err);
            }
            resolve();
        })
    })
}
const artiste: string = process.argv[2]


searchMusicByArtist(artiste);


