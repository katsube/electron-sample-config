/**
 * ウィンドウの位置とサイズを復元するサンプル
 *
 */

//------------------------------------
// モジュール
//------------------------------------
const { app, BrowserWindow, ipcMain, screen } = require('electron')
const Store = require('electron-store')
const store = new Store()

//------------------------------------
// 定数
//------------------------------------
// ウィンドウのデフォルトサイズ
const DEFAULT_SIZE = {
  width: 800,
  height: 600
}

//------------------------------------
// グローバル変数
//------------------------------------
// ウィンドウ管理用
let mainWin


/**
 * ウィンドウを作成する
 */
function createWindow () {
  const pos  = store.get('window.pos')  || getCenterPosition();
  const size = store.get('window.size') || [DEFAULT_SIZE.width, DEFAULT_SIZE.height];

  // ウィンドウを新たに開く
  mainWin = new BrowserWindow({
    show: false,
    width: size[0],
    height: size[1],
    x: pos[0],
    y: pos[1],
    webPreferences: {
      nodeIntegration: true
    }
  })

  // ウィンドウ内に指定HTMLを表示
  mainWin.loadFile('public/index.html')

  // 準備が整ったら表示
  mainWin.once('ready-to-show', () => {
    mainWin.show()
  })

  // ウィンドウが閉じられる直前に実行
  mainWin.on('close', ()=>{
    store.set('window.pos', mainWin.getPosition())  // ウィンドウの座標を記録
    store.set('window.size', mainWin.getSize())     // ウィンドウのサイズを記録
  })
}

//------------------------------------
// [app] イベント処理
//------------------------------------
// 初期化が終了したらウィンドウを新規に作成する
app.whenReady().then(()=>{
  createWindow();
})


// すべてのウィンドウが閉じられたときの処理
app.on('window-all-closed', () => {
  // macOS以外はアプリを終了する
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// アプリがアクティブになった時の処理
// (macOSはDocのアイコンがクリックされたとき）
app.on('activate', () => {
  // ウィンドウがすべて閉じられている場合は新しく開く
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

//------------------------------------
// ipc通信
//------------------------------------
// 「リセット」ボタン押下
ipcMain.handle('window-reset', async (event, data) => {
  const pos = getCenterPosition();
  mainWin.setSize(DEFAULT_SIZE.width, DEFAULT_SIZE.height);
  mainWin.setPosition(pos[0], pos[1]);

  return(true);
});


/**
 * ウィンドウの中央の座標を返却
 *
 * @return {array}
 */
function getCenterPosition(){
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  const x = Math.floor( (width - DEFAULT_SIZE.width) / 2)
  const y = Math.floor( (height - DEFAULT_SIZE.height) / 2)
  return([x, y]);
}