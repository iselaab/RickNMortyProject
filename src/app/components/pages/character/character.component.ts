import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { CHARACTER } from 'src/app/constants/interfaces/character';
import { EPISODE } from 'src/app/constants/interfaces/episode';
import { CharactersService } from 'src/app/services/characters.service';
import { EpisodesService } from 'src/app/services/episodes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  characterDataLoaded!: Promise <boolean>;
  id !: string ;
  character !: CHARACTER;
  intArray : number[] = [1];
  episode !: EPISODE;
  episodes : [EPISODE] = [
    {id: 0,
    name: '',
    air_date: '',
    episode: '',
    characters: [''],
    url: '',
    created: '',}];

  constructor(private episodesService : EpisodesService,
              private characterService : CharactersService,
              private actRoute : ActivatedRoute) { 

    this.actRoute.params.subscribe(data=>{
      this.id = data.id;
    });
    
    this.characterData();         
  }

  ngOnInit(): void { 
  }

  characterData():void{

    this.episodes.pop();
    if(this.id!==undefined && this.id!==null){
      this.characterService.getCharacter(this.id)
        .subscribe(data =>{
          this.character = data;

          this.character.episode.forEach(Episode => {
            this.episodesService.readEpisode(Episode)
              .subscribe(episode =>{
                this.episodes.push(episode);
                this.characterDataLoaded = Promise.resolve(true);
              });
            });
        });
    }
    
  }

  markAsFavorite():void{
    if(localStorage.length ===0){
      let itemsArray:string[] | any = [];
      itemsArray.push(this.id);
      localStorage.setItem('favorites', itemsArray);
    }
    else if(this.arrayIncludesId()){
      console.log('');
    }

    else{
      let itemsArray : string[] | any = localStorage.getItem('favorites')?.split(',');
      itemsArray?.push(this.id);

      localStorage.setItem('favorites', itemsArray);
    }
  }

  markedAsFavorite() : boolean{
    if(localStorage.length === 0){
      return false;
    }
    else if(this.arrayIncludesId()){
      return true;
    }
    else{
      return false;
    }
  }

  arrayIncludesId(): boolean{
    let itemsArray : any;
    itemsArray = localStorage.getItem('favorites')?.split(",");
    
    for(let i=0; i<itemsArray?.length; i++){
      this.intArray[i] = Number(itemsArray[i]);
    }
    let intId = Number(this.id);
    return this.intArray.includes(intId);
  }
  
  episodeInfo(episode:EPISODE):void{
    let season = episode.episode.substring(2,3);
    let episodeNumber = episode.episode.substring(4,6);
    Swal.fire({
      title: `${episode.episode}`,
      html:`<br>
            <p style="font-size:20px"> <b>Season:</b> ${season}</p> 
            <p style="font-size:20px"> <b> Episode: </b> ${episodeNumber}</p>
            <p style="font-size:20px"> <b>Name:</b> ${episode.name}</p> 
            <p style="font-size:20px"> <b> Air date: </b> ${episode.air_date}</p>
            `,
    });
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
}
