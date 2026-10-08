import { Component, computed, inject, signal } from '@angular/core';
import { CategoryList } from '../../shared/category-list/category-list';
import { RecipeCard } from '../../shared/recipe-card/recipe-card';
import { SearchBar } from '../../shared/search-bar/search-bar';
import { RecipesService } from '../../core/services/recipes.services';
import { FavoritesService } from '../../core/services/favorites.service';

const ALL = 'All';

@Component({
  selector: 'app-home',
  imports: [CategoryList, RecipeCard, SearchBar],
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {
  private readonly recipesServices = inject(RecipesService);
  private readonly favoriteServices = inject(FavoritesService);
  protected readonly recipes = signal(this.recipesServices.getAll());
  protected readonly selectedCategory = signal(ALL);
  protected readonly query = signal('');

  protected isFavorite(id: string): boolean {
    return this.favoriteServices.isFavorite(id);
  }

  protected onFavoriteToggle(id: string): void {
    this.favoriteServices.toggle(id);
  }

  protected onSearched(text: string): void {
    this.query.set(text);
  }

  protected onCategorySelected(category: string): void {
    this.selectedCategory.set(category);
  }

  protected readonly categories = computed(() => [
    ALL,
    ...new Set(this.recipes().map((recipe) => recipe.category)),
  ]);

  protected onRandomRequested(): void {
    const recipes = this.recipes();
    const random = recipes[Math.floor(Math.random() * recipes.length)];
    this.selectedCategory.set(ALL);
    this.query.set(random.name);
  }

  protected readonly visibleRecipes = computed(() => {
    const category = this.selectedCategory();
    const query = this.query().toLowerCase();

    return this.recipes().filter(
      (recipe) =>
        (category === ALL || recipe.category === category) &&
        recipe.name.toLowerCase().includes(query),
    );
  });
}
