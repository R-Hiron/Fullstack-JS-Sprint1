const { program } = require('commander');
const fs = require('fs-extra');
const path = require('path');
const crc = require('crc');

// File Paths for default/basic files
const configPath = path.join(__dirname, 'config', 'default.json');
const tokensPath = path.join(__dirname, 'config', 'tokens.json');
const logPath = path.join(__dirname, 'logs', 'events.log');
const helpFilePath = path.join(__dirname, 'config', 'help.txt');

// Function to help with keeping consistent and precise logging with timestamps
const log = (message) => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} - ${message}\n`)
  fs.appendFileSync(logPath, `${timestamp} - ${message}\n`);
};

// default Config
const defaultConfig = {
  app: {
    name: 'CLI WebApp',
    version: '1.0.0'
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

      // creates the directorys if either "init --mk" or "init --all" options are called
      if (options.all || options.mk)
      {
        // Ensure directories exist
        fs.ensureDirSync(path.join(__dirname, 'config'));
        fs.ensureDirSync(path.join(__dirname, 'logs'));
        log('Created folder structure.');
      }
      // Writing help and default files if either "init --cat" or "init --all" options are called
      if (options.all || options.cat)
      {
        fs.writeJsonSync(configPath, defaultConfig, { spaces: 2 });
        fs.writeJsonSync(tokensPath, { confirmations: [] }, { spaces: 2 });
        
        // Default Help File 
        const helpContent = `CLI WebApp Help:

Usage: cli [command] [options]

Commands:
  init [options]        Initialize the application
  config [options]      Manage configuration
  token [options]       Manage tokens
  help [command]        display help for command`;

        fs.writeFileSync(helpFilePath, helpContent);
        log('Created config file and help file.');
      }
      fs.ensureFileSync(logPath);
      log('Application initialized.');
    })
    .on('--help', () => {
      console.log(`
Examples:
  init --all       Initialize the application with all components
  init --mk        Create only the folder structure
  init --cat       Create the config file with default settings and the help files`);
});


// Config
program
  .command('config')
  .description('Manage configuration settings')
    .option('--show', 'Display current configuration')
    .option('--reset', 'Reset configuration to default settings')
    .option('--set <key=Value>', 'Set a specific configuration setting')
    .action((options) => {
      if (options.show)
      {
        const config = fs.readJsonSync(configPath);
        console.log(config);
        log('Displayed current configuration.');
      }
      else if (options.reset)
      {
        fs.writeJsonSync(configPath, defaultConfig, { spaces: 2 });
        log('Reset configuration to default settings.');
      }
      else if (options.set)
      {
        const [key, value] = options.set.split('=');
        const config = fs.readJsonSync(configPath);
        const keys = key.split('.');
        let obj = config;

        while (keys.length > 1)
        {
          const k = keys.shift();
          obj = obj[k] = obj[k] || {};
        }

        obj[keys[0]] = value;
        fs.writeJsonSync(configPath, config, { spaces: 2 });
        log(`Set configuration: ${key}=${value}`);
      }
    })
  .on('--help', () => {
    console.log(`
Examples:
  $ myapp config --show                      Display the current configuration settings
  $ myapp config --reset                     Reset the configuration to default settings
  $ myapp config --set key=value             Set a specific configuration setting`);
});

  // Token
program
  .command('token')
  .description('Manage tokens')
    .option('--count', 'Display a count of the tokens created')
    .option('--new <username>', 'Generate a new token for a given username')
    .option('--upd-email <username-email>', 'Update user email for a given username')
    .option('--upd-phone <username-phone>', 'Update user phone number for a given username')
    .option('--search-username <username>', 'Search for a token by username')
    .option('--search-email <email>', 'Search for a token by email')
    .option('--search-phone <phone>', 'Search for a token by phone number')
    .action((option) => {
    const tokens = fs.readJsonSync(tokensPath);
    const { confirmations } = tokens;

    if (option.count)
    {
      console.log(`Number of tokens: ${confirmations.length}`);
      log('Displayed token count.');
    }
    else if (option.new) 
    {
      const username = option.new;
      const existingUser = confirmations.find(user => user.username === username);
      if (existingUser)
      {
        console.log(`Token already exists for username: ${username}`);
        log(`Attempted to generate duplicate token for username: ${username}`);
      }
      else
      {
        const token = crc.crc32(username).toString(16);
        const createdAt = new Date().toISOString();
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days from creation date & Time
        confirmations.push({ username, email: null, phone: null, token, createdAt, expiresAt });
        fs.writeJsonSync(tokensPath, tokens, { spaces: 2 });
        console.log(`Token for ${username}: ${token}`);
        log(`Generated token for ${username}: ${token}`);
      }
    }
    else if (option.updEmail)
    {
      const parts = option.updEmail.split('-');
      const username = parts[0];
      const email = parts[1];
      console.log(username, email);
      const user = confirmations.find(user => user.username === username);
      if (user)
      {
        user.email = email;
        fs.writeJsonSync(tokensPath, tokens, { spaces: 2 });
        console.log(`Updated email for ${username}: ${email}`);
        log(`Updated email for ${username}: ${email}`);
      }
      else
      {
        console.log(`User ${username} not found.`);
      }
    }
    else if (option.updPhone)
    {
      const parts = option.updPhone.split('-');
      const username = parts[0];
      const phone = parts[1];
      console.log(username, phone);
      const user = confirmations.find(user => user.username === username);
      if (user)
      {
        user.phone = phone;
        fs.writeJsonSync(tokensPath, tokens, { spaces: 2 });
        console.log(`Updated phone number for ${username}: ${phone}`);
        log(`Updated phone number for ${username}: ${phone}`);
      }
      else
      {
        console.log(`User ${username} not found.`);
      }
    }
    else if (option.searchUsername)
    {
      const username = option.searchUsername;
      const user = confirmations.find(user => user.username === username);
      if (user)
      {
        console.log(user);
      }
      else
      {
        console.log(`User ${username} not found.`);
      }
    }
    else if (option.searchEmail)
    {
      const email = option.searchEmail;
      const user = confirmations.find(user => user.email === email);
      if (user)
      {
        console.log(user);
      }
      else
      {
        console.log(`User with email ${email} not found.`);
      }
    }
    else if (option.searchPhone)
    {
      const phone = option.searchPhone;
      const user = confirmations.find(user => user.phone === phone);
      if (user)
      {
        console.log(user);
      }
      else
      {
        console.log(`User with phone number ${phone} not found.`);
      }
    }
  })
  .on('--help', () => {
    console.log(`
Examples:
  $ myapp token --count                       Display a count of the tokens created
  $ myapp token --new <username>              Generate a new token for a given username
  $ myapp token --upd-email <username-email> Update user email for a given username
  $ myapp token --upd-phone <username-phone> Update user phone number for a given username
  $ myapp token --search-username <username>  Search for a token by username
  $ myapp token --search-email <email>        Search for a token by email
  $ myapp token --search-phone <phone>        Search for a token by phone number
`);
});

program.parse(process.argv);
