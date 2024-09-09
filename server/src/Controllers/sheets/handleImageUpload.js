const multiparty = require("multiparty");
const cloudinary = require('cloudinary').v2;
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      format: 'webp'  // Puedes especificar el formato si quieres convertir las imágenes
    });
    return result.secure_url;  // URL de la imagen cargada
  } catch (error) {
    console.error('Error uploading to Cloudinary', error);
    throw new Error('Error uploading image');
  }
};

const handleImageUpload = (req, res) => {
  const form = new multiparty.Form();
  
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).send({ error: 'Error parsing form data' });
    }
    
    const filePath = files.file[0].path;
    
    try {
      const imageUrl = await uploadImage(filePath);
      res.status(200).send({ url: imageUrl });
    } catch (error) {
      res.status(500).send({ error: 'Error uploading image' });
    }
  });
};

module.exports = {
  handleImageUpload
};
