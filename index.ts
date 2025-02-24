// main.ts

import { ChildProcess } from "child_process";
import * as fs from "fs";
import player from "play-sound";
import { exit } from "process";
import prompts from "prompts";
const { exec } = require('child_process');

const cliPlayer = player();
const musicFolder: string = "./music/";
const allSongs: string[] = fs.readdirSync(musicFolder);

let child:ChildProcess


const playMusic = (song: string): Promise<ChildProcess> => {
    console.log(`Playing music ${song}`);
    const songPath: string = musicFolder + song;
    console.log(`Playing ${songPath}`);
    return new Promise((resolve, reject) => {
        let child = cliPlayer.play(songPath, (err: Error | null) => {
            if (err) {
                console.error("Error playing music:", err, songPath);
                reject(err);
            }
        });
        resolve(child);
    });
};



for (const song of allSongs) {
    // use commend terminal say(song)
    const child = await playMusic(song);

    process.on('exit', () => {
        child?.kill();
    });
    
    console.log(Array(song.length).join("__"));
    console.log(`Playing ${song}`);
    console.log(Array(song.length).join("__"));
    const res = await prompts({
        type: "select",
        name: "action",
        message: "What do you want to do?",
        choices: [
            { title: "Next", value: "next" },
            { title: "Stop", value: "stop" },
        ],
    });
    if (res.action === "stop") {
        child.kill();
        exit(0)
    }
    child.kill();
}
