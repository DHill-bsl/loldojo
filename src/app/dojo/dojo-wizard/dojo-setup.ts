﻿export interface DojoSetup {
  opponent1: string;
  opponent2: string;
  lane: 'Top' | 'Mid' | 'Bot';
  championFormat: 'Assassin' | 'Fighter' | 'Mage' | 'Marksman' | 'Support' | 'Tank' | 'Random1' | 'Random3' | 'All';
}
