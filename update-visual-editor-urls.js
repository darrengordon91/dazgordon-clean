const https = require('https');

const SPACE_ID = '287766077619539';
const MANAGEMENT_TOKEN = 'YOUR_MANAGEMENT_TOKEN'; // You'll need to get this from StoryBlok
const NEW_URL = 'https://dazgordon-clean.vercel.app/home';

const updateVisualEditorSettings = async () => {
  const data = JSON.stringify({
    space: {
      visual_editor: {
        default_environment: NEW_URL,
        staging_environment: NEW_URL
      }
    }
  });

  const options = {
    hostname: 'mapi.storyblok.com',
    port: 443,
    path: `/v1/spaces/${SPACE_ID}`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': MANAGEMENT_TOKEN
    }
  };

  const req = https.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    res.on('data', (d) => {
      console.log('Response:', d.toString());
    });
  });

  req.on('error', (e) => {
    console.error('Error:', e);
  });

  req.write(data);
  req.end();
};

updateVisualEditorSettings();
