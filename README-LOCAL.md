# Run Jefe Bot Locally (Bypasses IP Blocking)

Railway's data center IPs are blocked by SUGO. Running on your computer works because home IPs aren't blocked.

## Quick Start

```bash
# 1. Install dependencies (one time)
npm install

# 2. Build the app
npm run build

# 3. Start the bot
npm start
```

Then open: **http://localhost:3001**

## Why This Works

- ✅ Your home IP isn't blocked by SUGO
- ✅ Same code, same features
- ✅ No proxy/VPN needed
- ✅ Direct connection to SUGO

## Keep It Running 24/7 (Optional)

### Option 1: Use PM2 (Simple)
```bash
npm install -g pm2
pm2 start npm --name "jefe-bot" -- start
pm2 save
pm2 startup
```

### Option 2: Use Screen (Terminal stays open)
```bash
screen -S jefe-bot
npm start
# Press Ctrl+A then D to detach
# Reconnect with: screen -r jefe-bot
```

## Troubleshooting

**Port 3001 already in use?**
```bash
export PORT=3002
npm start
```

**Token expired?**
Get a fresh one from Proxyman and update `server/index.ts` line 55.

## What's Working Now

✅ WebSocket client with proper protocol handshake
✅ Connection lifecycle (hello → JOIN → heartbeat)
✅ Pong timeout disabled (no self-destruct)
✅ Graceful shutdown (SIGTERM/SIGINT)
✅ Exponential backoff (1s→2s→5s→10s→30s)

## What We Still Need

❓ Chat message format - need to see actual messages from Proxyman "Messages" tab
❓ Send chat command - which `cmd` code sends messages?

Once we see the chat format in Proxyman, we can complete the send functionality.
