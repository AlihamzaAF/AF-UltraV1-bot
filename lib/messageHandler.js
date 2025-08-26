const config = require('../config.json');
const { getContentType } = require('@whiskeysockets/baileys');
const chalk = require('chalk');
const moment = require('moment');

// Global commands storage
global.commands = new Map();

// Check if user is owner
function isOwner(sender) {
    return sender.replace('@s.whatsapp.net', '') === config.ownerNumber;
}

// Check if user is premium
function isPremium(sender) {
    const number = sender.replace('@s.whatsapp.net', '');
    return config.premiumUsers.includes(number) || isOwner(sender);
}

// Check if user is blocked
function isBlocked(sender) {
    const number = sender.replace('@s.whatsapp.net', '');
    return config.blockedUsers.includes(number);
}

// Extract message text
function getMessageText(message) {
    const type = getContentType(message.message);
    
    switch (type) {
        case 'conversation':
            return message.message.conversation;
        case 'extendedTextMessage':
            return message.message.extendedTextMessage.text;
        case 'imageMessage':
            return message.message.imageMessage.caption || '';
        case 'videoMessage':
            return message.message.videoMessage.caption || '';
        default:
            return '';
    }
}

// Auto features handler
async function handleAutoFeatures(sock, message) {
    const chatId = message.key.remoteJid;
    const sender = message.key.participant || message.key.remoteJid;
    
    try {
        // Auto typing
        if (config.autoTyping) {
            await sock.sendPresenceUpdate('composing', chatId);
            setTimeout(() => sock.sendPresenceUpdate('paused', chatId), 2000);
        }
        
        // Auto recording
        if (config.autoRecording) {
            await sock.sendPresenceUpdate('recording', chatId);
            setTimeout(() => sock.sendPresenceUpdate('paused', chatId), 3000);
        }
        
        // Auto react
        if (config.autoReact) {
            const reactions = ['❤️', '😍', '🔥', '💯', '⚡', '👑'];
            const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
            
            await sock.sendMessage(chatId, {
                react: {
                    text: randomReaction,
                    key: message.key
                }
            });
        }
        
        // Auto view status
        if (config.autoViewStatus && chatId === 'status@broadcast') {
            await sock.readMessages([message.key]);
        }
        
    } catch (error) {
        console.error(chalk.red('Error in auto features:'), error);
    }
}

// Anti-link handler
async function handleAntiLink(sock, message, text) {
    const chatId = message.key.remoteJid;
    const sender = message.key.participant || message.key.remoteJid;
    
    if (!config.antiLink || !chatId.endsWith('@g.us')) return;
    if (isOwner(sender) || isPremium(sender)) return;
    
    const linkRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[^\s]+\.(com|net|org|io|co|me|tv|gg|tk|ml|ga|cf))/gi;
    
    if (linkRegex.test(text)) {
        try {
            await sock.sendMessage(chatId, {
                delete: message.key
            });
            
            await sock.sendMessage(chatId, {
                text: `🚫 *Anti-Link Activated!*\n\n` +
                      `@${sender.split('@')[0]} Links are not allowed in this group!\n\n` +
                      `👑 Developed By: Ali Hamza\n` +
                      `⚡ Powered By: AF Cyber Force`,
                mentions: [sender]
            });
            
        } catch (error) {
            console.error(chalk.red('Error in anti-link:'), error);
        }
    }
}

// Main message handler
async function handleMessage(sock, message) {
    try {
        const text = getMessageText(message);
        const chatId = message.key.remoteJid;
        const sender = message.key.participant || message.key.remoteJid;
        const isGroup = chatId.endsWith('@g.us');
        const isPrivate = !isGroup;
        
        // Skip if no text or blocked user
        if (!text || isBlocked(sender)) return;
        
        // Skip if self mode and not owner
        if (config.selfMode && !isOwner(sender)) return;
        
        // Handle auto features
        await handleAutoFeatures(sock, message);
        
        // Handle anti-link
        await handleAntiLink(sock, message, text);
        
        // Check if message starts with prefix
        if (!text.startsWith(config.prefix)) return;
        
        // Parse command
        const args = text.slice(config.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        
        // Find command
        const command = global.commands.get(commandName);
        if (!command) return;
        
        // Log command usage
        console.log(chalk.blue(`📝 Command: ${commandName} | User: ${sender.split('@')[0]} | Chat: ${isGroup ? 'Group' : 'Private'} | Time: ${moment().format('HH:mm:ss')}`));
        
        // Check permissions
        if (command.ownerOnly && !isOwner(sender)) {
            return await sock.sendMessage(chatId, {
                text: `❌ *Access Denied!*\n\nThis command is only for the bot owner.\n\n👑 Developed By: Ali Hamza\n⚡ Powered By: AF Cyber Force`
            });
        }
        
        if (command.premiumOnly && !isPremium(sender)) {
            return await sock.sendMessage(chatId, {
                text: `💎 *Premium Required!*\n\nThis command is only for premium users.\n\n👑 Developed By: Ali Hamza\n⚡ Powered By: AF Cyber Force`
            });
        }
        
        if (command.groupOnly && !isGroup) {
            return await sock.sendMessage(chatId, {
                text: `👥 *Group Only!*\n\nThis command can only be used in groups.\n\n👑 Developed By: Ali Hamza\n⚡ Powered By: AF Cyber Force`
            });
        }
        
        if (command.privateOnly && !isPrivate) {
            return await sock.sendMessage(chatId, {
                text: `💬 *Private Only!*\n\nThis command can only be used in private chat.\n\n👑 Developed By: Ali Hamza\n⚡ Powered By: AF Cyber Force`
            });
        }
        
        // Execute command
        try {
            await command.execute(sock, message, args, {
                chatId,
                sender,
                isGroup,
                isPrivate,
                isOwner: isOwner(sender),
                isPremium: isPremium(sender),
                text,
                config
            });
        } catch (error) {
            console.error(chalk.red(`Error executing command ${commandName}:`), error);
            await sock.sendMessage(chatId, {
                text: `❌ *Command Error!*\n\nAn error occurred while executing the command.\n\n👑 Developed By: Ali Hamza\n⚡ Powered By: AF Cyber Force`
            });
        }
        
    } catch (error) {
        console.error(chalk.red('Error in message handler:'), error);
    }
}

module.exports = {
    handleMessage,
    isOwner,
    isPremium,
    isBlocked,
    getMessageText
};

