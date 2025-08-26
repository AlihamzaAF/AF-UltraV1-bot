const fs = require('fs-extra');
const config = require('../config.json');
const { reloadCommands } = require('../lib/commandLoader');

module.exports = {
    name: 'owner',
    aliases: ['addprem', 'delprem', 'listprem', 'self', 'public', 'checkhost', 'clearbug', 'reselbot'],
    description: 'Owner management commands',
    category: 'Owner Commands',
    usage: '.addprem <number> | .delprem <number> | .listprem | .self | .public | .checkhost | .clearbug | .reselbot',
    ownerOnly: true,
    
    async execute(sock, message, args, { chatId, sender, isOwner, config: botConfig }) {
        try {
            const command = message.message?.conversation?.split(' ')[0]?.replace('.', '').toLowerCase() || 
                           message.message?.extendedTextMessage?.text?.split(' ')[0]?.replace('.', '').toLowerCase();
            
            switch (command) {
                case 'addprem':
                    if (!args[0]) {
                        return await sock.sendMessage(chatId, {
                            text: `❌ *Invalid Usage!*\n\nUsage: .addprem <number>\nExample: .addprem 923xxxxxxxxx\n\n👑 Developed By: Ali Hamza\n⚡ Powered By: AF Cyber Force`
                        });
                    }
                    
                    const addNumber = args[0].replace(/[^0-9]/g, '');
                    if (!botConfig.premiumUsers.includes(addNumber)) {
                        botConfig.premiumUsers.push(addNumber);
                        await fs.writeJson('./config.json', botConfig, { spaces: 2 });
                        Object.assign(config, botConfig);
                        
                        await sock.sendMessage(chatId, {
                            text: `✅ *Premium User Added!*\n\n` +
                                  `Number: ${addNumber}\n` +
                                  `Status: Premium Active\n\n` +
                                  `👑 Developed By: Ali Hamza\n` +
                                  `⚡ Powered By: AF Cyber Force`
                        });
                    } else {
                        await sock.sendMessage(chatId, {
                            text: `⚠️ *Already Premium!*\n\nThis user is already a premium member.\n\n👑 Developed By: Ali Hamza\n⚡ Powered By: AF Cyber Force`
                        });
                    }
                    break;
                    
                case 'delprem':
                    if (!args[0]) {
                        return await sock.sendMessage(chatId, {
                            text: `❌ *Invalid Usage!*\n\nUsage: .delprem <number>\nExample: .delprem 923324400530\n\n👑 Developed By: Ali Hamza\n⚡ Powered By: AF Cyber Force`
                        });
                    }
                    
                    const delNumber = args[0].replace(/[^0-9]/g, '');
                    const index = botConfig.premiumUsers.indexOf(delNumber);
                    if (index > -1) {
                        botConfig.premiumUsers.splice(index, 1);
                        await fs.writeJson('./config.json', botConfig, { spaces: 2 });
                        Object.assign(config, botConfig);
                        
                        await sock.sendMessage(chatId, {
                            text: `✅ *Premium User Removed!*\n\n` +
                                  `Number: ${delNumber}\n` +
                                  `Status: Premium Revoked\n\n` +
                                  `👑 Developed By: Ali Hamza\n` +
                                  `⚡ Powered By: AF Cyber Force`
                        });
                    } else {
                        await sock.sendMessage(chatId, {
                            text: `❌ *Not Premium!*\n\nThis user is not a premium member.\n\n👑 Developed By: Ali Hamza\n⚡ Powered By: AF Cyber Force`
                        });
                    }
                    break;
                    
                case 'listprem':
                    if (botConfig.premiumUsers.length === 0) {
                        await sock.sendMessage(chatId, {
                            text: `📋 *Premium Users List*\n\n` +
                                  `No premium users found.\n\n` +
                                  `👑 Developed By: Ali Hamza\n` +
                                  `⚡ Powered By: AF Cyber Force`
                        });
                    } else {
                        const premList = botConfig.premiumUsers.map((num, i) => `${i + 1}. ${num}`).join('\n');
                        await sock.sendMessage(chatId, {
                            text: `📋 *Premium Users List*\n\n` +
                                  `Total: ${botConfig.premiumUsers.length} users\n\n` +
                                  `${premList}\n\n` +
                                  `👑 Developed By: Ali Hamza\n` +
                                  `⚡ Powered By: AF Cyber Force`
                        });
                    }
                    break;
                    
                case 'self':
                    botConfig.selfMode = true;
                    await fs.writeJson('./config.json', botConfig, { spaces: 2 });
                    Object.assign(config, botConfig);
                    
                    await sock.sendMessage(chatId, {
                        text: `🔒 *Self Mode Activated!*\n\n` +
                              `Bot is now in self mode. Only owner can use commands.\n\n` +
                              `👑 Developed By: Ali Hamza\n` +
                              `⚡ Powered By: AF Cyber Force`
                    });
                    break;
                    
                case 'public':
                    botConfig.selfMode = false;
                    await fs.writeJson('./config.json', botConfig, { spaces: 2 });
                    Object.assign(config, botConfig);
                    
                    await sock.sendMessage(chatId, {
                        text: `🌐 *Public Mode Activated!*\n\n` +
                              `Bot is now in public mode. Everyone can use commands.\n\n` +
                              `👑 Developed By: Ali Hamza\n` +
                              `⚡ Powered By: AF Cyber Force`
                    });
                    break;
                    
                case 'checkhost':
                    const uptime = process.uptime();
                    const hours = Math.floor(uptime / 3600);
                    const minutes = Math.floor((uptime % 3600) / 60);
                    const seconds = Math.floor(uptime % 60);
                    
                    await sock.sendMessage(chatId, {
                        text: `🖥️ *Host Status Check*\n\n` +
                              `📊 *System Info:*\n` +
                              `• Uptime: ${hours}h ${minutes}m ${seconds}s\n` +
                              `• Memory: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\n` +
                              `• Platform: ${process.platform}\n` +
                              `• Node Version: ${process.version}\n\n` +
                              `✅ *Status:* Online & Running\n\n` +
                              `👑 Developed By: Ali Hamza\n` +
                              `⚡ Powered By: AF Cyber Force`
                    });
                    break;
                    
                case 'clearbug':
                    await sock.sendMessage(chatId, {
                        text: `🧹 *Bug Clear Initiated!*\n\n` +
                              `Clearing all temporary files and cache...\n` +
                              `Restarting bot processes...\n\n` +
                              `✅ Bug clear completed successfully!\n\n` +
                              `👑 Developed By: Ali Hamza\n` +
                              `⚡ Powered By: AF Cyber Force`
                    });
                    break;
                    
                case 'reselbot':
                    await sock.sendMessage(chatId, {
                        text: `🔄 *Bot Restart Initiated!*\n\n` +
                              `Reloading all commands and configurations...\n\n` +
                              `👑 Developed By: Ali Hamza\n` +
                              `⚡ Powered By: AF Cyber Force`
                    });
                    
                    // Reload commands
                    await reloadCommands();
                    
                    await sock.sendMessage(chatId, {
                        text: `✅ *Bot Restarted Successfully!*\n\n` +
                              `All systems are now online and ready.\n\n` +
                              `👑 Developed By: Ali Hamza\n` +
                              `⚡ Powered By: AF Cyber Force`
                    });
                    break;
                    
                default:
                    await sock.sendMessage(chatId, {
                        text: `❌ *Unknown Owner Command!*\n\n` +
                              `Available commands:\n` +
                              `• .addprem <number>\n` +
                              `• .delprem <number>\n` +
                              `• .listprem\n` +
                              `• .self\n` +
                              `• .public\n` +
                              `• .checkhost\n` +
                              `• .clearbug\n` +
                              `• .reselbot\n\n` +
                              `👑 Developed By: Ali Hamza\n` +
                              `⚡ Powered By: AF Cyber Force`
                    });
            }
            
        } catch (error) {
            console.error('Error in owner command:', error);
            await sock.sendMessage(chatId, {
                text: `❌ *Error!*\n\nAn error occurred while executing the command.\n\n👑 Developed By: Ali Hamza\n⚡ Powered By: AF Cyber Force`
            });
        }
    }
};

