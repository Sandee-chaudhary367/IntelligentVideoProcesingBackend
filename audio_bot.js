const say = require('say')

const fs = require('fs');

//https://gist.github.com/mculp/4b95752e25c456d425c6

let SUB_NAME = ""
let AUDIO_NAME =""

if (process.argv.length > 2){
    SUB_NAME = process.argv[2]
    AUDIO_NAME = process.argv[3]
}
    
const data = fs.readFileSync(`./${SUB_NAME}_sub.srt`, 'utf8');
let arr=data.split(/\r?\n/);
let text="";
for(let i=2;i<arr.length;i=i+4){
    text=text+" "+arr[i];
}

console.log(text);

say.export(text,null, 0.75, `${AUDIO_NAME}_bot.wav`, (err) => {
    if (err) {
      return console.error(err)
    }
    console.log('Text has been saved to '+ `${AUDIO_NAME}_bot.wav`)
})