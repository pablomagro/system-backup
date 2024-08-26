#!/bin/bash

GOOGLE_DRIVE=gdrive:
LOCAL_FOLDER=~/.gdrive

rclone mount "$GOOGLE_DRIVE:/backup" "$LOCAL_FOLDER" -v
ls -l "$LOCAL_FOLDER"

echo "Press Ctrl+c to unmount"
