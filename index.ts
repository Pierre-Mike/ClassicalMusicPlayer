import { ChildProcess } from "child_process";
import * as fs from "fs";
import player from "play-sound";

const cliPlayer = player();
const musicFolder: string = "./music/";
const randomizedSongList: string[] = fs.readdirSync(musicFolder)
    .sort(() => Math.random() - 0.5);
    
let stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding("utf8");

const playMusic = (song: string): Promise<ChildProcess> => {
    const songPath: string = musicFolder + song;

    console.log(`\n 🎧 ${song.replace('.mp3', '')}`);
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

for (const song of randomizedSongList) {
    // use commend terminal say(song)
    const child = await playMusic(song);
    // on n keypress return
    // without this, we would only get streams once enter is pressed
    stdin.on("data", (key) => {
        // ctrl-c ( end of text )
        if (key.toString() === "n") {
            child?.kill();
            return;
        }
        if (key.toString() === "s") {
            child?.kill();
            process.exit();
        }
        // write the key to stdout all normal like
        console.log(key);
    });
    process.on("exit", () => {
        child?.kill();
    });

    console.log("Press 'n' to skip to the next song");
    console.log("Press 's' to stop the music");

    await new Promise<void>((resolve) => {
        child.on("close", () => {
            console.log("Music has ended");
            resolve();
        });
    });
}
