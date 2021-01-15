import { Component } from '@angular/core';
import { CHARACTER } from 'src/app/constants/interfaces/character';
import { PAGE } from 'src/app/constants/interfaces/page-data';
import { CharactersService } from 'src/app/services/characters.service';
import { EpisodesService } from 'src/app/services/episodes.service';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.css']
})
export class CharactersListComponent {

  pageData !: PAGE;
  characters !: [CHARACTER];
  page : number[] = [1,2,3,4,5,6,7,8,9,10,11,12];
  previousIcon : boolean = false;
  nextIcon : boolean = true;
  pageNumber: number = 1;

  constructor(private charactersService: CharactersService,
              private episodeService : EpisodesService) { 

    this.definePage();

  }

  definePage():void{
    if(sessionStorage.length===0){
      this.getCharacters(this.page);
    }
    else{
      const localPage = sessionStorage.getItem('previousPage')?.split(",");
      this.page = this.toInt(localPage);
      this.pageNumber = ((this.page[10]+1)/12);
      this.previousIcon = true;
      this.getCharacters(this.page);
    }
  }

   getCharacters(page:number[]):void{
    this.charactersService.getCharactersCustomizedPage(page)
      .subscribe(Page => {
        this.characters = Page;

        for(let i=0; i<this.characters.length ; i++){
            this.episodeService.readEpisode(this.characters[i].episode[0])
          .subscribe(episode => {
            this.characters[i].episode[0]=episode.name;

          });
        }
    });
  }

  toInt(ids:any):number[]{
    let intArray : number [] = [1];
    for(let i = 0; i<ids.length ; i++){
      intArray[i] = Number(ids[i]);
    }
    return intArray;
  }

  next():void{
    for(let i =0; i<12; i++){
      this.page[i] = this.page[i]+12;

      if(this.page[i]===671){
        break;
      }
    }
        
    this.getCharacters(this.page);
    this.characterDetail();
    this.previousIcon = true;
    this.pageNumber = (this.page[10]+1)/12;
      
    if(this.page[10]===671)
    {
      this.nextIcon = false;
      this.page[11]=672;
    }
  }

  previous():void{
    for(let i =0; i<12; i++){
      this.page[i] = this.page[i]-12;
    }
    
    this.getCharacters(this.page);
    this.characterDetail();
    this.nextIcon = true;
    this.pageNumber = (this.page[10]+1)/12;

    if(this.page[0]===1)
    {
      this.previousIcon = false;
    }
  }

  status(status:string):string{
    let color : string;
    switch(status){
      case 'Alive':{
        color = 'green';
        break;
      }
      case 'Dead':{
        color = 'red';
        break;
      }
      default: {
        color = 'grey';
        break;
      }
    }
    return color;
  }

  characterDetail():void{
    sessionStorage.setItem('previousPage', `${this.page}`);
  }
}



