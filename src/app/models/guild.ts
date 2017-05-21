export enum TargetEnumConst{
    Ally,
    Enemy,
    Both
}

export class Character{
    constructor(){
        this.editMode = false;
    }
    unitId: string;
    baseCharacterId: string;
    level: number;
    stats: StatSheet;
    equipmentSheet: string[];
    name: string;
    teamId: number;
    teamSlotNumber: number;
    regimen: Regimen;
    skills: string[];
    editMode: boolean;
}

export class CharacterCard{
    cardId: string;
    strength: number;
    agility: number;
    dexterity: number;
    intelligence: number;
    vitality: number;
    focus: number;
    name: string;
}

export class Consumable{
}

export class Dungeon{
    dungeonId: number;
    zoneId: string;
    name: string;
    difficultyRating: number;
    waves: string[][] = [];
    loot: string[] = [];
    dungeomMobCardIds: string[]; 
    editMode: boolean = false;          
}

export class Guild{
    guildId: string;
    name: string;
    teams: Team[] = [];
    characters: Character[] = [];
    guildInventory: GuildInventory;
    isActive = false;
}

export class GuildHistory{
    guildHistoryId: string;
    guildId: string;
    createdOn: Date;
    receipt: string;
    receiptType: string;
}

export class GuildInventory{
    equippableItems: Item[];
    nonEquippableItems: Item;
    characterCards: CharacterCard[];
    currency: number;
    size: number;
}

export class Item{
    name: string;
    bonusSkills: string[];
    bonusStats: StatTypes;
    itemId: string;
    itemTypeId: string;
}

export class RawStats{
    strength: number;
    agility: number;
    dexterity: number;
    intelligence: number;
    vitality: number;
    focus: number;
}

export class Regimen
{
    regimenStack: RegimenAction[] = [];
}

export class RegimenAction
{
    constructor(){
        this.targetProperty = "",
        this.targetOperator = ""
    }
    target: string;
    targetProperty: string;
    targetOperator: string;
    targetValue: string;
    isActive: boolean;
    usingSelection: string;
}

export class RegimenActionBlock
{
    RegimenactionBlockId: number;
    Name: string;
    Type: string;
}

export class Skill{

}

export class StatSheet{
    base: StatTypes;
}

export class StatTypes{
    base: RawStats;
    effective: RawStats;
    current: RawStats;
}


export class Team{
    constructor(teamId?: number){
        if(teamId != null){
            this.teamId = teamId;
        }
    }
    currentZone: string;
    dungeonId: number;
    teamId: number;
    name: string;
    units = new Map<number, string>();
    primaryActionFinish: Date;
    actionType: number;
    timeRemaining: number;
}

export class UpdateCharacterMessage
{
    GuildId: string;
    UnitId: string;
    Name: string;
    Regimen: Regimen;
}

export class Zone{
    zoneId: string;
    name: string;
    regionId: string;
    parentZoneId: string;
    dungeonIds: number[] = [];
    mobCardIds: string[] = [];
    coordX: number;
    coordY: number;
    editMode: boolean = false;
}

