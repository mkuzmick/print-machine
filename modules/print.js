var marked = require('marked');
var puppeteer = require('puppeteer');
const fs = require('fs-extra')
var pkg = require('../package.json');
var Configstore = require('configstore');
var conf = new Configstore(pkg.name);
var cp = require('child_process');
var conversions = require('./conversions');
const chalk = require('chalk');

exports.makeHtml = async function (configuration){
  console.log("we're going to print the markdown for " + configuration.inputPath + " with the css file " + configuration.css + '\n\n');
  var html = await conversions.mdToHtml(configuration.inputPath, configuration);
  var htmlFilePath = (__basedir + '/output/md-output.html')
  await fs.writeFile(htmlFilePath, html, 'utf8');
  console.log("just fired the function");
  cp.spawn('/usr/bin/open', ['-a', "Google\ Chrome.app", (__basedir + '/output/md-output.html')])
  return htmlFilePath
}

exports.makePdf = function(configuration) {
  console.log("making pdf with \n\n" + JSON.stringify(configuration, null, 4));

}

exports.onPaper = function(configuration) {
  console.log(chalk.cyan("firing onPaper"));
  return {
    file: "new path",
    configuration: "new configuration"
  }
}

exports.bundle = function(configuration) {
  console.log(chalk.cyan("firing the bundler"));
  return {
    bundlePath: "new path",
    contents: "bundle contenst here as array or object of arrays",
    configuration: "new configuration"
  }
}
