export interface MealDto {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string | null;
  strArea?: string | null;
  strInstructions?: string | null;
  strTags?: string | null;
  strYoutube?: string | null;
  strSource?: string | null;
  [key: string]: string | null | undefined;
}

export interface MealsResponse {
  meals: MealDto[] | null;
}

export interface CategoriesResponse {
  categories: { idCategory: string; strCategory: string }[];
}
