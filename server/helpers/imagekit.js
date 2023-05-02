var FormData = require("form-data");
const axios = require('axios');
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey : "public_p7DBXb6npcvOBts4zXjpFwWmKY0=",
    privateKey : "private_a4nK4a952RyzJ8Tbb/IZnCfO/NY=",
    urlEndpoint : "https://ik.imagekit.io/psmrvr1ry"
});

async function ImageCloud(input) {
    // console.log(input,"??");
  const form = new FormData();
  form.append("file", input.buffer, { filename: input.originalname });
  form.append("fileName", input.originalname);
    // console.log(form, "MASUKKK???")

  const PK = process.env.PK

  const { data } = await axios({
    method: "POST",
    url: "https://upload.imagekit.io/api/v1/files/upload",
    data: form,
    headers: {
      Authorization: "Basic " + PK,
    },
  });

  
  


  return data
}



module.exports = ImageCloud