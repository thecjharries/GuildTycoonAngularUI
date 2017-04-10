export class Guild{
    constructor(){
        this.teams = [];
        this.characters = [];
    }
    guildId: string;
    teams: Team[];
    characters: Character[];
    guildInventory: GuildInventory;
}

export class Character{
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
}

export class StatSheet{
    base: StatTypes;
}

export class StatTypes{
    base: RawStats;
    effective: RawStats;
    current: RawStats;
}

export class RawStats{
    strength: number;
    agility: number;
    dexterity: number;
    intelligence: number;
    vitality: number;
    focus: number;
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

export class Team{
    constructor(teamId: number){
        this.teamId = teamId;
        this.units = [];
    }
    currentZone: string;
    teamId: number;
    name: string;
    units: string[];
    primaryActionFinish: Date;
    actionType: number;
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

export class Regimen
{
    constructor(){
        this.RegimenStack = [];
    }
    RegimenStack: RegimenAction[];
}
export enum TargetEnumConst{
    Ally,
    Enemy,
    Both
}
export class RegimenAction
{

    TargetEnum: TargetEnumConst;
    TargetProperty: String;
    TargetOperator: string;
    TargetValue: string;
    isActive: boolean;
    UsingSelection: Using;
}

export enum Using
{
    NormalAttack,
    Consumable,
    Skill
}

export class RegimenActionBlock
{
    RegimenactionBlockId: number;
    Name: string;
    Type: string;
}

export class Consumable{

}

export class Skill{

}