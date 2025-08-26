const fs = require('fs-extra');
const config = require('../config.json');

module.exports = {
    name: 'autosystem',
    aliases: ['auto', 'autotyping', 'autorecording', 'autoreact', 'autoviewstatus', 'antilink'],
    description: 'Control auto system features',
    category: 'Auto System',
    usage: '.autotyping on/off | .autorecording on/off | .autoreact on/off | .autoviewstatus on/off | .antilink on/off',
    ownerOnly: true,
    
    async execute(sock, message, args, { chatId, sender, isOwner, config: botConfig }) {
        try {
            const command = message.message?.conversation?.split(' ')[0]?.replace('.', '').toLowerCase() || 
                           message.message?.extendedTextMessage?.text?.split(' ')[0]?.replace('.', '').toLowerCase();
            
            if (!args[0]) {
                return await sock.sendMessage(chatId, {
                    text: `❌ *Invalid Usage!*\n\n` +
                          `Please specify on/off\n\n` +
                          `*Available Commands:*\n` +
                          `• .autotyping on/off\n` +
                          `• .autorecording on/off\n` +
                          `• .autoreact on/off\n` +
                          `• .autoviewstatus on/off\n` +
                          `• .antilink on/off\n\n` +
                          `👑 Developed By: Ali Hamza\n` +
                          `⚡ Powered By: AF Cyber Force`
                });
            }
            
            const action = args[0].toLowerCase();
            if (action !== 'on' && action !== 'off') {
                return await sock.sendMessage(chatId, {
                    text: `❌ *Invalid Action!*\n\nPlease use 'on' or 'off'\n\n👑 Developed By: Ali Hamza\n⚡ Powered By: AF Cyber Force`
                });
            }
            
            const status = action === 'on';
            let feature = '';
            let configKey = '';
            
            switch (command) {
                case 'autotyping':
                    feature = 'Auto Typing';
                    configKey = 'autoTyping';
                    break;
                case 'autorecording':
                    feature = 'Auto Recording';
                    configKey = 'autoRecording';
                    break;
                case 'autoreact':
                    feature = 'Auto React';
                    configKey = 'autoReact';
                    break;
                case 'autoviewstatus':
                    feature = 'Auto View Status';
                    configKey = 'autoViewStatus';
                    break;
                case 'antilink':
                    feature = 'Anti Link';
                    configKey = 'antiLink';
                    break;
                default:
                    return await sock.sendMessage(chatId, {
                        text: `❌ *Unknown Command!*\n\n👑 Developed By: Ali Hamza\n⚡ Powered By: AF Cyber Force`
                    });
            }
            
            // Update config
            botConfig[configKey] = status;
            
            // Save to file
            await fs.writeJson('./config.json', botConfig, { spaces: 2 });
            
            // Update global config
            Object.assign(config, botConfig);
            
            await sock.sendMessage(chatId, {
                text: `✅ *${feature} ${status ? 'Enabled' : 'Disabled'}!*\n\n` +
                      `${feature} has been ${status ? 'turned on' : 'turned off'} successfully.\n\n` +
                      `👑 Developed By: Ali Hamza\n` +
                      `⚡ Powered By: AF Cyber Force`
            });
            
        } catch (error) {
            console.error('Error in autosystem command:', error);
            await sock.sendMessage(chatId, {
                text: `❌ *Error!*\n\nAn error occurred while updating the setting.\n\n👑 Developed By: Ali Hamza\n⚡ Powered By: AF Cyber Force`
            });
        }
    }
};

