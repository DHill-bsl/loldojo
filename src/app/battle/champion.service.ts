import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
  image: any;
}

@Injectable()
export class ChampionService {
  constructor(private http: HttpClient) {

  }

  public getAll(patchNumber: string): Observable<ChampionMeta> {
    return this.http.get<ChampionMeta>(`https://ddragon.leagueoflegends.com/cdn/${patchNumber}/data/en_US/champion.json`);
  }

  public getPatches(): Observable<string[]> {
    return this.http.get<string[]>('https://ddragon.leagueoflegends.com/api/versions.json');
  }
}
