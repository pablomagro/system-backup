# System Backup

A simple project to complete a simple backup of Debian system based operating system.

---
## Requirements

For development, you will only need Rclone and Node.js installed in your environment. Rclone is user to connect with Google Drive along other cloud storage providers.

### Rclone
- #### Rclone installation on Debian, Ubuntu, Linux Mint and other Deb-based systems:

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install rclone

- #### Configure Rclone to access Google drive

  Once installed, run the following command to give permission to Rclone to access your Google drive:

      $ rclone config

  Finally, you can view the list of configured remotes at any time by using the following command:

      $ rclone listremotes

- ####  Mount Google Drive Locally As Virtual File System Using Rclone

  Create a mount point to mount your google drive files:

      $ mkdir ~/gdrive

  Then, mount the Google drive using command:

      $ rclone mount mygoogledrive: ~/drive/

  Now the Google drive will be mounted to your local and ready to complete the backup.

- Please check this [link](https://ostechnix.com/how-to-mount-google-drive-locally-as-virtual-file-system-in-linux/) for more information.


### Node
- #### Node installation on Debian based systems

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v18.13.0

    $ npm --version
    9.2.0

## Install

    $ git clone https://github.com/pablomagro/system-backup
    $ cd system-backup
    $ npm i

## Configure

Rename the file `.env.sample` to `.env` and set the environment variables needed for the script.

## Run Script

    $ node main

## References

- [Where is the configuration file to store keyboard shortcuts?](https://forum.kde.org/viewtopic.php?t=151477)
- [How To Mount Google Drive Locally As Virtual File System In Linux](https://ostechnix.com/how-to-mount-google-drive-locally-as-virtual-file-system-in-linux/)
- [Rclone](https://rclone.org/)
- [How To Backup KDE Plasma 5 Desktop Settings On Linux](https://www.addictivetips.com/ubuntu-linux-tips/backup-kde-plasma-5-desktop-linux/)