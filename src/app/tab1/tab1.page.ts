import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonButton,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

import { Streak, StreaksService } from '../streaks.service';
import { diffDays, todayYmd } from '../date-utils';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonFab,
    IonFabButton,
    IonIcon,
    IonButton,
  ],
})
export class Tab1Page {
  formattedDate = this.formatDate(new Date());
  streaks: Streak[] = [];
  today = todayYmd();

  constructor(private streaksSvc: StreaksService) {}

  async ionViewWillEnter() {
    this.today = todayYmd();
    this.streaks = await this.streaksSvc.getAll();
  }

  private formatDate(date: Date): string {
    const days = ['ne', 'po', 'út', 'st', 'čt', 'pá', 'so'];
    const dayName = days[date.getDay()];
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${dayName} ${dd}.${mm}.${yyyy}`;
  }

  currentDays(s: Streak): number {
    const d = diffDays(s.startDate, this.today);
    return Math.max(0, d);
  }

  async reset(s: Streak) {
    const cur = this.currentDays(s);

    const updated: Streak = {
      ...s,
      maxStreak: Math.max(s.maxStreak, cur),
      startDate: this.today,
    };

    await this.streaksSvc.update(updated);
    this.streaks = await this.streaksSvc.getAll();
  }
}
