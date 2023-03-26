#!/usr/bin/env node

const { backupFolder, jsonFileName } = require('./config')
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

const compress = async (whatToCompress, compressedName) => {
  await executeCommand(`rm -rvf ${compressedName}`)
  await executeCommand(`tar -czvf ${compressedName} ${whatToCompress}`)
}

const executeCommand = async (command) => {
  console.log(`Executing command: ${command}`);
  const child = exec(command)

  child.on('error', (error) => {
    console.error(`error: ${error.message}`)
  })

  await new Promise((resolve) => child.on('close', resolve))
}

async function compressAndCopy(whatToCompress, compressedName) {
  await compress(whatToCompress, compressedName)
  await copyResource(compressedName, compressedName)
}

const getTasksList = async () => {
  const tasksListPromise = []
  const tasksList = await fsExtra.readJson(jsonFileName)

  for (const task of tasksList) {
    if (task.type === 'COMPRESS_AND_COPY') {
      tasksListPromise.push(() => compressAndCopy(task.source, task.destination))
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

  const promiseTasks = await getTasksList()
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
    await executeCommand('rm -rf *.tar.gz')
  }
})()
