import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { FAKECHARACTER } from 'src/app/constants/fake-character';
import { FAKEPAGE } from 'src/app/constants/fake-page';
import { FAKEEPISODES } from 'src/app/constants/fakeEpisodes';
import { CharactersService } from 'src/app/services/characters.service';
import { EpisodesService } from 'src/app/services/episodes.service';

import { CharactersListComponent } from './characters-list.component';

export class MockCharactersService {
    getCharactersCustomizedPage(idList:number[]){
      let arrayOfCharacters = [];
      for(let i=0; i<idList.length; i++){
        arrayOfCharacters.push(FAKECHARACTER);
      }
      return of(arrayOfCharacters)
  }
  getCharactersPage(pageNumber:number){
    
    return of(FAKEPAGE);
  }
  
}

export class MockEpisodesService {
    readEpisode(url:string){
      return of(FAKEEPISODES)
  }
}

describe('CharactersListComponent', () => {
  let component: CharactersListComponent;
  let fixture: ComponentFixture<CharactersListComponent>;
 

  beforeEach(async () => {
     await TestBed.configureTestingModule({
      declarations: [ CharactersListComponent ],
      imports:[HttpClientModule],
      providers: [ {provide:CharactersService , useClass:MockCharactersService },
                   {provide:EpisodesService , useClass:MockEpisodesService },
                 ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('page should have 12 characters',()=>{
    //component.getCharacters([1,2,3,4,5,6,7,8,9,10,11,12]);  
    component.getCharacters(1);  
    console.log(component.characters.length);
    expect(component.characters.length).toBeGreaterThan(11);
    expect(component.characters.length).toBeLessThan(13);

    fixture.detectChanges();
    const elements = fixture.debugElement.queryAll(By.css('.card'));
    expect(elements.length).toEqual(12);
  });
});
