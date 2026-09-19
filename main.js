const { app, BrowserWindow, session } = require('electron');
const path = require('path');
function createWindow(){
  const win = new BrowserWindow({width:1440,height:950,minWidth:1050,minHeight:700,title:'PROTOCOLL SAKHA',backgroundColor:'#e2e8f0',webPreferences:{nodeIntegration:false,contextIsolation:true,sandbox:true}});
  win.removeMenu();
  win.loadFile(path.join(__dirname,'index.html'));
}
app.whenReady().then(()=>{
  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback)=>{
    const url=details.url||'';
    if(/^https?:\/\//i.test(url) && !/^(https?:\/\/localhost|https?:\/\/127\.0\.0\.1)/i.test(url)){callback({cancel:true});return;}
    callback({requestHeaders:details.requestHeaders});
  });
  createWindow();
  app.on('activate',()=>{if(BrowserWindow.getAllWindows().length===0)createWindow();});
});
app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit();});
