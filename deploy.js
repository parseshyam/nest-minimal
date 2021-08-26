const fs = require('fs');
const s = require('shelljs');
const CURR_ENV = s.env.NODE_ENV;

if (!CURR_ENV) {
    console.log("PLEASE SET YOU NODE ENV");
    process.exit(1);
}

console.clear();
s.echo(`SELECTED ENVIROMENT: ${CURR_ENV.toUpperCase()}`);

s.echo("1. CHECKING ENVIROMENT FILE...");
const isEnvExists = fs.existsSync(`.${process.env.NODE_ENV}.env`);
if (!isEnvExists) {
    console.log(`ENV MISSING PLEASE ADD ENV FILE -> .${process.env.NODE_ENV}.env`);
    process.exit(1);
}
s.rm('-rf', 'build');

s.echo("2. GENERATING BUILD...");
s.mkdir('build');
s.exec("tsc");

s.echo(`3. SETTING UP ${CURR_ENV.toUpperCase()} ENVIROMENT...`);
s.cp(`.${process.env.NODE_ENV}.env`, `build/.${process.env.NODE_ENV}.env`);

s.echo(`4. SETTING UP ${CURR_ENV.toUpperCase()} LOCALES...`);
s.cp("-rf", 'src/locales', 'build/src/locales');

s.echo(`5. STARTING ${CURR_ENV.toUpperCase()} SERVER...`);
s.exec(`pm2 delete ${CURR_ENV.toUpperCase()}`);
s.exec(`cross-env NODE_ENV=${CURR_ENV} pm2 start build/src/main.js --name ${CURR_ENV.toUpperCase()}`);
