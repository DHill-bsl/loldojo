interface Player {
  name: string;
  champion: string;
}

export interface BattleSummary {
  team1: Player[];
  team2: Player[];
  timeElapsed: number;
  winners: Player[];
  winnerKills: number;
  loserKills: number;
  lane: string;
  championFormat: string;
}
