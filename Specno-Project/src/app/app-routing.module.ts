import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlayGameComponent } from './play-game/play-game.component';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full',
},
{
  path: 'play-game',
  component: PlayGameComponent,
},
{
  path: 'results',
  component: ResultsComponent,
},
{
  path: 'home',
  component: HomeComponent,
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
