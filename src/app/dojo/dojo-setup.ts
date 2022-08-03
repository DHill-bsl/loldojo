export interface DojoSetup {
  opponent1: string;
  opponent2: string;
  opponent3?: string;
  opponent4?: string;
  lane: 'Top' | 'Mid' | 'Bot';
  championFormat: 'Assassin' | 'Fighter' | 'Mage' | 'Marksman' | 'Support' | 'Tank' | 'All';
}
