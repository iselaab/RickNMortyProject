import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { FAKECHARACTER } from 'src/app/constants/fake-character';
import { CharactersService } from 'src/app/services/characters.service';
import { EpisodesService } from 'src/app/services/episodes.service';
import { CharactersListComponent } from '../characters-list/characters-list.component';
import { MockEpisodesService } from '../characters-list/characters-list.component.spec';

import { CharacterComponent } from './character.component';

class MockCharacterService{
  getCharacter(id:string){
    return of(FAKECHARACTER)
  }
}

describe('CharacterComponent', () => {
  let component: CharacterComponent;
  let fixture: ComponentFixture<CharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterComponent ],
      imports:[HttpClientModule, RouterTestingModule],
      providers: [ {provide:CharactersService , useClass:MockCharacterService },
                   {provide:EpisodesService , useClass:MockEpisodesService },
                 ]
    })
   /*  .overrideComponent(CharacterComponent,{
      set: {changeDetection: ChangeDetectionStrategy.Default}
    }) */
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterComponent);
    component = fixture.componentInstance;
    //component.characterDataLoaded = Promise.resolve(true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('favorite is added to local array successfully',async()=>{
        
    component.id = '7';
    component.characterData();
    expect(component.character).toBeDefined();
    
    fixture.detectChanges();
    const favButton = fixture.debugElement.queryAll(By.css('.card'));
    console.log(favButton);

    /* favButton[0].triggerEventHandler('click', null);
    const includes = component.arrayIncludesId();

    expect(includes).toBeTruthy(); */

   
  });
});
