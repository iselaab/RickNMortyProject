import { Component } from '@angular/core';
import { CHARACTER } from 'src/app/constants/interfaces/character';
import { NEWCHARACTER } from 'src/app/constants/interfaces/newcharacter';
import { PAGE } from 'src/app/constants/interfaces/page-data';
import { CharactersService } from 'src/app/services/characters.service';
import { EpisodesService } from 'src/app/services/episodes.service';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.css']
})
export class CharactersListComponent {
  charactersDataLoaded!: Promise <boolean>;
  pageData !: PAGE;
  characters !: [NEWCHARACTER];
  previousIcon : boolean = false;
  nextIcon : boolean = true;
  pageNumber: number = 1;
  totalPages !: number;

  constructor(private charactersService: CharactersService,
              private episodeService : EpisodesService) { 

    this.definePage();

  }

  definePage():void{
    if(sessionStorage.length===0){
      this.getCharacters(this.pageNumber);
    }
    else{
      const localPage = sessionStorage.getItem('previousPage');
      this.pageNumber = Number(localPage);
      if(this.pageNumber !== 1){
        this.previousIcon = true;
      }
      
      this.getCharacters(this.pageNumber);
    }
  }
  
   getCharacters(pageNumber:number):void{
    this.charactersService.getCharactersPage(pageNumber)
      .subscribe(Page => {
        this.pageData = Page;
        this.totalPages = this.pageData.info.totalPages;
        this.characters = this.pageData.results;
        for(let i=0; i<this.characters.length ; i++){
            this.episodeService.readEpisode(this.characters[i].episode[0])
          .subscribe(episode => {
            this.characters[i].episode[0]=episode.name;
            this.charactersDataLoaded = Promise.resolve(true);

          });
        }
    });
  }

  next():void{
    this.pageNumber = this.pageNumber +1;
    console.log(this.pageNumber);
    this.getCharacters(this.pageNumber);
    this.characterDetail();
    this.previousIcon = true;
      
    if(this.pageNumber === this.totalPages)
    {
      this.nextIcon = false;
    }
  }

  previous():void{
    this.pageNumber = this.pageNumber - 1;
    this.getCharacters(this.pageNumber);
    this.characterDetail();
    this.nextIcon = true;

    if(this.pageNumber===1)
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
    sessionStorage.setItem('previousPage', `${this.pageNumber}`);
  }
}



