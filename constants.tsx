import React from 'react';
import { 
  Sword, 
  Eye, 
  Crown, 
  Compass, 
  Ghost, 
  Anchor, 
  Flame, 
  Leaf,
  Sun,
  Skull,
  Star,
  Zap,
  Shield,
  Target
} from 'lucide-react';

export interface Character {
  id: string;
  name: string;
  archetype: string;
  promptDesc: string; // Instructions for the AI visual blend
  icon: React.ReactNode;
  imageUrl?: string; // Optional URL for the wiki image
  
  // Pre-calculated Tailwind classes for the UI theme
  theme: {
    text: string;           
    border: string;         
    bg: string;             
    ring: string;           
    buttonGradient: string; 
    shadow: string;         
    titleSpan: string;      
  };
}

export const CHARACTERS: Character[] = [
  // --- GREEN ---
  {
    id: 'green_archer',
    name: 'Green Archer',
    archetype: 'Vigilante Thief',
    icon: <Leaf size={18} />,
    imageUrl: 'http://towerfall.wikidot.com/local--files/archers/green.png',
    promptDesc: 'Signature green hooded tunic with gold trim, brown leather gloves and boots. **Essential details:** Orange hair (use wig if needed), confident expression. Wielding a simple curved wooden bow wrapped in vines. Aesthetic: Noble thief.',
    theme: {
      text: 'text-emerald-400',
      border: 'border-emerald-500',
      bg: 'bg-emerald-500',
      ring: 'ring-emerald-500/50',
      buttonGradient: 'from-emerald-600 to-green-600',
      shadow: 'shadow-emerald-500/50',
      titleSpan: 'text-emerald-500',
    }
  },
  {
    id: 'green_alt',
    name: 'Alternate Green Archer',
    archetype: 'Vigilante Mask',
    icon: <Target size={18} />,
    imageUrl: 'http://towerfall.wikidot.com/local--files/archers/green.png',
    promptDesc: 'Green hooded cloak. **Essential details:** A wooden tribal mask pushed up onto the forehead (face fully visible). Wild, leafy aesthetic, nature-infused leather armor. Wielding a rough bow made of living branches. Aesthetic: Forest guardian.',
    theme: {
      text: 'text-emerald-300',
      border: 'border-emerald-400',
      bg: 'bg-emerald-600',
      ring: 'ring-emerald-400/50',
      buttonGradient: 'from-emerald-500 to-teal-500',
      shadow: 'shadow-emerald-400/50',
      titleSpan: 'text-emerald-400',
    }
  },

  // --- BLUE ---
  {
    id: 'blue_archer',
    name: 'Blue Archer',
    archetype: 'Last of the Order',
    icon: <Eye size={18} />,
    imageUrl: 'http://towerfall.wikidot.com/local--files/archers/blue.png',
    promptDesc: 'Tall, pointed blue hood casting a shadow, but face remains visible. **Essential details:** Long blue robes with gold geometric borders and rune embroidery. Wielding a magical blue crystalline bow. Aesthetic: Stoic magical guardian.',
    theme: {
      text: 'text-blue-400',
      border: 'border-blue-500',
      bg: 'bg-blue-500',
      ring: 'ring-blue-500/50',
      buttonGradient: 'from-blue-600 to-indigo-600',
      shadow: 'shadow-blue-500/50',
      titleSpan: 'text-blue-500',
    }
  },
  {
    id: 'blue_alt',
    name: 'Alternate Blue Archer',
    archetype: 'Last of the Order',
    icon: <Zap size={18} />,
    imageUrl: 'http://towerfall.wikidot.com/local--files/archers/blue.png',
    promptDesc: 'Blue combat robes with a distinctive purple/blue plaid scarf or cowl (worn loose, not covering face). **Essential details:** No hood, wearing a blue headwrap/bandana. Gold hoop earrings. Dark hair. Wielding a sturdy, ornate azure bow. Aesthetic: Wise warrior.',
    theme: {
      text: 'text-blue-300',
      border: 'border-blue-400',
      bg: 'bg-blue-600',
      ring: 'ring-blue-400/50',
      buttonGradient: 'from-blue-500 to-sky-500',
      shadow: 'shadow-blue-400/50',
      titleSpan: 'text-blue-400',
    }
  },

  // --- PINK ---
  {
    id: 'pink_archer',
    name: 'Pink Archer',
    archetype: 'Assassin Prince',
    icon: <Crown size={18} />,
    imageUrl: 'http://towerfall.wikidot.com/local--files/archers/pink.png',
    promptDesc: 'Luxurious pink silk assassin robes with white trim. **Essential details:** Blonde hair (use wig if needed), simple golden circlet/crown. Smug expression. Wielding a fancy recurve bow with pink ribbon accents. Aesthetic: High-society lethal noble.',
    theme: {
      text: 'text-pink-400',
      border: 'border-pink-500',
      bg: 'bg-pink-500',
      ring: 'ring-pink-500/50',
      buttonGradient: 'from-pink-600 to-rose-600',
      shadow: 'shadow-pink-500/50',
      titleSpan: 'text-pink-500',
    }
  },
  {
    id: 'pink_alt',
    name: 'Alternate Pink Archer',
    archetype: 'Blind Prince',
    icon: <Eye size={18} />,
    imageUrl: 'http://towerfall.wikidot.com/local--files/archers/pink.png',
    promptDesc: 'Royal pink tunic with high collar. **Essential details:** Long blonde hair, a sheer or lifted white cloth blindfold (eyes/face visible). Golden crown. Wielding a golden bow. Aesthetic: Blind warrior prince.',
    theme: {
      text: 'text-pink-300',
      border: 'border-pink-400',
      bg: 'bg-pink-600',
      ring: 'ring-pink-400/50',
      buttonGradient: 'from-pink-500 to-fuchsia-500',
      shadow: 'shadow-pink-400/50',
      titleSpan: 'text-pink-400',
    }
  },

  // --- ORANGE ---
  {
    id: 'orange_archer',
    name: 'Orange Archer',
    archetype: 'Turncloak Soldier',
    icon: <Compass size={18} />,
    imageUrl: 'http://towerfall.wikidot.com/local--files/archers/orange.png',
    promptDesc: 'Worn orange hooded cloak, rugged leather gear. **Essential details:** A large, thick orange scarf wrapped loosely around the neck (lowered to reveal the mouth, nose, and face). Wielding a heavy iron-reinforced bow. Aesthetic: Gritty survivor.',
    theme: {
      text: 'text-orange-400',
      border: 'border-orange-500',
      bg: 'bg-orange-500',
      ring: 'ring-orange-500/50',
      buttonGradient: 'from-orange-600 to-amber-700',
      shadow: 'shadow-orange-500/50',
      titleSpan: 'text-orange-500',
    }
  },
  {
    id: 'orange_alt',
    name: 'Alternate Orange Archer',
    archetype: 'Loyal Kingsguard',
    icon: <Shield size={18} />,
    imageUrl: 'http://towerfall.wikidot.com/local--files/archers/orange.png',
    promptDesc: 'Formal orange and black royal guard uniform with high collar and gold epaulets. **Essential details:** Pale skin, red eyes (vampiric look). Intense, loyal expression. Wielding a black steel bow. Aesthetic: Dark elite guard.',
    theme: {
      text: 'text-orange-300',
      border: 'border-orange-400',
      bg: 'bg-orange-600',
      ring: 'ring-orange-400/50',
      buttonGradient: 'from-orange-500 to-red-500',
      shadow: 'shadow-orange-400/50',
      titleSpan: 'text-orange-400',
    }
  },

  // --- WHITE ---
  {
    id: 'white_archer',
    name: 'White Archer',
    archetype: 'Ancient Exile',
    icon: <Ghost size={18} />,
    imageUrl: 'http://towerfall.wikidot.com/local--files/archers/white.png',
    promptDesc: 'Pristine white robes with purple sash/accents. **Essential details:** Long white flowing hair (use wig), pale skin, purple eyes. Hood down. Wielding a white bow glowing with spectral energy. Aesthetic: Supernatural exile.',
    theme: {
      text: 'text-slate-200',
      border: 'border-slate-400',
      bg: 'bg-slate-500',
      ring: 'ring-slate-400/50',
      buttonGradient: 'from-slate-500 to-slate-700',
      shadow: 'shadow-slate-500/50',
      titleSpan: 'text-white',
    }
  },
  {
    id: 'white_alt',
    name: 'Alternate White Archer',
    archetype: 'Sacred Sister',
    icon: <Star size={18} />,
    imageUrl: 'http://towerfall.wikidot.com/local--files/archers/white.png',
    promptDesc: 'White nun-like habit or priestess robes with hood up. **Essential details:** Face visible within hood, glowing eyes. Sacred vestments with gold symbols. Wielding a bow made of bone or white wood. Aesthetic: Divine warrior.',
    theme: {
      text: 'text-cyan-100',
      border: 'border-cyan-200',
      bg: 'bg-slate-600',
      ring: 'ring-cyan-200/50',
      buttonGradient: 'from-slate-600 to-cyan-900',
      shadow: 'shadow-cyan-200/50',
      titleSpan: 'text-cyan-100',
    }
  },

  // --- YELLOW (GOLD) ---
  {
    id: 'yellow_archer',
    name: 'Yellow Archer',
    archetype: 'Forgotten Master',
    icon: <Sun size={18} />,
    imageUrl: 'http://towerfall.wikidot.com/local--files/archers/yellow.png',
    promptDesc: 'Yellow robes and a tall, pointed yellow wizard hat. **Essential details:** Long white beard and mustache (use fake beard if needed). Wielding a crooked wooden staff-bow hybrid. Aesthetic: Wise elder master.',
    theme: {
      text: 'text-yellow-400',
      border: 'border-yellow-500',
      bg: 'bg-yellow-500',
      ring: 'ring-yellow-500/50',
      buttonGradient: 'from-yellow-600 to-amber-600',
      shadow: 'shadow-yellow-500/50',
      titleSpan: 'text-yellow-500',
    }
  },
  {
    id: 'yellow_alt',
    name: 'Alternate Yellow Archer',
    archetype: 'Young Master',
    icon: <Compass size={18} />,
    imageUrl: 'http://towerfall.wikidot.com/local--files/archers/yellow.png',
    promptDesc: 'Yellow martial arts gi/tunic with dark undershirt. **Essential details:** Orange headband/bandana. Youthful energetic appearance, confident grin. Wielding a simple bamboo bow. Aesthetic: Young prodigy.',
    theme: {
      text: 'text-amber-300',
      border: 'border-amber-400',
      bg: 'bg-amber-600',
      ring: 'ring-amber-400/50',
      buttonGradient: 'from-amber-500 to-orange-500',
      shadow: 'shadow-amber-400/50',
      titleSpan: 'text-amber-400',
    }
  },

  // --- CYAN ---
  {
    id: 'cyan_archer',
    name: 'Cyan Archer',
    archetype: 'Prancing Puppet',
    icon: <Anchor size={18} />,
    imageUrl: 'http://towerfall.wikidot.com/local--files/archers/cyan.png',
    promptDesc: 'Cyan jester/clown outfit with puffy pants. **Essential details:** Distinctive cat-like mask pushed up onto the head (face visible), tall cyan hat with bells. Wielding a colorful, toy-like but deadly bow. Aesthetic: Mischievous trickster.',
    theme: {
      text: 'text-cyan-400',
      border: 'border-cyan-500',
      bg: 'bg-cyan-500',
      ring: 'ring-cyan-500/50',
      buttonGradient: 'from-cyan-600 to-sky-600',
      shadow: 'shadow-cyan-500/50',
      titleSpan: 'text-cyan-500',
    }
  },
  {
    id: 'cyan_alt',
    name: 'Alternate Cyan Archer',
    archetype: 'Prancing Puppet',
    icon: <Sword size={18} />,
    imageUrl: 'http://towerfall.wikidot.com/local--files/archers/cyan.png',
    promptDesc: 'Cyan hooded robes with cat-ear shapes in the hood. **Essential details:** Face visible under the hood. Glowing eyes. Wielding a blue magical bow. Aesthetic: Shadowy feline trickster.',
    theme: {
      text: 'text-cyan-300',
      border: 'border-cyan-400',
      bg: 'bg-cyan-600',
      ring: 'ring-cyan-400/50',
      buttonGradient: 'from-cyan-500 to-teal-600',
      shadow: 'shadow-cyan-400/50',
      titleSpan: 'text-cyan-400',
    }
  },

  // --- PURPLE ---
  {
    id: 'purple_archer',
    name: 'Purple Archer',
    archetype: 'Vicious Vessel',
    icon: <Sword size={18} />,
    imageUrl: 'http://towerfall.wikidot.com/local--files/archers/purple.png',
    promptDesc: 'Elegant dark purple velvet royal dress/robes. **Essential details:** Pale skin, red eyes, golden tiara/crown. Evil smirk or cold expression. Wielding a dark purple bow with jagged edges. Aesthetic: Possessed royal vessel.',
    theme: {
      text: 'text-violet-400',
      border: 'border-violet-500',
      bg: 'bg-violet-500',
      ring: 'ring-violet-500/50',
      buttonGradient: 'from-violet-600 to-purple-700',
      shadow: 'shadow-violet-500/50',
      titleSpan: 'text-violet-500',
    }
  },
  {
    id: 'purple_alt',
    name: 'Alternate Purple Archer',
    archetype: 'Vicious Vanguard',
    icon: <Crown size={18} />,
    imageUrl: 'http://towerfall.wikidot.com/local--files/archers/purple.png',
    promptDesc: 'Full dark purple plate armor with a cape. **Essential details:** Horned helmet with visor raised or removed to reveal the face. Glowing red eyes. Wielding a massive black iron greatbow. Aesthetic: Dark knight vanguard.',
    theme: {
      text: 'text-purple-300',
      border: 'border-purple-400',
      bg: 'bg-purple-600',
      ring: 'ring-purple-400/50',
      buttonGradient: 'from-purple-500 to-fuchsia-600',
      shadow: 'shadow-purple-400/50',
      titleSpan: 'text-purple-400',
    }
  },

  // --- RED ---
  {
    id: 'red_archer',
    name: 'Red Archer',
    archetype: 'Vainglorious Ghoul',
    icon: <Flame size={18} />,
    imageUrl: 'http://towerfall.wikidot.com/local--files/archers/red.png',
    promptDesc: 'Blood-red tattered cultist robes. **Essential details:** Hood up but face clearly visible (not hidden in shadow). Wielding a bow made of bones. Aesthetic: Dark necromancer ghoul.',
    theme: {
      text: 'text-red-500',
      border: 'border-red-600',
      bg: 'bg-red-600',
      ring: 'ring-red-600/50',
      buttonGradient: 'from-red-700 to-rose-800',
      shadow: 'shadow-red-600/50',
      titleSpan: 'text-red-600',
    }
  },
  {
    id: 'red_alt',
    name: 'Alternate Red Archer',
    archetype: 'Crimson Corsair',
    icon: <Skull size={18} />,
    imageUrl: 'http://towerfall.wikidot.com/local--files/archers/red.png',
    promptDesc: 'Red pirate captain coat with gold buttons. **Essential details:** Pirate hat with skull emblem. Skeletal features or zombie makeup (face visible). Wielding a bow that resembles a ship anchor or wheel. Aesthetic: Undead pirate captain.',
    theme: {
      text: 'text-red-400',
      border: 'border-red-500',
      bg: 'bg-red-700',
      ring: 'ring-red-500/50',
      buttonGradient: 'from-red-800 to-rose-900',
      shadow: 'shadow-red-500/50',
      titleSpan: 'text-red-500',
    }
  }
];