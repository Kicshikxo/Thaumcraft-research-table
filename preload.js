// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const { contextBridge } = require('electron')
const { BrowserWindow } = require('@electron/remote')

contextBridge.exposeInMainWorld('control', {
	minimize: () => {
		BrowserWindow.getFocusedWindow().minimize()
	},
	close: () => {
		BrowserWindow.getFocusedWindow().close()
	}
})
