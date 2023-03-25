#!/usr/bin/env node

const { sourceFolder, backupFolder } = require('./config')
const fsExtra = require('fs-extra')
const { exec, execSync } = require('child_process')

const dateString = execSync('date +"%d-%m-%Y_%H%m%s"').toString()
const backupFolderWithNowDate = `${backupFolder}/${dateString}`.trimEnd()

const copyResource = async (origin, target) => {
  try {
    await fsExtra.copy(origin, target)
    console.log(`File/Directory [${origin}] copied successfully!`)
  } catch (error) {
    console.error(error.message)
  }
}

const compress = async (whatToCompress, compressedName) => {
  await executeCommand(`rm -rvf ${compressedName}`)
  await executeCommand(`tar -czvf ${compressedName} ${whatToCompress}`)
}

const executeCommand = async (command) => {
  const child = exec(command)

  child.on('error', (error) => {
    console.error(`error: ${error.message}`)
  })

  await new Promise((resolve) => child.on('close', resolve))
}

const compressAndCopy = async (whatToCompress, compressedName) => {
  await compress(whatToCompress, compressedName)
  await copyResource(compressedName, `${backupFolderWithNowDate}/${compressedName}`)
}

const main = async () => {
  const timeTaken = "Time taken by main function"
  // Starts the timer, the label value is timeTaken
  console.time(timeTaken)

  const tasksList = [
    // Brave
    await compressAndCopy(`${sourceFolder}/.config/BraveSoftware/Brave-Browser/`, 'brave-browser.tar.gz'),

    // VSCode
    await compressAndCopy(`${sourceFolder}/.config/Code\\ -\\ Insiders/User/*.json`, 'code-insiders-backup.tar.gz'),
    await compressAndCopy(`${sourceFolder}/.config/Code/User/*.json`, 'code-backup.tar.gz'),

    // System and Applications
    await copyResource(`/etc/apt/sources.list`, `${backupFolderWithNowDate}/sources.list`),
    await copyResource(`/etc/fstab`, `${backupFolderWithNowDate}/fstab`),
    await copyResource(`/etc/default/grub`, `${backupFolderWithNowDate}/grub`),
    await copyResource(`${sourceFolder}/.ssh`, `${backupFolderWithNowDate}/.ssh`),
    await copyResource(`${sourceFolder}/.bashrc`, `${backupFolderWithNowDate}/.bashrc`),
    await copyResource(`${sourceFolder}/.profile`, `${backupFolderWithNowDate}/.profile`),
    await copyResource(`${sourceFolder}/.aws`, `${backupFolderWithNowDate}/.aws`),
    await copyResource(`${sourceFolder}/.gitconfig`, `${backupFolderWithNowDate}/.gitconfig`),

    // KDE
    // "Custom Shortcuts" (System Settings > Shortcuts)
    await copyResource(`${sourceFolder}/.config/khotkeysrc`, `${backupFolderWithNowDate}/kde5-custom_shortcuts_khotkeysrc`),
    // Standard Shortcuts (System Settings > Shortcuts)
    await copyResource(`${sourceFolder}/.config/kdeglobals`, `${backupFolderWithNowDate}/kde5-standard_shortcuts_kdeglobals`),
    // Global Shortcuts (System Settings > Shortcuts)
    await copyResource(`${sourceFolder}/.config/kglobalshortcutsrc`, `${backupFolderWithNowDate}/kde5-global_shortcuts_kglobalshortcutsrc`),
    // Dolphin
    // KDE-Dolphin main configuration:
    await copyResource(`${sourceFolder}/.config/dolphinrc`, `${backupFolderWithNowDate}/dolphin-backups-dolphinrc`),
    await copyResource(`${sourceFolder}/.local/share/kxmlgui5/dolphin/dolphinui.rc`, `${backupFolderWithNowDate}/dolphin-backups-dolphinui.rc`),
    // KDE-Dolphin sidebar and bookmark configuration:
    await copyResource(`${sourceFolder}/.local/share/user-places.xbel`, `${backupFolderWithNowDate}/dolphin-backups-user-places.xbel`),
    // Custom desktop menus services:
    await compressAndCopy('/usr/share/kservices5/pablo*.desktop', 'kservices5.desktop.tar.gz'),

    // Plasma
    await compressAndCopy(`${sourceFolder}/.config/kdeconnect/`, 'plasma-backups-kdeconnect.tar.gz'),
    await compressAndCopy(`${sourceFolder}/.config/plasma*`, 'plasma-backups-plasma.tar.gz'),
  ]
  await Promise.all(tasksList)

  // Ends the timer and print the time taken by the piece of code.
  console.timeEnd(timeTaken)
}

(async () => {
  try {
    await main()
  } catch (error) {
    console.error(error.message)
  } finally {
    await executeCommand('rm -rf *.tar.gz')
  }
})()
