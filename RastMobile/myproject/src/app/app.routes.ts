import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {DataGridComponent} from "./components/home/data-grid/data-grid.component";


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent , children:[
      { path: 'grid', component: DataGridComponent },
    ]},

];
