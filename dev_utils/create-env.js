const fs = require('fs');

const envContent = `
API_KEY=
PORT=
DB_HOST=
DB_NAME=
DB_USER=
DB_PASS=
DB_PORT=
DB_CONNECTION_LIMIT=
MODEL=
`;

fs.writeFile('./.env', envContent.trim(), (err) => {
  if (err) {
    console.error('Error creating .env file:', err);
  } else {
    console.log('.env file created successfully.');
  }
});