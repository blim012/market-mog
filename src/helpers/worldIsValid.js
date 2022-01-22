export default function worldIsValid(world) {
  const worlds = {
    // Aether
    adamantoise: true,
    cactuar: true,
    faerie: true,
    gilgamesh: true,
    jenova: true,
    midgardsormr: true,
    sargatanas: true,
    siren: true,

    // Crystal
    balmung: true,
    brynhildr: true,
    coeurl: true,
    diabolos: true,
    goblin: true,
    malboro: true,
    mateus: true,
    zalera: true,

    // Primal
    behemoth: true,
    excalibur: true,
    exodus: true,
    famfrit: true,
    hyperion: true,
    lamia: true,
    leviathan: true,
    ultros: true,

    // Chaos
    cerberus: true,
    louisoix: true,
    moogle: true,
    omega: true,
    ragnarok: true,
    spriggan: true,

    // Light
    lich: true,
    odin: true,
    phoenix: true,
    shiva: true,
    twintania: true,
    zodiark: true,

    // Elemental
    aegis: true,
    atomos: true,
    carbuncle: true,
    garuda: true,
    gungnir: true,
    kujata: true,
    ramuh: true,
    tonberry: true,
    typhon: true,
    unicorn: true,

    // Gaia
    alexander: true,
    bahamut: true,
    durandal: true,
    fenrir: true,
    ifrit: true,
    ridill: true,
    tiamat: true,
    ultima: true,
    valefor: true,
    yojimbo: true,
    zeromus: true,

    // Mana
    anima: true,
    asura: true,
    belias: true,
    chocobo: true,
    hades: true,
    ixion: true,
    mandragora: true,
    masamune: true,
    pandaemonium: true,
    shinryu: true,
    titan: true
  };

  return worlds[world];
};