import { Workout } from "./types";

export const ALL_WORKOUTS_API = "https://api.abcz.workers.dev/api/fitlog";
export const WORKOUT_API = (id: string) =>
  `https://api.abcz.workers.dev/api/fitlog/${id}`;

const fallbackImage =
  "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=80";

function getValue(source: any, keys: string[], fallback: any = "") {
  for (const key of keys) {
    if (source?.[key] !== undefined && source?.[key] !== null) {
      return source[key];
    }
  }
  return fallback;
}

function toNumber(value: any, fallback: number) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function toStringArray(value: any, fallback: string[]) {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return fallback;
}

function normalizeWorkout(item: any, index: number): Workout {
  const category = toStringArray(
    getValue(item, ["category", "categories", "muscle", "muscles", "bodyPart", "target"]),
    ["FULL BODY"]
  );

  const instructions = toStringArray(
    getValue(item, ["instructions", "steps", "instruction"]),
    [
      "Set up your equipment and choose a comfortable starting position.",
      "Keep your movement controlled through the full range of motion.",
      "Breathe steadily and focus on good technique.",
      "Finish the set safely and rest before the next set.",
    ]
  );

  return {
    id: String(getValue(item, ["id", "_id", "exerciseId"], index + 1)),
    name: String(
      getValue(item, ["name", "title", "exerciseName"], `WORKOUT ${index + 1}`)
    ).toUpperCase(),
    description: String(
      getValue(
        item,
        ["description", "desc", "instructionsText"],
        "A focused workout movement designed to build strength and improve training consistency."
      )
    ),
    category,
    equipment: String(
      getValue(item, ["equipment", "equipmentName"], "Gym Equipment")
    ),
    difficulty: String(getValue(item, ["difficulty", "level"], "Intermediate")),
    sets: toNumber(getValue(item, ["sets", "set"], 4), 4),
    reps: String(getValue(item, ["reps", "rep"], "8-12")),
    duration: toNumber(getValue(item, ["duration", "durationMin", "minutes"], 25), 25),
    calories: toNumber(getValue(item, ["calories", "calorie", "kcal"], 180), 180),
    rating: toNumber(getValue(item, ["rating", "score"], 4.8), 4.8),
    image: String(
      getValue(item, ["image", "imageUrl", "imageURL", "thumbnail", "photo", "gifUrl", "gifURL", "gif"], fallbackImage)
    ),
    instructions: instructions.slice(0, 6),
  };
}

function extractList(payload: any): any[] {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.workouts)) return payload.workouts;
  if (Array.isArray(payload?.exercises)) return payload.exercises;
  if (Array.isArray(payload?.results)) return payload.results;
  return [];
}

export async function getWorkouts(): Promise<Workout[]> {
  const response = await fetch(ALL_WORKOUTS_API, { cache: "force-cache" });

  if (!response.ok) {
    throw new Error("Could not load workouts");
  }

  const data = await response.json();
  return extractList(data).map(normalizeWorkout);
}

export async function getWorkout(id: string): Promise<Workout> {
  const response = await fetch(WORKOUT_API(id), { cache: "force-cache" });

  if (!response.ok) {
    throw new Error("Workout not found");
  }

  const data = await response.json();
  const item = data?.data ?? data?.workout ?? data?.exercise ?? data;
  return normalizeWorkout(item, 0);
}