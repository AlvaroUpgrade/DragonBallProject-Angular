import { UpdateCharacterComponent } from './pages/update-character/update-character.component';
import { AddCharacterComponent } from './pages/add-character/add-character.component';
import { CharactersDetailsComponent } from './pages/characters-details/characters-details.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersComponent } from './pages/characters/characters.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'characters', component: CharactersComponent },
  { path: 'characters/:id', component: CharactersDetailsComponent },
  { path: 'addCharacter', component: AddCharacterComponent },
  {path: 'updatecharacter/:id', component: UpdateCharacterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
