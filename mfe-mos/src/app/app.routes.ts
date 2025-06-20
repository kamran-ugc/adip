import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./mos/mos.module').then(m => m.MosModule)
  }
];
