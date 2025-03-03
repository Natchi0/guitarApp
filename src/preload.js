const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld("versions", {
    chrome: () => process.versions.chrome,
    ping: () => ipcRenderer.invoke('ping')
})
