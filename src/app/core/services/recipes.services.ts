import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { CategoriesResponse, MealsResponse } from '../api/meal.dto';
import { toRecipe, toSummary } from '../api/meal.mapper';
import { Recipe, RecipeSummary } from '../models/recipe.model';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

@Injectable({ providedIn: 'root' })
export class RecipesService {
  private readonly http = inject(HttpClient);

  search(query: string): Observable<RecipeSummary[]> {
    return this.http
      .get<MealsResponse>(`${BASE_URL}/search.php`, { params: { s: query } })
      .pipe(map((res) => (res.meals ?? []).map((dto) => toSummary(dto))));
  }

  getByCategory(category: string): Observable<RecipeSummary[]> {
    return this.http
      .get<MealsResponse>(`${BASE_URL}/filter.php`, { params: { c: category } })
      .pipe(map((res) => (res.meals ?? []).map((dto) => toSummary(dto, category))));
  }

  getById(id: string): Observable<Recipe | null> {
    return this.http
      .get<MealsResponse>(`${BASE_URL}/lookup.php`, { params: { i: id } })
      .pipe(map((res) => (res.meals?.[0] ? toRecipe(res.meals[0]) : null)));
  }

  getRandom(): Observable<Recipe> {
    return this.http
      .get<MealsResponse>(`${BASE_URL}/random.php`)
      .pipe(map((res) => toRecipe(res.meals![0])));
  }

  getCategories(): Observable<string[]> {
    return this.http
      .get<CategoriesResponse>(`${BASE_URL}/categories.php`)
      .pipe(map((res) => res.categories.map((c) => c.strCategory)));
  }
}
