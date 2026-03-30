const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputPath = path.join(__dirname, 'public', 'images', 'perfumery-hero.JPG');
const outputPath = path.join(__dirname, 'public', 'images', 'perfumery-hero.jpg');

sharp(inputPath)
  .resize({ width: 1920, withoutEnlargement: true })
  .jpeg({ quality: 80 })
  .toFile(outputPath)
  .then(info => {
    console.log('Successfully resized image:', info);
    // Delete the original massive one
    fs.unlinkSync(inputPath);
    console.log('Deleted old .JPG');
  })
  .catch(err => {
    console.error('Error resizing:', err);
  });
