import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EPISODE } from '../constants/interfaces/episode';

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {

  constructor(private httpClient: HttpClient) { }

  readEpisode(url:string){
    return this.httpClient.get<EPISODE>(url);
  }
}
