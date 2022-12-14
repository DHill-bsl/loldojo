import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class LolPatchService {
  constructor(private http: HttpClient) { }

  public getAll(): Observable<string[]> {
    return this.http.get<string[]>('https://ddragon.leagueoflegends.com/api/versions.json');
  }
}
