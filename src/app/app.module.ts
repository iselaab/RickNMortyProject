import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharactersListComponent } from './components/pages/characters-list/characters-list.component';
import { FavoriteCharactersComponent } from './components/pages/favorite-characters/favorite-characters.component';
import { NavComponent } from './components/shared/nav/nav.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CharacterComponent } from './components/pages/character/character.component';

@NgModule({
  declarations: [
    AppComponent,
    CharactersListComponent,
    FavoriteCharactersComponent,
    NavComponent,
    CharacterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
