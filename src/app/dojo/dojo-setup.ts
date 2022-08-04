export interface DojoSetup {
  opponent1: string;
  opponent2: string;
  opponent3?: string;
  opponent4?: string;
  randomTeams: boolean;
  lane: 'Top' | 'Mid' | 'Bot';
  championFormat: 'Assassin' | 'Fighter' | 'Mage' | 'Marksman' | 'Support' | 'Tank' | 'All';
  killsToWin: number;
}
