module.exports = {
    name: 'groupmenu',
    aliases: ['tagall', 'hidetag', 'promote', 'demote', 'kick', 'add', 'listgc'],
    description: 'Group management commands',
    category: 'Group Menu',
    usage: '.tagall [message] | .hidetag [message] | .promote @user | .demote @user | .kick @user | .add <number> | .listgc',
    groupOnly: true,
    
    async execute(sock, message, args, { chatId, sender, isOwner, isPremium, config }) {
        try {
            const command = message.message?.conversation?.split(' ')[0]?.replace('.', '').toLowerCase() || 
                           message.message?.extendedTextMessage?.text?.split(' ')[0]?.replace('.', '').toLowerCase();
            
            // Get group metadata
            const groupMetadata = await sock.groupMetadata(chatId);
            const participants = groupMetadata.participants;
            const botNumber = sock.user.id.split(':')[0] + '@s.whatsapp.net';
            const senderIsAdmin = participants.find(p => p.id === sender)?.admin;
            const botIsAdmin = participants.find(p => p.id === botNumber)?.admin;
            
            switch (command) {
                case 'tagall':
                    if (!senderIsAdmin && !isOwner) {
                        return await sock.sendMessage(chatId, {
                            text: `❌ *Admin Only!*\n\nThis command is only for group admins.\n\n👑 Developed By: Ali Hamza\n⚡ Powered By: AF Cyber Force`
                        });
                    }
                    
                    const tagMessage = args.join(' ') || 'Group Announcement';
                    const mentions = participants.map(p => p.id);
                    const tagText = `📢 *${tagMessage}*\n\n` +
                                   participants.map(p => `@${p.id.split('@')[0]}`).join(' ') +
                                   `\n\n👑 Developed By: Ali Hamza\n⚡ Powered By: AF Cyber Force`;
                    
                    await sock.sendMessage(chatId, {
                        text: tagText,
                        mentions: mentions
                    });
                    break;
                    
                case 'hidetag':
                    if (!senderIsAdmin && !isOwner) {
                        return await sock.sendMessage(chatId, {
                            text: `❌ *Admin Only!*\n\nThis command is only for group admins.\n\n👑 Developed By: Ali Hamza\n⚡ Powered By: AF Cyber Force`
                        });
                    }
                    
                    const hideMessage = args.join(' ') || 'Hidden Tag Message';
                    const hideMentions = participants.map(p => p.id);
                    
                    await sock.sendMessage(chatId, {
                        text: `${hideMessage}\n\n👑 Developed By: Ali Hamza\n⚡ Powered By: AF Cyber Force`,
                        mentions: hideMentions
                    });
                    break;
                    
                case 'promote':
                    if (!senderIsAdmin && !isOwner) {
                        return await sock.sendMessage(chatId, {
                            text: `❌ *Admin Only!*\n\nThis command is only for group admins.\n\n👑 Developed By: Ali Hamza\n⚡ Powered By: AF Cyber Force`
                        });
                    }
                    
                    if (!botIsAdmin) {
                        return await sock.sendMessage(chatId, {
                            text: `❌ *Bot Not Admin!*\n\nPlease make the bot an admin first.\n\n👑 Developed By: Ali Hamza\n⚡ Powered By: AF Cyber Force`
                        });
                    }
                    
                    const promoteTarget = message.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
                    if (!promoteTarget) {
                        return await sock.sendMessage(chatId, {
                            text: `❌ *Invalid Usage!*\n\nUsage: .promote @user\n\n👑 Developed By: Ali Hamza\n⚡ Powered By: AF Cyber Force`
                        });
                    }
                    
                    try {
                        await sock.groupParticipantsUpdate(chatId, [promoteTarget], 'promote');
                        await sock.sendMessage(chatId, {
                            text: `✅ *User Promoted!*\n\n@${promoteTarget.split('@')[0]} has been promoted to admin.\n\n👑 Developed By: Ali Hamza\n⚡ Powered By: AF Cyber Force`,
                            mentions: [promoteTarget]
                        });
                    } catch (error) {
                        await sock.sendMessage(chatId, {
                            text: `❌ *Promotion Failed!*\n\nCould not promote the user.\n\n👑 Developed By: Ali Hamza\n⚡ Powered By: AF Cyber Force`
                        });
                    }
                    break;
                    
                case 'demote':
                    if (!senderIsAdmin && !isOwner) {
                        return await sock.sendMessage(chatId, {
                            text: `❌ *Admin Only!*\n\nThis command is only for group admins.\n\n👑 Developed By: Ali Hamza\n⚡ Powered By: AF Cyber Force`
                        });
                    }
                    
                    if (!botIsAdmin) {
                        return await sock.sendMessage(chatId, {
                            text: `❌ *Bot Not Admin!*\n\nPlease make the bot an admin first.\n\n👑 Developed By: Ali Hamza\n⚡ Powered By: AF Cyber Force`
                        });
                    }
                    
                    const demoteTarget = message.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
                    if (!demoteTarget) {
                        return await sock.sendMessage(chatId, {
                            text: `❌ *Invalid Usage!*\n\nUsage: .demote @user\n\n👑 Developed By: Ali Hamza\n⚡ Powered By: AF Cyber Force`
                        });
                    }
                    
                    try {
                        await sock.groupParticipantsUpdate(chatId, [demoteTarget], 'demote');
                        await sock.sendMessage(chatId, {
                            text: `✅ *User Demoted!*\n\n@${demoteTarget.split('@')[0]} has been demoted from admin.\n\n👑 Developed By: Ali Hamza\n⚡ Powered By: AF Cyber Force`,
                            mentions: [demoteTarget]
                        });
                    } catch (error) {
                        await sock.sendMessage(chatId, {
                            text: `❌ *Demotion Failed!*\n\nCould not demote the user.\n\n👑 Developed By: Ali Hamza\n⚡ Powered By: AF Cyber Force`
                        });
                    }
                    break;
                    
                case 'kick':
                    if (!senderIsAdmin && !isOwner) {
                        return await sock.sendMessage(chatId, {
                            text: `❌ *Admin Only!*\n\nThis command is only for group admins.\n\n👑 Developed By: Ali Hamza\n⚡ Powered By: AF Cyber Force`
                        });
                    }
                    
                    if (!botIsAdmin) {
                        return await sock.sendMessage(chatId, {
                            text: `❌ *Bot Not Admin!*\n\nPlease make the bot an admin first.\n\n👑 Developed By: Ali Hamza\n⚡ Powered By: AF Cyber Force`
                        });
                    }
                    
                    const kickTarget = message.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
                    if (!kickTarget) {
                        return await sock.sendMessage(chatId, {
                            text: `❌ *Invalid Usage!*\n\nUsage: .kick @user\n\n👑 Developed By: Ali Hamza\n⚡ Powered By: AF Cyber Force`
                        });
                    }
                    
                    try {
                        await sock.groupParticipantsUpdate(chatId, [kickTarget], 'remove');
                        await sock.sendMessage(chatId, {
                            text: `✅ *User Kicked!*\n\n@${kickTarget.split('@')[0]} has been removed from the group.\n\n👑 Developed By: Ali Hamza\n⚡ Powered By: AF Cyber Force`,
                            mentions: [kickTarget]
                        });
                    } catch (error) {
                        await sock.sendMessage(chatId, {
                            text: `❌ *Kick Failed!*\n\nCould not remove the user.\n\n👑 Developed By: Ali Hamza\n⚡ Powered By: AF Cyber Force`
                        });
                    }
                    break;
                    
                case 'add':
                    if (!senderIsAdmin && !isOwner) {
                        return await sock.sendMessage(chatId, {
                            text: `❌ *Admin Only!*\n\nThis command is only for group admins.\n\n👑 Developed By: Ali Hamza\n⚡ Powered By: AF Cyber Force`
                        });
                    }
                    
                    if (!botIsAdmin) {
                        return await sock.sendMessage(chatId, {
                            text: `❌ *Bot Not Admin!*\n\nPlease make the bot an admin first.\n\n👑 Developed By: Ali Hamza\n⚡ Powered By: AF Cyber Force`
                        });
                    }
                    
                    if (!args[0]) {
                        return await sock.sendMessage(chatId, {
                            text: `❌ *Invalid Usage!*\n\nUsage: .add <number>\nExample: .add 923324400530\n\n👑 Developed By: Ali Hamza\n⚡ Powered By: AF Cyber Force`
                        });
                    }
                    
                    const addNumber = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
                    
                    try {
                        await sock.groupParticipantsUpdate(chatId, [addNumber], 'add');
                        await sock.sendMessage(chatId, {
                            text: `✅ *User Added!*\n\n@${addNumber.split('@')[0]} has been added to the group.\n\n👑 Developed By: Ali Hamza\n⚡ Powered By: AF Cyber Force`,
                            mentions: [addNumber]
                        });
                    } catch (error) {
                        await sock.sendMessage(chatId, {
                            text: `❌ *Add Failed!*\n\nCould not add the user. They might have privacy settings enabled.\n\n👑 Developed By: Ali Hamza\n⚡ Powered By: AF Cyber Force`
                        });
                    }
                    break;
                    
                case 'listgc':
                    const adminList = participants.filter(p => p.admin).map(p => `@${p.id.split('@')[0]}`).join('\n');
                    const memberCount = participants.length;
                    const adminCount = participants.filter(p => p.admin).length;
                    
                    await sock.sendMessage(chatId, {
                        text: `📋 *Group Information*\n\n` +
                              `📛 *Name:* ${groupMetadata.subject}\n` +
                              `👥 *Total Members:* ${memberCount}\n` +
                              `👑 *Admins:* ${adminCount}\n\n` +
                              `*Admin List:*\n${adminList}\n\n` +
                              `👑 Developed By: Ali Hamza\n` +
                              `⚡ Powered By: AF Cyber Force`,
                        mentions: participants.filter(p => p.admin).map(p => p.id)
                    });
                    break;
                    
                default:
                    await sock.sendMessage(chatId, {
                        text: `👥 *GROUP MENU COMMANDS*\n\n` +
                              `Available commands:\n` +
                              `• .tagall [message]\n` +
                              `• .hidetag [message]\n` +
                              `• .promote @user\n` +
                              `• .demote @user\n` +
                              `• .kick @user\n` +
                              `• .add <number>\n` +
                              `• .listgc\n\n` +
                              `👑 Developed By: Ali Hamza\n` +
                              `⚡ Powered By: AF Cyber Force`
                    });
            }
            
        } catch (error) {
            console.error('Error in group command:', error);
            await sock.sendMessage(chatId, {
                text: `❌ *Error!*\n\nAn error occurred while executing the group command.\n\n👑 Developed By: Ali Hamza\n⚡ Powered By: AF Cyber Force`
            });
        }
    }
};

