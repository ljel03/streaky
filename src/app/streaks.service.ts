import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { todayYmd } from './date-utils';

export interface Streak {
  id: number;
  name: string;
  createdAt: string;

  startDate: string;
  maxStreak: number;
}

const KEY = 'streaks_v1';

@Injectable({ providedIn: 'root' })
export class StreaksService {
  private ready = false;

  constructor(private storage: Storage) {}

  private async ensureReady() {
    if (this.ready) return;
    await this.storage.create();
    this.ready = true;
  }

  async getAll(): Promise<Streak[]> {
    await this.ensureReady();
    const streaks: any[] = (await this.storage.get(KEY)) ?? [];

    const normalized: Streak[] = streaks
      .map((s) => ({
        id: s.id ?? Date.now(),
        name: (s.name ?? '').toString(),
        createdAt: s.createdAt ?? new Date().toISOString(),
        startDate: s.startDate ?? todayYmd(),
        maxStreak: typeof s.maxStreak === 'number' ? s.maxStreak : 0,
      }))
      .filter((s) => s.name.trim().length > 0);

    await this.storage.set(KEY, normalized);

    return normalized;
  }

  async add(name: string): Promise<void> {
    await this.ensureReady();
    const streaks: Streak[] = (await this.storage.get(KEY)) ?? [];

    streaks.unshift({
      id: Date.now(),
      name,
      createdAt: new Date().toISOString(),
      startDate: todayYmd(),
      maxStreak: 0,
    });

    await this.storage.set(KEY, streaks);
  }

  async update(updated: Streak): Promise<void> {
    await this.ensureReady();
    const streaks: Streak[] = (await this.storage.get(KEY)) ?? [];

    const idx = streaks.findIndex((s) => s.id === updated.id);
    if (idx === -1) return;

    streaks[idx] = updated;
    await this.storage.set(KEY, streaks);
  }
}
