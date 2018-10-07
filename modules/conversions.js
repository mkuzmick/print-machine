const fse = require('fs-extra');
const puppeteer = require('puppeteer');
const marked = require('marked');

exports.mdToHtml = async function (url, config) {
    marked.setOptions({
      gfm: true,
      breaks: true
    })
    const markdown = await fse.readFile(url, 'utf-8');
    const cssString = await fse.readFile(config.css, 'utf-8');
    var html = "<style>" + cssString + "</style>" + "<body>" + marked(markdown) + "</body>";
    return html;
};

exports.htmlToFile = async function (string, path) {
  console.log("saving to " + path);
  return {
    folderPath: path,
    htmlPath: "coming soon",
    cssPath: "coming soon",
    images: [{
      path: "coming soon",
      info: "maybe"
    }],
    jsonPath: "coming soon"
  };
}

exports.mdToPdf =

exports.pdfToPaper = function(path){
  console.log("going to print " + path);
  cp.spawn('lpr', [path]);
}

exports.htmlFileToPdf = async function (url, outputPath) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const filePath = "file://" + url;
    await page.goto(filePath, {waitUntil: 'networkidle2'});
    await page.emulateMedia('screen');
    await page.pdf({
      path: outputPath,
      format: 'letter',
      printBackground: true
    });
    await browser.close();
    return outputPath
  } catch (e) {
    console.log("our error: " + e);
  }
}

exports.pdfFromMarkdown = async function (path, outputPath, css) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const markdown = await readFile(path, 'utf-8');
    console.log(markdown);
    var html = marked(markdown);
    var styles = fs.readFileSync(css);
    html = "<style>" + styles + "</style><body>" + html + "</body>";
    await page.setContent(html);
    await page.emulateMedia('screen');
    await page.pdf({
      path: outputPath,
      format: 'letter',
      printBackground: true
    });
    console.log(html);
    await browser.close();
    process.exit();
  } catch (e) {
    console.log("our error: " + e);
  }
}
