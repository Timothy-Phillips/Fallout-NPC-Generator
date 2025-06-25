import { FalloutNPCGeneratorApp } from './npc-generator-app.mjs';
import { DataManager } from './data-manager.mjs';

class FalloutNPCGenerator {
  static ID = 'fallout-npc-generator';
  
  static FLAGS = {
    GENERATOR: 'generator'
  };

  static TEMPLATES = {
    GENERATOR: `modules/${this.ID}/templates/npc-generator.hbs`
  };

  static initialize() {
    this.FalloutNPCGeneratorApp = FalloutNPCGeneratorApp;
  }

  static log(force, ...args) {
    const shouldLog = force || game.modules.get('_dev-mode')?.api?.getPackageDebugValue(this.ID);
    if (shouldLog) {
      console.log(this.ID, '|', ...args);
    }
  }
}

Hooks.once('init', async function() {
  console.log('Fallout NPC Generator | Initializing');
  
  FalloutNPCGenerator.initialize();
  
  // Register module settings
  game.settings.register(FalloutNPCGenerator.ID, 'includePortraits', {
    name: 'FALLOUT_NPC_GEN.Settings.IncludePortraits.Name',
    hint: 'FALLOUT_NPC_GEN.Settings.IncludePortraits.Hint',
    scope: 'world',
    config: true,
    type: Boolean,
    default: true
  });

  game.settings.register(FalloutNPCGenerator.ID, 'generateBackstories', {
    name: 'FALLOUT_NPC_GEN.Settings.GenerateBackstories.Name', 
    hint: 'FALLOUT_NPC_GEN.Settings.GenerateBackstories.Hint',
    scope: 'world',
    config: true,
    type: Boolean,
    default: true
  });

  game.settings.register(FalloutNPCGenerator.ID, 'defaultFolder', {
    name: 'FALLOUT_NPC_GEN.Settings.DefaultFolder.Name',
    hint: 'FALLOUT_NPC_GEN.Settings.DefaultFolder.Hint', 
    scope: 'world',
    config: true,
    type: String,
    default: 'Generated NPCs'
  });

  // Preload templates
  await loadTemplates([FalloutNPCGenerator.TEMPLATES.GENERATOR]);
  
  // Initialize data manager
  await DataManager.initialize();
});

Hooks.once('ready', async function() {
  // Verify system compatibility
  if (game.system.id !== 'fallout') {
    ui.notifications.warn('Fallout NPC Generator requires the Fallout: The Roleplaying Game system');
    return;
  }

  console.log('Fallout NPC Generator | Ready');
});

Hooks.on('getActorDirectoryEntryContext', (html, options) => {
  options.push({
    name: 'FALLOUT_NPC_GEN.ContextMenu.GenerateNPC',
    icon: '<i class="fas fa-user-plus"></i>',
    callback: () => {
      new FalloutNPCGeneratorApp().render(true);
    }
  });
});

Hooks.on('renderActorDirectory', (app, html, data) => {
  if (game.system.id !== 'fallout') return;
  
  const button = $(`
    <button class="fallout-npc-generator-btn">
      <i class="fas fa-radiation"></i>
      ${game.i18n.localize('FALLOUT_NPC_GEN.UI.GenerateWastelandNPC')}
    </button>
  `);
  
  button.click(() => {
    new FalloutNPCGeneratorApp().render(true);
  });
  
  html.find('.directory-header').after(button);
});

// Register keybinding
Hooks.once('ready', () => {
  game.keybindings.register(FalloutNPCGenerator.ID, 'openGenerator', {
    name: 'FALLOUT_NPC_GEN.Keybindings.OpenGenerator',
    hint: 'FALLOUT_NPC_GEN.Keybindings.OpenGeneratorHint',
    editable: [
      {
        key: 'KeyN',
        modifiers: ['Control', 'Shift']
      }
    ],
    onDown: () => {
      new FalloutNPCGeneratorApp().render(true);
    }
  });
});

// Global API
globalThis.FalloutNPCGenerator = FalloutNPCGenerator;