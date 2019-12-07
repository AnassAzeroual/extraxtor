import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { GetByUrlComponent } from './shared/get-by-url/get-by-url.component';
import { GetByTextComponent } from './shared/get-by-text/get-by-text.component';


const routes: Routes = [
  { path:'', component:AccueilComponent },
  {
    path:'home',
    component:AccueilComponent,
    children: [
      { path:'', redirectTo:'getByURL' },
      { path:'getByURL', component:GetByUrlComponent },
      { path:'getByTEXT', component:GetByTextComponent },
      { path:'**', redirectTo:'getByURL'}
    ]
  },
  { path:'**', redirectTo:'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
