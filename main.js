const { app, BrowserWindow } = require('electron')
const { initialize: initializeRemote, enable: enableRemote } = require('@electron/remote/main')
const path = require('path')
initializeRemote()

function createWindow() {
	const mainWindow = new BrowserWindow({
		frame: false,

		width: 768,
		minWidth: 768,
		maxWidth: 768,

		height: 530,
		minHeight: 530,
		maxHeight: 530,

		backgroundColor: '#161616',

		// 	show: false, // Для отображения только после загрузки

		resizable: false,

		webPreferences: {
			// sandbox: true, // breaks @electron/remote import
			devTools: false,
			preload: path.join(__dirname, 'preload.js'),
			enableRemoteModule: true,
			contextIsolation: true
		},

		icon: path.join(__dirname, '/icons/icon.png')
	})

	mainWindow.loadFile('index.html')

	// Отображение окна только после загрузки
	// 	mainWindow.once('ready-to-show', () => {
	// 		mainWindow.show() 
	// 	})

	// mainWindow.webContents.openDevTools()

	enableRemote(mainWindow.webContents)
}

app.whenReady().then(() => {
	createWindow()

	app.on('activate', function () {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit()
})