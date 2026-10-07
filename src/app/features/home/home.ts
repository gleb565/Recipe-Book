import { Component, computed, signal } from '@angular/core';
import { CategoryList } from '../../shared/category-list/category-list';
import { RecipeCard } from '../../shared/recipe-card/recipe-card';
import { SearchBar } from '../../shared/search-bar/search-bar';
import { RECIPES_MOCK } from '../../core/mocks/recipes.mock';

const ALL = 'All';

@Component({
  selector: 'app-home',
  imports: [CategoryList, RecipeCard, SearchBar],
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {
  protected readonly recipes = signal(RECIPES_MOCK);
  protected readonly selectedCategory = signal(ALL);
  protected readonly query = signal('');
  protected readonly favouriteIds = signal<string[]>([]);

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

  protected readonly favouriteCount = computed(() => this.favouriteIds().length);

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

  protected onFavoriteToggle(id: string): void {
    this.favouriteIds.update((ids) =>
      ids.includes(id) ? ids.filter((x) => x != id) : [...ids, id],
    );
  }

  protected isFavorite(id: string): boolean {
    return this.favouriteIds().includes(id);
  }
}
