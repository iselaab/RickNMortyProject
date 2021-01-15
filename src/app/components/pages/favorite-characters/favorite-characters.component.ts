import { Component, OnInit } from '@angular/core';
import { CHARACTER } from 'src/app/constants/interfaces/character';
import { CharactersService } from 'src/app/services/characters.service';
import { EpisodesService } from 'src/app/services/episodes.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-favorite-characters',
  templateUrl: './favorite-characters.component.html',
  styleUrls: ['./favorite-characters.component.css']
})
export class FavoriteCharactersComponent implements OnInit {
  characters !: [CHARACTER];

  charactersId : string [] | any= localStorage.getItem('favorites')?.split(",");

  constructor(private charactersService: CharactersService,
              private episodeService: EpisodesService) {}
              
  ngOnInit(): void {
    this.getCharacters(this.charactersId);       
  }

  favoritesExists(): any{
    if(localStorage.getItem('favorites')){
      return localStorage.getItem('favorites')?.length;
    }
    else{
      return 0;
    }
  }

  getCharacters(charactersId: any[]):void{
    if(this.charactersId !== undefined && this.charactersId.length>1){

      this.charactersService.getCharactersCustomizedPage(charactersId)
      .subscribe(page => {
        this.characters = page;
        
        for(let i=0; i<this.charactersId.length ; i++){
          this.episodeService.readEpisode(this.characters[i].episode[0])
          .subscribe(episode => {
            this.characters[i].episode[0]=episode.name;
          });
        }
      });
    }
  }

  confirmDelete(character: CHARACTER):void{
    Swal.fire({
      title: 'Remove character?',
      text: `Are you sure you want to delete ${character.name} from your favorites?`,
      icon: 'question',
      confirmButtonText: 'Yes',
      showCancelButton: true,
    }).then(res=>{
      if(res.isConfirmed){
        this.delete(character.id);
      }
    });
  }

  toInt():number[]{
    let intArray : number [] = [1];
    for(let i = 0; i<this.charactersId.length ; i++){
      intArray[i] = Number(this.charactersId[i]);
    }
    return intArray;
  }

  toString(intArray: number[]):string[]{
    let stringsArray : string [] = [''];
    for(let i = 0; i<intArray.length ; i++){
      stringsArray[i] = String(intArray[i]);
    }
    return stringsArray;
  }

  delete(id:number):void{
    let favorites = this.toInt();
    const index = favorites.indexOf(id);

    if(index >-1)
      {
         favorites.splice(index, 1); 
      }
    
    const stringsArray = this.toString(favorites);
    localStorage.setItem('favorites', stringsArray.join(","));

    this.charactersId = stringsArray;
    this.ngOnInit();

  }
  
  deleteAll():void{
    Swal.fire({
      title: 'Remove favorites?',
      text: `Are you sure you want to delete all favorites?`,
      icon: 'question',
      confirmButtonText: 'Yes',
      showCancelButton: true,
    }).then(res=>{
      if(res.isConfirmed){
        localStorage.clear();
        this.charactersId = undefined;
        this.ngOnInit();
      }
    });
  }
}
