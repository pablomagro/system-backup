const dotenv = require('dotenv');
// Read the environment variables.
dotenv.config();

module.exports = {
  backupFolder: process.env.BACKUP_FOLDER,
  sourceFolder: process.env.SOURCE_FOLDER
};