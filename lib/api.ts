import { Workout } from "./types";

export const ALL_WORKOUTS_API = "https://api.abcz.workers.dev/api/fitlog";
export const WORKOUT_API = (id: string) =>
  `https://api.abcz.workers.dev/api/fitlog/${id}`;

const fallbackImage =
  "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=80";

// Exercise-specific images/GIFs supplied from the exercise reference pages.
// The reference page URLs are kept in comments; the image field uses the
// actual media URL so the workout card can render it directly.
const exerciseGifs: Array<{ keywords: string[]; url: string }> = [
  {
    // https://fitnessprogramer.com/exercise/russian-twist/
    keywords: ["russian twist"],
    url: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Russian-Twist.gif",
  },
  {
    // https://www.lyfta.app/exercise/body-saw-plank-9g7
    keywords: ["hollow body plank", "hollow-body plank", "body saw plank"],
    url: "https://www.lyfta.app/thumbnails/43841201.jpg",
  },
  {
    // https://fitnessprogramer.com/exercise/push-up-plus/
    keywords: ["push up", "push-up", "pushup", "push up plus", "push-up plus"],
    url: "https://fitnessprogramer.com/wp-content/uploads/2021/06/Push-Up-Plus.gif",
  },
  {
    // https://fitnessprogramer.com/exercise/dumbbell-curl/
    keywords: ["dumbbell curl", "dumbell curl", "biceps curl", "dumbbell biceps curl"],
    url: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Curl.gif",
  },
  {
    // https://liftmanual.com/burpee/
    keywords: ["burpee", "burpees"],
    url: "https://liftmanual.com/wp-content/uploads/2023/04/burpee.jpg",
  },
  {
    // https://fitnessprogramer.com/exercise/pull-up/
    keywords: ["pull up", "pull-up", "pullup"],
    url: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Pull-up.gif",
  },
  {
    // https://fitnessprogramer.com/exercise/kettlebell-swings/
    keywords: ["kettlebell swing", "kettlebell swings"],
    url: "https://fitnessprogramer.com/wp-content/uploads/2021/09/Kettlebell-Swings.gif",
  },
  {
    // https://fitnessprogramer.com/exercise/dumbbell-walking-lunge/
    keywords: ["walking lunge", "walking lunges", "dumbbell walking lunge"],
    url: "https://fitnessprogramer.com/wp-content/uploads/2023/09/dumbbell-lunges.gif",
  },
  {
    // https://liftmanual.com/dumbbell-standing-overhead-press/
    keywords: ["overhead press", "overhead presses", "dumbbell standing overhead press"],
    url: "https://liftmanual.com/wp-content/uploads/2023/04/dumbbell-standing-overhead-press.jpg",
  },
  {
    // https://fitnessprogramer.com/exercise/bench-press/
    keywords: ["barbell bench press", "bench press"],
    url: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bench-Press.gif",
  },
  {
    // https://burnfit.io/en/library/barbell-deadlift/
    keywords: ["conventional deadlift", "barbell deadlift", "deadlift"],
    url: "https://burnfit.io/en/wp-content/uploads/sites/3/2026/01/BB_DL.gif",
  },
  {
    // https://training.fit/exercise/barbell-squats/
    keywords: ["back squat", "barbell squat", "barbell squats", "squat", "squats"],
    url: "https://training.fit/wp-content/uploads/2020/03/kniebeugen-langhantel-800x448.png",
  },
];

function getExerciseGif(name: string) {
  const normalized = name.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

  const match = exerciseGifs.find(({ keywords }) =>
    keywords.some((keyword) => {
      const normalizedKeyword = keyword
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim();

      return normalized === normalizedKeyword || normalized.includes(normalizedKeyword);
    })
  );

  return match?.url;
}

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
  const name = String(
    getValue(item, ["name", "title", "exerciseName"], `WORKOUT ${index + 1}`)
  ).toUpperCase();

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

  const sourceImage = String(
    getValue(
      item,
      ["image", "imageUrl", "imageURL", "thumbnail", "photo", "gifUrl", "gifURL", "gif"],
      fallbackImage
    )
  );

  return {
    id: String(getValue(item, ["id", "_id", "exerciseId"], index + 1)),
    name,
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
    image: getExerciseGif(name) ?? sourceImage,
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
