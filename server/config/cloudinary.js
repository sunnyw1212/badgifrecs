const cloudinary = require('cloudinary');
const CLOUDINARY_NAME = 'qwertwerty21';
const CLOUDINARY_API_KEY = '365155531524953';
const CLOUDINARY_API_SECRET = 'gAL0Hjh1nT9y06E68FZRLFh78Bw';


cloudinary.config({
	cloud_name: CLOUDINARY_NAME,
	api_key: CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_API_SECRET
});