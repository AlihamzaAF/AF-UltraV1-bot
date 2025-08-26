module.exports = {
    name: 'bugmenu',
    aliases: ['fc-blast', 'f-noclick', 'afhack-new', 'pakistan-power', 'f-crash', 'f-knock', 'trash', 'f-fight', 'kilgc-chat'],
    description: 'Bug attack commands',
    category: 'Bug Menu',
    usage: '.fc-blast <number> | .f-noclick | .afhack-new | .pakistan-power | .f-crash | .f-knock | .trash | .f-fight | .kilgc-chat',
    premiumOnly: true,
    
    async execute(sock, message, args, { chatId, sender, isOwner, isPremium, config }) {
        try {
            const command = message.message?.conversation?.split(' ')[0]?.replace('.', '').toLowerCase() || 
                           message.message?.extendedTextMessage?.text?.split(' ')[0]?.replace('.', '').toLowerCase();
            
            // Warning message for all bug commands
            const warningText = `⚠️ *WARNING!*\n\n` +
                              `This is a demonstration command. Use responsibly and only for testing purposes.\n\n` +
                              `👑 Developed By: Ali Hamza\n` +
                              `⚡ Powered By: AF Cyber Force`;
            
            switch (command) {
                case 'fc-blast':
                    if (!args[0]) {
                        return await sock.sendMessage(chatId, {
                            text: `❌ *Invalid Usage!*\n\nUsage: .fc-blast <target_number>\nExample: .fc-blast 923324400530\n\n👑 Developed By: Ali Hamza\n⚡ Powered By: AF Cyber Force`
                        });
                    }
                    
                    const targetNumber = args[0].replace(/[^0-9]/g, '');
                    await sock.sendMessage(chatId, {
                        text: `💥 *FC-BLAST INITIATED!*\n\n` +
                              `🎯 Target: ${targetNumber}\n` +
                              `🚀 Status: Launching attack...\n` +
                              `⚡ Power Level: Maximum\n\n` +
                              `${warningText}`
                    });
                    
                    // Simulate attack process
                    setTimeout(async () => {
                        await sock.sendMessage(chatId, {
                            text: `✅ *FC-BLAST COMPLETED!*\n\n` +
                                  `Target has been processed successfully.\n\n` +
                                  `👑 Developed By: Ali Hamza\n` +
                                  `⚡ Powered By: AF Cyber Force`
                        });
                    }, 3000);
                    break;
                    
                case 'f-noclick':
                    await sock.sendMessage(chatId, {
                        text: `🔥 *F-NOCLICK ACTIVATED!*\n\n` +
                              `🎯 Target: Current Chat\n` +
                              `💀 Effect: No-Click Crash\n` +
                              `⚡ Status: Processing...\n\n` +
                              `${warningText}`
                    });
                    break;
                    
                case 'afhack-new':
                    await sock.sendMessage(chatId, {
                        text: `🚀 *AF-HACK NEW VERSION!*\n\n` +
                              `🔧 Loading latest exploit...\n` +
                              `💻 Initializing AF Cyber Force protocols...\n` +
                              `⚡ Status: Ready for deployment\n\n` +
                              `${warningText}`
                    });
                    break;
                    
                case 'pakistan-power':
                    await sock.sendMessage(chatId, {
                        text: `🇵🇰 *PAKISTAN POWER ACTIVATED!*\n\n` +
                              `💚 Green Force: Charging...\n` +
                              `⭐ White Power: Loading...\n` +
                              `🌙 Crescent Energy: Maximum\n` +
                              `🚀 Status: Pakistan Zindabad!\n\n` +
                              `${warningText}`
                    });
                    break;
                    
                case 'f-crash':
                    await sock.sendMessage(chatId, {
                        text: `💥 *F-CRASH INITIATED!*\n\n` +
                              `🎯 Target: Selected\n` +
                              `💀 Crash Type: Force Close\n` +
                              `⚡ Power: Ultra High\n` +
                              `🔥 Status: Executing...\n\n` +
                              `${warningText}`
                    });
                    break;
                    
                case 'f-knock':
                    await sock.sendMessage(chatId, {
                        text: `🚪 *F-KNOCK ACTIVATED!*\n\n` +
                              `👊 Knock Type: Force Entry\n` +
                              `🔓 Access Level: Maximum\n` +
                              `⚡ Status: Knocking...\n\n` +
                              `${warningText}`
                    });
                    break;
                    
                case 'trash':
                    await sock.sendMessage(chatId, {
                        text: `🗑️ *TRASH COMMAND EXECUTED!*\n\n` +
                              `💀 Trash Level: Maximum\n` +
                              `🔥 Destruction: Complete\n` +
                              `⚡ Status: Trashing...\n\n` +
                              `${warningText}`
                    });
                    break;
                    
                case 'f-fight':
                    await sock.sendMessage(chatId, {
                        text: `⚔️ *F-FIGHT MODE ON!*\n\n` +
                              `🥊 Fight Type: Ultimate\n` +
                              `💪 Power Level: Over 9000\n` +
                              `🔥 Status: Ready to fight!\n\n` +
                              `${warningText}`
                    });
                    break;
                    
                case 'kilgc-chat':
                    if (!chatId.endsWith('@g.us')) {
                        return await sock.sendMessage(chatId, {
                            text: `❌ *Group Only!*\n\nThis command can only be used in group chats.\n\n👑 Developed By: Ali Hamza\n⚡ Powered By: AF Cyber Force`
                        });
                    }
                    
                    await sock.sendMessage(chatId, {
                        text: `💀 *KILL GC-CHAT ACTIVATED!*\n\n` +
                              `🎯 Target: This Group\n` +
                              `💥 Effect: Group Crash\n` +
                              `⚡ Status: Initiating...\n\n` +
                              `${warningText}`
                    });
                    break;
                    
                default:
                    await sock.sendMessage(chatId, {
                        text: `💣 *BUG MENU COMMANDS*\n\n` +
                              `Available attacks:\n` +
                              `• .fc-blast <number>\n` +
                              `• .f-noclick\n` +
                              `• .afhack-new\n` +
                              `• .pakistan-power\n` +
                              `• .f-crash\n` +
                              `• .f-knock\n` +
                              `• .trash\n` +
                              `• .f-fight\n` +
                              `• .kilgc-chat\n\n` +
                              `⚠️ Premium users only!\n\n` +
                              `👑 Developed By: Ali Hamza\n` +
                              `⚡ Powered By: AF Cyber Force`
                    });
            }
            
        } catch (error) {
            console.error('Error in bug command:', error);
            await sock.sendMessage(chatId, {
                text: `❌ *Error!*\n\nAn error occurred while executing the bug command.\n\n👑 Developed By: Ali Hamza\n⚡ Powered By: AF Cyber Force`
            });
        }
    }
};

