# 🧩 Event Server Web Panel – Feature Roadmap

A  control panel for managing the EdgeGamers event server.  
Supports Steam login, game mode control, settings overrides, and admin tools.

---

## ✅ Core Pages

### 🏠 Home Dashboard
- [ ] Show logged-in Steam name, avatar, and role
- [ ] Server online status, current map, mode, and player count
- [ ] Recent actions and event log
- [ ] Quick actions: Change mode, restart round, etc.

### 🎮 Game Modes
- [x] List available modes (e.g., Hide and Seek, Prophunt 👀)
- [ ] Activate selected mode
- [x] Show mode-specific settings
- [x] [Manager only] Add/edit modes and descriptions

### 🛠 Live Settings
- [ ] Toggle runtime settings:
- [ ] Save per-mode overrides and one-time event settings

### 🧑‍🤝‍🧑 Players Panel
- [ ] Live list of connected players
- [ ] View name, SteamID, team, status
- [ ] Slay, slap, team swap, kick, godmode

### 🗺️ Maps & Mapgroups
- [x] View current map and map rotation
- [x] [Manager only] Add/remove maps from map groups
- [ ] [Coordinator] Place for suggesting maps to be added by review from Manager
- [ ] Workshop link integration
- [ ] Map history / usage tracking

### 🗓️ Upcoming Events
- [ ] List scheduled events: host, time, mode
- [ ] Create/edit events
- [ ] RSVP or claim events

---

## 🛡️ Admin Features

### 📊 Audit Log
- [ ] Track mode changes, commands, bans, and actions
- [ ] Include timestamps, SteamID, and actor

### ⚙️ Server Control
- [ ] Start/Stop/Restart server
- [ ] Raw RCON command input
- [ ] Console output viewer

---

## 🌐 Integration & Security

- [x] Steam OpenID login
- [ ] Role check using MAUL
- [ ] Session storage via cookies or JWT
- [ ] Frontend route protection based on role

---

## 🧪 Dev & UX Ideas

- [ ] Export/import configs as JSON
- [ ] Discord webhook for server events
- [ ] Light/Dark mode toggle
- [ ] Mobile responsive design

---

## 📋 Role-Based Access Table

| Feature            | Event Coordinator   | Manager |
|--------------------|---------------------|---------|
| View Dashboard     | ✅                   | ✅       |
| Activate Game Mode | ✅                   | ✅       |
| Change Settings    | ✅                   | ✅       |
| Manage Players     | ✅                   | ✅       |
| Map Management     | ✅ (Suggesting only) | ✅       |
| Event Scheduler    | ✅                   | ✅       |
| Server Tools       | ❌                   | ✅       |
| Role Control       | ❌                   | ✅       |

---

## 🚧 Development Status

This roadmap will evolve as features are completed and new ideas are added.
