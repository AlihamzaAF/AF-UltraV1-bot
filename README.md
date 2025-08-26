# 📛 AF Ultra Power V1 – WhatsApp BugBot

<div align="center">

![AF Ultra Power V1](https://img.shields.io/badge/AF%20Ultra%20Power-V1-red?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge)
![WhatsApp](https://img.shields.io/badge/WhatsApp-Multi--Device-brightgreen?style=for-the-badge)

**👑 Developed By: Ali Hamza**  
**⚡ Powered By: AF Cyber Force**

</div>

## 🎯 Overview

AF Ultra Power V1 is a powerful WhatsApp-based BugBot built with **Node.js + Baileys MD**. It features custom UI, comprehensive commands, and full functionality for WhatsApp automation and management.

### 🌟 Key Features

- 🔧 **Auto System**: Auto typing, recording, react, view status, anti-link
- 👑 **Owner Commands**: Premium management, bot control, media downloads
- 💣 **Bug Menu**: Various crash and attack commands
- 👥 **Group Management**: Complete group administration tools
- 😈 **VIP Attacks**: Advanced attack commands
- 🧩 **Other Tools**: Force block, force group, and more

## 📦 Installation

### 🤖 Method 1: Termux (Android)

1. **Install Termux** from F-Droid or GitHub
2. **Update packages**:
   ```bash
   pkg update && pkg upgrade
   ```

3. **Install required packages**:
   ```bash
   pkg install nodejs npm git
   ```

4. **Clone the repository**:
   ```bash
   git clone https://github.com/AlihamzaAF/AF-UltraV1-bot.git
   cd AF-UltraV1
   ```

5. **Install dependencies**:
   ```bash
   npm install
   ```

6. **Configure the bot**:
   ```bash
   cp .env.example .env
   nano .env
   ```
   Edit the `.env` file with your details:
   - `OWNER_NUMBER`: 923324400530
   - `BOT_NAME`: AF Ultra power V1 
   - `SESSION_ID`: Your session ID

7. **Start the bot**:
   ```bash
   ./start.sh
   ```

### ☁️ Method 2: GitHub Actions (24/7 Deploy)

1. **Fork this repository**
2. **Go to Settings > Secrets and Variables > Actions**
3. **Add the following secrets**:
   - `OWNER_NUMBER`: 923324400530
   - `BOT_NAME`: AF Ultra power V1 
   - `SESSION_ID`: Your session ID

4. **Enable GitHub Actions** in your repository
5. **Push any change** to trigger the deployment
6. **Bot will run 24/7** and restart every 6 hours automatically

## 🔧 Configuration

### config.json
```json
{
  "botName": "AF Ultra Power V1",
  "ownerNumber": "923324400530",
  "prefix": ".",
  "mode": "public",
  "autoTyping": false,
  "autoRecording": false,
  "autoReact": false,
  "autoViewStatus": false,
  "antiLink": false
}
```

## 📋 Commands List

### 🔧 Auto System Commands
- `.autotyping on/off` - Toggle auto typing
- `.autorecording on/off` - Toggle auto recording
- `.autoreact on/off` - Toggle auto react
- `.autoviewstatus on/off` - Toggle auto view status
- `.antilink on/off` - Toggle anti-link protection

### 👑 Owner Commands
- `.addprem <number>` - Add premium user
- `.delprem <number>` - Remove premium user
- `.listprem` - List premium users
- `.self` - Switch to self mode
- `.public` - Switch to public mode
- `.checkhost` - Check hosting status
- `.clearbug` - Clear bug database
- `.reselbot` - Reset bot session
- `.tiktok <url>` - Download TikTok video
- `.play <query>` - Play music
- `.yts <query>` - YouTube search

### 💣 Bug Menu Commands
- `.fc-blast <number>` - FC blast attack
- `.F-noclick` - No-click bug
- `.AFhack-new` - AF hack new
- `.Pakistan-power` - Pakistan power attack
- `.F-crash` - Crash attack
- `.F-knock` - Knock attack
- `.Trash` - Trash attack
- `.F-Fight` - Fight attack
- `.kilgc-chat` - Kill group chat

### 👥 Group Management
- `.tagall` - Tag all members
- `.hidetag <message>` - Hidden tag message
- `.promote <@user>` - Promote to admin
- `.demote <@user>` - Demote from admin
- `.kick <@user>` - Kick member
- `.add <number>` - Add member
- `.listgc` - List all groups

### 😈 VIP Attacks
- `.F-invidelay` - Invisible delay attack
- `.F-one` - F-one attack
- `.New-ui` - New UI attack
- `.Pti-804` - PTI-804 attack
- `.F-iphone` - iPhone attack
- `.F-ios` - iOS attack

### 🧩 Other Tools
- `.forceblock <number>` - Force block user
- `.forcegroup <number>` - Force add to group

## 🚀 Usage

1. **Scan QR Code**: When you first run the bot, scan the QR code with your WhatsApp
2. **Set Owner**: Make sure your number is set as owner in config.json
3. **Use Commands**: Start using commands with the prefix `.`
4. **Manage Bot**: Use owner commands to control bot behavior

## 📱 WhatsApp Channel

Join our official channel for updates and news:
🌐 **Channel**: https://whatsapp.com/channel/0029VaU5UfBBVJl2sqYwbJ1t

## 🛡️ Security Features

- **Owner Protection**: Commands are protected from unauthorized access
- **Premium System**: VIP features for premium users only
- **Anti-Spam**: Built-in spam protection
- **Safe Mode**: Self mode for private usage

## 🔄 Auto Features

- **Auto Typing**: Simulate typing indicator
- **Auto Recording**: Simulate recording indicator  
- **Auto React**: Automatic reactions to messages
- **Auto View Status**: Automatically view status updates
- **Anti-Link**: Automatic link detection and removal

## 📁 Project Structure

```
AF-Ultra-Power-V1/
├── commands/           # All bot commands
│   ├── menu.js        # Main menu
│   ├── autosystem.js  # Auto system commands
│   ├── owner.js       # Owner commands
│   ├── bugmenu.js     # Bug/attack commands
│   ├── groupmenu.js   # Group management
│   └── vipattacks.js  # VIP attack commands
├── lib/               # Core libraries
│   ├── messageHandler.js  # Message processing
│   └── commandLoader.js   # Command loading
├── database/          # Data storage
├── auth_info_baileys/ # WhatsApp session
├── .github/workflows/ # GitHub Actions
├── index.js          # Main bot file
├── config.json       # Configuration
├── package.json      # Dependencies
├── start.sh          # Termux startup script
└── README.md         # Documentation
```

## 🐛 Troubleshooting

### Common Issues

1. **QR Code not showing**: Clear `auth_info_baileys` folder and restart
2. **Commands not working**: Check if you're the owner and using correct prefix
3. **Bot offline**: Check internet connection and restart bot
4. **Permission errors**: Make sure start.sh is executable (`chmod +x start.sh`)

### Termux Specific Issues

1. **Node.js not found**: Run `pkg install nodejs`
2. **Git not found**: Run `pkg install git`
3. **Permission denied**: Run `termux-setup-storage`

## 📞 Support

- **Developer**: Ali Hamza
- **Team**: AF Cyber Force
- **Channel**: https://whatsapp.com/channel/0029VaU5UfBBVJl2sqYwbJ1t

## ⚠️ Disclaimer

This bot is for educational purposes only. Use responsibly and respect WhatsApp's Terms of Service. The developers are not responsible for any misuse of this software.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**🔥 AF Ultra Power V1 - The Ultimate WhatsApp BugBot 🔥**

*Developed with ❤️ by Ali Hamza & AF Cyber Force*

</div>

