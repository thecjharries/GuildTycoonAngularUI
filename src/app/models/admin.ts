import { StatSheet, Regimen, TargetEnumConst, RegimenAction, RegimenActionBlock } from './guild'
import { Type } from "serializer.ts/Decorators";

export class CharacterCard{
    
    cardId: string;
    strength: number;
    agility: number;
    dexterity: number;
    intelligence: number;
    vitality: number;
    focus: number;
    name: string;
    editMode: boolean;
}

export class MobCard{
    constructor(){
        this.regimen = new Regimen();
        this.statSheet = new StatSheet();
    }
    mobCardId: string;
    strength: number;
    agility: number;
    dexterity: number;
    intelligence: number;
    vitality: number;
    focus: number;
    name: string;
    dropListId: string;
    level: number;
    majorMobType: number;
    subMobType: number;
    regimen: Regimen;
    statSheet: StatSheet;
    instanceId: string;
    editMode: boolean;
}

export class UpdateMobCardMessage
{
    mobCard: MobCard;
    regimen: Regimen;
}

export class MobTypes{
    GeneralType: GeneralType;
    Reptiles: Reptiles;
    Mammals: Mammals;
    Birds: Birds;
    Insects: Insects;
    Spiders: Spiders;
    Aquatics: Aquatics;
    Beasts: Beasts;
}

enum GeneralType{
    Reptile = 1000,
    Mammal = 2000,
    Bird = 3000,
    Insect = 4000,
    Spider = 5000,
    Aquatic = 6000,
    Beast = 7000
}

enum Reptiles{
    Lizard = 1001,
    Snake = 1002,
    Crocodile = 1003,
    Turtle = 1004,
    Tortoise = 1005
}

enum Mammals{
    Bat = 2001,
    Bear = 2002,
    Cat = 2003,
    Fox = 2004,
    Lagomorph = 2005,
    Marsupial = 2006,
    Primate = 2007,
    Rodent = 2008,
    Ungulate = 2009,
    Weasel = 2010
}

enum Birds{
    Owl = 3001,
    Parrot = 3002,
    Hawk = 3003,
    Flightless = 3004
}

enum Insects{
    Ant = 4001,
    Mantis = 4002,
    Dragonfly = 4003,
    Locust = 4004,
    Beetle = 4005,
}

enum Spiders
{
    Tarantula = 5001,
    Huntsman = 5002,
    Recluse = 5003,
    Widow = 5004
}

enum Aquatics{
    Crab = 6001,
    Shark = 6002,
    Whale = 6003,
    Mermaid = 6004,
    GiantSquid = 6005,
}

enum Beasts{
    Dragon = 7001,
    Ogre = 7002,
    Troll = 7003,
    Goblin = 7004,
    Centuar = 7005,
    Merpeople = 7006,
    Sirens = 7007,
    Slyph = 7008,
    Undead = 7009
    
}
