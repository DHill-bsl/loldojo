import { Champion } from './champion.service';

export interface BattleConfig {
  playerCount: number;
  host: string;
  lane: string;
  championFormat: string;
  killsToWin: number;
  championsPerPlayer: 3,
  slot1?: Slot;
  slot2?: Slot;
  slot3?: Slot;
  slot4?: Slot;
  playerData: PlayerData[];
}

export interface PlayerData {
  name: string;
  champions: Champion[];
  selectedChampion: string;
}

export interface Slot {
  playerName?: string;
}
