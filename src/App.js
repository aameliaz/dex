/* eslint-disable no-unused-vars, react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";

// Platform codes: pc, ps, xb, sw, ios, and, rbx (Roblox ecosystem)
const GAMES = [
  { id: "elden", name: "Elden Ring", genre: "Souls", emoji: "⚔️", color: "#8B7355", platforms: ["pc", "ps", "xb"] },
  { id: "bg3", name: "Baldur's Gate 3", genre: "RPG", emoji: "🧙", color: "#9B4A8C", platforms: ["pc", "ps", "xb"] },
  { id: "valorant", name: "Valorant", genre: "FPS", emoji: "🎯", color: "#FD4556", platforms: ["pc", "ios", "and"] },
  { id: "stardew", name: "Stardew Valley", genre: "Cozy", emoji: "🌾", color: "#C0A880", platforms: ["pc", "ps", "xb", "sw", "ios", "and"] },
  { id: "hades", name: "Hades", genre: "Roguelike", emoji: "🔥", color: "#E8593C", platforms: ["pc", "ps", "xb", "sw"] },
  { id: "rdr2", name: "Red Dead 2", genre: "Open World", emoji: "🤠", color: "#A0522D", platforms: ["pc", "ps", "xb"] },
  { id: "minecraft", name: "Minecraft", genre: "Sandbox", emoji: "⛏️", color: "#4A7C59", platforms: ["pc", "ps", "xb", "sw", "ios", "and"] },
  { id: "apex", name: "Apex Legends", genre: "BR", emoji: "🎖️", color: "#DA292A", platforms: ["pc", "ps", "xb", "sw", "ios", "and"] },
  { id: "zelda", name: "Zelda: TOTK", genre: "Adventure", emoji: "🗡️", color: "#7BA05B", platforms: ["sw"] },
  { id: "hollow", name: "Hollow Knight", genre: "Metroidvania", emoji: "🦋", color: "#3D5A6C", platforms: ["pc", "ps", "xb", "sw"] },
  { id: "csgo", name: "CS2", genre: "FPS", emoji: "💥", color: "#D4A017", platforms: ["pc"] },
  { id: "witcher", name: "Witcher 3", genre: "RPG", emoji: "🐺", color: "#6B7280", platforms: ["pc", "ps", "xb", "sw"] },
  { id: "overwatch", name: "Overwatch 2", genre: "Hero Shooter", emoji: "🦸", color: "#F79B1E", platforms: ["pc", "ps", "xb", "sw"] },
  { id: "celeste", name: "Celeste", genre: "Platformer", emoji: "🏔️", color: "#E879A6", platforms: ["pc", "ps", "xb", "sw", "ios"] },
  { id: "animalcrossing", name: "Animal Crossing", genre: "Cozy", emoji: "🏝️", color: "#92D050", platforms: ["sw"] },
  { id: "darksouls", name: "Dark Souls 3", genre: "Souls", emoji: "💀", color: "#4B4B4B", platforms: ["pc", "ps", "xb"] },
  { id: "fortnite", name: "Fortnite", genre: "BR", emoji: "🎪", color: "#9146FF", platforms: ["pc", "ps", "xb", "sw", "ios", "and"] },
  { id: "portal", name: "Portal 2", genre: "Puzzle", emoji: "🧩", color: "#E87722", platforms: ["pc"] },
  { id: "rocket", name: "Rocket League", genre: "Sports", emoji: "🚗", color: "#00A8E1", platforms: ["pc", "ps", "xb", "sw"] },
  { id: "disco", name: "Disco Elysium", genre: "RPG", emoji: "🕵️", color: "#D9534F", platforms: ["pc", "ps", "xb", "sw", "ios"] },
  { id: "among", name: "Among Us", genre: "Social", emoji: "👾", color: "#C51111", platforms: ["pc", "ps", "xb", "sw", "ios", "and"] },
  { id: "cyberpunk", name: "Cyberpunk 2077", genre: "RPG", emoji: "🌃", color: "#FCEE09", platforms: ["pc", "ps", "xb"] },
  { id: "fifa", name: "FC 25", genre: "Sports", emoji: "⚽", color: "#00B050", platforms: ["pc", "ps", "xb", "sw"] },
  { id: "dota", name: "Dota 2", genre: "MOBA", emoji: "⚡", color: "#B3382C", platforms: ["pc"] },
  // Roblox games - shown on main page
  { id: "adopt-me", name: "Adopt Me!", genre: "Social", emoji: "🐾", color: "#FF6FA3", platforms: ["rbx"] },
  { id: "brookhaven", name: "Brookhaven", genre: "Social", emoji: "🏡", color: "#7FB8A0", platforms: ["rbx"] },
  { id: "blox-fruits", name: "Blox Fruits", genre: "RPG", emoji: "🏴‍☠️", color: "#F2A93B", platforms: ["rbx"] },
];

const DEEP_CUTS = [
  { id: "sekiro", name: "Sekiro", genre: "Souls", emoji: "🗾", color: "#8C3F3F", platforms: ["pc", "ps", "xb"] },
  { id: "blasphemous", name: "Blasphemous", genre: "Metroidvania", emoji: "🕯️", color: "#7B3F3F", platforms: ["pc", "ps", "xb", "sw"] },
  { id: "deadcells", name: "Dead Cells", genre: "Roguelike", emoji: "⚱️", color: "#5A7A90", platforms: ["pc", "ps", "xb", "sw", "ios", "and"] },
  { id: "hk-silksong", name: "Silksong", genre: "Metroidvania", emoji: "🪡", color: "#E06B3F", platforms: ["pc", "sw"] },
  { id: "divinity", name: "Divinity OS2", genre: "RPG", emoji: "🐉", color: "#6A4C8A", platforms: ["pc", "ps", "xb", "sw"] },
  { id: "pillars", name: "Pillars of Eternity", genre: "RPG", emoji: "🏛️", color: "#8B6F47", platforms: ["pc", "ps", "xb"] },
  { id: "kenshi", name: "Kenshi", genre: "Open World", emoji: "🏜️", color: "#B8956A", platforms: ["pc"] },
  { id: "subnautica", name: "Subnautica", genre: "Open World", emoji: "🌊", color: "#2E8B8B", platforms: ["pc", "ps", "xb", "sw"] },
  { id: "outerwilds", name: "Outer Wilds", genre: "Adventure", emoji: "🪐", color: "#D4A574", platforms: ["pc", "ps", "xb", "sw"] },
  { id: "factorio", name: "Factorio", genre: "Sandbox", emoji: "🏭", color: "#C97A2B", platforms: ["pc", "sw"] },
  { id: "terraria", name: "Terraria", genre: "Sandbox", emoji: "🌳", color: "#6DB53E", platforms: ["pc", "ps", "xb", "sw", "ios", "and"] },
  { id: "valheim", name: "Valheim", genre: "Sandbox", emoji: "🪓", color: "#5C7A3A", platforms: ["pc", "xb"] },
  { id: "deeprock", name: "Deep Rock", genre: "Social", emoji: "⛏️", color: "#D4741F", platforms: ["pc", "ps", "xb"] },
  { id: "leftleft", name: "Lethal Company", genre: "Social", emoji: "👻", color: "#7A8B3F", platforms: ["pc"] },
  { id: "phasmo", name: "Phasmophobia", genre: "Social", emoji: "👁️", color: "#4A3F6B", platforms: ["pc", "ps", "xb"] },
  { id: "coral-island", name: "Coral Island", genre: "Cozy", emoji: "🌸", color: "#E8A6B8", platforms: ["pc", "ps", "xb", "sw"] },
  { id: "potionomics", name: "Potionomics", genre: "Cozy", emoji: "🧪", color: "#9B59B6", platforms: ["pc", "ps", "xb", "sw"] },
  { id: "unpacking", name: "Unpacking", genre: "Cozy", emoji: "📦", color: "#D4A574", platforms: ["pc", "ps", "xb", "sw", "ios", "and"] },
  { id: "returnal", name: "Returnal", genre: "Roguelike", emoji: "🌀", color: "#6B4C93", platforms: ["pc", "ps"] },
  { id: "slay-spire", name: "Slay the Spire", genre: "Roguelike", emoji: "🎴", color: "#C97A2B", platforms: ["pc", "ps", "xb", "sw", "ios", "and"] },
  { id: "citizen-sleeper", name: "Citizen Sleeper", genre: "RPG", emoji: "🛸", color: "#D9534F", platforms: ["pc", "ps", "xb", "sw"] },
  { id: "pentiment", name: "Pentiment", genre: "RPG", emoji: "📜", color: "#8B6F47", platforms: ["pc", "ps", "xb", "sw"] },
  { id: "tunic", name: "Tunic", genre: "Adventure", emoji: "🦊", color: "#E8A445", platforms: ["pc", "ps", "xb", "sw"] },
  { id: "rimworld", name: "RimWorld", genre: "Sandbox", emoji: "🏘️", color: "#B8956A", platforms: ["pc", "ps", "xb"] },
  { id: "dyson", name: "Dyson Sphere", genre: "Sandbox", emoji: "☀️", color: "#F4D06F", platforms: ["pc"] },
  { id: "tarkov", name: "Escape from Tarkov", genre: "FPS", emoji: "🎒", color: "#4A5D3A", platforms: ["pc"] },
  { id: "rainbow-six", name: "Rainbow Six Siege", genre: "FPS", emoji: "🛡️", color: "#1B4A73", platforms: ["pc", "ps", "xb"] },
  { id: "league", name: "League of Legends", genre: "MOBA", emoji: "🔮", color: "#C89B3C", platforms: ["pc"] },
  { id: "deadlock", name: "Deadlock", genre: "MOBA", emoji: "⚙️", color: "#8B7355", platforms: ["pc"] },
  { id: "helldivers", name: "Helldivers 2", genre: "Social", emoji: "🪖", color: "#A0522D", platforms: ["pc", "ps"] },
  { id: "cuphead", name: "Cuphead", genre: "Platformer", emoji: "☕", color: "#D4741F", platforms: ["pc", "ps", "xb", "sw"] },
  { id: "ori", name: "Ori", genre: "Metroidvania", emoji: "✨", color: "#6EA0C4", platforms: ["pc", "ps", "xb", "sw"] },
  { id: "ghost-tsushima", name: "Ghost of Tsushima", genre: "Open World", emoji: "🌸", color: "#B8395C", platforms: ["pc", "ps"] },
  { id: "horizon", name: "Horizon Zero Dawn", genre: "Open World", emoji: "🏹", color: "#C97A2B", platforms: ["pc", "ps"] },
  { id: "persona5", name: "Persona 5", genre: "RPG", emoji: "🎭", color: "#C51111", platforms: ["pc", "ps", "xb", "sw"] },
  { id: "fire-emblem", name: "Fire Emblem", genre: "RPG", emoji: "🗡️", color: "#4A6FA5", platforms: ["sw"] },
  // More Roblox games on the recommendations pool
  { id: "doors", name: "Doors", genre: "Social", emoji: "🚪", color: "#6B4C7A", platforms: ["rbx"] },
  { id: "mm2", name: "Murder Mystery 2", genre: "Social", emoji: "🔪", color: "#B8395C", platforms: ["rbx"] },
  { id: "arsenal", name: "Arsenal", genre: "FPS", emoji: "🔫", color: "#E85D4C", platforms: ["rbx"] },
  { id: "jailbreak", name: "Jailbreak", genre: "Open World", emoji: "🚨", color: "#3B82C4", platforms: ["rbx"] },
  { id: "pet-sim-99", name: "Pet Simulator 99", genre: "Social", emoji: "🐶", color: "#F4B942", platforms: ["rbx"] },
  // AAA action/adventure
  { id: "gow-ragnarok", name: "God of War Ragnarök", genre: "Action", emoji: "🪓", color: "#5C7A9A", platforms: ["pc", "ps"] },
  { id: "tlou2", name: "The Last of Us Part II", genre: "Action", emoji: "🍄", color: "#4A6741", platforms: ["pc", "ps"] },
  { id: "spiderman2", name: "Spider-Man 2", genre: "Action", emoji: "🕸️", color: "#C53030", platforms: ["ps"] },
  { id: "uncharted4", name: "Uncharted 4", genre: "Adventure", emoji: "🗺️", color: "#B8860B", platforms: ["pc", "ps"] },
  { id: "death-stranding", name: "Death Stranding", genre: "Adventure", emoji: "📦", color: "#2D3748", platforms: ["pc", "ps"] },
  { id: "gta5", name: "GTA V", genre: "Open World", emoji: "💰", color: "#38A169", platforms: ["pc", "ps", "xb"] },
  { id: "ac-valhalla", name: "AC Valhalla", genre: "Open World", emoji: "🛡️", color: "#4A6FA5", platforms: ["pc", "ps", "xb"] },
  { id: "starfield", name: "Starfield", genre: "RPG", emoji: "🚀", color: "#4A5568", platforms: ["pc", "xb"] },
  { id: "hogwarts", name: "Hogwarts Legacy", genre: "RPG", emoji: "🧹", color: "#7B341E", platforms: ["pc", "ps", "xb", "sw"] },
  { id: "diablo4", name: "Diablo IV", genre: "RPG", emoji: "😈", color: "#9B2C2C", platforms: ["pc", "ps", "xb"] },
  { id: "ff16", name: "Final Fantasy XVI", genre: "RPG", emoji: "⚔️", color: "#553C9A", platforms: ["pc", "ps"] },
  { id: "ff7r", name: "FF VII Rebirth", genre: "RPG", emoji: "🌍", color: "#2B6CB0", platforms: ["pc", "ps"] },
  { id: "monster-hunter", name: "Monster Hunter World", genre: "RPG", emoji: "🐲", color: "#C05621", platforms: ["pc", "ps", "xb"] },
  { id: "lies-of-p", name: "Lies of P", genre: "Souls", emoji: "🤥", color: "#744210", platforms: ["pc", "ps", "xb"] },
  { id: "armored-core", name: "Armored Core VI", genre: "Souls", emoji: "🤖", color: "#4A5568", platforms: ["pc", "ps", "xb"] },
  // Shooters
  { id: "destiny2", name: "Destiny 2", genre: "FPS", emoji: "🌙", color: "#5A67D8", platforms: ["pc", "ps", "xb"] },
  { id: "cod-mw3", name: "Call of Duty MW3", genre: "FPS", emoji: "🎖️", color: "#4A5568", platforms: ["pc", "ps", "xb"] },
  { id: "battlefield", name: "Battlefield 2042", genre: "FPS", emoji: "🪖", color: "#2D3748", platforms: ["pc", "ps", "xb"] },
  { id: "halo", name: "Halo Infinite", genre: "FPS", emoji: "🦾", color: "#38A169", platforms: ["pc", "xb"] },
  { id: "borderlands3", name: "Borderlands 3", genre: "FPS", emoji: "🔫", color: "#D69E2E", platforms: ["pc", "ps", "xb"] },
  { id: "ultrakill", name: "Ultrakill", genre: "FPS", emoji: "🩸", color: "#E53E3E", platforms: ["pc"] },
  { id: "cod-mobile", name: "COD Mobile", genre: "FPS", emoji: "📱", color: "#4A5568", platforms: ["ios", "and"] },
  { id: "splatoon3", name: "Splatoon 3", genre: "Hero Shooter", emoji: "🦑", color: "#D53F8C", platforms: ["sw"] },
  // Horror
  { id: "re4-remake", name: "RE4 Remake", genre: "Horror", emoji: "🧟", color: "#742A2A", platforms: ["pc", "ps", "xb"] },
  { id: "re-village", name: "RE Village", genre: "Horror", emoji: "🏰", color: "#5F370E", platforms: ["pc", "ps", "xb"] },
  { id: "alan-wake2", name: "Alan Wake 2", genre: "Horror", emoji: "🔦", color: "#2D3748", platforms: ["pc", "ps", "xb"] },
  { id: "silent-hill2", name: "Silent Hill 2 Remake", genre: "Horror", emoji: "🌫️", color: "#718096", platforms: ["pc", "ps"] },
  { id: "little-nightmares", name: "Little Nightmares", genre: "Horror", emoji: "🕯️", color: "#D69E2E", platforms: ["pc", "ps", "xb", "sw"] },
  { id: "amnesia", name: "Amnesia", genre: "Horror", emoji: "🧠", color: "#4A5568", platforms: ["pc", "ps", "sw"] },
  { id: "outlast", name: "Outlast", genre: "Horror", emoji: "📹", color: "#1A202C", platforms: ["pc", "ps", "xb", "sw"] },
  // Fighting
  { id: "tekken8", name: "Tekken 8", genre: "Fighting", emoji: "👊", color: "#C53030", platforms: ["pc", "ps", "xb"] },
  { id: "sf6", name: "Street Fighter 6", genre: "Fighting", emoji: "🥊", color: "#2B6CB0", platforms: ["pc", "ps", "xb"] },
  { id: "mk1", name: "Mortal Kombat 1", genre: "Fighting", emoji: "💀", color: "#C05621", platforms: ["pc", "ps", "xb", "sw"] },
  { id: "smash", name: "Smash Bros Ultimate", genre: "Fighting", emoji: "⭐", color: "#D69E2E", platforms: ["sw"] },
  { id: "sifu", name: "Sifu", genre: "Fighting", emoji: "🥋", color: "#4A5568", platforms: ["pc", "ps", "sw"] },
  // Racing
  { id: "forza5", name: "Forza Horizon 5", genre: "Racing", emoji: "🏎️", color: "#C05621", platforms: ["pc", "xb"] },
  { id: "gt7", name: "Gran Turismo 7", genre: "Racing", emoji: "🏁", color: "#2B6CB0", platforms: ["ps"] },
  { id: "mario-kart", name: "Mario Kart 8", genre: "Racing", emoji: "🍄", color: "#E53E3E", platforms: ["sw"] },
  { id: "need-speed", name: "Need for Speed", genre: "Racing", emoji: "💨", color: "#2D3748", platforms: ["pc", "ps", "xb"] },
  // Strategy
  { id: "civ6", name: "Civilization VI", genre: "Strategy", emoji: "🏛️", color: "#B7791F", platforms: ["pc", "ps", "xb", "sw", "ios", "and"] },
  { id: "xcom2", name: "XCOM 2", genre: "Strategy", emoji: "👽", color: "#5A67D8", platforms: ["pc", "ps", "xb"] },
  { id: "total-war", name: "Total War: Warhammer III", genre: "Strategy", emoji: "⚔️", color: "#742A2A", platforms: ["pc"] },
  { id: "stellaris", name: "Stellaris", genre: "Strategy", emoji: "🌌", color: "#2C5282", platforms: ["pc", "ps", "xb"] },
  { id: "crusader-kings", name: "Crusader Kings III", genre: "Strategy", emoji: "👑", color: "#744210", platforms: ["pc", "ps", "xb"] },
  { id: "into-breach", name: "Into the Breach", genre: "Strategy", emoji: "🦗", color: "#4A5568", platforms: ["pc", "sw", "ios", "and"] },
  { id: "ftl", name: "FTL", genre: "Strategy", emoji: "🚀", color: "#5A67D8", platforms: ["pc", "ios"] },
  { id: "clash-royale", name: "Clash Royale", genre: "Strategy", emoji: "🏰", color: "#2B6CB0", platforms: ["ios", "and"] },
  // Roguelike expanded
  { id: "vampire-surv", name: "Vampire Survivors", genre: "Roguelike", emoji: "🧛", color: "#553C9A", platforms: ["pc", "sw", "ios", "and"] },
  { id: "balatro", name: "Balatro", genre: "Roguelike", emoji: "🃏", color: "#2D3748", platforms: ["pc", "ps", "xb", "sw", "ios", "and"] },
  { id: "hades2", name: "Hades II", genre: "Roguelike", emoji: "🌙", color: "#44337A", platforms: ["pc"] },
  { id: "brotato", name: "Brotato", genre: "Roguelike", emoji: "🥔", color: "#B7791F", platforms: ["pc", "sw", "ios", "and"] },
  { id: "inscryption", name: "Inscryption", genre: "Puzzle", emoji: "🃏", color: "#1A202C", platforms: ["pc", "ps", "sw"] },
  { id: "neon-white", name: "Neon White", genre: "Platformer", emoji: "🃏", color: "#E53E3E", platforms: ["pc", "ps", "sw"] },
  { id: "pizza-tower", name: "Pizza Tower", genre: "Platformer", emoji: "🍕", color: "#D69E2E", platforms: ["pc", "sw"] },
  { id: "katana-zero", name: "Katana Zero", genre: "Platformer", emoji: "⚡", color: "#D53F8C", platforms: ["pc", "sw"] },
  // Cozy / Simulation expanded
  { id: "spiritfarer", name: "Spiritfarer", genre: "Cozy", emoji: "🌅", color: "#ED8936", platforms: ["pc", "ps", "xb", "sw"] },
  { id: "slime-rancher", name: "Slime Rancher 2", genre: "Cozy", emoji: "🫧", color: "#D53F8C", platforms: ["pc", "xb"] },
  { id: "cozy-grove", name: "Cozy Grove", genre: "Cozy", emoji: "🏕️", color: "#48BB78", platforms: ["pc", "ps", "xb", "sw", "ios"] },
  { id: "a-short-hike", name: "A Short Hike", genre: "Cozy", emoji: "🐦", color: "#4299E1", platforms: ["pc", "sw"] },
  { id: "dave-diver", name: "Dave the Diver", genre: "Adventure", emoji: "🤿", color: "#2B6CB0", platforms: ["pc", "ps", "sw"] },
  { id: "it-takes-two", name: "It Takes Two", genre: "Cozy", emoji: "💕", color: "#D53F8C", platforms: ["pc", "ps", "xb", "sw"] },
  { id: "powerwash", name: "PowerWash Simulator", genre: "Cozy", emoji: "💦", color: "#4299E1", platforms: ["pc", "ps", "xb", "sw"] },
  // Open World / Sandbox expanded
  { id: "no-mans-sky", name: "No Man's Sky", genre: "Open World", emoji: "🌌", color: "#5A67D8", platforms: ["pc", "ps", "xb", "sw"] },
  { id: "palworld", name: "Palworld", genre: "Sandbox", emoji: "🦎", color: "#38A169", platforms: ["pc", "xb"] },
  { id: "satisfactory", name: "Satisfactory", genre: "Sandbox", emoji: "⚙️", color: "#C05621", platforms: ["pc"] },
  { id: "rust", name: "Rust", genre: "Sandbox", emoji: "🏚️", color: "#C05621", platforms: ["pc", "ps", "xb"] },
  { id: "ark", name: "Ark Survival", genre: "Sandbox", emoji: "🦖", color: "#2D6A4F", platforms: ["pc", "ps", "xb", "sw", "ios", "and"] },
  { id: "dont-starve", name: "Don't Starve Together", genre: "Sandbox", emoji: "🔥", color: "#744210", platforms: ["pc", "ps", "xb", "sw"] },
  { id: "the-forest", name: "The Forest", genre: "Sandbox", emoji: "🌲", color: "#276749", platforms: ["pc", "ps"] },
  { id: "sons-forest", name: "Sons of the Forest", genre: "Sandbox", emoji: "🪓", color: "#2D3748", platforms: ["pc"] },
  { id: "cities-skylines", name: "Cities: Skylines II", genre: "Sandbox", emoji: "🏙️", color: "#2B6CB0", platforms: ["pc", "ps", "xb"] },
  { id: "stray", name: "Stray", genre: "Adventure", emoji: "🐱", color: "#C05621", platforms: ["pc", "ps"] },
  // Social / Multiplayer expanded
  { id: "sea-of-thieves", name: "Sea of Thieves", genre: "Social", emoji: "🏴‍☠️", color: "#2B6CB0", platforms: ["pc", "ps", "xb"] },
  { id: "fall-guys", name: "Fall Guys", genre: "Social", emoji: "🫘", color: "#D53F8C", platforms: ["pc", "ps", "xb", "sw"] },
  { id: "jackbox", name: "Jackbox Party", genre: "Social", emoji: "🎤", color: "#5A67D8", platforms: ["pc", "ps", "xb", "sw"] },
  { id: "plate-up", name: "PlateUp!", genre: "Social", emoji: "🍳", color: "#E53E3E", platforms: ["pc", "ps", "xb", "sw"] },
  { id: "overcooked2", name: "Overcooked 2", genre: "Social", emoji: "👨‍🍳", color: "#D69E2E", platforms: ["pc", "ps", "xb", "sw"] },
  { id: "brawl-stars", name: "Brawl Stars", genre: "Social", emoji: "💥", color: "#5A67D8", platforms: ["ios", "and"] },
  // Mobile-first
  { id: "genshin", name: "Genshin Impact", genre: "RPG", emoji: "🌬️", color: "#4299E1", platforms: ["pc", "ps", "ios", "and"] },
  { id: "honkai-sr", name: "Honkai: Star Rail", genre: "RPG", emoji: "🚂", color: "#553C9A", platforms: ["pc", "ios", "and"] },
  { id: "pubg-mobile", name: "PUBG Mobile", genre: "BR", emoji: "🪖", color: "#B7791F", platforms: ["ios", "and"] },
  { id: "mobile-legends", name: "Mobile Legends", genre: "MOBA", emoji: "⚔️", color: "#2B6CB0", platforms: ["ios", "and"] },
  // RPG expanded
  { id: "undertale", name: "Undertale", genre: "RPG", emoji: "❤️", color: "#E53E3E", platforms: ["pc", "ps", "sw"] },
  { id: "outer-worlds", name: "The Outer Worlds", genre: "RPG", emoji: "🌎", color: "#5A67D8", platforms: ["pc", "ps", "xb", "sw"] },
  { id: "dragon-age", name: "Dragon Age: Veilguard", genre: "RPG", emoji: "🐲", color: "#C53030", platforms: ["pc", "ps", "xb"] },
  { id: "mass-effect", name: "Mass Effect LE", genre: "RPG", emoji: "🌌", color: "#2B6CB0", platforms: ["pc", "ps", "xb"] },
  { id: "pokemon-sv", name: "Pokémon Scarlet", genre: "RPG", emoji: "🔴", color: "#C53030", platforms: ["sw"] },
  // Metroidvania expanded
  { id: "metroid-dread", name: "Metroid Dread", genre: "Metroidvania", emoji: "🦾", color: "#2D3748", platforms: ["sw"] },
  { id: "eastward", name: "Eastward", genre: "Adventure", emoji: "🍳", color: "#48BB78", platforms: ["pc", "sw"] },
  // Nintendo
  { id: "pikmin4", name: "Pikmin 4", genre: "Strategy", emoji: "🌺", color: "#E53E3E", platforms: ["sw"] },
  { id: "mario-wonder", name: "Mario Wonder", genre: "Platformer", emoji: "🌸", color: "#D69E2E", platforms: ["sw"] },
  // Rhythm
  { id: "beat-saber", name: "Beat Saber", genre: "Rhythm", emoji: "🎵", color: "#E53E3E", platforms: ["pc"] },
  { id: "osu", name: "osu!", genre: "Rhythm", emoji: "🎯", color: "#D53F8C", platforms: ["pc"] },
  // More Roblox
  { id: "tower-defense", name: "Tower Defense Sim", genre: "Strategy", emoji: "🏰", color: "#38A169", platforms: ["rbx"] },
  { id: "king-legacy", name: "King Legacy", genre: "RPG", emoji: "👑", color: "#D69E2E", platforms: ["rbx"] },
  { id: "bee-swarm", name: "Bee Swarm Sim", genre: "Social", emoji: "🐝", color: "#ECC94B", platforms: ["rbx"] },
];

const ARCHETYPES = [
  { id: "explorer", name: "The Explorer", desc: "You wander. You discover. The map is never fully uncovered.", color: "#5B8DEF", accent: "#B4D0FF", emoji: "🧭",
    matches: ["elden", "rdr2", "zelda", "minecraft", "witcher", "cyberpunk", "kenshi", "subnautica", "outerwilds", "ghost-tsushima", "horizon", "tunic", "jailbreak", "no-mans-sky", "gta5", "ac-valhalla", "death-stranding", "starfield", "uncharted4", "stray", "dave-diver"] },
  { id: "completionist", name: "The Completionist", desc: "100% or nothing. Every collectible. Every side quest. Every achievement.", color: "#9B59B6", accent: "#DDBDEB", emoji: "🏆",
    matches: ["bg3", "hollow", "celeste", "portal", "witcher", "divinity", "pillars", "persona5", "fire-emblem", "blox-fruits", "hogwarts", "ff16", "ff7r", "monster-hunter", "pokemon-sv", "spiderman2", "diablo4"] },
  { id: "competitor", name: "The Competitor", desc: "Rank matters. Skill matters. You're here to win.", color: "#E74C3C", accent: "#FFB8AE", emoji: "⚔️",
    matches: ["valorant", "apex", "csgo", "overwatch", "dota", "rocket", "league", "rainbow-six", "deadlock", "tarkov", "arsenal", "cod-mw3", "halo", "tekken8", "sf6", "mk1", "smash", "forza5", "gt7", "battlefield", "cod-mobile", "pubg-mobile", "mobile-legends", "brawl-stars"] },
  { id: "nurturer", name: "The Nurturer", desc: "You build, you tend, you create homes. Games are your sanctuary.", color: "#27AE60", accent: "#A8E6C3", emoji: "🌱",
    matches: ["stardew", "animalcrossing", "minecraft", "coral-island", "unpacking", "potionomics", "adopt-me", "brookhaven", "spiritfarer", "slime-rancher", "cozy-grove", "a-short-hike", "it-takes-two", "powerwash", "cities-skylines"] },
  { id: "storyteller", name: "The Storyteller", desc: "Plot is everything. You play for the characters, the choices, the narrative.", color: "#8E44AD", accent: "#CFA4DB", emoji: "📖",
    matches: ["bg3", "witcher", "disco", "rdr2", "cyberpunk", "citizen-sleeper", "pentiment", "persona5", "tlou2", "gow-ragnarok", "ff16", "ff7r", "alan-wake2", "mass-effect", "dragon-age", "undertale", "outer-worlds", "death-stranding"] },
  { id: "challenger", name: "The Challenger", desc: "The harder, the better. You live for the 'git gud' moment.", color: "#2C3E50", accent: "#95A5B8", emoji: "💀",
    matches: ["elden", "hollow", "celeste", "darksouls", "hades", "sekiro", "blasphemous", "deadcells", "returnal", "slay-spire", "cuphead", "lies-of-p", "armored-core", "sifu", "ultrakill", "neon-white", "hades2", "metroid-dread"] },
  { id: "social", name: "The Social", desc: "Games are better with friends. The party matters more than the game.", color: "#F39C12", accent: "#FFD794", emoji: "🎉",
    matches: ["among", "fortnite", "fifa", "rocket", "overwatch", "deeprock", "leftleft", "phasmo", "helldivers", "adopt-me", "brookhaven", "doors", "mm2", "pet-sim-99", "sea-of-thieves", "fall-guys", "jackbox", "plate-up", "overcooked2", "it-takes-two", "mario-kart", "bee-swarm"] },
  { id: "nostalgist", name: "The Nostalgist", desc: "You love a classic. Timeless design over trendy features.", color: "#16A085", accent: "#A3E4D7", emoji: "🕹️",
    matches: ["portal", "celeste", "hollow", "stardew", "terraria", "ori", "cuphead", "undertale", "mario-wonder", "smash", "mario-kart", "pikmin4", "eastward", "a-short-hike"] },
];

const ALL_GAMES = [...GAMES, ...DEEP_CUTS];

// Platform metadata — icons are SVGs for visual distinction
const PLATFORM_META = {
  pc: { label: "PC", color: "#4A5568", bg: "#EDF2F7" },
  ps: { label: "PlayStation", color: "#003791", bg: "#DBE7FF" },
  xb: { label: "Xbox", color: "#107C10", bg: "#DCFCE7" },
  sw: { label: "Switch", color: "#E60012", bg: "#F1F1F1" },
  ios: { label: "iOS", color: "#1F1F1F", bg: "#F1F1F1" },
  and: { label: "Android", color: "#3DDC84", bg: "#E7FBEF" },
  rbx: { label: "Roblox", color: "#FFFFFF", bg: "#00A2FF" },
};

// SVG platform icons - small and clean
const PlatformIcon = ({ code, size = 14 }) => {
  const meta = PLATFORM_META[code];
  if (!meta) return null;
  const iconProps = { width: size, height: size, fill: meta.color, viewBox: "0 0 24 24" };

  // Switch uses two-color rendering (red Joy-Con + blue Joy-Con)
  if (code === "sw") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24">
        {/* Left Joy-Con - Neon Blue */}
        <path d="M9.9 2H3.6C2.6 2 2 2.5 2 3.6v16.8C2 21.4 2.5 22 3.6 22h6.3V2z" fill="#00C3E3" />
        {/* Right Joy-Con - Neon Red */}
        <path d="M14.1 2h6.3c1 0 1.6.5 1.6 1.6v16.8c0 1-.5 1.6-1.6 1.6h-6.3V2z" fill="#E60012" />
        {/* Left stick (white circle) */}
        <circle cx="6.1" cy="17.8" r="1.8" fill="#FFFFFF" />
        {/* Right button (white circle) */}
        <circle cx="17.9" cy="8.3" r="1.5" fill="#FFFFFF" />
      </svg>
    );
  }

  // Roblox - tilted rounded square with square hole (matches current brand mark)
  if (code === "rbx") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <g transform="translate(12 12) rotate(15) translate(-12 -12)">
          <rect x="4" y="4" width="16" height="16" rx="2.5" fill="#FFFFFF" />
          <rect x="10" y="10" width="4" height="4" fill="#00A2FF" />
        </g>
      </svg>
    );
  }

  const icons = {
    pc: <svg {...iconProps}><path d="M4 5h16v10H4zm0 12h16v2H4zm6-8h4v2h-4z" /></svg>,
    ps: <svg {...iconProps}><path d="M9.5 3v15.3l3.4-1.1V7.9c0-.6.3-1 .9-.9.6.1.9.5.9 1.2v4.9l3-1c1.6-.5 2.3-1.6 2.3-3.3 0-1.7-.7-3-2-3.6-1.3-.6-3.4-1-6.6-1.2zM3 13.5c-1.3.4-2 1.2-2 2.5s.7 2 2 2.2c1.3.3 2.6 0 4-.8v-1.9c-.9.3-1.7.6-2.4.7-.7.1-1.1 0-1.2-.5-.1-.4.2-.8.9-1.1.5-.2 1-.3 1.7-.5v-2c-1 .2-2 .5-3 .9v-.5z" /></svg>,
    xb: <svg {...iconProps}><path d="M6.8 21.4c1.5 1 3.3 1.6 5.2 1.6s3.7-.6 5.2-1.6c.7-.5.5-.9-.8-2.3-2.1-2.3-3.7-5-4.4-6.9-.7 1.9-2.3 4.6-4.4 6.9-1.3 1.4-1.5 1.8-.8 2.3zM12 1c-1.5 0-2.9.4-4.2 1-.5.2-.5.4 0 .6 1.5.5 3.2 1.7 4.2 3 1-1.3 2.7-2.5 4.2-3 .5-.2.5-.4 0-.6C14.9 1.4 13.5 1 12 1zM2.3 17.9c.8 1.3 1.9 2.4 3.1 3.2.4.2.6 0 .4-.4-1-1.8-2-4.7-1.9-7.5 0-1.5.5-3.3 1.3-5 .3-.6.5-1.1.4-1.2-.1-.1-.5.2-1 .8C2.5 9.8 1 12.8 1 16c0 .7.1 1.3.3 1.9.1 0 .6.8 1 0zm19.4 0c.4.8.9 0 1 0 .2-.6.3-1.2.3-1.9 0-3.2-1.5-6.2-3.6-8.2-.5-.6-.9-.9-1-.8-.1.1.1.6.4 1.2.8 1.7 1.3 3.5 1.3 5 .1 2.8-.9 5.7-1.9 7.5-.2.4 0 .6.4.4 1.2-.8 2.3-1.9 3.1-3.2z" /></svg>,
    ios: <svg {...iconProps}><path d="M17.05 12.04c-.03-3.15 2.57-4.68 2.69-4.75-1.47-2.15-3.76-2.44-4.57-2.47-1.94-.2-3.79 1.14-4.78 1.14-.98 0-2.51-1.11-4.13-1.08-2.12.03-4.09 1.23-5.19 3.13-2.22 3.85-.57 9.53 1.59 12.65 1.05 1.53 2.3 3.24 3.92 3.18 1.58-.06 2.17-1.02 4.07-1.02s2.43 1.02 4.09.99c1.69-.03 2.76-1.54 3.79-3.08 1.2-1.77 1.69-3.49 1.71-3.58-.04-.02-3.27-1.25-3.3-4.97zM13.86 3.7c.87-1.06 1.46-2.53 1.3-4-1.25.05-2.76.84-3.66 1.89-.81.93-1.52 2.42-1.33 3.86 1.4.11 2.82-.71 3.69-1.75z" /></svg>,
    and: <svg {...iconProps}><path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993s-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993s-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1518-.5683.416.416 0 00-.5683.1518l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1367 1.1083L4.841 5.4561a.4161.4161 0 00-.5683-.1518.416.416 0 00-.1518.5683l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396" /></svg>,
  };
  return icons[code] || null;
};

// Platform icon cluster for card corner
const PlatformCluster = ({ platforms }) => (
  <div style={{ position: "absolute", top: "10px", right: "10px", display: "flex", gap: "4px", flexWrap: "wrap", justifyContent: "flex-end", maxWidth: "70px" }}>
    {platforms.map((p) => (
      <div
        key={p}
        title={PLATFORM_META[p].label}
        style={{
          width: "20px", height: "20px", borderRadius: "5px",
          background: PLATFORM_META[p].bg,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <PlatformIcon code={p} size={12} />
      </div>
    ))}
  </div>
);

const GENRES_SUMMARY = (ids) => {
  const genres = {};
  ids.forEach((id) => { const g = ALL_GAMES.find((x) => x.id === id); if (g) genres[g.genre] = (genres[g.genre] || 0) + 1; });
  return Object.entries(genres).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([g]) => g);
};

const pickArchetype = (ids) => {
  if (ids.length === 0) return ARCHETYPES[0];
  const scores = ARCHETYPES.map((arch) => ({ arch, score: ids.filter((id) => arch.matches.includes(id)).length / ids.length }));
  scores.sort((a, b) => b.score - a.score);
  return scores[0].arch;
};

const getRecommendations = (selected) => {
  if (selected.length === 0) return [];
  const archetype = pickArchetype(selected);
  const selectedGenres = new Set(selected.map((id) => ALL_GAMES.find((g) => g.id === id)?.genre).filter(Boolean));
  const scored = ALL_GAMES
    .filter((g) => !selected.includes(g.id))
    .map((g) => {
      let score = 0;
      if (archetype.matches.includes(g.id)) score += 3;
      if (selectedGenres.has(g.genre)) score += 2;
      if (DEEP_CUTS.find((d) => d.id === g.id)) score += 1;
      return { game: g, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, 12).map((s) => s.game);
};

// Find games similar to a given game
const getSimilarGames = (gameId, excludeIds = []) => {
  const game = ALL_GAMES.find((g) => g.id === gameId);
  if (!game) return [];
  const exclude = new Set([gameId, ...excludeIds]);
  return ALL_GAMES
    .filter((g) => !exclude.has(g.id) && g.genre === game.genre)
    .slice(0, 3);
};

const getTraits = (ids, hearted) => {
  const games = ids.map((id) => ALL_GAMES.find((g) => g.id === id)).filter(Boolean);
  const genres = games.map((g) => g.genre);
  const traits = [];
  if (genres.filter((g) => ["Souls", "Roguelike", "Metroidvania"].includes(g)).length >= 1) traits.push("masochist");
  if (genres.filter((g) => ["Cozy", "Sandbox"].includes(g)).length >= 1) traits.push("builder");
  if (genres.filter((g) => ["FPS", "BR", "MOBA", "Hero Shooter"].includes(g)).length >= 1) traits.push("tactician");
  if (genres.filter((g) => ["RPG", "Open World"].includes(g)).length >= 1) traits.push("lore-hoarder");
  if (genres.filter((g) => g === "Puzzle").length >= 1) traits.push("thinker");
  if (genres.filter((g) => ["Sports", "Social"].includes(g)).length >= 1) traits.push("social-player");
  if (genres.filter((g) => g === "Horror").length >= 1) traits.push("thrill-seeker");
  if (genres.filter((g) => g === "Fighting").length >= 1) traits.push("brawler");
  if (genres.filter((g) => g === "Racing").length >= 1) traits.push("speed-demon");
  if (genres.filter((g) => g === "Strategy").length >= 1) traits.push("strategist");
  if (genres.filter((g) => g === "Rhythm").length >= 1) traits.push("rhythm-brain");
  if (genres.filter((g) => g === "Action").length >= 1) traits.push("action-junkie");
  if (games.length >= 8) traits.push("diverse-palette");
  if (games.length <= 3) traits.push("focused");
  if (games.some((g) => DEEP_CUTS.find((d) => d.id === g.id))) traits.push("refined-taste");
  if (hearted && hearted.length >= 3) traits.push("curious");
  if (games.some((g) => g.platforms.includes("rbx"))) traits.push("roblox-native");
  return traits.slice(0, 4);
};

const saveCard = (card) => {
  try {
    const keys = JSON.parse(localStorage.getItem("gg-card-keys") || "[]");
    localStorage.setItem(`gg-card:${card.id}`, JSON.stringify(card));
    if (!keys.includes(card.id)) { keys.push(card.id); localStorage.setItem("gg-card-keys", JSON.stringify(keys)); }
    // Index by email for returning user lookup
    if (card.email) {
      const emailKey = `gg-email:${card.email.toLowerCase().trim()}`;
      const cardIds = JSON.parse(localStorage.getItem(emailKey) || "[]");
      if (!cardIds.includes(card.id)) { cardIds.push(card.id); localStorage.setItem(emailKey, JSON.stringify(cardIds)); }
    }
  } catch {}
};
const loadCard = (id) => { try { return JSON.parse(localStorage.getItem(`gg-card:${id}`) || "null"); } catch { return null; } };
const loadCardsByEmail = (email) => {
  try {
    const emailKey = `gg-email:${email.toLowerCase().trim()}`;
    const cardIds = JSON.parse(localStorage.getItem(emailKey) || "[]");
    return cardIds.map((id) => loadCard(id)).filter(Boolean);
  } catch { return []; }
};
const genId = () => Math.random().toString(36).substring(2, 10);

// GameCard component - used everywhere with platform icons in corner
function GameCard({ game, selected, hearted, onClick, onHeart, rating, onRate, size = "normal" }) {
  const showHeart = typeof onHeart === "function";
  const showRating = typeof onRate === "function";
  const styleBase = {
    padding: size === "small" ? "12px 10px" : "16px 14px",
    paddingTop: size === "small" ? "32px" : "36px",
    paddingBottom: size === "small" ? "12px" : showRating && selected ? "40px" : "16px",
    borderRadius: "16px",
    border: selected ? `2px solid ${game.color}` : hearted ? "2px solid #EC4899" : "2px solid #E2E8F0",
    background: selected ? `${game.color}12` : hearted ? "#FDF2F8" : "white",
    transition: "all 0.15s", fontFamily: "inherit",
    transform: (selected || hearted) ? "translateY(-3px)" : "none",
    boxShadow: selected ? `0 10px 24px ${game.color}28` : hearted ? "0 10px 24px rgba(236,72,153,0.18)" : "0 1px 3px rgba(0,0,0,0.04)",
    position: "relative",
    cursor: "pointer",
    textAlign: "left",
    width: "100%",
  };

  const RatingBtn = ({ type, icon, active }) => (
    <button
      onClick={(e) => { e.stopPropagation(); onRate(type); }}
      style={{
        width: "26px", height: "26px", borderRadius: "50%",
        background: active ? (type === "dislike" ? "#FEE2E2" : type === "love" ? "#DBEAFE" : "#DCFCE7") : "rgba(241,245,249,0.8)",
        border: active ? `1.5px solid ${type === "dislike" ? "#FCA5A5" : type === "love" ? "#93C5FD" : "#86EFAC"}` : "1px solid #E2E8F0",
        cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.15s",
        fontSize: "13px",
      }}
      title={type === "dislike" ? "Not for me" : type === "like" ? "Liked it" : "Mind blown"}
    >{icon}</button>
  );

  return (
    <div style={styleBase}>
      <PlatformCluster platforms={game.platforms} />

      {showHeart && (
        <button
          onClick={(e) => { e.stopPropagation(); onHeart(); }}
          disabled={selected}
          style={{
            position: "absolute", top: "8px", left: "8px",
            width: "24px", height: "24px", borderRadius: "50%",
            background: hearted ? "#EC4899" : "rgba(241,245,249,0.9)",
            border: "none", cursor: selected ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.15s", opacity: selected ? 0.3 : 1,
            zIndex: 2,
          }}
          title={hearted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill={hearted ? "white" : "none"} stroke={hearted ? "white" : "#94A3B8"} strokeWidth="2">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
      )}

      <button onClick={onClick} style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer", textAlign: "left", width: "100%", fontFamily: "inherit", display: "block" }}>
        <div style={{ fontSize: size === "small" ? "22px" : "26px", marginBottom: "8px" }}>{game.emoji}</div>
        <div style={{ fontSize: size === "small" ? "12px" : "13px", fontWeight: 600, color: "#0F172A", marginBottom: "2px", lineHeight: "1.3" }}>{game.name}</div>
        <div style={{ fontSize: "11px", color: "#94A3B8" }}>{game.genre}</div>
        {selected && <div style={{ marginTop: "6px", fontSize: "10px", color: game.color, fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase" }}>✓ played</div>}
        {hearted && !selected && <div style={{ marginTop: "6px", fontSize: "10px", color: "#EC4899", fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase" }}>♡ wishlisted</div>}
      </button>

      {/* Netflix-style rating buttons - bottom right, only when selected */}
      {showRating && selected && (
        <div style={{
          position: "absolute", bottom: "8px", right: "8px",
          display: "flex", gap: "4px",
        }}>
          <RatingBtn type="dislike" icon="👎" active={rating === "dislike"} />
          <RatingBtn type="like" icon="👍" active={rating === "like"} />
          <RatingBtn type="love" icon="🤯" active={rating === "love"} />
        </div>
      )}
    </div>
  );
}

export default function Dex() {
  const [view, setView] = useState("landing");
  const [selectedGames, setSelectedGames] = useState([]);
  const [heartedGames, setHeartedGames] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [vibe, setVibe] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showHeartTooltip, setShowHeartTooltip] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [surfacedGames, setSurfacedGames] = useState([]); // games added via search
  const [hideEmail, setHideEmail] = useState(false);
  const [returnEmail, setReturnEmail] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [verifyError, setVerifyError] = useState("");
  const [savedCards, setSavedCards] = useState([]);
  const [gameRatings, setGameRatings] = useState({}); // { gameId: "love" | "like" | "dislike" }
  const [fromDashboard, setFromDashboard] = useState(false);
  const [defaultCardId, setDefaultCardId] = useState(() => {
    try { return localStorage.getItem("gg-default-card") || null; } catch { return null; }
  });
  const gamesSectionRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cardId = params.get("card");
    const returning = params.get("returning");
    if (cardId) {
      const card = loadCard(cardId);
      if (card) { setCurrentCard(card); setView("shared"); }
    } else if (returning) {
      setView("returning");
    }
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) { setSearchResults([]); return; }
    const q = searchQuery.toLowerCase().trim();
    const results = ALL_GAMES
      .filter((g) => g.name.toLowerCase().includes(q) || g.genre.toLowerCase().includes(q))
      .filter((g) => !surfacedGames.find((s) => s.id === g.id))
      .filter((g) => !recommendations.find((r) => r.id === g.id))
      .slice(0, 6);
    setSearchResults(results);
  }, [searchQuery, surfacedGames, recommendations]);

  const scrollToGames = () => gamesSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const goToRecommendations = () => {
    setRecommendations(getRecommendations(selectedGames));
    setSurfacedGames([]);
    setView("recommendations");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleSearchSelect = (game) => {
    // Add the selected game + its similar games to surfacedGames
    const similar = getSimilarGames(game.id, [
      ...selectedGames,
      ...heartedGames,
      ...recommendations.map((r) => r.id),
      ...surfacedGames.map((s) => s.id),
    ]);
    setSurfacedGames((prev) => [...prev, game, ...similar.filter((s) => !prev.find((p) => p.id === s.id))]);
    setSearchQuery("");
    setSearchResults([]);
  };

  const toggleGame = (id) => setSelectedGames((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  const toggleHeart = (id) => setHeartedGames((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  const toggleRating = (id, rating) => setGameRatings((prev) => prev[id] === rating ? { ...prev, [id]: undefined } : { ...prev, [id]: rating });

  const generateCard = () => {
    const archetype = pickArchetype(selectedGames);
    const card = {
      id: genId(),
      name: name || "Anonymous",
      email: email || null,
      hideEmail,
      games: selectedGames,
      hearted: heartedGames,
      ratings: Object.fromEntries(Object.entries(gameRatings).filter(([_, v]) => v)),
      archetype: archetype.id,
      traits: getTraits(selectedGames, heartedGames),
      topGenres: GENRES_SUMMARY(selectedGames),
      vibe: vibe || "chill",
      createdAt: Date.now(),
    };
    saveCard(card);
    setCurrentCard(card);
    setView("card");
    window.history.pushState({}, "", `?card=${card.id}`);
  };

  const copyShareLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}?card=${currentCard.id}`;
    try {
      if (navigator.share) await navigator.share({ title: `${currentCard.name}'s Dex`, url });
      else { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); }
    } catch {}
  };

  const restart = () => {
    setView("landing"); setSelectedGames([]); setHeartedGames([]); setRecommendations([]); setSurfacedGames([]);
    setName(""); setEmail(""); setVibe(null); setCurrentCard(null); setShowHeartTooltip(true); setSearchQuery("");
    setHideEmail(false); setReturnEmail(""); setVerifyCode(""); setVerifyError(""); setSavedCards([]);
    setGameRatings({}); setFromDashboard(false);
    window.history.pushState({}, "", window.location.pathname);
  };

  const handleVerify = () => {
    if (verifyCode !== "1111") { setVerifyError("Invalid code. Try 1111 for demo."); return; }
    const cards = loadCardsByEmail(returnEmail);
    setSavedCards(cards);
    setView("dashboard");
  };

  const removeFromWishlist = (gameId) => {
    // Remove from all saved cards in localStorage and update state
    const updated = savedCards.map((card) => {
      if (card.hearted?.includes(gameId)) {
        const newCard = { ...card, hearted: card.hearted.filter((id) => id !== gameId) };
        localStorage.setItem(`gg-card:${card.id}`, JSON.stringify(newCard));
        return newCard;
      }
      return card;
    });
    setSavedCards(updated);
  };

  const setAsDefault = (cardId) => {
    setDefaultCardId(cardId);
    try { localStorage.setItem("gg-default-card", cardId); } catch {}
  };

  const getSortedCards = () => {
    const sorted = [...savedCards].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    if (defaultCardId) {
      const defaultIdx = sorted.findIndex((c) => c.id === defaultCardId);
      if (defaultIdx > 0) {
        const [def] = sorted.splice(defaultIdx, 1);
        sorted.unshift(def);
      }
    }
    return sorted;
  };

  // ==================== RETURNING USER: EMAIL ENTRY ====================
  if (view === "returning") {
    return (
      <div style={wrapStyle}>
        <Backdrop muted />
        <nav style={navStyle}>
          <div style={logoStyle} onClick={restart}>
            <span style={{ fontSize: "24px", cursor: "pointer" }}>🎮</span>
            <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "20px", fontWeight: 600, letterSpacing: "-0.5px", cursor: "pointer" }}>dex</span>
          </div>
        </nav>
        <div style={{ maxWidth: "480px", margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
          <div style={{ animation: "fadeIn 0.4s ease" }}>
            <div style={{ fontSize: "48px", marginBottom: "20px" }}>👋</div>
            <h2 style={{ ...headlineStyle, textAlign: "center" }}>welcome back.</h2>
            <p style={{ ...subStyle, textAlign: "center", marginBottom: "32px" }}>Enter the email you used when creating your Dex and we'll pull up your collection.</p>
            <input
              type="email"
              placeholder="you@email.com"
              value={returnEmail}
              onChange={(e) => { setReturnEmail(e.target.value); setVerifyError(""); }}
              autoFocus
              style={inputStyle}
              onKeyDown={(e) => { if (e.key === "Enter" && returnEmail.trim()) setView("verify"); }}
            />
            <div style={{ marginTop: "24px", display: "flex", gap: "12px", justifyContent: "center" }}>
              <button
                onClick={() => setView("verify")}
                disabled={!returnEmail.trim() || !returnEmail.includes("@")}
                style={{ ...primaryBtn, opacity: returnEmail.includes("@") ? 1 : 0.4, cursor: returnEmail.includes("@") ? "pointer" : "not-allowed" }}
              >
                send code <span style={{ marginLeft: "8px" }}>→</span>
              </button>
            </div>
            <div style={{ marginTop: "40px", paddingTop: "24px", borderTop: "1px solid #F1F5F9" }}>
              <div style={{ fontSize: "13px", color: "#94A3B8" }}>First time here?</div>
              <button onClick={restart} style={{ fontSize: "14px", fontWeight: 600, color: "#6366F1", background: "transparent", border: "none", cursor: "pointer", marginTop: "6px", fontFamily: "inherit" }}>
                Pull your first Dex →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==================== VERIFY CODE ====================
  if (view === "verify") {
    return (
      <div style={wrapStyle}>
        <Backdrop muted />
        <nav style={navStyle}>
          <div style={logoStyle} onClick={restart}>
            <span style={{ fontSize: "24px", cursor: "pointer" }}>🎮</span>
            <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "20px", fontWeight: 600, letterSpacing: "-0.5px", cursor: "pointer" }}>dex</span>
          </div>
        </nav>
        <div style={{ maxWidth: "480px", margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
          <div style={{ animation: "fadeIn 0.4s ease" }}>
            <div style={{ fontSize: "48px", marginBottom: "20px" }}>🔐</div>
            <h2 style={{ ...headlineStyle, textAlign: "center" }}>check your email.</h2>
            <p style={{ ...subStyle, textAlign: "center", marginBottom: "8px" }}>
              We sent a 4-digit code to <strong style={{ color: "#0F172A" }}>{returnEmail}</strong>
            </p>
            <p style={{ fontSize: "12px", color: "#94A3B8", marginBottom: "32px" }}>
              (demo mode — use code <strong>1111</strong>)
            </p>
            <input
              type="text"
              placeholder="1111"
              value={verifyCode}
              onChange={(e) => { setVerifyCode(e.target.value.replace(/[^0-9]/g, "").slice(0, 4)); setVerifyError(""); }}
              maxLength={4}
              autoFocus
              style={{ ...inputStyle, textAlign: "center", fontSize: "32px", letterSpacing: "12px", fontFamily: "ui-monospace, monospace", maxWidth: "220px", margin: "0 auto" }}
              onKeyDown={(e) => { if (e.key === "Enter" && verifyCode.length === 4) handleVerify(); }}
            />
            {verifyError && (
              <div style={{ marginTop: "12px", fontSize: "13px", color: "#EF4444", fontWeight: 500 }}>{verifyError}</div>
            )}
            <div style={{ marginTop: "24px", display: "flex", gap: "12px", justifyContent: "center" }}>
              <button
                onClick={handleVerify}
                disabled={verifyCode.length !== 4}
                style={{ ...primaryBtn, opacity: verifyCode.length === 4 ? 1 : 0.4, cursor: verifyCode.length === 4 ? "pointer" : "not-allowed" }}
              >
                verify <span style={{ marginLeft: "8px" }}>→</span>
              </button>
              <button onClick={() => { setView("returning"); setVerifyCode(""); }} style={secondaryBtn}>back</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==================== DASHBOARD (returning user) ====================
  if (view === "dashboard") {
    const allHearted = [...new Set(savedCards.flatMap((c) => c.hearted || []))];
    const heartedGamesData = allHearted.map((id) => ALL_GAMES.find((g) => g.id === id)).filter(Boolean);

    return (
      <div style={wrapStyle}>
        <Backdrop muted />
        <nav style={navStyle}>
          <div style={logoStyle} onClick={restart}>
            <span style={{ fontSize: "24px", cursor: "pointer" }}>🎮</span>
            <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "20px", fontWeight: 600, letterSpacing: "-0.5px", cursor: "pointer" }}>dex</span>
          </div>
          <button onClick={restart} style={{ ...secondaryBtn, padding: "8px 16px", fontSize: "13px" }}>New Dex</button>
        </nav>

        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "40px 24px" }}>
          {savedCards.length === 0 ? (
            /* No cards found edge case */
            <div style={{ textAlign: "center", padding: "60px 0", animation: "fadeIn 0.4s ease" }}>
              <div style={{ fontSize: "48px", marginBottom: "20px" }}>🤔</div>
              <h2 style={{ ...headlineStyle, textAlign: "center" }}>no cards found.</h2>
              <p style={{ ...subStyle, textAlign: "center", marginBottom: "32px" }}>
                We couldn't find any cards for <strong>{returnEmail}</strong>. Maybe you used a different email, or this is your first time?
              </p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                <button onClick={restart} style={primaryBtn}>
                  Pull your first Dex <span style={{ marginLeft: "8px" }}>→</span>
                </button>
                <button onClick={() => { setView("returning"); setVerifyCode(""); setReturnEmail(""); }} style={secondaryBtn}>try another email</button>
              </div>
            </div>
          ) : (
            <div style={{ animation: "fadeIn 0.4s ease" }}>
              <div style={{ marginBottom: "36px" }}>
                <div style={badgeStyle("#ECFDF5", "#10B981")}>✓ verified · {returnEmail}</div>
                <h2 style={{ ...headlineStyle, marginTop: "16px" }}>your collection.</h2>
                <p style={subStyle}>
                  {savedCards.length} Dex card{savedCards.length > 1 ? "s" : ""} saved. Tap any to view or share.
                </p>
              </div>

              {/* Cards grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px", marginBottom: "40px" }}>
                {getSortedCards().map((card) => {
                  const arch = ARCHETYPES.find((a) => a.id === card.archetype);
                  const gameCount = card.games?.length || 0;
                  const isDefault = card.id === defaultCardId;
                  return (
                    <div key={card.id} style={{ position: "relative" }}>
                      <button
                        onClick={() => { setCurrentCard(card); setFromDashboard(true); setView("card"); window.history.pushState({}, "", `?card=${card.id}`); }}
                        style={{
                          padding: "2px", borderRadius: "20px", width: "100%",
                          background: `linear-gradient(135deg, ${arch.color} 0%, ${arch.accent} 100%)`,
                          boxShadow: isDefault ? `0 12px 30px -8px ${arch.color}60, 0 0 0 2px #F59E0B` : `0 12px 30px -8px ${arch.color}40`,
                          border: "none", cursor: "pointer", textAlign: "left",
                          fontFamily: "inherit", transition: "transform 0.15s",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "none"}
                      >
                        <div style={{ background: "white", borderRadius: "18px", padding: "20px", position: "relative", overflow: "hidden" }}>
                          <div style={{ position: "absolute", top: "-5px", right: "-5px", fontSize: "50px", opacity: 0.08 }}>{arch.emoji}</div>

                          {/* Default badge */}
                          {isDefault && (
                            <div style={{ position: "absolute", top: "12px", right: "12px", background: "#FEF3C7", border: "1px solid #FDE68A", borderRadius: "999px", padding: "3px 9px", fontSize: "9px", fontWeight: 700, color: "#92400E", letterSpacing: "0.5px" }}>★ DEFAULT</div>
                          )}

                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                            <div style={{ fontSize: "9px", fontWeight: 700, color: "#94A3B8", letterSpacing: "1px" }}>DEX CARD</div>
                            <div style={{ fontSize: "24px" }}>{arch.emoji}</div>
                          </div>
                          <div style={{ fontFamily: "'Fraunces', serif", fontSize: "18px", fontWeight: 600, color: "#0F172A", marginBottom: "2px" }}>{card.name}</div>
                          <div style={{ fontFamily: "'Fraunces', serif", fontSize: "14px", fontStyle: "italic", color: arch.color, marginBottom: "12px" }}>{arch.name}</div>
                          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                            {(card.traits || []).slice(0, 3).map((t) => (
                              <span key={t} style={{ padding: "3px 8px", background: "#F1F5F9", borderRadius: "999px", fontSize: "10px", fontWeight: 600, color: "#475569" }}>{t}</span>
                            ))}
                          </div>
                          <div style={{ marginTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: "11px", color: "#94A3B8" }}>{gameCount} game{gameCount !== 1 ? "s" : ""} · {card.vibe} vibe</span>
                            <span style={{ fontSize: "10px", color: "#CBD5E1", fontFamily: "monospace" }}>#{card.id}</span>
                          </div>
                        </div>
                      </button>

                      {/* Set as default button - below card */}
                      {!isDefault && savedCards.length > 1 && (
                        <button
                          onClick={(e) => { e.stopPropagation(); setAsDefault(card.id); }}
                          style={{
                            display: "block", margin: "8px auto 0", padding: "5px 14px",
                            background: "transparent", border: "1px solid #E2E8F0", borderRadius: "999px",
                            fontSize: "11px", fontWeight: 600, color: "#94A3B8", cursor: "pointer",
                            fontFamily: "inherit", transition: "all 0.15s",
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#F59E0B"; e.currentTarget.style.color = "#92400E"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E2E8F0"; e.currentTarget.style.color = "#94A3B8"; }}
                        >
                          ★ Set as default
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Wishlisted games section */}
              {heartedGamesData.length > 0 && (
                <div style={{ padding: "28px 24px", background: "white", border: "1px solid #F1F5F9", borderRadius: "20px", marginBottom: "24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#EC4899"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                    <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "20px", fontWeight: 500, color: "#0F172A" }}>your wishlist</div>
                    <div style={{ fontSize: "12px", color: "#94A3B8", marginLeft: "auto" }}>{heartedGamesData.length} game{heartedGamesData.length > 1 ? "s" : ""}</div>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {heartedGamesData.map((g) => (
                      <div key={g.id} style={{
                        padding: "10px 14px 10px 12px", background: "#FDF2F8",
                        border: "1px solid #FBCFE8", borderRadius: "10px",
                        display: "flex", alignItems: "center", gap: "8px",
                        fontSize: "13px", fontWeight: 500, color: "#9D174D",
                      }}>
                        <span style={{ fontSize: "18px" }}>{g.emoji}</span>
                        <div style={{ flex: 1 }}>
                          <div>{g.name}</div>
                          <div style={{ fontSize: "10px", color: "#C084A6" }}>{g.genre}</div>
                        </div>
                        <button
                          onClick={() => removeFromWishlist(g.id)}
                          style={{
                            width: "20px", height: "20px", borderRadius: "50%",
                            background: "rgba(157,23,77,0.08)", border: "none",
                            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                            color: "#C084A6", fontSize: "12px", transition: "all 0.15s",
                            flexShrink: 0,
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = "#EF4444"; e.currentTarget.style.color = "white"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(157,23,77,0.08)"; e.currentTarget.style.color = "#C084A6"; }}
                          title="Remove from wishlist"
                        >✕</button>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: "16px", fontSize: "13px", color: "#94A3B8", fontStyle: "italic" }}>
                    Games you haven't played yet but want to try. Tap ✕ to remove.
                  </div>
                </div>
              )}

              {/* Pull new Dex CTA */}
              <div style={{ padding: "24px", background: "#EEF2FF", border: "1px solid #C7D2FE", borderRadius: "16px", textAlign: "center" }}>
                <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "18px", fontWeight: 500, color: "#0F172A", marginBottom: "8px" }}>taste changed lately?</div>
                <div style={{ fontSize: "14px", color: "#64748B", marginBottom: "16px" }}>Pull a new Dex to track what you're playing now. Your old ones stay saved.</div>
                <button onClick={() => {
                  const savedEmail = returnEmail;
                  setView("landing"); setSelectedGames([]); setHeartedGames([]); setRecommendations([]); setSurfacedGames([]);
                  setName(""); setVibe(null); setCurrentCard(null); setShowHeartTooltip(true); setSearchQuery("");
                  setHideEmail(false); setVerifyCode(""); setVerifyError(""); setSavedCards([]);
                  setEmail(savedEmail);
                  window.history.pushState({}, "", window.location.pathname);
                }} style={{ ...primaryBtn, background: "linear-gradient(135deg, #6366F1 0%, #EC4899 100%)" }}>
                  Pull new Dex <span style={{ marginLeft: "8px" }}>→</span>
                </button>
              </div>
            </div>
          )}
        </div>
        <div style={{ height: "60px" }} />
      </div>
    );
  }

  // ==================== RECOMMENDATIONS (with search) ====================
  if (view === "recommendations") {
    const currentArch = pickArchetype(selectedGames);
    return (
      <div style={wrapStyle}>
        <Backdrop muted />
        <nav style={navStyle}>
          <div style={logoStyle} onClick={restart}>
            <span style={{ fontSize: "24px", cursor: "pointer" }}>🎮</span>
            <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "20px", fontWeight: 600, letterSpacing: "-0.5px", cursor: "pointer" }}>dex</span>
          </div>
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            {[0, 1, 2, 3].map((i) => (<div key={i} style={{ width: i === 1 ? "24px" : "8px", height: "8px", borderRadius: "999px", background: i <= 1 ? "#6366F1" : "#E2E8F0", transition: "all 0.3s" }} />))}
          </div>
        </nav>

        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "40px 24px" }}>
          <div style={{ animation: "fadeIn 0.4s ease" }}>
            <div style={badgeStyle("#FDF2F8", "#EC4899")}>step 2 of 4 · based on your picks</div>
            <h2 style={headlineStyle}>any of these hit?</h2>
            <p style={subStyle}>
              You're leaning <span style={{ color: currentArch.color, fontWeight: 600, fontStyle: "italic", fontFamily: "'Fraunces', Georgia, serif" }}>{currentArch.name}</span>. Here are some deeper cuts you might love. Optional — but the more we know, the richer your Dex.
            </p>

            {showHeartTooltip && (
              <div style={{
                marginTop: "24px", padding: "16px 20px",
                background: "linear-gradient(135deg, #FEF3F2 0%, #FDF2F8 100%)",
                border: "1px solid #FECACA", borderRadius: "14px",
                display: "flex", alignItems: "flex-start", gap: "14px",
                animation: "fadeIn 0.5s ease",
              }}>
                <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 2px 8px rgba(236,72,153,0.15)" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#EC4899">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#0F172A", marginBottom: "4px" }}>See something intriguing?</div>
                  <div style={{ fontSize: "13px", color: "#64748B", lineHeight: "1.5" }}>
                    Tap <span style={{ color: "#EC4899", fontWeight: 600 }}>the heart</span> on games you haven't played but want to try. We'll remember them so you can come back — and studios building similar games may invite you to early playtests.
                  </div>
                </div>
                <button onClick={() => setShowHeartTooltip(false)} style={{
                  background: "transparent", border: "none", cursor: "pointer",
                  padding: "4px", color: "#94A3B8", fontSize: "18px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>✕</button>
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "12px", marginTop: "24px" }}>
              {recommendations.map((g) => (
                <GameCard key={g.id} game={g}
                  selected={selectedGames.includes(g.id)}
                  hearted={heartedGames.includes(g.id)}
                  onClick={() => toggleGame(g.id)}
                  onHeart={() => toggleHeart(g.id)}
                  rating={gameRatings[g.id]}
                  onRate={(r) => toggleRating(g.id, r)}
                />
              ))}
            </div>

            {/* Search section */}
            <div style={{ marginTop: "40px", padding: "28px 24px", background: "white", border: "1px solid #F1F5F9", borderRadius: "20px" }}>
              <div style={{ textAlign: "center", marginBottom: "18px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#6366F1", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "8px" }}>can't find something?</div>
                <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "22px", fontWeight: 500, color: "#0F172A", letterSpacing: "-0.3px" }}>search for another game</div>
              </div>

              <div style={{ position: "relative", maxWidth: "500px", margin: "0 auto" }}>
                <div style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#94A3B8", pointerEvents: "none" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search games by name or genre..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: "100%", padding: "14px 18px 14px 42px",
                    fontSize: "14px", border: "1.5px solid #E2E8F0",
                    borderRadius: "12px", fontFamily: "inherit",
                    outline: "none", background: "#FAFAFA",
                    transition: "all 0.15s",
                  }}
                  onFocus={(e) => { e.target.style.background = "white"; e.target.style.borderColor = "#6366F1"; }}
                  onBlur={(e) => { e.target.style.background = "#FAFAFA"; e.target.style.borderColor = "#E2E8F0"; }}
                />

                {/* Search results dropdown */}
                {searchResults.length > 0 && (
                  <div style={{
                    position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0,
                    background: "white", border: "1px solid #E2E8F0", borderRadius: "12px",
                    boxShadow: "0 10px 40px rgba(15,23,42,0.1)",
                    overflow: "hidden", zIndex: 20,
                    maxHeight: "320px", overflowY: "auto",
                  }}>
                    {searchResults.map((g) => (
                      <button key={g.id} onClick={() => handleSearchSelect(g)} style={{
                        display: "flex", alignItems: "center", gap: "12px",
                        width: "100%", padding: "10px 16px",
                        background: "transparent", border: "none", cursor: "pointer",
                        textAlign: "left", fontFamily: "inherit",
                        borderBottom: "1px solid #F8FAFC",
                        transition: "background 0.1s",
                      }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "#F8FAFC"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                      >
                        <div style={{ fontSize: "20px" }}>{g.emoji}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>{g.name}</div>
                          <div style={{ fontSize: "11px", color: "#94A3B8" }}>{g.genre}</div>
                        </div>
                        <div style={{ display: "flex", gap: "3px" }}>
                          {g.platforms.slice(0, 4).map((p) => (
                            <div key={p} style={{ width: "16px", height: "16px", borderRadius: "4px", background: PLATFORM_META[p].bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <PlatformIcon code={p} size={10} />
                            </div>
                          ))}
                        </div>
                        <div style={{ color: "#6366F1", fontSize: "18px" }}>+</div>
                      </button>
                    ))}
                  </div>
                )}

                {searchQuery && searchResults.length === 0 && (
                  <div style={{
                    position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0,
                    background: "white", border: "1px solid #E2E8F0", borderRadius: "12px",
                    padding: "16px", textAlign: "center", fontSize: "13px", color: "#94A3B8",
                    boxShadow: "0 10px 40px rgba(15,23,42,0.1)", zIndex: 20,
                  }}>
                    No matches for "{searchQuery}"
                  </div>
                )}
              </div>

              {/* Surfaced games from search */}
              {surfacedGames.length > 0 && (
                <div style={{ marginTop: "24px" }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#94A3B8", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "12px", textAlign: "center" }}>
                    added from search · plus similar games
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "10px" }}>
                    {surfacedGames.map((g) => (
                      <GameCard key={g.id} game={g} size="small"
                        selected={selectedGames.includes(g.id)}
                        hearted={heartedGames.includes(g.id)}
                        onClick={() => toggleGame(g.id)}
                        onHeart={() => toggleHeart(g.id)}
                        rating={gameRatings[g.id]}
                        onRate={(r) => toggleRating(g.id, r)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div style={{ marginTop: "32px", display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
              <button onClick={() => setView("naming")} style={{ ...primaryBtn, background: "linear-gradient(135deg, #6366F1 0%, #EC4899 100%)" }}>
                continue <span style={{ marginLeft: "8px" }}>→</span>
              </button>
              <button onClick={() => setView("landing")} style={secondaryBtn}>back</button>
              <div style={{ marginLeft: "auto", fontSize: "13px", color: "#64748B" }}>
                {selectedGames.length} played · {heartedGames.length} wishlisted
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==================== NAMING ====================
  if (view === "naming") {
    return (
      <div style={wrapStyle}>
        <Backdrop muted />
        <nav style={navStyle}>
          <div style={logoStyle} onClick={restart}>
            <span style={{ fontSize: "24px", cursor: "pointer" }}>🎮</span>
            <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "20px", fontWeight: 600, letterSpacing: "-0.5px", cursor: "pointer" }}>dex</span>
          </div>
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            {[0, 1, 2, 3].map((i) => (<div key={i} style={{ width: i === 2 ? "24px" : "8px", height: "8px", borderRadius: "999px", background: i <= 2 ? "#6366F1" : "#E2E8F0", transition: "all 0.3s" }} />))}
          </div>
        </nav>

        <div style={{ maxWidth: "620px", margin: "0 auto", padding: "60px 24px" }}>
          <div style={{ animation: "fadeIn 0.4s ease" }}>
            <div style={badgeStyle("#FDF2F8", "#EC4899")}>step 3 of 4</div>
            <h2 style={headlineStyle}>what should we call you?</h2>
            <p style={subStyle}>This name goes on your Dex. Be anonymous, legendary, or somewhere in between.</p>

            <div style={{ marginTop: "24px" }}>
              <label style={labelStyle}>
                <span>display name</span>
                <span style={{ color: "#EF4444", fontSize: "12px" }}>required</span>
              </label>
              <input type="text" placeholder="PixelDrifter, RingBearer42, your name..." value={name} onChange={(e) => setName(e.target.value)} maxLength={20} autoFocus style={inputStyle} />
            </div>

            <div style={{ marginTop: "20px" }}>
              <label style={labelStyle}>
                <span>email</span>
                <span style={{ color: "#94A3B8", fontSize: "12px" }}>optional</span>
              </label>
              <input type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
              {heartedGames.length > 0 ? (
                <div style={{
                  marginTop: "10px", padding: "10px 14px",
                  background: "#FDF2F8", border: "1px solid #FBCFE8", borderRadius: "10px",
                  fontSize: "12px", color: "#9D174D", lineHeight: "1.5",
                  display: "flex", gap: "8px", alignItems: "flex-start",
                }}>
                  <span style={{ fontSize: "14px", flexShrink: 0 }}>💌</span>
                  <span>Drop your email and we'll save your <strong>{heartedGames.length} wishlisted game{heartedGames.length > 1 ? "s" : ""}</strong> so you can come back to discover more and track what to play next.</span>
                </div>
              ) : (
                <div style={{ marginTop: "8px", fontSize: "12px", color: "#94A3B8", lineHeight: "1.5" }}>
                  Optional — save your Dex, revisit wishlisted games, and get recommendations based on your taste.
                </div>
              )}

              {/* Hide email on card toggle */}
              {email.trim() && (
                <label style={{
                  marginTop: "12px", display: "flex", alignItems: "center", gap: "10px",
                  cursor: "pointer", fontSize: "13px", color: "#64748B",
                }}>
                  <div
                    onClick={() => setHideEmail(!hideEmail)}
                    style={{
                      width: "36px", height: "20px", borderRadius: "10px",
                      background: hideEmail ? "#6366F1" : "#E2E8F0",
                      position: "relative", transition: "background 0.2s", flexShrink: 0,
                    }}
                  >
                    <div style={{
                      width: "16px", height: "16px", borderRadius: "50%",
                      background: "white", position: "absolute", top: "2px",
                      left: hideEmail ? "18px" : "2px", transition: "left 0.2s",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                    }} />
                  </div>
                  <span>Hide email on my public card</span>
                </label>
              )}
            </div>

            <div style={{ marginTop: "32px", display: "flex", gap: "12px" }}>
              <button onClick={() => setView("vibe")} disabled={!name.trim()} style={{ ...primaryBtn, opacity: name.trim() ? 1 : 0.4, cursor: name.trim() ? "pointer" : "not-allowed" }}>continue <span style={{ marginLeft: "8px" }}>→</span></button>
              <button onClick={() => setView("recommendations")} style={secondaryBtn}>back</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==================== VIBE ====================
  if (view === "vibe") {
    return (
      <div style={wrapStyle}>
        <Backdrop muted />
        <nav style={navStyle}>
          <div style={logoStyle} onClick={restart}>
            <span style={{ fontSize: "24px", cursor: "pointer" }}>🎮</span>
            <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "20px", fontWeight: 600, letterSpacing: "-0.5px", cursor: "pointer" }}>dex</span>
          </div>
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            {[0, 1, 2, 3].map((i) => (<div key={i} style={{ width: i === 3 ? "24px" : "8px", height: "8px", borderRadius: "999px", background: "#6366F1", transition: "all 0.3s" }} />))}
          </div>
        </nav>

        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "60px 24px" }}>
          <div style={{ animation: "fadeIn 0.4s ease" }}>
            <div style={badgeStyle("#ECFDF5", "#10B981")}>step 4 of 4</div>
            <h2 style={headlineStyle}>one last thing — your vibe?</h2>
            <p style={subStyle}>How do you usually approach a game?</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", marginTop: "32px" }}>
              {[
                { id: "chill", label: "chill sessions", emoji: "🍵", desc: "unwind, no pressure" },
                { id: "deep", label: "deep dives", emoji: "🌊", desc: "long focused sessions" },
                { id: "grind", label: "grind mode", emoji: "⚡", desc: "rank up, optimize" },
                { id: "social", label: "with friends", emoji: "🎊", desc: "games are a hangout" },
              ].map((v) => {
                const sel = vibe === v.id;
                return (
                  <button key={v.id} onClick={() => setVibe(v.id)} style={{
                    padding: "20px", borderRadius: "14px",
                    border: sel ? "2px solid #10B981" : "2px solid #E2E8F0",
                    background: sel ? "#ECFDF5" : "white", cursor: "pointer", textAlign: "left", fontFamily: "inherit",
                    transition: "all 0.15s",
                    transform: sel ? "translateY(-2px)" : "none",
                    boxShadow: sel ? "0 8px 20px rgba(16,185,129,0.15)" : "0 1px 3px rgba(0,0,0,0.04)",
                  }}>
                    <div style={{ fontSize: "28px", marginBottom: "8px" }}>{v.emoji}</div>
                    <div style={{ fontWeight: 600, fontSize: "15px", color: "#0F172A", marginBottom: "2px" }}>{v.label}</div>
                    <div style={{ fontSize: "12px", color: "#64748B" }}>{v.desc}</div>
                  </button>
                );
              })}
            </div>

            <div style={{ marginTop: "32px", display: "flex", gap: "12px" }}>
              <button onClick={generateCard} disabled={!vibe} style={{ ...primaryBtn, background: vibe ? "linear-gradient(135deg, #6366F1 0%, #EC4899 100%)" : "#CBD5E1", opacity: vibe ? 1 : 0.6, cursor: vibe ? "pointer" : "not-allowed" }}>pull my Dex ✨</button>
              <button onClick={() => setView("naming")} style={secondaryBtn}>back</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==================== CARD / SHARED ====================
  if (view === "card" || view === "shared") {
    const card = currentCard;
    const archetype = ARCHETYPES.find((a) => a.id === card.archetype);
    const games = card.games.map((id) => ALL_GAMES.find((g) => g.id === id)).filter(Boolean);
    const heartedCount = card.hearted?.length || 0;
    const cardRatings = card.ratings || {};
    const lovedGames = Object.entries(cardRatings).filter(([_, v]) => v === "love").map(([id]) => ALL_GAMES.find((g) => g.id === id)).filter(Boolean);
    const likedGames = Object.entries(cardRatings).filter(([_, v]) => v === "like").map(([id]) => ALL_GAMES.find((g) => g.id === id)).filter(Boolean);
    const dislikedGames = Object.entries(cardRatings).filter(([_, v]) => v === "dislike").map(([id]) => ALL_GAMES.find((g) => g.id === id)).filter(Boolean);
    const hasRatings = lovedGames.length > 0 || likedGames.length > 0 || dislikedGames.length > 0;

    return (
      <div style={wrapStyle}>
        <Backdrop muted />
        <nav style={navStyle}>
          <div style={logoStyle} onClick={restart}>
            <span style={{ fontSize: "24px", cursor: "pointer" }}>🎮</span>
            <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "20px", fontWeight: 600, letterSpacing: "-0.5px", cursor: "pointer" }}>dex</span>
          </div>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {fromDashboard && (
              <button onClick={() => { setFromDashboard(false); setView("dashboard"); }} style={{ ...secondaryBtn, padding: "8px 16px", fontSize: "13px" }}>← Collection</button>
            )}
            <button onClick={restart} style={{ ...secondaryBtn, padding: "8px 16px", fontSize: "13px" }}>{view === "shared" ? "Pull your own →" : "New Dex"}</button>
          </div>
        </nav>

        <div style={{ maxWidth: "520px", margin: "0 auto", padding: "40px 24px" }}>
          {view === "card" && <div style={{ textAlign: "center", marginBottom: "28px", animation: "fadeIn 0.5s ease" }}><div style={badgeStyle("#FFF1E6", "#D97706")}>✨ your Dex is ready</div></div>}
          {view === "shared" && <div style={{ textAlign: "center", marginBottom: "28px", animation: "fadeIn 0.5s ease" }}><div style={badgeStyle("#EEF2FF", "#6366F1")}>🔗 shared Dex card</div></div>}

          <div style={{ position: "relative", borderRadius: "24px", overflow: "hidden",
            background: `linear-gradient(135deg, ${archetype.color} 0%, ${archetype.accent} 100%)`,
            boxShadow: `0 30px 60px -15px ${archetype.color}50, 0 0 0 1px rgba(255,255,255,0.4) inset`,
            padding: "2px", animation: "cardSlide 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}>
            <div style={{ background: "white", borderRadius: "22px", padding: "32px 28px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: "-10px", right: "-10px", fontSize: "80px", opacity: 0.1 }}>{archetype.emoji}</div>
              <div style={{ position: "absolute", bottom: "-20px", left: "-20px", fontSize: "120px", opacity: 0.05 }}>{archetype.emoji}</div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px", position: "relative" }}>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#94A3B8", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "4px" }}>dex / card</div>
                  <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "26px", fontWeight: 600, color: "#0F172A", letterSpacing: "-0.5px" }}>{card.name}</div>
                </div>
                <div style={{ fontSize: "36px" }}>{archetype.emoji}</div>
              </div>

              <div style={{ background: `${archetype.color}0a`, border: `1px solid ${archetype.color}20`, borderRadius: "16px", padding: "20px", marginBottom: "20px" }}>
                <div style={{ fontSize: "10px", fontWeight: 700, color: archetype.color, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "6px" }}>archetype</div>
                <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "28px", fontWeight: 500, color: archetype.color, letterSpacing: "-0.5px", marginBottom: "8px", fontStyle: "italic" }}>{archetype.name}</div>
                <div style={{ fontSize: "14px", color: "#475569", lineHeight: "1.5" }}>{archetype.desc}</div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <div style={{ fontSize: "10px", fontWeight: 700, color: "#94A3B8", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "10px" }}>playstyle</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {card.traits.map((t) => (<span key={t} style={{ padding: "6px 12px", background: "#F1F5F9", borderRadius: "999px", fontSize: "12px", fontWeight: 600, color: "#475569" }}>{t}</span>))}
                  <span style={{ padding: "6px 12px", background: `${archetype.color}15`, color: archetype.color, borderRadius: "999px", fontSize: "12px", fontWeight: 600 }}>{card.vibe} vibe</span>
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <div style={{ fontSize: "10px", fontWeight: 700, color: "#94A3B8", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "10px" }}>top genres</div>
                <div style={{ display: "flex", gap: "8px" }}>
                  {card.topGenres.map((g, i) => (
                    <div key={g} style={{ flex: 1, padding: "10px", background: "#FAFAFA", borderRadius: "10px", textAlign: "center", border: "1px solid #F1F5F9" }}>
                      <div style={{ fontSize: "18px", fontWeight: 700, color: archetype.color, fontFamily: "'Fraunces', Georgia, serif" }}>#{i + 1}</div>
                      <div style={{ fontSize: "11px", fontWeight: 600, color: "#475569", marginTop: "2px" }}>{g}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: heartedCount > 0 || hasRatings ? "16px" : "0" }}>
                <div style={{ fontSize: "10px", fontWeight: 700, color: "#94A3B8", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "10px" }}>in rotation ({games.length})</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {games.map((g) => {
                    const r = cardRatings[g.id];
                    const rIcon = r === "love" ? " 🤯" : r === "like" ? " 👍" : r === "dislike" ? " 👎" : "";
                    return (
                      <div key={g.id} style={{ padding: "6px 10px 6px 8px", background: `${g.color}10`, border: `1px solid ${g.color}25`, borderRadius: "8px", display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 500, color: "#334155" }}>
                        <span>{g.emoji}</span>{g.name}{rIcon && <span style={{ fontSize: "10px" }}>{rIcon}</span>}
                      </div>
                    );
                  })}
                </div>
                {hasRatings && (
                  <div style={{ marginTop: "10px", fontSize: "11px", color: "#64748B", display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    {lovedGames.length > 0 && <span>🤯 {lovedGames.length} mind blown</span>}
                    {likedGames.length > 0 && <span>👍 {likedGames.length} liked</span>}
                    {dislikedGames.length > 0 && <span>👎 {dislikedGames.length} not for me</span>}
                  </div>
                )}
              </div>

              {heartedCount > 0 && (
                <div>
                  <div style={{ fontSize: "10px", fontWeight: 700, color: "#EC4899", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="#EC4899"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                    wishlist ({heartedCount})
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {card.hearted.map((id) => {
                      const g = ALL_GAMES.find((x) => x.id === id);
                      if (!g) return null;
                      return (
                        <div key={g.id} style={{ padding: "6px 10px 6px 8px", background: "#FDF2F8", border: "1px solid #FBCFE8", borderRadius: "8px", display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 500, color: "#9D174D" }}>
                          <span>{g.emoji}</span>{g.name}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px dashed #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: "11px", color: "#94A3B8", fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic" }}>dex</div>
                <div style={{ fontSize: "10px", color: "#CBD5E1", fontFamily: "ui-monospace, SFMono-Regular, monospace" }}>#{card.id}</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "24px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button onClick={copyShareLink} style={{ ...primaryBtn, flex: 1, justifyContent: "center" }}>{copied ? "✓ copied!" : "🔗 share card"}</button>
            {view === "shared" ? <button onClick={restart} style={{ ...secondaryBtn, flex: 1 }}>create mine</button> : <button onClick={restart} style={secondaryBtn}>start over</button>}
          </div>

          {view === "card" && (
            <div style={{ marginTop: "32px", padding: "20px", background: "white", border: "1px solid #E2E8F0", borderRadius: "16px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#6366F1", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "10px" }}>what's next</div>
              <div style={{ fontSize: "14px", color: "#334155", lineHeight: "1.6", marginBottom: "14px" }}>Your Dex is live. Share it with friends, compare archetypes, and check back for new game recommendations tailored to your {archetype.name.toLowerCase()} profile{card.email && !card.hideEmail ? ` — we'll ping you at ${card.email}` : ""}.</div>
              <button style={{ fontSize: "13px", fontWeight: 600, color: "#6366F1", background: "transparent", border: "none", cursor: "pointer", padding: 0 }}>explore game recommendations →</button>
            </div>
          )}
        </div>
        <div style={{ height: "60px" }} />
      </div>
    );
  }

  // ==================== LANDING ====================
  return (
    <div style={wrapStyle}>
      <Backdrop />
      <nav style={navStyle}>
        <div style={logoStyle}>
          <span style={{ fontSize: "28px" }}>🎮</span>
          <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "22px", fontWeight: 600, letterSpacing: "-0.5px" }}>dex</span>
        </div>
        <div style={{ display: "flex", gap: "24px", alignItems: "center", fontSize: "14px", color: "#64748B" }}>
          <a style={linkStyle}>for creators</a>
          <a style={linkStyle}>for gamers</a>
          <a style={linkStyle}>how it works</a>
          <button onClick={() => { setView("returning"); window.history.pushState({}, "", "?returning=true"); }}
            style={{ fontSize: "13px", fontWeight: 600, color: "#6366F1", background: "transparent", border: "1px solid #C7D2FE", borderRadius: "999px", padding: "6px 14px", cursor: "pointer", fontFamily: "inherit" }}>
            already have a Dex?
          </button>
        </div>
      </nav>

      <section style={{ maxWidth: "760px", margin: "0 auto", padding: "60px 40px 80px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#FFF1E6", padding: "6px 14px", borderRadius: "999px", fontSize: "12px", fontWeight: 600, color: "#D97706", marginBottom: "24px", border: "1px solid #FED7AA" }}>
          <span style={{ width: "6px", height: "6px", background: "#F59E0B", borderRadius: "50%", display: "inline-block" }}></span>
          early access · beta
        </div>
        <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "68px", lineHeight: "1.05", letterSpacing: "-2px", fontWeight: 500, color: "#0F172A", margin: "0 0 24px" }}>
          your entire <span style={{ background: "linear-gradient(135deg, #6366F1 0%, #EC4899 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontStyle: "italic" }}>game taste</span> in one card.
        </h1>
        <p style={{ fontSize: "18px", lineHeight: "1.55", color: "#475569", margin: "0 auto 32px", maxWidth: "540px" }}>
          Pick your games. Get your archetype. Share your Dex card — and discover what to play next.
        </p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
          <button onClick={scrollToGames} style={primaryBtn}>Pull my Dex <span style={{ marginLeft: "8px" }}>↓</span></button>
          <button style={secondaryBtn}>I'm a studio</button>
        </div>
        <div style={{ marginTop: "36px", display: "flex", gap: "16px", alignItems: "center", color: "#94A3B8", fontSize: "13px", justifyContent: "center" }}>
          <div style={{ display: "flex" }}>
            {["🎯", "🎨", "⚔️", "🧩"].map((e, i) => (
              <div key={i} style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: i > 0 ? "-8px" : "0", border: "2px solid white", fontSize: "14px" }}>{e}</div>
            ))}
          </div>
          <span>2,400+ players have pulled their Dex</span>
        </div>
      </section>

      <section ref={gamesSectionRef} style={{ background: "white", borderTop: "1px solid #F1F5F9", borderBottom: "1px solid #F1F5F9" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "100px 40px" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#EC4899", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "12px" }}>start here · it's free</div>
            <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "48px", fontWeight: 500, letterSpacing: "-1.5px", color: "#0F172A", margin: "0 0 16px", lineHeight: "1.1" }}>pick the games you've been playing.</h2>
            <p style={{ fontSize: "17px", color: "#64748B", maxWidth: "520px", margin: "0 auto", lineHeight: "1.55" }}>
              Tap at least 3. We'll suggest more based on your picks.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "12px", maxWidth: "920px", margin: "0 auto" }}>
            {GAMES.map((g) => (
              <GameCard key={g.id} game={g}
                selected={selectedGames.includes(g.id)}
                hearted={false}
                onClick={() => toggleGame(g.id)}
                rating={gameRatings[g.id]}
                onRate={(r) => toggleRating(g.id, r)}
              />
            ))}
          </div>

          <div style={{ position: "sticky", bottom: "20px", display: "flex", justifyContent: "center", marginTop: "40px" }}>
            <div style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: "999px", padding: "8px 8px 8px 20px", display: "flex", alignItems: "center", gap: "16px", boxShadow: "0 20px 40px -8px rgba(15,23,42,0.15)" }}>
              <div style={{ fontSize: "14px", color: "#64748B" }}>
                <strong style={{ color: "#0F172A" }}>{selectedGames.length}</strong> selected
                {selectedGames.length < 3 && <span style={{ color: "#EC4899", marginLeft: "6px" }}>· pick {3 - selectedGames.length} more</span>}
              </div>
              <button onClick={goToRecommendations} disabled={selectedGames.length < 3}
                style={{
                  padding: "10px 20px",
                  background: selectedGames.length >= 3 ? "linear-gradient(135deg, #6366F1 0%, #EC4899 100%)" : "#E2E8F0",
                  color: selectedGames.length >= 3 ? "white" : "#94A3B8",
                  border: "none", borderRadius: "999px",
                  fontSize: "14px", fontWeight: 600,
                  cursor: selectedGames.length >= 3 ? "pointer" : "not-allowed",
                  fontFamily: "inherit", transition: "all 0.15s",
                }}>
                {selectedGames.length >= 3 ? "continue →" : "continue"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "100px 40px" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "#6366F1", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "12px" }}>three steps</div>
          <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "44px", fontWeight: 500, letterSpacing: "-1px", color: "#0F172A", margin: "0 0 16px" }}>how it works.</h2>
          <p style={{ fontSize: "16px", color: "#64748B", maxWidth: "520px", margin: "0 auto", lineHeight: "1.55" }}>
            Your game taste, decoded and shareable in under a minute.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          <Step num="01" title="pick your games" desc="Tell us what you've been playing. We already know a good bit about you from that." color="#6366F1" bg="#EEF2FF" />
          <Step num="02" title="get your dex" desc="We decode your archetype, playstyle traits, and top genres into a shareable card." color="#EC4899" bg="#FDF2F8" />
          <Step num="03" title="discover more" desc="Get personalized recommendations based on your taste. Track what you want to play next." color="#10B981" bg="#ECFDF5" />
        </div>
      </section>

      <footer style={{ borderTop: "1px solid #F1F5F9", padding: "32px 40px", maxWidth: "1100px", margin: "40px auto 0", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px", color: "#94A3B8" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "18px" }}>🎮</span>
          <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 600 }}>dex</span>
        </div>
        <div>made for players, by players</div>
      </footer>
    </div>
  );
}

function Backdrop({ muted }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600;700&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes cardSlide { from { opacity: 0; transform: translateY(30px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
        body { margin: 0; font-family: 'Inter', system-ui, sans-serif; }
        * { box-sizing: border-box; }
        ::selection { background: #C7D2FE; color: #1E1B4B; }
        html { scroll-behavior: smooth; }
      `}</style>
      <div style={{ position: "fixed", inset: 0, zIndex: -1, background: "#FAFAF7" }}>
        <div style={{ position: "absolute", inset: 0, opacity: muted ? 0.3 : 0.5, backgroundImage: "radial-gradient(circle at 15% 20%, #FFE4CC 0%, transparent 40%), radial-gradient(circle at 85% 70%, #E0D4FF 0%, transparent 40%), radial-gradient(circle at 50% 90%, #D4F4E0 0%, transparent 40%)" }} />
      </div>
    </>
  );
}

function Step({ num, title, desc, color, bg }) {
  return (
    <div style={{ background: "white", border: "1px solid #F1F5F9", borderRadius: "20px", padding: "28px", position: "relative", overflow: "hidden" }}>
      <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: bg, color, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Fraunces', Georgia, serif", fontSize: "18px", fontWeight: 600, marginBottom: "18px" }}>{num}</div>
      <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "22px", fontWeight: 500, color: "#0F172A", marginBottom: "8px", letterSpacing: "-0.3px" }}>{title}</div>
      <div style={{ fontSize: "14px", color: "#64748B", lineHeight: "1.5" }}>{desc}</div>
    </div>
  );
}

const wrapStyle = { minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", color: "#0F172A", position: "relative" };
const navStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 40px", maxWidth: "1200px", margin: "0 auto" };
const logoStyle = { display: "flex", alignItems: "center", gap: "10px" };
const linkStyle = { cursor: "pointer", transition: "color 0.15s" };
const primaryBtn = { display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "14px 24px", background: "linear-gradient(135deg, #0F172A 0%, #334155 100%)", color: "white", border: "none", borderRadius: "12px", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 14px rgba(15,23,42,0.25)", transition: "transform 0.1s" };
const secondaryBtn = { padding: "14px 24px", background: "white", color: "#0F172A", border: "1px solid #E2E8F0", borderRadius: "12px", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" };
const inputStyle = { width: "100%", padding: "14px 18px", fontSize: "16px", border: "2px solid #E2E8F0", borderRadius: "12px", fontFamily: "'Inter', system-ui, sans-serif", marginTop: "8px", outline: "none", background: "white", transition: "border 0.15s" };
const labelStyle = { display: "flex", justifyContent: "space-between", alignItems: "baseline", fontSize: "13px", fontWeight: 600, color: "#334155", letterSpacing: "0.2px" };
const headlineStyle = { fontFamily: "'Fraunces', Georgia, serif", fontSize: "44px", fontWeight: 500, letterSpacing: "-1.5px", color: "#0F172A", margin: "12px 0 8px", lineHeight: "1.1" };
const subStyle = { fontSize: "16px", color: "#64748B", margin: 0, lineHeight: "1.5" };
const badgeStyle = (bg, color) => ({ display: "inline-block", padding: "6px 14px", background: bg, color, borderRadius: "999px", fontSize: "12px", fontWeight: 600, letterSpacing: "0.3px" });
