import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Recipes',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'recipe/:id',
    title: 'Recipe',
    loadComponent: () =>
      import('./features/recipe-details/recipe-details').then((m) => m.RecipeDetails),
  },
  {
    path: 'favorites',
    title: 'Favorites',
    loadComponent: () => import('./features/favorites/favorites').then((m) => m.Favorites),
  },
  {
    path: '**',
    title: 'Page not found',
    loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFound),
  },
];
