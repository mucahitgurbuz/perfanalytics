const mustache = require('mustache');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const readlineSync = require('readline-sync');

const outputPath = path.resolve(__dirname, 'config.json');

const previousConfig = fs.existsSync(outputPath) && JSON.parse(fs.readFileSync(outputPath, 'utf8'));

const values = {
  version: process.env.npm_package_version,
  database: {},
  rootDir: process.cwd(),
};

function setValue(prevNode, valueName, keyName, question) {
  let previousValue = previousConfig;
  let key;

  if (previousConfig) {
    key = prevNode.shift();
    while (key) {
      previousValue = previousValue[key] || null;
      key = prevNode.shift();
    }
  }

  if (!previousValue) {
    values[valueName] = readlineSync.question(question);
    return;
  }

  const answer = readlineSync.question(
    `${keyName} was entered as '${previousValue}' previuosly. Do you want to keep it ? [Y/n] `
  );

  if (answer === 'n') {
    values[valueName] = readlineSync.question(question);
    return;
  }

  values[valueName] = previousValue;
}

fs.readFile(path.resolve(__dirname, 'templates', 'config.mustache'), (err, serverConfigTemplate) => {
  if (err) {
    console.error(err);
    process.exit();
  }

  setValue(['database', 'dbName'], 'dbName', 'Database name', 'Enter database name : ');
  setValue(['database', 'userName'], 'dbUserName', 'Database user name', 'Enter database username : ');
  setValue(['database', 'password'], 'dbPassword', 'Database password', 'Enter database password : ');
  setValue(['database', 'url'], 'dbUrl', 'Database url', 'Enter database url : ');
  setValue(['database', 'port'], 'dbPort', 'Database port', 'Enter database port : ');
  setValue(
    ['api', 'port'],
    'apiPort',
    'Port that the web service runs on',
    'At which port should the web service run on? : '
  );
  setValue(
    ['api', 'url'],
    'apiUrl',
    'Url that the web service runs on',
    'At which url should the web service run on? : '
  );

  // TODO add api protocol

  const clientConfigTemplate = fs.readFileSync(path.resolve(__dirname, 'templates', 'client-config.mustache'));

  fs.writeFileSync(
    path.resolve(__dirname, 'server', 'server-config.json'),
    mustache.render(serverConfigTemplate.toString(), values)
  );
  fs.writeFileSync(
    path.resolve(__dirname, 'client', 'src', 'client-config.js'),
    mustache.render(clientConfigTemplate.toString(), values)
  );
});
