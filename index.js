const util = require('util');
const config = require('./config/serverConfig');
const app = require('./config/express');
const fs = require('fs');
const db = require('./config/mongo')
const { execSync } = require('child_process');
const execOptions = { encoding: 'utf-8', windowsHide: true };
let key = './certs/key.pem';
let certificate = './certs/certificate.pem';

if (!fs.existsSync(key) || !fs.existsSync(certificate)) {
  try {
    execSync('openssl version', execOptions);
    execSync(
      `openssl req -x509 -newkey rsa:2048 -keyout ./certs/key.tmp.pem -out ${certificate} -days 365 -nodes -subj "/C=US/ST=Foo/L=Bar/O=Baz/CN=atsjobopening.web.app"`,
      execOptions
    );
    execSync(`openssl rsa -in ./certs/key.tmp.pem -out ${key}`, execOptions);
    execSync('rm ./certs/key.tmp.pem', execOptions);
  } catch (error) {
    console.error(error);
  }
}

const options = {
  key: fs.readFileSync(key),
  cert: fs.readFileSync(certificate),
  passphrase: 'password'
};
const server = require('https').createServer(options, app);

if (!module.parent) {
  server.listen(config.port, () => {
    console.info(`server started on port ${config.port} (${config.env})`); // eslint-disable-line no-console
  });
}

module.exports = app;