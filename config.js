const dotenv = require('dotenv');
// Read the environment variables.
dotenv.config();

module.exports = {
  backupFolder: process.env.BACKUP_FOLDER,
  jsonFileName: process.env.JSON_FILE_NAME,
  passphrase: process.env.PASSPHRASE,
};