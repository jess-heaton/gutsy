'use client';

import { DayEntry, UserSettings } from './types';

const ENTRIES_KEY = 'gutfeeling_entries';
const SETTINGS_KEY = 'gutfeeling_settings';

export function getSettings(): UserSettings {
  if (typeof window === 'undefined') return defaultSettings();
  try {
    const s = localStorage.getItem(SETTINGS_KEY);
    return s ? JSON.parse(s) : defaultSettings();
  } catch {
    return defaultSettings();
  }
}

export function saveSettings(settings: UserSettings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

function defaultSettings(): UserSettings {
  return {
    name: '',
    phase: 'elimination',
    startDate: new Date().toISOString().split('T')[0],
    trackMeals: true,
    trackSymptoms: true,
    trackBowels: true,
  };
}

function getAllEntries(): Record<string, DayEntry[]> {
  if (typeof window === 'undefined') return {};
  try {
    const s = localStorage.getItem(ENTRIES_KEY);
    return s ? JSON.parse(s) : {};
  } catch {
    return {};
  }
}

function saveAllEntries(data: Record<string, DayEntry[]>): void {
  localStorage.setItem(ENTRIES_KEY, JSON.stringify(data));
}

export function getEntriesForDate(date: string): DayEntry[] {
  return getAllEntries()[date] || [];
}

export function addEntry(entry: DayEntry): void {
  const all = getAllEntries();
  if (!all[entry.date]) all[entry.date] = [];
  all[entry.date].unshift(entry);
  saveAllEntries(all);
}

export function deleteEntry(date: string, id: string): void {
  const all = getAllEntries();
  if (all[date]) {
    all[date] = all[date].filter((e) => e.id !== id);
    saveAllEntries(all);
  }
}

export function getEntriesForDateRange(days: number): Record<string, DayEntry[]> {
  const all = getAllEntries();
  const result: Record<string, DayEntry[]> = {};
  for (let i = 0; i < days; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    result[key] = all[key] || [];
  }
  return result;
}

export function getStreak(): number {
  const all = getAllEntries();
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    if (all[key] && all[key].length > 0) {
      streak++;
    } else if (i === 0) {
      // today has no entries yet, check yesterday for streak continuity
      continue;
    } else {
      break;
    }
  }
  return streak;
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
}

export function getTodayKey(): string {
  return new Date().toISOString().split('T')[0];
}

export function getNowTime(): string {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}
