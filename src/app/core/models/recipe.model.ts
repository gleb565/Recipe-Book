export interface RecipeSummary {
  id: string;
  name: string;
  category: string;
  area: string;
  picture: string;
}

export interface Ingredient {
  name: string;
  measure: string;
}

export interface Recipe extends RecipeSummary {
  steps: string[];
  ingredients: Ingredient[];
  tags: string[];
  youtubeUrl: string;
  sourceUrl: string;
}
