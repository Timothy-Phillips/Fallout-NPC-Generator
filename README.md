# Fallout NPC Generator

<div align="center">

![Fallout NPC Generator Logo](https://img.shields.io/badge/Fallout-NPC%20Generator-00ff41?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjMDBmZjQxIi8+Cjwvc3ZnPg==)

**A comprehensive NPC generator for the Fallout: The Roleplaying Game 2D20 system in Foundry VTT**

[![Foundry Version](https://img.shields.io/badge/Foundry-v11--v13-orange?style=flat-square)](https://foundryvtt.com/)
[![System](https://img.shields.io/badge/System-Fallout%202D20-00ff41?style=flat-square)](https://foundryvtt.com/packages/fallout)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)
[![Downloads](https://img.shields.io/badge/Downloads-0k+-brightgreen?style=flat-square)](#)

[Features](#features) • [Installation](#installation) • [Usage](#usage) • [Configuration](#configuration) • [Support](#support)

</div>

---

## 🎯 Overview

The **Fallout NPC Generator** is a powerful, lore-accurate tool designed specifically for Game Masters running Fallout: The Roleplaying Game campaigns in Foundry VTT. Generate balanced, authentic wasteland characters with a single click, complete with faction-appropriate equipment, personality traits, and backstories.

### 🌟 Why Choose This Module?

- **🎲 Intelligent Generation**: Advanced algorithms ensure NPCs are mechanically balanced and lore-appropriate
- **⚡ Lightning Fast**: Generate complete NPCs in seconds, not minutes
- **🎨 Authentic Feel**: Beautiful Pip-Boy inspired interface with terminal aesthetics
- **🔧 Full Integration**: Seamlessly works with the Fallout 2D20 system in Foundry VTT
- **📦 Complete Package**: Everything you need for comprehensive NPC creation

---

## ✨ Features

### 🏺 **Complete Archetype System**
- **8 Unique Archetypes**: Wastelanders, Raiders, Vault Dwellers, Brotherhood Knights, Super Mutants, Ghouls, Traders, and Settlers
- **Faction Compatibility**: Each archetype includes appropriate faction restrictions
- **SPECIAL Preferences**: Authentic attribute distributions based on lore

### 📊 **Advanced Generation Engine**
- **Level 1-10 Scaling**: Proper attribute progression and equipment tiers
- **Intelligent Equipment**: Faction and level-appropriate gear selection
- **Mutation System**: Authentic mutations for Ghouls and Super Mutants
- **Personality Traits**: Archetype-specific behavioral characteristics
- **Dynamic Backstories**: Procedurally generated character histories

### 🎨 **Pip-Boy Inspired Interface**
- **Terminal Aesthetics**: Authentic green-on-black color scheme
- **Glow Effects**: Immersive text shadows and animations
- **Tabbed Organization**: Clean, intuitive workflow
- **Responsive Design**: Works perfectly on all screen sizes

### 🚀 **Workflow Integration**
- **One-Click Access**: Button directly in Actor Directory
- **Keyboard Shortcuts**: Quick access with `Ctrl+Shift+N`
- **Drag & Drop**: Generated NPCs can be dragged to scenes
- **Context Menus**: Right-click integration throughout Foundry
- **Batch Generation**: Create up to 20 NPCs simultaneously

### 🔧 **System Integration**
- **Native Actor Creation**: Creates proper Foundry Actor documents
- **Equipment Embedding**: Automatically adds items to inventory
- **Compendium Support**: Integrates with Fallout 2D20 equipment data
- **Folder Organization**: Automatic organization in specified folders

---

## 📦 Installation

### **Method 1: Module Browser (Recommended)**
1. Open Foundry VTT and navigate to **Configuration and Setup**
2. Click **Add-on Modules** tab
3. Click **Install Module**
4. Search for **"Fallout NPC Generator"**
5. Click **Install** and wait for completion
6. Return to your world and enable the module

### **Method 2: Manifest URL**
1. In Foundry VTT, go to **Configuration and Setup** → **Add-on Modules**
2. Click **Install Module**
3. Paste this manifest URL in the field:
   ```
   https://github.com/fallout-npc-generator/foundry-module/releases/latest/download/module.json
   ```
4. Click **Install**

### **Method 3: Manual Installation**
1. Download the latest release from [GitHub Releases](https://github.com/fallout-npc-generator/foundry-module/releases)
2. Extract the ZIP file to your `modules` directory:
   ```
   FoundryVTT/Data/modules/fallout-npc-generator/
   ```
3. Restart Foundry VTT
4. Enable the module in your world

### **System Requirements**
- **Foundry VTT**: Version 11, 12, or 13
- **Game System**: Fallout: The Roleplaying Game (v2.0.0+)
- **Browser**: Modern browser with ES6 support

---

## 🎮 Usage

### **Quick Start**
1. **Enable the Module** in your Fallout 2D20 world
2. **Open Actor Directory** in your game
3. **Click** the "Generate Wasteland NPC" button
4. **Generate** your NPC and **Save to Actors**

### **Generation Workflow**

#### **📋 Basic Tab**
- **Archetype**: Choose from 8 authentic Fallout archetypes or leave blank for random
- **Level**: Set 1-10 or leave blank for random level assignment
- **Faction**: Select compatible faction or allow random assignment  
- **Name**: Enter custom name or leave blank for procedural generation

#### **⚙️ Advanced Tab**
- **Generation Options**: Toggle equipment, mutations, personality traits, and backstories
- **Batch Generation**: Create multiple NPCs (1-20) simultaneously
- **Equipment Tiers**: Automatic scaling based on level (1-3: Basic, 4-6: Advanced, 7-10: Elite)

#### **👁️ Preview Tab**
- **Complete Stat Block**: View all SPECIAL and derived attributes
- **Equipment List**: See all generated gear and items
- **Personality & Mutations**: Review character traits and special abilities
- **Generated Backstory**: Read the procedural character history

### **Access Methods**

| Method | Action |
|--------|--------|
| **Button** | Click "Generate Wasteland NPC" in Actor Directory |
| **Keyboard** | Press `Ctrl+Shift+N` anywhere in Foundry |
| **Context Menu** | Right-click Actor Directory → "Generate Fallout NPC" |
| **API** | Use `FalloutNPCGenerator.generateNPC()` in macros |

### **Generated NPC Data**

Each generated NPC includes:

```javascript
{
  name: "Marcus Steelheart",
  archetype: "brotherhood-knight", 
  faction: "Brotherhood of Steel",
  level: 5,
  special: {
    strength: 8, perception: 6, endurance: 7,
    charisma: 5, intelligence: 6, agility: 5, luck: 4
  },
  derived: {
    health: 12, defense: 5, initiative: 11,
    carryWeight: 80, healingRate: 3
  },
  equipment: [...], // Auto-generated items
  personality: ["Disciplined", "Technology-focused", "Loyal"],
  backstory: "A dedicated knight who..."
}
```

---

## ⚙️ Configuration

### **Module Settings**

Access settings via **Game Settings** → **Configure Settings** → **Module Settings**

| Setting | Default | Description |
|---------|---------|-------------|
| **Include Portraits** | `true` | Automatically assign portrait images to NPCs |
| **Generate Backstories** | `true` | Show backstory generation option in advanced tab |
| **Default Folder** | `"Generated NPCs"` | Folder name for organizing created NPCs |

### **Archetype Customization**

Modify `data/archetypes.json` to customize archetypes:

```json
{
  "id": "custom-archetype",
  "name": "Custom Archetype", 
  "type": "human",
  "description": "Your custom archetype description",
  "compatibleFactions": ["Faction1", "Faction2"],
  "specialPreferences": {
    "strength": { "min": 6, "max": 9, "weight": 3 },
    "intelligence": { "min": 5, "max": 8, "weight": 2 }
  }
}
```

### **Equipment Customization**

Add custom equipment in `data/equipment.json`:

```json
{
  "name": "Custom Weapon",
  "type": "weapon",
  "tier": 2,
  "archetypes": ["human"],
  "factions": ["Custom Faction"],
  "system": {
    "damage": "3d6",
    "range": "Medium",
    "qualities": ["Accurate"]
  }
}
```

---

## 🎨 Archetypes Reference

| Archetype | Type | Key Attributes | Compatible Factions | Description |
|-----------|------|----------------|-------------------|-------------|
| **Wastelander** | Human | END, PER, AGI | Wastelanders, Traders, Settlers | Hardy survivors adapted to wasteland life |
| **Raider** | Human | STR, AGI, END | Raiders | Violent opportunists who prey on the weak |
| **Vault Dweller** | Human | INT, PER, CHA | Vault Dwellers, Settlers | Sheltered individuals from underground vaults |
| **Brotherhood Knight** | Human | STR, END, INT | Brotherhood of Steel | Disciplined warriors with advanced technology |
| **Super Mutant** | Mutant | STR, END | Super Mutants, Wastelanders | FEV-enhanced giants with immense strength |
| **Ghoul** | Mutant | END, INT, PER | Wastelanders, Traders, Settlers | Radiation-mutated humans with extended lifespans |
| **Trader** | Human | CHA, INT, PER | Traders, Wastelanders, Settlers | Merchants traveling the wasteland |
| **Settler** | Human | INT, CHA, END | Settlers, Minutemen, NCR | Community builders rebuilding civilization |

---

## 🔌 API Reference

### **Global API**

The module exposes a global API for macro integration:

```javascript
// Generate a random NPC
const npc = await FalloutNPCGenerator.generateNPC();

// Generate specific NPC
const raider = await FalloutNPCGenerator.generateNPC({
  archetype: 'raider',
  level: 5,
  faction: 'Raiders',
  includeEquipment: true
});

// Create Actor from NPC data
const actor = await FalloutNPCGenerator.createActor(npc);
```

### **Advanced Options**

```javascript
const options = {
  archetype: 'brotherhood-knight',    // Specific archetype ID
  level: 7,                          // 1-10
  faction: 'Brotherhood of Steel',   // Compatible faction
  name: 'Custom Name',               // Override name generation
  includeEquipment: true,            // Include gear
  includeMutations: true,            // Include mutations (if applicable)
  includePersonality: true,          // Include personality traits
  includeBackstory: true             // Generate backstory
};

const customNPC = await FalloutNPCGenerator.generateNPC(options);
```

---

## 🛠️ Development

### **Project Structure**
```
fallout-npc-generator/
├── module.json                 # Module manifest
├── scripts/
│   ├── fallout-npc-generator.mjs    # Main module
│   ├── npc-generator-app.mjs        # UI application  
│   ├── npc-builder.mjs              # Generation logic
│   └── data-manager.mjs             # Data management
├── templates/
│   └── npc-generator.hbs            # UI template
├── styles/
│   └── fallout-npc-generator.css    # Styling
├── data/
│   ├── archetypes.json              # Archetype definitions
│   ├── names.json                   # Name databases
│   └── equipment.json               # Equipment data
├── lang/
│   └── en.json                      # Localization
└── README.md                        # This file
```

### **Contributing**

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### **Local Development**

```bash
# Clone the repository
git clone https://github.com/fallout-npc-generator/foundry-module.git

# Link to your Foundry modules directory
ln -s $(pwd) /path/to/FoundryVTT/Data/modules/fallout-npc-generator

# Make changes and test in Foundry VTT
```

---

## 🐛 Support & Issues

### **Getting Help**

- **📖 Documentation**: Check this README and in-module tooltips
- **🐛 Bug Reports**: [Open an issue](https://github.com/fallout-npc-generator/foundry-module/issues/new/choose) on GitHub
- **💡 Feature Requests**: [Suggest features](https://github.com/fallout-npc-generator/foundry-module/discussions) in Discussions
- **💬 Community**: Join our [Discord Server](https://discord.gg/fallout-npc-gen) for real-time help

### **Common Issues**

<details>
<summary><strong>Module not appearing in the list</strong></summary>

- Ensure you're using a Fallout 2D20 world
- Check that Foundry VTT version is 11+
- Verify the module is properly installed in the modules directory
- Restart Foundry VTT completely
</details>

<details>
<summary><strong>Generated NPCs have no equipment</strong></summary>

- Check that "Include Equipment" is enabled in Advanced tab
- Verify the Fallout 2D20 system has equipment compendiums
- Ensure the selected archetype/faction combination has compatible equipment
</details>

<details>
<summary><strong>UI styling looks broken</strong></summary>

- Clear your browser cache
- Disable other modules temporarily to check for conflicts
- Check browser console for CSS loading errors
- Ensure you're using a modern browser with ES6 support
</details>

### **Compatibility**

| Module | Status | Notes |
|--------|--------|-------|
| **Dice So Nice!** | ✅ Compatible | Works with dice animations |
| **Token Action HUD** | ✅ Compatible | No conflicts |
| **Better Rolls** | ✅ Compatible | Enhanced roll integration |
| **Foundry Patrol** | ⚠️ Partial | Some minor UI conflicts |

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### **Third-Party Assets**

- **Fallout 2D20**: Game system by Modiphius Entertainment
- **Font Icons**: Font Awesome (SIL OFL 1.1)
- **Color Palette**: Inspired by Fallout series visual design

---

## 🙏 Acknowledgments

- **Modiphius Entertainment** for the amazing Fallout 2D20 system
- **Foundry VTT Community** for development resources and support
- **Fallout Community** for lore accuracy feedback
- **Beta Testers** who helped refine the module

### **Special Thanks**

- **@Muttley** for the excellent Fallout 2D20 system implementation
- **@League of Extraordinary FoundryVTT Developers** for development guidance
- **Fallout Fans** worldwide for keeping the wasteland alive

---

## 📊 Statistics

![GitHub release (latest by date)](https://img.shields.io/github/v/release/fallout-npc-generator/foundry-module?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/fallout-npc-generator/foundry-module?style=flat-square)
![GitHub pull requests](https://img.shields.io/github/issues-pr/fallout-npc-generator/foundry-module?style=flat-square)
![GitHub stars](https://img.shields.io/github/stars/fallout-npc-generator/foundry-module?style=flat-square)

---

<div align="center">

**War. War never changes. But NPC generation just got a whole lot easier.**

[⬆️ Back to Top](#fallout-npc-generator)

Made with ❤️ for the Fallout and Foundry VTT communities

</div>