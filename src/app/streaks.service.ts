import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface Streak {
  id: number;
  name: string;
  createdAt: string;
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
    return (await this.storage.get(KEY)) ?? [];
  }

  async add(name: string): Promise<void> {
    await this.ensureReady();
    const streaks: Streak[] = (await this.storage.get(KEY)) ?? [];

    streaks.unshift({
      id: Date.now(),
      name,
      createdAt: new Date().toISOString(),
    });

    await this.storage.set(KEY, streaks);
  }
}
