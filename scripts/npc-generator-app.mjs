import { NPCBuilder } from './npc-builder.mjs';
import { DataManager } from './data-manager.mjs';

export class FalloutNPCGeneratorApp extends FormApplication {
  constructor(options = {}) {
    super({}, options);
    this.generatedNPC = null;
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ['fallout-npc-generator'],
      template: 'modules/fallout-npc-generator/templates/npc-generator.hbs',
      width: 600,
      height: 'auto',
      title: game.i18n.localize('FALLOUT_NPC_GEN.UI.Title'),
      tabs: [
        {
          navSelector: '.tabs',
          contentSelector: '.tab-content',
          initial: 'basic'
        }
      ],
      dragDrop: [{ dragSelector: '.npc-preview', dropSelector: null }],
      resizable: true
    });
  }

  getData() {
    const data = super.getData();
    
    data.archetypes = DataManager.getArchetypes();
    data.factions = DataManager.getFactions();
    data.generatedNPC = this.generatedNPC;
    data.includePortraits = game.settings.get('fallout-npc-generator', 'includePortraits');
    data.generateBackstories = game.settings.get('fallout-npc-generator', 'generateBackstories');
    
    return data;
  }

  activateListeners(html) {
    super.activateListeners(html);
    
    html.find('[name="archetype"]').change(this._onArchetypeChange.bind(this));
    html.find('[name="level"]').change(this._onLevelChange.bind(this));
    html.find('.generate-btn').click(this._onGenerate.bind(this));
    html.find('.save-npc-btn').click(this._onSaveNPC.bind(this));
    html.find('.export-btn').click(this._onExport.bind(this));
    html.find('.randomize-btn').click(this._onRandomize.bind(this));
  }

  async _onArchetypeChange(event) {
    const archetype = event.target.value;
    const factionSelect = this.element.find('[name="faction"]');
    
    if (archetype) {
      const archetypeData = DataManager.getArchetype(archetype);
      const compatibleFactions = archetypeData?.compatibleFactions || [];
      
      factionSelect.empty();
      factionSelect.append('<option value="">Random</option>');
      
      compatibleFactions.forEach(faction => {
        factionSelect.append(`<option value="${faction}">${faction}</option>`);
      });
    } else {
      factionSelect.empty();
      factionSelect.append('<option value="">Random</option>');
      DataManager.getFactions().forEach(faction => {
        factionSelect.append(`<option value="${faction}">${faction}</option>`);
      });
    }
  }

  _onLevelChange(event) {
    const level = parseInt(event.target.value);
    const equipmentTier = Math.ceil(level / 3);
    
    this.element.find('.equipment-tier-display').text(`Tier ${equipmentTier}`);
  }

  async _onGenerate(event) {
    event.preventDefault();
    
    const formData = new FormData(this.element.find('form')[0]);
    const options = {
      archetype: formData.get('archetype') || null,
      level: parseInt(formData.get('level')) || null,
      faction: formData.get('faction') || null,
      name: formData.get('name') || null,
      includeEquipment: formData.get('includeEquipment') === 'on',
      includeMutations: formData.get('includeMutations') === 'on',
      includePersonality: formData.get('includePersonality') === 'on',
      includeBackstory: formData.get('includeBackstory') === 'on'
    };
    
    try {
      this.element.find('.generate-btn').prop('disabled', true).text('Generating...');
      
      this.generatedNPC = await NPCBuilder.generateNPC(options);
      
      await this.render();
      
      // Switch to preview tab
      this._tabs[0].activate('preview');
      
      ui.notifications.info('NPC generated successfully!');
      
    } catch (error) {
      console.error('Error generating NPC:', error);
      ui.notifications.error('Failed to generate NPC. Check console for details.');
    } finally {
      this.element.find('.generate-btn').prop('disabled', false).text('Generate NPC');
    }
  }

  async _onSaveNPC(event) {
    if (!this.generatedNPC) return;
    
    try {
      const actor = await NPCBuilder.createActorFromNPC(this.generatedNPC);
      ui.notifications.info(`Created NPC: ${actor.name}`);
      
      // Optionally close the app
      if (event.shiftKey) {
        this.close();
      }
    } catch (error) {
      console.error('Error saving NPC:', error);
      ui.notifications.error('Failed to save NPC. Check console for details.');
    }
  }

  _onExport(event) {
    if (!this.generatedNPC) return;
    
    const dataStr = JSON.stringify(this.generatedNPC, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `${this.generatedNPC.name.replace(/\s+/g, '_')}_npc.json`;
    link.click();
  }

  _onRandomize(event) {
    // Randomize all form fields
    const form = this.element.find('form');
    
    // Random archetype
    const archetypes = DataManager.getArchetypes();
    const randomArchetype = archetypes[Math.floor(Math.random() * archetypes.length)];
    form.find('[name="archetype"]').val(randomArchetype.id).trigger('change');
    
    // Random level
    const randomLevel = Math.floor(Math.random() * 10) + 1;
    form.find('[name="level"]').val(randomLevel).trigger('change');
    
    // Clear name to ensure random generation
    form.find('[name="name"]').val('');
  }

  _canDragStart(selector) {
    return this.generatedNPC !== null;
  }

  _onDragStart(event) {
    if (!this.generatedNPC) return;
    
    const dragData = {
      type: 'Actor',
      data: this.generatedNPC
    };
    
    event.dataTransfer.setData('text/plain', JSON.stringify(dragData));
  }
}