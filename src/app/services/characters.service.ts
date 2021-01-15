import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CHARACTER } from '../constants/interfaces/character';
import { PAGE } from '../constants/interfaces/page-data';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  url = environment.urlAPI;

  constructor(private httpClient : HttpClient) { }

  getCharactersCustomizedPage(idList:number[]){
    return this.httpClient.get<[CHARACTER]>(`${this.url}/character/${idList}`);
  }

  getCharacter(id:string){
    return this.httpClient.get<CHARACTER>(`${this.url}/character/${id}`);
  }
}
