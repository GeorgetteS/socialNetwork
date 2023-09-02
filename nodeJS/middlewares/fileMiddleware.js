import multer from 'multer';
import { v2 } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: v2,
  params: {
    folder: 'public',
    public_id: (req, file) => {
      const timestamp = new Date().toISOString().replace(/:/g, '-');
      const filename = file.originalname.replace(/\.[^/.]+$/, '');
      return `${filename}_${timestamp}`;
      // return 'lol';
    },
  },
});

const types = ['image/png', 'image/jpeg', 'image/jpg'];

const fileFilter = (req, file, cb) => {
  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// export async function deleteImage(public_id) {
//   v2.uploader.destroy(public_id, function (error, result) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log(result);
//     }
//   });
// }

export const upload = multer({ storage, fileFilter });
