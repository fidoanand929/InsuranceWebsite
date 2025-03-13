const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  {
    url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1080',
    filename: 'car-insurance.jpg',
    description: 'Car on road'
  },
  {
    url: 'https://images.unsplash.com/photo-1586768035999-0321c3416071?q=80&w=1080',
    filename: 'truck-insurance.jpg',
    description: 'Truck on highway'
  },
  {
    url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1080',
    filename: 'health-insurance.jpg',
    description: 'Medical professionals'
  }
];

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    const filepath = path.join(__dirname, '../public/images', filename);
    const file = fs.createWriteStream(filepath);

    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
};

async function downloadAllImages() {
  try {
    for (const image of images) {
      await downloadImage(image.url, image.filename);
    }
    console.log('All images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading images:', error);
  }
}

downloadAllImages(); 