var pkg = require('../package.json');
var Configstore = require('configstore');
var conf = new Configstore(pkg.name);
const chalk = require('chalk');

exports.configure = function(yargs){
  console.log("building configuration with:\n" + JSON.stringify(yargs, null, 4));
  const inputPath = yargs.md ? yargs.md
    : yargs._[0] ? yargs._[0]
    : conf.get('defaultMarkdownFile') ? conf.get('defaultMarkdownFile')
    : (__basedir + '/.tests/testfile.md');
  var cssPath = yargs.css ? yargs.css
    : yargs.darkmode ? (__basedir + '/styles/default-dark.css')
    : conf.get('css') ? conf.get('css')
    : (__basedir + '/styles/default.css');
// TODO: create a new directory in the default root folder (or specified root) based on name of md file.
  const outputDirectoryPath = yargs.o ? yargs.o
    : conf.get('output') ? conf.get('output')
    : (__basedir + '/output' + '/filename');
  var configuration = {
    css: cssPath,
    inputPath: inputPath,
    outputDir: outputDirectoryPath,
    pdf: yargs.pdf,
    html: yargs.html,
    paper: yargs.paper,
  }
  return configuration;
}

exports.setDefaults = function(yargs){
  if (yargs.outputDir) {
    conf.set('outputDir', yargs.outputDir)
  }
  if (yargs.css) {
    conf.set('css', yargs.css)
  }
  if (yargs.paperSize) {
    conf.set('paperSize', yargs.paperSize)
  }
  if (yargs.pdf) {
    if (yargs.pdf=="true" || yargs.pdf==true) {
      conf.set('pdf', true)
    } else if (yargs.pdf=="false" || yargs.pdf==false) {
      conf.set('pdf', false)
    } else { console.log(yargs.pdf + " doesn't seem to be a valid value for --pdf.  Try again?");}
  }
  if (yargs.html) {
    if (yargs.html=="true" || yargs.html==true) {
      conf.set('html', true)
    } else if (yargs.html=="false" || yargs.html==false) {
      conf.set('html', false)
    } else { console.log(yargs.html + " doesn't seem to be a valid value for --html.  Try again?");}
  }
  console.log("Here are your current defaults.");
  console.log(chalk.cyan(JSON.stringify(conf.all, null, 4)));
  console.log("To change any of these, run print with the --settings flag along with --key=value args for anything you'd like to set");
}
