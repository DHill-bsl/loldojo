export interface ChampionMeta {
  data: { [index: string]: Champion };
  format: string;
  type: string;
  version: string;
}

export interface Champion {
  blurb: string;
  id: string;
  key: string;
  name: string;
  title: string;
  tags: string[];
}
