"use client";

import { useEffect, useState } from "react";
import {
  CLASSROOM_HOME_CONFIG_PATH,
  CLASSROOM_PAGE_CONFIG_PATH,
  DEFAULT_CLASSROOM_PAGE_CARDS,
  DEFAULT_HOME_CLASSROOM_CARDS,
  type ClassroomPageCard,
  type HomeClassroomCard,
  readProgramConfig,
} from "./classroomPrograms";

export function useHomeClassroomCards() {
  const [cards, setCards] = useState<HomeClassroomCard[]>(DEFAULT_HOME_CLASSROOM_CARDS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      const next = await readProgramConfig(
        CLASSROOM_HOME_CONFIG_PATH,
        DEFAULT_HOME_CLASSROOM_CARDS
      );
      if (!active) return;
      setCards(Array.isArray(next) ? next : DEFAULT_HOME_CLASSROOM_CARDS);
      setLoading(false);
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  return { cards, loading };
}

export function useClassroomPageCards() {
  const [cards, setCards] = useState<ClassroomPageCard[]>(DEFAULT_CLASSROOM_PAGE_CARDS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      const next = await readProgramConfig(
        CLASSROOM_PAGE_CONFIG_PATH,
        DEFAULT_CLASSROOM_PAGE_CARDS
      );
      if (!active) return;
      setCards(Array.isArray(next) ? next : DEFAULT_CLASSROOM_PAGE_CARDS);
      setLoading(false);
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  return { cards, loading };
}

