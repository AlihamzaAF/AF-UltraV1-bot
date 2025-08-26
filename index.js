const { 
    default: makeWASocket, 
    DisconnectReason, 
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
    makeInMemoryStore,
    jidNormalizedUser,
    proto,
    getContentType 
} = require('@whiskeysockets/baileys');
const qrcode = require('qrcode-terminal');
const fs = require('fs-extra');
const chalk = require('chalk');
const figlet = require('figlet');
const gradient = require('gradient-string');
const moment = require('moment');
const config = require('./config.json');
const { handleMessage } = require('./lib/messageHandler');
const { loadCommands } = require('./lib/commandLoader');

// Create store for message handling
const store = makeInMemoryStore({});

// Display startup banner
function displayBanner() {
    console.clear();
    const banner = figlet.textSync('AF ULTRA POWER', {
        font: 'ANSI Shadow',
        horizontalLayout: 'default',
        verticalLayout: 'default'
    });
    
    console.log(gradient.rainbow(banner));
    console.log(chalk.cyan('━'.repeat(60)));
    console.log(chalk.yellow('📛 Project Title: AF Ultra Power V1 – WhatsApp BugBot'));
    console.log(chalk.green('👑 Developed By: Ali Hamza'));
    console.log(chalk.blue('⚡ Powered By: AF Cyber Force'));
    console.log(chalk.magenta('🌐 Channel: https://whatsapp.com/channel/0029VaU5UfBBVJl2sqYwbJ1t'));
    console.log(chalk.cyan('━'.repeat(60)));
    console.log(chalk.white(`🚀 Starting bot at ${moment().format('YYYY-MM-DD HH:mm:ss')}`));
    console.log(chalk.cyan('━'.repeat(60)));
}

// Main bot function
async function startBot() {
    displayBanner();
    
    try {
        // Load commands
        await loadCommands();
        console.log(chalk.green('✅ Commands loaded successfully'));
        
        // Get latest Baileys version
        const { version, isLatest } = await fetchLatestBaileysVersion();
        console.log(chalk.blue(`📱 Using Baileys v${version.join('.')}, isLatest: ${isLatest}`));
        
        // Auth state
        const { state, saveCreds } = await useMultiFileAuthState('./auth_info');
        
        // Create socket
        const sock = makeWASocket({
            version,
            auth: state,
            printQRInTerminal: true,
            logger: {
                level: 'silent'
            },
            browser: ['AF Ultra Power V1', 'Chrome', '1.0.0'],
            generateHighQualityLinkPreview: true
        });
        
        // Bind store to socket
        store.bind(sock.ev);
        
        // Connection events
        sock.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect, qr } = update;
            
            if (qr) {
                console.log(chalk.yellow('📱 Scan QR Code to connect:'));
                qrcode.generate(qr, { small: true });
            }
            
            if (connection === 'close') {
                const shouldReconnect = (lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;
                console.log(chalk.red('❌ Connection closed due to'), lastDisconnect?.error, chalk.yellow('Reconnecting...'), shouldReconnect);
                
                if (shouldReconnect) {
                    setTimeout(() => startBot(), 3000);
                }
            } else if (connection === 'open') {
                console.log(chalk.green('✅ Bot connected successfully!'));
                console.log(chalk.cyan('━'.repeat(60)));
                console.log(chalk.white('🤖 AF Ultra Power V1 is now online!'));
                console.log(chalk.cyan('━'.repeat(60)));
                
                // Send startup message to owner
                if (config.ownerNumber) {
                    const ownerJid = config.ownerNumber + '@s.whatsapp.net';
                    await sock.sendMessage(ownerJid, {
                        text: `🚀 *AF Ultra Power V1 Started Successfully!*\n\n` +
                              `👑 *Developed By:* Ali Hamza\n` +
                              `⚡ *Powered By:* AF Cyber Force\n` +
                              `📅 *Started At:* ${moment().format('YYYY-MM-DD HH:mm:ss')}\n` +
                              `🌐 *Channel:* ${config.channel}\n\n` +
                              `Type ${config.prefix}menu to see available commands.`
                    });
                }
            }
        });
        
        // Save credentials
        sock.ev.on('creds.update', saveCreds);
        
        // Handle messages
        sock.ev.on('messages.upsert', async (m) => {
            try {
                const message = m.messages[0];
                if (!message.message) return;
                if (message.key.fromMe) return;
                
                await handleMessage(sock, message);
            } catch (error) {
                console.error(chalk.red('Error handling message:'), error);
            }
        });
        
        // Handle group updates
        sock.ev.on('group-participants.update', async (update) => {
            try {
                const { id, participants, action } = update;
                
                if (action === 'add') {
                    const welcomeText = `🎉 Welcome to the group!\n\n` +
                                      `👑 Developed By: Ali Hamza\n` +
                                      `⚡ Powered By: AF Cyber Force\n` +
                                      `🌐 Channel: ${config.channel}`;
                    
                    await sock.sendMessage(id, { text: welcomeText });
                }
            } catch (error) {
                console.error(chalk.red('Error handling group update:'), error);
            }
        });
        
    } catch (error) {
        console.error(chalk.red('❌ Error starting bot:'), error);
        setTimeout(() => startBot(), 5000);
    }
}

// Handle process termination
process.on('uncaughtException', (err) => {
    console.error(chalk.red('Uncaught Exception:'), err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error(chalk.red('Unhandled Rejection at:'), promise, chalk.red('reason:'), reason);
});

// Start the bot
startBot();

