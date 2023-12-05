import * as playSound from 'play-sound';
import * as readline from 'readline';

const soundPlayer = playSound();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function promptUser() {
  rl.question('Enter a command (play, pause, next, previous) to control sound: ', (command) => {
    if (command === 'exit') {
      rl.close();
    } else {
      switch (command) {
        case 'play':
          soundPlayer.play('play', (err) => {
            if (err) {
              console.error('Error playing sound:', err);
            }
            promptUser();
          });
          break;
        case 'pause':
          soundPlayer.play('pause', (err) => {
            if (err) {
              console.error('Error pausing sound:', err);
            }
            promptUser();
          });
          break;
        case 'next':
          soundPlayer.play('next', (err) => {
            if (err) {
              console.error('Error playing next sound:', err);
            }
            promptUser();
          });
          break;
        case 'previous':
          soundPlayer.play('previous', (err) => {
            if (err) {
              console.error('Error playing previous sound:', err);
            }
            promptUser();
          });
          break;
        default:
          console.log('Invalid command');
          promptUser();
          break;
      }
    }
  });
}

promptUser();
