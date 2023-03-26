# System Backup

A simple project to complete a simple backup of Debian system based operating system.

---
## Requirements

For development, you will only need Rclone and Node.js installed in your environment. Rclone is user to connect with Google Drive along other cloud storage providers.

### Rclone
- #### Rclone installation on Debian, Ubuntu, Linux Mint and other Deb-based systems:

  You can install nodejs and npm easily with apt install, just run the following commands.

      sudo apt install rclone

- #### Configure Rclone to access Google drive

  Once installed, run the following command to give permission to Rclone to access your Google drive:

      rclone config

  Finally, you can view the list of configured remotes at any time by using the following command:

      rclone listremotes

- ####  Mount Google Drive Locally As Virtual File System Using Rclone

  Create a mount point to mount your google drive files:

      mkdir ~/gdrive

  Then, mount the Google drive using command:

      rclone mount mygoogledrive: ~/drive/
      ls ~/drive/

  Now the Google drive will be mounted to your local and ready to complete the backup.

- Please check this [link](https://ostechnix.com/how-to-mount-google-drive-locally-as-virtual-file-system-in-linux/) for more information.


### Node
- #### Node installation on Debian based systems

  You can install nodejs and npm easily with apt install, just run the following commands.

      sudo apt install nodejs
      sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    node --version
    v18.13.0

    npm --version
    9.2.0

## Install

    git clone https://github.com/pablomagro/system-backup
    cd system-backup
    npm i

## Configure

Rename the file `.env.sample` to `.env` and set the environment variables needed for the script.

Below is an example of possible configuration file settings to complete the backup.

```json
[
  // Brave
  { "type": "COMPRESS_AND_COPY", "source": "/home/username/.config/BraveSoftware/Brave-Browser/", "destination": "brave-browser.tar.gz" },
  // VSCode
  { "type": "COMPRESS_AND_COPY", "source": "/home/username/.config/Code\\ -\\ Insiders/User/*.json", "destination": "code-insiders-backup.tar.gz" },
  { "type": "COMPRESS_AND_COPY", "source": "/home/username/.config/Code/User/*.json", "destination": "code-backup.tar.gz" },
  // System and Applications
  { "type": "COPY_RESOURCE", "source": "/home/username/.ssh", "destination": ".ssh" },
  { "type": "COPY_RESOURCE", "source": "/home/username/.bashrc", "destination": ".bashrc" },
  { "type": "COPY_RESOURCE", "source": "/home/username/.profile", "destination": ".profile" },
  { "type": "COPY_RESOURCE", "source": "/home/username/.aws", "destination": ".aws" },
  { "type": "COPY_RESOURCE", "source": "/home/username/.gitconfig", "destination": ".gitconfig" },
  { "type": "COPY_RESOURCE", "source": "/etc/apt/sources.list", "destination": "sources.list" },
  { "type": "COPY_RESOURCE", "source": "/etc/fstab", "destination": "fstab" },
  { "type": "COPY_RESOURCE", "source": "/etc/default/grub", "destination": "grub" },
  // KDE
  // "Custom Shortcuts" (System Settings > Shortcuts)
  { "type": "COPY_RESOURCE", "source": "/home/username/.config/khotkeysrc", "destination": "kde5-custom_shortcuts_khotkeysrc" },
  // Standard Shortcuts (System Settings > Shortcuts)
  { "type": "COPY_RESOURCE", "source": "/home/username/.config/kdeglobals", "destination": "kde5-standard_shortcuts_kdeglobals" },
  // Global Shortcuts (System Settings > Shortcuts)
  { "type": "COPY_RESOURCE", "source": "/home/username/.profile", "destination": "kde5-global_shortcuts_kglobalshortcutsrc" },
  // Dolphin
  // KDE-Dolphin main configuration:
  { "type": "COPY_RESOURCE", "source": "/home/username/.config/dolphinrc", "destination": "dolphin-backups-dolphinrc" },
  { "type": "COPY_RESOURCE", "source": "/home/username/.local/share/kxmlgui5/dolphin/dolphinui.rc", "destination": "dolphin-backups-dolphinui.rc" },
  // KDE-Dolphin sidebar and bookmark configuration:
  { "type": "COPY_RESOURCE", "source": "/home/username/.local/share/user-places.xbel", "destination": "dolphin-backups-user-places.xbel" },
  // Custom desktop menus services:
  { "type": "COMPRESS_AND_COPY", "source": "/usr/share/kservices5/username*.desktop", "destination": "kservices5.desktop.tar.gz" },
  // Plasma
  { "type": "COMPRESS_AND_COPY", "source": "/home/username/.config/kdeconnect/", "destination": "plasma-backups-kdeconnect.tar.gz" },
  { "type": "COMPRESS_AND_COPY", "source": "/home/username/.config/plasma", "destination": "plasma-backups-plasma.tar.gz" }
]
```

## Run Script

    node main

## References

- [Where is the configuration file to store keyboard shortcuts?](https://forum.kde.org/viewtopic.php?t=151477)
- [How To Mount Google Drive Locally As Virtual File System In Linux](https://ostechnix.com/how-to-mount-google-drive-locally-as-virtual-file-system-in-linux/)
- [Rclone](https://rclone.org/)
- [How To Backup KDE Plasma 5 Desktop Settings On Linux](https://www.addictivetips.com/ubuntu-linux-tips/backup-kde-plasma-5-desktop-linux/)