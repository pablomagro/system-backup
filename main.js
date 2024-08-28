#!/usr/bin/env node

const { backupFolder, jsonFileName, passphrase } = require('./config')
const fsExtra = require('fs-extra')
const { exec, execSync } = require('child_process')

const dateString = execSync('date +"%d-%m-%Y_%H%m%s"').toString()
const backupFolderWithNowDate = `${backupFolder}/${dateString}`.trimEnd()

const copyResource = async (source, destination) => {
  try {
    await fsExtra.copy(source, `${backupFolderWithNowDate}/${destination}`)
    console.log(`[OK][${source}] copied successfully!`)
  } catch (error) {
    console.error(`[ERROR] ${error.message}`)
  }
}

const executeCommand = async (command) => {
  console.log(`Executing command: ${command}`);
  const child = exec(command)

  child.on('error', (error) => {
    console.error(error.message)
    throw Error(error.message)
  })

  await new Promise((resolve) => child.on('close', resolve))
}

const encrypt = async (what) =>
  await executeCommand(`echo ${passphrase} | gpg -c --batch --yes --passphrase-fd 0 ${what}`)

const cleanUp = async () =>
  await executeCommand('rm -rf *.tar.gz .*.gpg *.gpg')

const compress = async (whatToCompress, compressedName) => {
  await executeCommand(`rm -rf ${compressedName}`)
  await executeCommand(`tar -czf ${compressedName} ${whatToCompress}`);
}

const compressAndCopy = async (whatToCompress, compressedName) => {
  await compress(whatToCompress, compressedName)
  await copyResource(compressedName, compressedName)
}

const compressEncryptAndCopy = async (whatToCompress, compressedName) => {
  await compress(whatToCompress, compressedName)
  await encrypt(compressedName)
  await copyResource(`${compressedName}.gpg`, `${compressedName}.gpg`)
  await executeCommand(`rm ${compressedName}`) // Not needed anymore.
}

const getTasksList = () => {
  const tasksListPromise = []
  const tasksList = fsExtra.readJsonSync(jsonFileName);

  for (const task of tasksList) {
    if (task.type === 'COMPRESS_AND_COPY') {
      tasksListPromise.push(() => compressAndCopy(task.source, task.destination))
    } else if (task.type === 'COMPRESS_ENCRYPT_AND_COPY') {
      tasksListPromise.push(() => compressEncryptAndCopy(task.source, task.destination))
    } else if (task.type === 'COPY_RESOURCE') {
      tasksListPromise.push(() => copyResource(task.source, task.destination))
    }
  }

  return tasksListPromise
}

const main = async () => {
  const timeTaken = "Time taken by main function"
  // Starts the timer, the label value is timeTaken
  console.time(timeTaken)

  const promiseTasks = getTasksList()
  await Promise.all(promiseTasks.map(async (func) => await func()))

  // Ends the timer and print the time taken by the piece of code.
  console.timeEnd(timeTaken)
}

(async () => {
  try {
    await main()
  } catch (error) {
    console.error(error.message)
  } finally {
    await cleanUp()
  }
})()
