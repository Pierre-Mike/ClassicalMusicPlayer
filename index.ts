// main.ts

import { ChildProcess } from "child_process";
import * as fs from "fs";
import player from "play-sound";
import prompts from "prompts";

const cliPlayer = player();
const musicFolder: string = "./music/";
const allSongs: string[] = fs.readdirSync(musicFolder);
const ramdomSong: string =
// allSongs[Math.floor(Math.random() * allSongs.length)];

let child: ChildProcess;

const playMusic = (song: string): Promise<ChildProcess> => {
    console.log(`Playing music ${song}`);
    const songPath: string = musicFolder + song;
    console.log(`Playing ${songPath}`);
    return new Promise((resolve, reject) => {
        child = cliPlayer.play(songPath, (err: Error | null) => {
            if (err) {
                console.error("Error playing music:", err, songPath);
                reject(err);
            }
        });
    
        resolve(child);
    });
};

child = await playMusic(ramdomSong);

const byArtiste = allSongs.reduce((acc, song) => {
    const artiste = song.split(" ")[1];
    if (!acc[artiste]) {
        acc[artiste] = [];
    }
    acc[artiste].push(song);
    return acc;
}, {} as { [artiste: string]: string[] });

const response = await prompts([
    {
        type: "multiselect",
        name: "songs",
        message: "Select artiste to play",
        suggest: async (input, choices) =>
            choices.filter((i) =>
                fuzzysearch(
                    input.toLocaleLowerCase(),
                    i.title.toLocaleLowerCase(),
                )
            ),
        choices: Object.keys(byArtiste).map((artiste) => ({
            title: artiste,
            value: byArtiste[artiste],
        })),
    },
]);

for (const song of response.songs) {
        console.log(`Playing ${song}`);
        child.kill();
        child = await playMusic(song);

        await new Promise<void>((resolve) => {
            child.addListener("close", () => {
                console.log("Music player closed");
                resolve();
            });
        });
}

export default function fuzzysearch(needle: string, haystack: string) {
    const hlen = haystack.length;
    const nlen = needle.length;
    if (nlen > hlen) {
        return false;
    }
    if (nlen === hlen) {
        return needle === haystack;
    }
    outer: for (var i = 0, j = 0; i < nlen; i++) {
        var nch = needle.charCodeAt(i);
        while (j < hlen) {
            if (haystack.charCodeAt(j++) === nch) {
                continue outer;
            }
        }
        return false;
    }
    return true;
}
