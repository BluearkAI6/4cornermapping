// 全局變量，存儲四角號碼與漢字的映射
// Global variable, storing the mapping between four-corner codes and Chinese characters
var fourCornerMap = {};

function loadFourCornerMap() {
  // 讀取GoogleDrive的對照表
  // Read the comparison table from Google Drive
  var folder = DriveApp.getFolderById('***YOUR-FOLDER-ID-HERE***').getFoldersByName('***YOUR-FOLDER-NAME-HERE***').next();
  var file = folder.getFilesByName('4-Corner_Map.txt').next();
  var content = file.getBlob().getDataAsString('UTF-8'); // 使用 UTF-8讀取 // Read using UTF-8

  // 解析內容，構建映射
  // Parse the content, build the mapping
  var lines = content.split('\n');
  for (var i = 0; i < lines.length; i++) {
    var parts = lines[i].split('\t');
    var code = parts[0];
    var character = parts[1];
    if (!fourCornerMap[code]) {
      fourCornerMap[code] = [];
    }
    fourCornerMap[code].push(character);
  }
}

// 根據漢字查找四角號碼
// Find the four-corner code based on Chinese characters
function findCodeByCharacter(characters) {
  loadFourCornerMap();
  var codes = [];
  for (var i = 0; i < characters.length; i++) {
    var character = characters.charAt(i);
    var codeFound = false;
    for (var code in fourCornerMap) {
      if (fourCornerMap[code].includes(character)) {
        codes.push(code);
        codeFound = true;
        break;
      }
    }
    if (!codeFound) {
      codes.push('未找到對應的四角號碼');
    }
  }
  return codes.join(', ');
}

// 根據四角號碼查找漢字
// Find Chinese characters based on the four-corner code
function findCharactersByCode(code) {
  loadFourCornerMap();
  return fourCornerMap[code] || '未找到對應的漢字';
}

// 渲染HTML頁面
// Render HTML page
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}
