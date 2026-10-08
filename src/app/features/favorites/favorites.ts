import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

import { Recipe } from '../../core/models/recipe.model';
import { FavoritesService } from '../../core/services/favorites.service';
import { RecipesService } from '../../core/services/recipes.services';
import { RecipeCard } from '../../shared/recipe-card/recipe-card';

@Component({
  selector: 'app-favorites',
  imports: [RecipeCard, RouterLink],
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss',
})
export class Favorites implements OnInit {
  private readonly recipesService = inject(RecipesService);
  protected readonly favoritesService = inject(FavoritesService);

  private readonly loaded = signal<Recipe[]>([]);
  protected readonly isLoaded = signal(false);

  protected readonly recipes = computed(() =>
    this.loaded().filter((recipe) => this.favoritesService.isFavorite(recipe.id)),
  );

  ngOnInit(): void {
    const ids = Array.from(this.favoritesService.ids());

    if (ids.length === 0) {
      this.isLoaded.set(true);
      return;
    }

    forkJoin(ids.map((id) => this.recipesService.getById(id))).subscribe({
      next: (list) => {
        this.loaded.set(list.filter((recipe): recipe is Recipe => recipe !== null));
        this.isLoaded.set(true);
      },
      error: () => this.isLoaded.set(true),
    });
  }

  protected clearAll(): void {
    this.favoritesService.clear();
  }
}
