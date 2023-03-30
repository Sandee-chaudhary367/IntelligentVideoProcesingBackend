const express = require("express");
const cors = require("cors");
let multer = require('multer');
const Say = require('say').Say
const say = new Say('darwin' || 'win32' || 'linux')
const fs = require("fs");

const { exec ,spawn, spawnSync} = require("child_process");
const app = express();
var corsOptions = {
    origin: 3000
}

app.use(express.json());
app.use(cors(corsOptions));

let storagefile = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './')
  },
  filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `${file.originalname.slice(0,-4)}.${ext}`)
  }
});

let uploadfiles = multer({storage:storagefile});

app.post("/app",uploadfiles.single("myFile"),async(req,res)=>{
  try {
    let fileName=req.body._id;
    if (!fs.existsSync(`./${fileName}.wav`)) {
      console.log("File is not present")
    }  
    console.log("Audio File had been saved! Text recognistion started");
    const child = spawnSync('node', ['node_modules/vosk/demo/test_srt.js',`${fileName}.wav`]);
    //child.unref();
    console.log("Text recognistion completed! Making Computer generated Audio");
    
    const child2 = spawnSync('node', ['audio_bot.js',`${fileName}`,`${fileName}`]);
    //child.unref();
    console.log("Computer generated Audio has been saved ! sending the response");
    console.log("......");

    res.sendFile(`D:/BTP/${fileName}_sub.srt`);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
}
})

app.post('/addFile',async(req, res) => {
  try {
    const response = await got.post('https://api.imagga.com/v2/tags', {body: formData, username: apiKey, password: apiSecret});
    console.log(response.body);
  } catch (error) {
      console.log(error.response.body);
  }         
});

app.get("/",(req,res)=> res.send("You Are Awesome"));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});