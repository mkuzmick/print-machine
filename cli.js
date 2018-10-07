#!/usr/bin/env node
global.__basedir = __dirname;
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
var pkg = require('./package.json');
var Configstore = require('configstore');
var conf = new Configstore(pkg.name);
// TODO: add settings to yargs, default false for html, pdf, file, etc.---or not?  also handle no -f flag ( use yargs._[0])



var yargs = require('yargs')
  .alias('s', 'settings')
  .alias('f', 'file')
  .argv
const configurator = require('./modules/configurator');
const print = require('./modules/print');
var configuration = configurator.configure(yargs);

// clear terminal and display interface
clear();
console.log(
  chalk.bold.magenta(
    figlet.textSync('printMachine', { horizontalLayout: 'full'})
  ) + '\n\n'
);

console.log("yargs are: ");
console.log(chalk.magenta(JSON.stringify(yargs, null, 4)));

// note configuration
console.log("the configuration is:\n\n" + chalk.blue(JSON.stringify(configuration, null, 4)) );

if (yargs.pdf || conf.get('pdf')==true) {
  print.makePdf(configuration);
}

if (yargs.html || conf.get('html')==true) {
  print.makeHtml(configuration);
}

if (yargs.paper) {
  print.onPaper(configuration);
}

if (yargs.bundle) {
  print.bundle(configuration);
}

if (yargs.config || yargs.settings) {
  configurator.setDefaults(yargs);
}
