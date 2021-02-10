"use strict";
const {app, dialog} = require('electron');

exports.buildMenuTemplate = function (win) {
  return [
    {
      label: 'File',
      submenu: [
        {
          label: 'Open...',
          id: 'file-open',
          accelerator: 'CmdOrCtrl+O',
          click() {
            dialog.showOpenDialog(win, {
              properties: ['openFile'],
              filters: [
                {name: 'PDF Files', extensions: ['pdf']}
              ]
            }, (filename) => {
              if (filename) {
                win.webContents.send('file-open',
                  filename.toString())
              }
            })
          }
        },
        {
          label: 'Print...',
          id: 'file-print',
          accelerator: 'CmdOrCtrl+P',
          enabled: false,
          click() {
            win.webContents.send('file-print')
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Properties...',
          id: 'file-properties',
          enabled: false,
          click() {
            win.webContents.send('file-properties')
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Close',
          id: 'file-close',
          accelerator: 'CmdOrCtrl+w',
          enabled: false,
          click() {
            win.webContents.send('file-close')
          }
        },
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+q',
          click() {
            app.quit()
          }
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Toggle Full Screen',
          id: 'view-fullscreen',
          enabled: false,
          accelerator: 'F11',
          click() {
            win.webContents.send('view-fullscreen')
          }
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About',
          id: 'about'
        }
      ]
    }

  ];
};
