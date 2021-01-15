import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharactersService } from 'src/app/services/characters.service';
import { EpisodesService } from 'src/app/services/episodes.service';
import { MockCharactersService, MockEpisodesService } from '../characters-list/characters-list.component.spec';

import { FavoriteCharactersComponent } from './favorite-characters.component';

describe('FavoriteCharactersComponent', () => {
  let component: FavoriteCharactersComponent;
  let fixture: ComponentFixture<FavoriteCharactersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteCharactersComponent ],
      imports:[HttpClientModule],
      providers: [ {provide:CharactersService , useClass:MockCharactersService },
                   {provide:EpisodesService , useClass:MockEpisodesService },
                 ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteCharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the same number of characters as the number in local storage',()=>{
    
    localStorage.setItem('favorites', '1,3,5' );
    
    const favorites = component.charactersId;
    component.getCharacters(favorites);
    
    //favorites.push('3');
    
    expect(component.characters.length).toBe(favorites.length);

  });
});
