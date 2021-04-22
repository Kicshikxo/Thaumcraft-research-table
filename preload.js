// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const { contextBridge, remote } = require('electron')

contextBridge.exposeInMainWorld('control', {
	minimize: () => {
		remote.BrowserWindow.getFocusedWindow().minimize()
	},
	close: () => {
		remote.BrowserWindow.getFocusedWindow().close()
	}
})
