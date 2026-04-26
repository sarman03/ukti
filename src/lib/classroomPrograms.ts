"use client";

import { supabase } from "./supabase";

export type ProgramTab = "preschool" | "afterschool";

export interface HomeClassroomCard {
  id: string;
  tab: ProgramTab;
  title: string;
  age?: string;
  description: string;
  imagePath?: string;
  imageRemoved?: boolean;
}

export interface ProgramSectionGroup {
  id: string;
  heading: string;
  points: string[];
}

export interface ClassroomPageCard {
  id: string;
  tab: ProgramTab;
  title: string;
  subtitle: string;
  description: string;
  points?: string[];
  sections?: ProgramSectionGroup[];
  imagePath?: string;
  imageRemoved?: boolean;
  imageHeight?: "normal" | "tall";
}

export const CLASSROOM_HOME_CONFIG_PATH = "content/classroom-home-cards.json";
export const CLASSROOM_PAGE_CONFIG_PATH = "content/classroom-page-cards.json";
export const CLASSROOM_HOME_IMAGE_FOLDER = "classroom-home-cards";
export const CLASSROOM_PAGE_IMAGE_FOLDER = "classroom-page-cards";

export const DEFAULT_HOME_CLASSROOM_CARDS: HomeClassroomCard[] = [
  {
    id: "home-toddlers",
    tab: "preschool",
    title: "Toddlers",
    age: "Age: 15 - 23 Months",
    description:
      "A warm, nurturing space where little ones explore the world through play, movement, sensory experiences, and gentle storytime that sparks imagination and early language.",
  },
  {
    id: "home-pre-nursery",
    tab: "preschool",
    title: "Pre Nursery",
    age: "Age: 2 - 3 Years",
    description:
      "A structured, play-based program where children explore themes through hands-on learning, building early literacy, numeracy, creativity, independence, and strong social-emotional skills.",
  },
  {
    id: "home-nursery",
    tab: "preschool",
    title: "Nursery",
    age: "Age: 3 - 4 Years",
    description:
      "A gentle introduction to learning through play, helping children build social skills, sensory awareness, and early motor development.",
  },
  {
    id: "home-storytelling",
    tab: "afterschool",
    title: "Storytelling Program",
    description:
      "An immersive storytelling experience where children learn through imagination, expression, and play.",
  },
  {
    id: "home-language-math",
    tab: "afterschool",
    title: "Language & Math Program",
    description:
      "A structured yet fun program focused on building strong literacy and numeracy foundations.",
  },
];

export const DEFAULT_CLASSROOM_PAGE_CARDS: ClassroomPageCard[] = [
  {
    id: "page-toddlers",
    tab: "preschool",
    title: "Toddlers",
    subtitle: "A safe start to explore the world",
    description:
      "For children aged 15-23 months, a nurturing environment focused on sensory discovery, movement, and emotional comfort.",
    points: [
      "Weekly Thematic Experiences",
      "Circle Time",
      "Storytelling Adventures",
      "Sensory Play and Messy Play",
      "Multimedia Art",
      "Cooking Experiences",
      "Practical Life and Montessori Exercises",
      "Gross Motor Sessions",
    ],
  },
  {
    id: "page-pre-nursery",
    tab: "preschool",
    title: "Pre Nursery",
    subtitle: "Nurture curiosity and early growth",
    description:
      "For children aged 2-3 years, a gentle introduction to learning through play, exploration, and early social skills.",
    points: [
      "Theme-based learning every week",
      "Circle time for bonding & communication",
      "Storytelling to build imagination",
      "Early language & math concepts",
      "Montessori practical life skills",
    ],
  },
  {
    id: "page-nursery",
    tab: "preschool",
    title: "Nursery",
    subtitle: "Build strong foundations for growth",
    description:
      "For children aged 3-4 years, a structured, play-based program where children explore themes through hands-on learning, building early literacy, numeracy, creativity, independence, and strong social-emotional skills.",
    points: [
      "Thematic Learning & Experiential Exploration",
      "Circle Time & Storytelling",
      "Creative Arts & STEAM Learning",
      "Early Literacy & Pre-Writing Skills",
      "Early Math & Logical Thinking",
      "Practical Life Skills & Montessori Exercises",
      "Gross Motor Development & Outdoor Play",
    ],
  },
  {
    id: "page-storytelling",
    tab: "afterschool",
    title: "Storytelling Program",
    subtitle: "Bringing stories to life through imagination",
    description:
      'An immersive program where children explore a "Story of the Day" through engaging, expressive, and play-focused experiences.',
    points: [
      "Music, movement & rhythm",
      "Theatre games & role play",
      "Expressive storytelling sessions",
      "Art & sensory-based experiences",
      "Gross motor play & movement",
    ],
  },
  {
    id: "page-language-math",
    tab: "afterschool",
    title: "Language & Math Program",
    subtitle: "Build strong literacy and numeracy foundations",
    description:
      "A structured program based on Jolly Phonics, designed to develop language and math skills through fun, hands-on learning.",
    imageHeight: "tall",
    sections: [
      {
        id: "language-dev",
        heading: "Language Development",
        points: [
          "One letter introduced per session",
          "Sound-symbol recognition",
          "Letter formation practice",
          "Beginning sound identification",
          "Reading 2-3 letter words",
        ],
      },
      {
        id: "pre-math",
        heading: "Pre-Math Skills",
        points: [
          "Numbers, symbols & recognition",
          "Counting & number sequencing",
          "Sorting, matching & patterns",
          "Intro to graphs through play",
          "Shapes recognition",
          "Number writing practice",
        ],
      },
    ],
  },
];

export function getStoragePublicUrl(path?: string) {
  if (!path) return "";
  return supabase.storage.from("images").getPublicUrl(path).data.publicUrl;
}

export async function readProgramConfig<T>(path: string, fallback: T): Promise<T> {
  try {
    const { data, error } = await supabase.storage.from("images").download(path);
    if (error || !data) return fallback;
    return JSON.parse(await data.text()) as T;
  } catch {
    return fallback;
  }
}

export async function writeProgramConfig<T>(path: string, value: T) {
  const blob = new Blob([JSON.stringify(value, null, 2)], {
    type: "application/json",
  });
  const { error } = await supabase.storage
    .from("images")
    .upload(path, blob, { contentType: "application/json", upsert: true });
  if (error) throw new Error(error.message);
}

export function createProgramId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
