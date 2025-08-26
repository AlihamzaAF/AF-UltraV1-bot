const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

// Load all commands from commands directory
async function loadCommands() {
    try {
        const commandsPath = path.join(__dirname, '../commands');
        
        // Ensure commands directory exists
        await fs.ensureDir(commandsPath);
        
        // Get all JavaScript files in commands directory
        const commandFiles = await fs.readdir(commandsPath);
        const jsFiles = commandFiles.filter(file => file.endsWith('.js'));
        
        // Clear existing commands
        global.commands = new Map();
        
        let loadedCount = 0;
        
        for (const file of jsFiles) {
            try {
                const filePath = path.join(commandsPath, file);
                
                // Clear require cache to allow hot reloading
                delete require.cache[require.resolve(filePath)];
                
                // Load command
                const command = require(filePath);
                
                // Validate command structure
                if (!command.name || typeof command.execute !== 'function') {
                    console.warn(chalk.yellow(`⚠️  Invalid command file: ${file}`));
                    continue;
                }
                
                // Set default values
                command.ownerOnly = command.ownerOnly || false;
                command.premiumOnly = command.premiumOnly || false;
                command.groupOnly = command.groupOnly || false;
                command.privateOnly = command.privateOnly || false;
                command.description = command.description || 'No description available';
                command.usage = command.usage || command.name;
                command.category = command.category || 'General';
                command.aliases = command.aliases || [];
                
                // Register main command
                global.commands.set(command.name.toLowerCase(), command);
                
                // Register aliases
                if (command.aliases && Array.isArray(command.aliases)) {
                    for (const alias of command.aliases) {
                        global.commands.set(alias.toLowerCase(), command);
                    }
                }
                
                loadedCount++;
                console.log(chalk.green(`✅ Loaded command: ${command.name}`));
                
            } catch (error) {
                console.error(chalk.red(`❌ Error loading command ${file}:`), error.message);
            }
        }
        
        console.log(chalk.cyan(`📦 Total commands loaded: ${loadedCount}`));
        
    } catch (error) {
        console.error(chalk.red('❌ Error loading commands:'), error);
    }
}

// Get commands by category
function getCommandsByCategory() {
    const categories = {};
    
    for (const [name, command] of global.commands) {
        // Skip aliases, only include main command names
        if (name !== command.name.toLowerCase()) continue;
        
        const category = command.category || 'General';
        
        if (!categories[category]) {
            categories[category] = [];
        }
        
        categories[category].push(command);
    }
    
    return categories;
}

// Get command info
function getCommandInfo(commandName) {
    return global.commands.get(commandName.toLowerCase());
}

// Reload commands
async function reloadCommands() {
    console.log(chalk.blue('🔄 Reloading commands...'));
    await loadCommands();
    console.log(chalk.green('✅ Commands reloaded successfully!'));
}

module.exports = {
    loadCommands,
    getCommandsByCategory,
    getCommandInfo,
    reloadCommands
};

