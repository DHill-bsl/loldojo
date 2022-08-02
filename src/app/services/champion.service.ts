import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ChampionMeta } from "../models/lol/champion";

@Injectable()
export class ChampionService {
  constructor(private http: HttpClient) { }

  public getAll(patchNumber: string): Observable<ChampionMeta> {
    return this.http.get<ChampionMeta>(`http://ddragon.leagueoflegends.com/cdn/${patchNumber}/data/en_US/champion.json`);
  }
}
