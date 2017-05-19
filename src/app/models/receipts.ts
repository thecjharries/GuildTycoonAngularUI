import { Item } from './guild';

export class FightEvent{
    target: number;
    unitId: string;
    mobCardId: string;
    damage: number;
    equipment: Item;
    message: string;
    remainingHP: number;
    using: string; 
}

export class FightReceipt{
    success: boolean;
    gold: number;
    loot: string[] = [];
    fightLog: FightEvent[][] = [];
}
