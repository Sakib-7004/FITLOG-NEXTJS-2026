export type Workout = {
  id: string;
  name: string;
  description: string;
  category: string[];
  equipment: string;
  difficulty: string;
  sets: number;
  reps: string;
  duration: number;
  calories: number;
  rating: number;
  image: string;
  instructions: string[];
};

export type SortOption = "duration" | "calories" | "rating";