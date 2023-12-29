export interface Calorie_By_Portion {
  Added_Sugars: number;
  Alcohol: number;
  Calories: number;
  Drkgreen_Vegetables: number;
  Drybeans_Peas: number;
  Factor: number;
  Fruits: number;
  Grains: number;
  Increment: number;
  Meats: number;
  Milk: number;
  Multiplier: number;
  Oils: number;
  Orange_Vegetables: number;
  Other_Vegetables: number;
  Portion_Amount: number;
  Portion_Default: number;
  Portion_Display_Name: string;
  Saturated_Fats: number;
  Solid_Fats: number;
  Soy: number;
  Starchy_vegetables: number;
  Vegetables: number;
  Whole_Grains: number;
}

export interface Food {
  Display_Name: string;
  Calories_By_Portion: Calorie_By_Portion[];
}
