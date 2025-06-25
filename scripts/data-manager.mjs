export class DataManager {
  static data = {
    archetypes: [],
    names: {},
    equipment: [],
    personalities: [],
    backstories: []
  };

  static async initialize() {
    await this.loadData();
  }

  static async loadData() {
    try {
      // Load archetype data
      this.data.archetypes = await this.loadJSON('data/archetypes.json');
      
      // Load name data
      this.data.names = await this.loadJSON('data/names.json');
      
      // Load equipment data
      this.data.equipment = await this.loadJSON('data/equipment.json');
      
      console.log('Fallout NPC Generator | Data loaded successfully');
    } catch (error) {
      console.error('Fallout NPC Generator | Failed to load data:', error);
    }
  }

  static async loadJSON(path) {
    const response = await fetch(`modules/fallout-npc-generator/${path}`);
    if (!response.ok) {
      throw new Error(`Failed to load ${path}: ${response.status}`);
    }
    return await response.json();
  }

  static getArchetypes() {
    return this.data.archetypes;
  }

  static getArchetype(id) {
    return this.data.archetypes.find(a => a.id === id);
  }

  static getFactions() {
    return [
      'Wastelanders', 'Raiders', 'Vault Dwellers', 'Brotherhood of Steel',
      'Enclave', 'New California Republic', 'Caesar\'s Legion', 'Institute',
      'Railroad', 'Minutemen', 'Children of Atom', 'Super Mutants',
      'Traders', 'Settlers', 'Tribals'
    ];
  }

  static generateName(archetypeType, faction) {
    const nameData = this.data.names[archetypeType] || this.data.names.human;
    
    if (!nameData) {
      return this.generateFallbackName();
    }

    // Super mutants typically use single names
    if (archetypeType === 'super-mutant') {
      const names = nameData.single || nameData.first || ['Marcus', 'Strong', 'Fawkes', 'Lily'];
      return names[Math.floor(Math.random() * names.length)];
    }

    // Robots use designation patterns
    if (archetypeType === 'robot') {
      const prefixes = nameData.prefixes || ['Mr.', 'Ms.', 'Unit', 'Bot'];
      const suffixes = nameData.suffixes || ['Handy', 'Gutsy', 'Prime', '3000'];
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
      return `${prefix} ${suffix}`;
    }

    // Standard human names
    const firstNames = nameData.first || ['John', 'Jane', 'Alex', 'Sam'];
    const lastNames = nameData.last || ['Doe', 'Smith', 'Jones', 'Brown'];
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    return `${firstName} ${lastName}`;
  }

  static generateFallbackName() {
    const firstNames = ['Alex', 'Blake', 'Casey', 'Drew', 'Emery', 'Finley'];
    const lastNames = ['Wasteland', 'Survivor', 'Wanderer', 'Scavenger', 'Trader', 'Scout'];
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    return `${firstName} ${lastName}`;
  }

  static generateEquipment(archetype, level, faction) {
    const equipmentList = this.data.equipment || [];
    const tier = Math.ceil(level / 3); // 1-3: Tier 1, 4-6: Tier 2, 7-10: Tier 3
    
    const availableEquipment = equipmentList.filter(item => {
      // Check tier compatibility
      if (item.tier && item.tier > tier) return false;
      
      // Check archetype compatibility
      if (item.archetypes && !item.archetypes.includes(archetype.type)) return false;
      
      // Check faction compatibility
      if (item.factions && !item.factions.includes(faction)) return false;
      
      return true;
    });

    const selectedEquipment = [];
    
    // Ensure at least one weapon and one armor piece
    const weapons = availableEquipment.filter(item => item.type === 'weapon');
    const armor = availableEquipment.filter(item => item.type === 'armor');
    const misc = availableEquipment.filter(item => !['weapon', 'armor'].includes(item.type));
    
    if (weapons.length > 0) {
      selectedEquipment.push(weapons[Math.floor(Math.random() * weapons.length)]);
    }
    
    if (armor.length > 0) {
      selectedEquipment.push(armor[Math.floor(Math.random() * armor.length)]);
    }
    
    // Add 1-3 additional random items
    const additionalCount = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < additionalCount; i++) {
      if (availableEquipment.length > 0) {
        const randomItem = availableEquipment[Math.floor(Math.random() * availableEquipment.length)];
        if (!selectedEquipment.find(item => item.name === randomItem.name)) {
          selectedEquipment.push(randomItem);
        }
      }
    }
    
    return selectedEquipment;
  }

  static generateMutations(archetypeType) {
    const mutations = {
      'ghoul': [
        'Radiation Immunity', 'Glowing One', 'Feral Appearance', 'Heightened Senses',
        'Rad Regeneration', 'Necrotic Flesh', 'Eternal Life', 'Memory Loss'
      ],
      'super-mutant': [
        'Massive Size', 'Thick Hide', 'Rage', 'Simple Mind', 'Enhanced Strength',
        'Slow Metabolism', 'Intimidating Presence', 'Pack Mentality'
      ]
    };

    const availableMutations = mutations[archetypeType] || [];
    const count = Math.floor(Math.random() * 3) + 1; // 1-3 mutations
    
    const selected = [];
    for (let i = 0; i < count && i < availableMutations.length; i++) {
      const mutation = availableMutations[Math.floor(Math.random() * availableMutations.length)];
      if (!selected.includes(mutation)) {
        selected.push(mutation);
      }
    }
    
    return selected;
  }

  static generatePersonality(archetype) {
    const personalities = {
      'wastelander': ['Resourceful', 'Cautious', 'Independent', 'Hardened', 'Pragmatic'],
      'raider': ['Aggressive', 'Unpredictable', 'Greedy', 'Violent', 'Opportunistic'],
      'vault-dweller': ['Naive', 'Optimistic', 'Rule-following', 'Curious', 'Clean'],
      'brotherhood': ['Disciplined', 'Technology-focused', 'Elitist', 'Loyal', 'Militant'],
      'super-mutant': ['Simple', 'Direct', 'Strong', 'Confused', 'Loyal'],
      'ghoul': ['Bitter', 'Wise', 'Isolated', 'Survivor', 'Patient'],
      'trader': ['Charismatic', 'Calculating', 'Friendly', 'Profit-minded', 'Well-traveled'],
      'settler': ['Community-minded', 'Hopeful', 'Hardworking', 'Cooperative', 'Builders']
    };

    const availableTraits = personalities[archetype.type] || personalities['wastelander'];
    const count = Math.floor(Math.random() * 3) + 2; // 2-4 traits
    
    const selected = [];
    for (let i = 0; i < count && i < availableTraits.length; i++) {
      const trait = availableTraits[Math.floor(Math.random() * availableTraits.length)];
      if (!selected.includes(trait)) {
        selected.push(trait);
      }
    }
    
    return selected;
  }

  static generateBackstory(archetype, faction) {
    const templates = {
      'wastelander': [
        "Born in the wasteland, {name} learned to survive through {trait}. They've made a living by {occupation} and have a reputation for being {personality}.",
        "{name} grew up in a small settlement that was {disaster}. Since then, they've wandered the wasteland, {motivation}."
      ],
      'raider': [
        "{name} joined {faction} after {origin}. They're known for their {weapon} and {personality} nature.",
        "Once a {former_occupation}, {name} turned to raiding when {catalyst}. They now lead a small gang of {followers}."
      ],
      'vault-dweller': [
        "{name} recently emerged from Vault {vault_number} due to {reason}. They're still adjusting to wasteland life.",
        "A former {vault_role} in Vault {vault_number}, {name} left their home to {mission}."
      ]
    };

    const availableTemplates = templates[archetype.type] || templates['wastelander'];
    const template = availableTemplates[Math.floor(Math.random() * availableTemplates.length)];
    
    // Simple template variable replacement
    return template
      .replace('{name}', 'This character')
      .replace('{faction}', faction)
      .replace('{trait}', 'cunning and resourcefulness')
      .replace('{occupation}', 'scavenging and trading')
      .replace('{personality}', 'reliable')
      .replace('{disaster}', 'destroyed by raiders')
      .replace('{motivation}', 'seeking a new place to call home')
      .replace('{weapon}', 'signature weapon')
      .replace('{origin}', 'losing everything')
      .replace('{former_occupation}', 'trader')
      .replace('{catalyst}', 'their caravan was attacked')
      .replace('{followers}', 'loyal outcasts')
      .replace('{vault_number}', Math.floor(Math.random() * 999))
      .replace('{reason}', 'equipment failure')
      .replace('{vault_role}', 'security officer')
      .replace('{mission}', 'find their missing overseer');
  }
}