const { app, BrowserWindow } = require('electron');

const api = require('./lib/api');

let win;

app.on('ready', () => {
  win = new BrowserWindow({width: 1000, height: 600});

  win.loadURL('http://localhost:4200');

  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
});

app.on('activate', () => {
  if (!win) createWindow();
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
