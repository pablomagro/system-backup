#!/bin/bash

GOOGLE_DRIVE=gdrive-pmagas-develop:
LOCAL_FOLDER=~/.gdrive-pmagas-develop

rclone mount "$GOOGLE_DRIVE/backup" "$LOCAL_FOLDER" -v &

ls -l "$LOCAL_FOLDER"

echo "Press Ctrl+c to unmount, or umount $LOCAL_FOLDER"
