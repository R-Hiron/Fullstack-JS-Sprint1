const { program } = require('commander');
const fs = require('fs-extra');
const path = require('path');
const crc = require('crc');

const configPath = path.join(__dirname, 'config', 'default.json');
const logPath = path.join(__dirname, 'logs', 'events.log');
const helpFilePath = path.join(__dirname, 'config', 'help.txt');

// Function to help with keeping consistent and precise logging with timestamps
const log = (message) => {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(logPath, `${timestamp} - ${message}\n`);
};

// default Config
const defaultConfig = {
  app: {
    name: 'CLI WebApp',
    version: '1.0.0'
  },
  user: {
    confirmations: []
  }
};

// init
program
  .command('init')
  .description('Initialize the application')
  .option('--all', 'Creates the folder structure and the config and help files')
  .option('--mk', 'Creates the folder structure')
  .option('--cat', 'Creates the config file with default settings and the help files')
  .action((options) => {
    console.log('Initializing application...');

    // Makes sure the directorys are created if either "init --mk" or "init --all" options are called
    if (options.all || options.mk) {
      // Ensure directories exist
      fs.ensureDirSync(path.join(__dirname, 'config'));
      fs.ensureDirSync(path.join(__dirname, 'logs'));
      log('Created folder structure.');
      console.log('Created folder structure.');
    }
    // Writing help and default files if either "init --cat" or "init --all" options are called
    if (options.all || options.cat) {
      fs.writeJsonSync(configPath, defaultConfig, { spaces: 2 });

      // *** NEEDS CHANGING || NOT FINISHED ***
      const helpContent = `CLI WebApp Help:
Commands:
  init                  Initialize the application
  view-config           View current configuration
  update-config <key> <value>  Update configuration
  generate-token <username>    Generate a token for user confirmation
  help [command]        display help for command
`;
      fs.writeFileSync(helpFilePath, helpContent);
      log('Created config file and help file.');
      console.log('Created config file and help file.');
    }
    fs.ensureFileSync(logPath);
    log('Application initialized.');
    console.log('Application initialized.');
  })
    .on('--help', () => {
      console.log(`
Examples:
  $ myapp init --all       Initialize the application with all components
  $ myapp init --mk        Create only the folder structure
  $ myapp init --cat       Create the config file with default settings and the help files
      `);
  });


// Config
program
  .command('config')
  .description('Manage configuration settings')
  .option('--show', 'Display current configuration')
  .option('--reset', 'Reset configuration to default settings')
  .option('--set <key> <value>', 'Set a specific configuration setting')
  .action((options) => {
    if (options.show) {
      const config = fs.readJsonSync(configPath);
      console.log(config);
      log('Displayed current configuration.');
    } else if (options.reset) {
      fs.writeJsonSync(configPath, defaultConfig, { spaces: 2 });
      log('Reset configuration to default settings.');
      console.log('Configuration reset to default settings.');
    } else if (options.set) {
      const [key, value] = options.set;
      const config = fs.readJsonSync(configPath);
      const keys = key.split('.');
      let obj = config;

      while (keys.length > 1) {
        const k = keys.shift();
        obj = obj[k] = obj[k] || {};
      }

      obj[keys[0]] = value;
      fs.writeJsonSync(configPath, config, { spaces: 2 });
      log(`Set configuration: ${key}=${value}`);
      console.log('Configuration updated.');
    }
  })
  .on('--help', () => {
    console.log(`
Examples:
  $ myapp config --show                      Display the current configuration settings
  $ myapp config --reset                     Reset the configuration to default settings
  $ myapp config --set app.name "New CLI App" Set a specific configuration setting
    `);
  });


// Need token generation portion 


program.parse(process.argv);
