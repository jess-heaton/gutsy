export type FODMAPLevel = 'none' | 'low' | 'moderate' | 'high';
export type FODMAPCategory = 'fructans' | 'gos' | 'lactose' | 'fructose' | 'sorbitol' | 'mannitol';
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'drink';
export type BristolType = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface FoodItem {
  id: string;
  name: string;
  emoji?: string;
  category: 'fruit' | 'vegetable' | 'grain' | 'dairy' | 'protein' | 'legume' | 'nut' | 'condiment' | 'drink' | 'snack';
  serving: {
    amount: number;
    unit: 'g' | 'ml' | 'cup' | 'tbsp' | 'tsp' | 'piece' | 'slice';
    description?: string;
  };
  fodmap: {
    overall: 'low' | 'moderate' | 'high';
    fructans: FODMAPLevel;
    gos: FODMAPLevel;
    lactose: FODMAPLevel;
    fructose: FODMAPLevel;
    sorbitol: FODMAPLevel;
    mannitol: FODMAPLevel;
  };
  notes?: string;
  tags?: string[];
}

export interface LoggedFood {
  foodId: string;
  foodName: string;
  emoji?: string;
  customAmount?: number;
  customUnit?: string;
  fodmapOverall: 'low' | 'moderate' | 'high';
}

export interface BaseEntry {
  id: string;
  date: string;
  time: string;
  type: 'meal' | 'symptom' | 'bowel' | 'note';
}

export interface MealEntry extends BaseEntry {
  type: 'meal';
  mealType: MealType;
  foods: LoggedFood[];
  freeText?: string;
}

export interface SymptomEntry extends BaseEntry {
  type: 'symptom';
  bloating: number;
  pain: number;
  gas: number;
  nausea: number;
  fatigue: number;
  overall: number;
  notes?: string;
}

export interface BowelEntry extends BaseEntry {
  type: 'bowel';
  bristolType: BristolType;
  urgency: 'normal' | 'urgent' | 'very-urgent';
  pain: number;
  notes?: string;
}

export interface NoteEntry extends BaseEntry {
  type: 'note';
  text: string;
}

export type DayEntry = MealEntry | SymptomEntry | BowelEntry | NoteEntry;

export interface UserSettings {
  name: string;
  phase: 'elimination' | 'reintroduction' | 'maintenance';
  reintroductionCategory?: FODMAPCategory;
  startDate: string;
  trackMeals: boolean;
  trackSymptoms: boolean;
  trackBowels: boolean;
}
