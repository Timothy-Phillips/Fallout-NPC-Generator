import { DataManager } from './data-manager.mjs';

export class NPCBuilder {
  
  static async generateNPC(options = {}) {
    const {
      archetype = null,
      level = null,
      faction = null,
      name = null,
      includeEquipment = true,
      includeMutations = true,
      includePersonality = true,
      includeBackstory = true
    } = options;

    // Determine archetype
    let selectedArchetype;
    if (archetype) {
      selectedArchetype = DataManager.getArchetype(archetype);
    } else {
      const archetypes = DataManager.getArchetypes();
      selectedArchetype = archetypes[Math.floor(Math.random() * archetypes.length)];
    }

    // Determine level
    const npcLevel = level || (Math.floor(Math.random() * 10) + 1);

    // Determine faction
    let selectedFaction;
    if (faction) {
      selectedFaction = faction;
    } else if (selectedArchetype.compatibleFactions?.length > 0) {
      const compatibleFactions = selectedArchetype.compatibleFactions;
      selectedFaction = compatibleFactions[Math.floor(Math.random() * compatibleFactions.length)];
    } else {
      const allFactions = DataManager.getFactions();
      selectedFaction = allFactions[Math.floor(Math.random() * allFactions.length)];
    }

    // Generate name
    const npcName = name || DataManager.generateName(selectedArchetype.type, selectedFaction);

    // Generate SPECIAL attributes
    const special = this.generateSpecialAttributes(selectedArchetype, npcLevel);

    // Generate derived attributes
    const derived = this.calculateDerivedAttributes(special, npcLevel);

    // Generate equipment
    let equipment = [];
    if (includeEquipment) {
      equipment = DataManager.generateEquipment(selectedArchetype, npcLevel, selectedFaction);
    }

    // Generate mutations (for ghouls and super mutants)
    let mutations = [];
    if (includeMutations && ['ghoul', 'super-mutant'].includes(selectedArchetype.type)) {
      mutations = DataManager.generateMutations(selectedArchetype.type);
    }

    // Generate personality
    let personality = null;
    if (includePersonality) {
      personality = DataManager.generatePersonality(selectedArchetype);
    }

    // Generate backstory
    let backstory = null;
    if (includeBackstory) {
      backstory = DataManager.generateBackstory(selectedArchetype, selectedFaction);
    }

    const npc = {
      name: npcName,
      type: selectedArchetype.type,
      archetype: selectedArchetype.id,
      faction: selectedFaction,
      level: npcLevel,
      special,
      derived,
      equipment,
      mutations,
      personality,
      backstory,
      generatedAt: new Date().toISOString()
    };

    return npc;
  }

  static generateSpecialAttributes(archetype, level) {
    const special = {};
    const baseAttributes = ['strength', 'perception', 'endurance', 'charisma', 'intelligence', 'agility', 'luck'];
    
    // Calculate total points available (base 28 + level bonuses)
    const basePoints = 28;
    const levelBonuses = Math.floor((level - 1) / 4); // +1 every 4 levels
    const totalPoints = basePoints + levelBonuses;
    
    // Start with minimum values
    baseAttributes.forEach(attr => {
      special[attr] = archetype.specialPreferences?.[attr]?.min || 4;
    });
    
    // Calculate remaining points
    let remainingPoints = totalPoints - Object.values(special).reduce((sum, val) => sum + val, 0);
    
    // Distribute remaining points based on archetype preferences
    while (remainingPoints > 0) {
      const attr = this.selectWeightedAttribute(archetype, special);
      const maxValue = archetype.specialPreferences?.[attr]?.max || 10;
      
      if (special[attr] < maxValue) {
        special[attr]++;
        remainingPoints--;
      } else {
        // If preferred attributes are maxed, distribute randomly
        const availableAttrs = baseAttributes.filter(a => special[a] < 10);
        if (availableAttrs.length === 0) break;
        
        const randomAttr = availableAttrs[Math.floor(Math.random() * availableAttrs.length)];
        special[randomAttr]++;
        remainingPoints--;
      }
    }
    
    return special;
  }

  static selectWeightedAttribute(archetype, currentSpecial) {
    const preferences = archetype.specialPreferences || {};
    const weights = [];
    
    Object.entries(preferences).forEach(([attr, config]) => {
      const weight = config.weight || 1;
      const current = currentSpecial[attr];
      const max = config.max || 10;
      
      // Reduce weight as we approach max
      const adjustedWeight = current >= max ? 0 : weight * (max - current) / max;
      weights.push({ attr, weight: adjustedWeight });
    });
    
    // If no preferences or all maxed, default to even distribution
    if (weights.length === 0 || weights.every(w => w.weight === 0)) {
      const attrs = ['strength', 'perception', 'endurance', 'charisma', 'intelligence', 'agility', 'luck'];
      return attrs[Math.floor(Math.random() * attrs.length)];
    }
    
    // Weighted random selection
    const totalWeight = weights.reduce((sum, w) => sum + w.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (const { attr, weight } of weights) {
      random -= weight;
      if (random <= 0) return attr;
    }
    
    return weights[0].attr; // Fallback
  }

  static calculateDerivedAttributes(special, level) {
    return {
      health: special.endurance + level,
      defense: special.agility,
      initiative: special.perception + special.agility,
      carryWeight: special.strength * 10,
      healingRate: Math.floor(special.endurance / 2),
      actionPoints: special.agility + Math.floor(special.luck / 2),
      criticalHitChance: special.luck,
      meleeDamage: Math.floor(special.strength / 2),
      damageResistance: 0 // Base, modified by armor
    };
  }

  static async createActorFromNPC(npcData) {
    const actorData = {
      name: npcData.name,
      type: 'character',
      system: {
        level: npcData.level,
        special: npcData.special,
        health: {
          value: npcData.derived.health,
          max: npcData.derived.health
        },
        defense: npcData.derived.defense,
        initiative: npcData.derived.initiative
      },
      flags: {
        'fallout-npc-generator': {
          generated: true,
          archetype: npcData.archetype,
          faction: npcData.faction,
          generatedAt: npcData.generatedAt
        }
      }
    };

    // Add backstory to biography if present
    if (npcData.backstory) {
      actorData.system.biography = npcData.backstory;
    }

    // Create the actor
    const actor = await Actor.create(actorData);

    // Add equipment as embedded items
    if (npcData.equipment && npcData.equipment.length > 0) {
      const itemsToCreate = [];
      
      for (const equipmentItem of npcData.equipment) {
        const itemData = {
          name: equipmentItem.name,
          type: equipmentItem.type,
          system: equipmentItem.system || {}
        };
        itemsToCreate.push(itemData);
      }
      
      if (itemsToCreate.length > 0) {
        await actor.createEmbeddedDocuments('Item', itemsToCreate);
      }
    }

    // Set folder if configured
    const defaultFolder = game.settings.get('fallout-npc-generator', 'defaultFolder');
    if (defaultFolder) {
      let folder = game.folders.find(f => f.name === defaultFolder && f.type === 'Actor');
      if (!folder) {
        folder = await Folder.create({
          name: defaultFolder,
          type: 'Actor',
          parent: null
        });
      }
      await actor.update({ folder: folder.id });
    }

    return actor;
  }
}
