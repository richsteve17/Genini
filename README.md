# 🎵 Jefe Bot Dashboard

**The Silent Jefe's Interactive MC**

Your complete automated co-host for SUGO live streaming. Turn your music stream into a 24/7 interactive game show while you stay in the "power seat" and just run the show.

---

## 🌟 What is Jefe Bot?

Jefe Bot is your **four-module interactive MC system** that creates constant "dinámica" (dynamics/energy) in your SUGO live stream without you saying a single word. It's not just a tool—it's your hype man, game master, announcer, and DJ assistant all in one.

### The Four Modules

#### 🎧 **El Músico** (The Musician)
- **Spotify Integration**: Automatically announces every song change
- **Vibe Check Polls**: Engages audience with gift-based reactions
- **Status**: Always on when music is playing
- **Example**:
  ```
  [JefeBot] 🎧 Now Playing: 'Cute Without The E' - Dashboard Confessional
  [JefeBot] 🔥 VIBE CHECK! 🔥 How we feeling?
  [JefeBot] Send a 'Corazón' (❤️) if you LOVE this song!
  ```

#### 📢 **El Anunciador** (The PK Announcer)
- **Automatic PK Detection**: Wakes up when battles start
- **Live Score Updates**: Posts updates every 60 seconds
- **Winner Announcements**: Celebrates with MVP recognition
- **Status**: Sleeps until PK starts, then takes over
- **Example**:
  ```
  [JefeBot] 🔴🔵 ¡ES TIEMPO DE BATALLA! 🔴🔵
  [JefeBot] Team Red vs Team Blue
  [JefeBot] ¡VAMOS! Let's GO!
  ```

#### 🎮 **El Maestro del Juego** (The Game Master)
- **Game Carousel**: Rotates through different mini-games
- **Smart Timing**: Pauses during PKs, fills the silence between
- **Three Game Types**:
  - **Gift Burst**: 60-second race for most gifts
  - **Family Goal**: Collaborative 3-minute goal
  - **King of the Hill**: Last gift wins the crown
- **Status**: Runs automatically on timer
- **Example**:
  ```
  [JefeBot] 🔥 ¡REGALO RÁPIDO! (Gift Burst!) 🔥
  [JefeBot] 60 seconds! Most 'Rose' gifts wins!
  [JefeBot] ¡VAMOS!
  ```

#### 🔥 **El Hype Man** (The Hype Man)
- **Instant Recognition**: Shouts out big gifts immediately
- **Tiered Responses**: Different intensity for different values
- **Status**: Always watching, 24/7
- **Example**:
  ```
  [JefeBot] 💥💥 ¡QUÉ LOCURA! 💥💥
  [JefeBot] 👑 ROYALTY 👑
  [JefeBot] ¡Todos saluden a Kelsey por el 'Castle'!
  ```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- SUGO account with bot credentials
- (Optional) Spotify Premium account

### Installation

```bash
# Install dependencies
npm install

# Start the backend server (in one terminal)
npm run server

# Start the dashboard (in another terminal)
npm run dev
```

The dashboard will open at `http://localhost:3000`

---

## ⚙️ Configuration

### 1. Connect Your Bot
1. Enter your **SUGO Room ID**
2. Enter your **Bot Account Token**
3. (Optional) Enter your **Spotify Access Token**

### 2. Configure Modules

#### El Músico
- Toggle: Enable/Disable
- Settings:
  - ✅ Enable "Vibe Check" Polls

#### El Anunciador
- Toggle: Enable/Disable
- Automatically activates during PKs

#### El Maestro del Juego
- Toggle: Enable/Disable
- Settings:
  - **Game Interval**: 5-60 minutes (default: 20)
  - **Enabled Games**: Choose which games to rotate
    - ✅ Gift Burst
    - ✅ Family Goal
    - ✅ King of the Hill

#### El Hype Man
- Toggle: Enable/Disable
- Settings:
  - **Minimum Diamonds**: 100-10,000 (default: 1,000)

### 3. Start the Bot
Click the big **▶ START BOT** button and watch the magic happen!

---

## 🎯 How It All Works Together

Here's a 30-minute scenario with all modules active:

| Time | Event | Module Active |
|------|-------|---------------|
| 7:00 PM | Song changes → Announces + Vibe Check | El Músico |
| 7:03 PM | Song changes → Announces | El Músico |
| 7:05 PM | Big gift received → Instant shout-out | El Hype Man |
| 7:10 PM | Auto-launches "Gift Burst" game (3 min) | El Maestro del Juego |
| 7:13 PM | Game ends, announces winner | El Maestro del Juego |
| 7:20 PM | **You** start a PK → Bot takes over | El Anunciador |
| 7:21 PM | Live PK score update | El Anunciador |
| 7:25 PM | PK ends → Announces winner + MVP | El Anunciador |
| 7:26 PM | Song changes → Back to music | El Músico |

**Result**: Non-stop engagement without you saying a word!

---

## 🧪 Testing

The dashboard includes test controls to simulate events:

- **Test Vibe Check**: Manually trigger a vibe check poll
- **Test PK Start**: Simulate a PK battle starting
- **Test Big Gift**: Simulate a high-value gift (5,000 diamonds)

Use these to see how each module responds before going live!

---

## 🔧 Technical Architecture

### Backend (Node.js + Express + WebSocket)
- `server/index.ts` - Main server and API
- `server/JefeBotCoordinator.ts` - Module orchestrator
- `server/modules/` - The four modules
  - `ElMusico.ts`
  - `ElAnunciador.ts`
  - `ElMaestroDelJuego.ts`
  - `ElHypeMan.ts`

### Frontend (React + TypeScript + Vite)
- `src/App.tsx` - Dashboard UI
- `src/App.css` - Styles
- Real-time WebSocket connection for live updates

### Module Coordination
- **Shared State**: All modules see the same room state
- **Smart Pausing**: Games pause during PKs automatically
- **Event-Driven**: Modules react to SUGO events in real-time

---

## 🎨 Dashboard Features

- **Real-time Status**: See what's playing, active games, and PKs
- **Live Configuration**: Change settings without restarting
- **Visual Feedback**: Color-coded status indicators
- **Responsive Design**: Works on laptop, tablet, and desktop
- **Connection Monitor**: Always know if you're connected

---

## 📝 SUGO API Integration

**Note**: This current implementation includes mock SUGO API calls. To connect to the real SUGO API:

1. Update the `sendToSUGO()` method in `server/JefeBotCoordinator.ts`
2. Implement SUGO event listeners for:
   - PK start/end events
   - Gift received events
   - Chat messages
3. Add SUGO authentication headers

Example (to be implemented):
```typescript
private async sendToSUGO(message: string): Promise<void> {
  await fetch(`https://api.sugo.com/rooms/${this.config.sugoRoomId}/messages`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${this.config.botAccountToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message })
  });
}
```

---

## 🎵 Spotify Integration

To enable Spotify features:

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create an app
3. Get your access token
4. Paste it into the dashboard

The bot will automatically detect song changes and announce them!

---

## 🚨 Troubleshooting

### Bot won't start
- ✅ Check SUGO Room ID is correct
- ✅ Check Bot Account Token is valid
- ✅ Check backend server is running (`npm run server`)

### Spotify not working
- ✅ Token must be valid and not expired
- ✅ Spotify must be actively playing
- ✅ Token needs `user-read-currently-playing` scope

### Games not starting
- ✅ Module must be enabled
- ✅ At least one game type must be checked
- ✅ Bot must be running
- ✅ No active PK (games pause during PKs)

---

## 🎤 Philosophy: The Silent Jefe

You are the **Silent Jefe**—the boss who doesn't need to speak. Your music is the vibe, and this bot is your voice. You stay in the power seat, play your tracks, and let the bot create the dinámica.

**This is not a tool. This is your co-host.**

---

## 📜 License

MIT License - Build, modify, and make it yours!

---

## 🤝 Contributing

Want to add new game types? Better Spotify integration? New announcement styles?

Fork it, build it, share it!

---

**Built for the Silent Jefes who run the show. 🎵👑**
