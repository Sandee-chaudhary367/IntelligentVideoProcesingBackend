
import got from "got";
import fs from 'fs';
import FormData from "form-data";

const apiKey = 'acc_f15bd37231b48c2';
const apiSecret = '5c5fad756e8f3a7d2886eed0779dd924';

const filePath ="./Image/gallery-2.jpg" ;
const formData = new FormData();
formData.append('image', fs.createReadStream(filePath));

let fn= async () => {
    try {
        const response = await got.post('https://api.imagga.com/v2/tags', {body: formData, username: apiKey, password: apiSecret});
        let obj=JSON.parse(response.body);
        console.log(obj.result.tags[0].tag.en);
        console.log(obj.result.tags[1].tag.en);
        console.log(obj.result.tags[2].tag.en);
        //console.log(response.body)
    } catch (error) {
        console.log(error);
    }
}
fn();