const fs = require('fs');

const envContent = `
API_KEY=
PORT=
DB_Name=
DB_Password=
DB_PORT=
DB_User=
`;

fs.writeFile('./.env', envContent.trim(), (err) => {
  if (err) {
    console.error('Error creating .env file:', err);
  } else {
    console.log('.env file created successfully.');
  }
});