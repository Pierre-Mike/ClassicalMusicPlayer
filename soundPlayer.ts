import * as playSound from 'play-sound';
import * as readline from 'readline';

const soundPlayer = playSound();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function promptUser() {
  rl.question('Enter a command to play sound: ', (command) => {
    if (command === 'exit') {
      rl.close();
    } else {
      soundPlayer.play(command, (err) => {
        if (err) {
          console.error('Error playing sound:', err);
        }
        promptUser();
      });
    }
  });
}

promptUser();
