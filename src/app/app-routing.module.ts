import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterComponent } from './components/pages/character/character.component';
import { CharactersListComponent } from './components/pages/characters-list/characters-list.component';
import { FavoriteCharactersComponent } from './components/pages/favorite-characters/favorite-characters.component';

const routes: Routes = [
  {path: '', component:CharactersListComponent},
  {path: 'characters', component:CharactersListComponent},
  {path: 'character/:id', component:CharacterComponent},
  {path: 'favorites', component:FavoriteCharactersComponent},
  {path: '**', pathMatch: 'full', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
