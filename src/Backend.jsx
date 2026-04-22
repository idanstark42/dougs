const MIN_QUERY_LENGTH = 3

export class NPCs {
  static async filter(query) {
    if (query.length === 0) {
      return ALL_NPCs
    }
    if (query.length < MIN_QUERY_LENGTH) {
      return []
    }
    return ALL_NPCs.filter(npc => npc.title.toLowerCase().includes(query.toLowerCase()))
  }

  static tier_templates = {
    minor: { maxFatigue: 3, maxBalance: 1, balance: 0 },
    major: { maxFatigue: 5, maxBalance: 2, balance: 0 },
    master: { maxFatigue: 10, maxBalance: 3, balance: 0 }
  }
}

const ALL_NPCs = [
  // ===== MINOR =====
  {
    title: "Town Guard",
    tier: "minor",
    description: "A local guard",
    drive: "To keep order in the town",
    principle: null,
    conditions: ["Troubled"],
    fatigue: 0,
    techniques: []
  },
  {
    title: "Village Hunter",
    tier: "minor",
    description: "A skilled trapper and hunter",
    drive: "To see their village thrive",
    principle: null,
    conditions: ["Angry"],
    fatigue: 0,
    techniques: []
  },
  {
    title: "Trader",
    tier: "minor",
    description: "A traveling merchant",
    drive: "To become prosperous",
    principle: null,
    conditions: ["Afraid"],
    fatigue: 0,
    techniques: []
  },
  {
    title: "Shopkeeper",
    tier: "minor",
    description: "An owner of a successful city shop",
    drive: "To maintain their social standing",
    principle: null,
    conditions: ["Insecure"],
    fatigue: 0,
    techniques: []
  },
  {
    title: "Tough",
    tier: "minor",
    description: "Local muscle",
    drive: "To follow orders",
    principle: null,
    conditions: ["Afraid"],
    fatigue: 0,
    techniques: []
  },
  {
    title: "Soldier",
    tier: "minor",
    description: "A trained grunt of a larger unit",
    drive: "To follow orders",
    principle: null,
    conditions: ["Guilty"],
    fatigue: 0,
    techniques: []
  },

  // ===== MAJOR =====
  {
    title: "Outlaw Captain",
    tier: "major",
    description: "A leader of pirates, bandits, or criminals",
    drive: "To take what others can’t hold",
    principle: "Survival",
    conditions: ["Angry", "Afraid", "Foolish"],
    fatigue: 0,
    techniques: ["Sense Environment", "Duck and Twist"]
  },
  {
    title: "Champion Pit-Fighter",
    tier: "major",
    description: "A champion pit-fighter",
    drive: "To control the pit-fighting scene",
    principle: "Discipline",
    conditions: ["Angry", "Desperate", "Guilty"],
    fatigue: 0,
    techniques: ["Charge", "Forceful Blow"]
  },
  {
    title: "Military Commander",
    tier: "major",
    description: "A trained and capable military commander",
    drive: "To protect their subordinates",
    principle: "Duty",
    conditions: ["Angry", "Jaded", "Troubled"],
    fatigue: 0,
    techniques: ["Rapid Assessment"]
  },
  {
    title: "Noble",
    tier: "major",
    description: "A member of the ruling class",
    drive: "To seek excitement and novelty",
    principle: "Freedom",
    conditions: ["Despondent", "Hopeless", "Insecure"],
    fatigue: 0,
    techniques: []
  },
  {
    title: "Political Leader",
    tier: "major",
    description: "A local mayor, magistrate, or governor",
    drive: "To minimize problems",
    principle: "Community",
    conditions: ["Afraid", "Frantic", "Insecure"],
    fatigue: 0,
    techniques: []
  },

  // ===== MASTER =====
  {
    title: "Accomplished General",
    tier: "master",
    description: "A weaponmaster in command of extensive forces",
    drive: "To win favor with their commander",
    principle: "Ambition",
    conditions: ["Afraid", "Angry", "Disgusted", "Guilty", "Morose"],
    fatigue: 0,
    techniques: ["Feint", "Turn the Tables", "Pinpoint Thrust"]
  },
  {
    title: "Obsessive Inventor",
    tier: "master",
    description: "A creator of dangerous and innovative devices",
    drive: "To create perfection",
    principle: "Progress",
    conditions: ["Afraid", "Angry", "Insecure", "Manic", "Offended"],
    fatigue: 0,
    techniques: ["Jolt", "Collect Materials", "Wind Up"]
  },
  {
    title: "Rebel Leader",
    tier: "master",
    description: "A rebel war leader in the Earth Kingdom",
    drive: "To overthrow the existing government",
    principle: "Justice",
    conditions: ["Afraid", "Angry", "Guilty", "Hopeless", "Humiliated"],
    fatigue: 0,
    techniques: ["Earth Armor", "Stone Shield"]
  },
  {
    title: "Triad Leader",
    tier: "master",
    description: "An infamous firebending Republic City criminal",
    drive: "To maintain their empire",
    principle: "Role",
    conditions: ["Afraid", "Fixated", "Frustrated", "Insecure", "Vengeful"],
    fatigue: 0,
    techniques: ["Lightning Blast", "Flame Knives"]
  },
  {
    title: "Water Tribe Chief",
    tier: "master",
    description: "An experienced and trusted Water Tribe leader",
    drive: "To protect their people",
    principle: "Tradition",
    conditions: ["Angry", "Guilty", "Insecure", "Stubborn", "Troubled"],
    fatigue: 0,
    techniques: ["Crushing Grip of Seas", "Stream the Water"]
  },

  // ===== GROUPS =====
  // {
  //   title: "Small Mob",
  //   tier: "group",
  //   description: "A small mob of minor thugs",
  //   drive: "To punish those who wronged them",
  //   principle: "Retribution",
  //   conditions: ["Angry", "Insecure", "Troubled"],
  //   fatigue: 0,
  //   techniques: ["Overwhelm"]
  // },
  // {
  //   title: "Military Squad",
  //   tier: "group",
  //   description: "A small squad of trained soldiers",
  //   drive: "To accomplish their given objective",
  //   principle: "Duty",
  //   conditions: ["Afraid", "Guilty", "Insecure"],
  //   fatigue: 0,
  //   techniques: ["Focused Fire", "Protect Objective"]
  // },
  // {
  //   title: "Palace Guards",
  //   tier: "group",
  //   description: "A medium group of trained guards",
  //   drive: "To protect the palace",
  //   principle: "Loyalty",
  //   conditions: ["Afraid", "Angry", "Desperate", "Guilty", "Humiliated"],
  //   fatigue: 0,
  //   techniques: ["Coordination", "Shield Wall", "Swarm"]
  // },
  // {
  //   title: "Republic City Police Squad",
  //   tier: "group",
  //   description: "A group of metalbenders",
  //   drive: "To enforce law and order",
  //   principle: "Results",
  //   conditions: ["Distracted", "Guilty", "Overbearing", "Troubled", "Zealous"],
  //   fatigue: 0,
  //   techniques: ["Metal Bindings", "Spread Out", "Test Defenses"]
  // },
  // {
  //   title: "Elite Rebels",
  //   tier: "group",
  //   description: "A group of elite revolutionaries",
  //   drive: "To overturn authority",
  //   principle: "Freedom",
  //   conditions: ["Afraid", "Guilty", "Hopeless", "Insecure", "Overconfident"],
  //   fatigue: 0,
  //   techniques: ["Scatter and Regroup", "Swarm", "Surround"]
  // }
]