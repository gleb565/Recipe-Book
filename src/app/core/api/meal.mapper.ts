import { Ingredient, Recipe, RecipeSummary } from '../models/recipe.model'; // поправь путь под себя
import { MealDto } from './meal.dto';

export function toSummary(dto: MealDto, fallbackCategory = ''): RecipeSummary {
  return {
    id: dto.idMeal,
    name: dto.strMeal,
    picture: dto.strMealThumb,
    category: dto.strCategory ?? fallbackCategory,
    area: dto.strArea ?? '',
  };
}

export function toRecipe(dto: MealDto): Recipe {
  return {
    ...toSummary(dto),
    steps: splitLines(dto.strInstructions),
    ingredients: toIngredients(dto),
    tags: (dto.strTags ?? '')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean),
    youtubeUrl: dto.strYoutube ?? '',
    sourceUrl: dto.strSource ?? '',
  };
}

function toIngredients(dto: MealDto): Ingredient[] {
  const result: Ingredient[] = [];
  for (let i = 1; i <= 20; i++) {
    const name = dto[`strIngredient${i}`]?.trim();
    const measure = dto[`strMeasure${i}`]?.trim() ?? '';
    if (name) {
      result.push({ name, measure });
    }
  }
  return result;
}

function splitLines(text: string | null | undefined): string[] {
  return (text ?? '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}
