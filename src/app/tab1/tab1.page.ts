import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { Streak, StreaksService } from '../streaks.service';
import { addDays, diffDays, todayYmd } from '../date-utils';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, IonicModule],
})
export class Tab1Page {
  today = todayYmd();
  selectedDate = this.today;
  formattedDate = this.formatDateFromYmd(this.selectedDate);
  streaks: Streak[] = [];

  constructor(
    private streaksSvc: StreaksService,
    private alertCtrl: AlertController
  ) {}


  async ionViewWillEnter() {
    this.today = todayYmd();

    if (!this.selectedDate || this.selectedDate < this.today) {
      this.selectedDate = this.today;
    }

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
    const d = diffDays(s.startDate, this.selectedDate);
    return Math.max(0, d);
  }

  private currentDaysAt(s: Streak, atDate: string): number {
    const d = diffDays(s.startDate, atDate);
    return Math.max(0, d);
  }

  async confirmReset(s: Streak) {
    const curToday = this.currentDaysAt(s, this.today);

    const alert = await this.alertCtrl.create({
      header: 'Reset streak?',
      message: `Reset "${s.name}" today? Current today: ${curToday}`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Reset',
          role: 'destructive',
          handler: async () => {
            const updated: Streak = {
              ...s,
              maxStreak: Math.max(s.maxStreak, curToday),
              startDate: this.today, // ✅ reset vždy dnes
            };

            await this.streaksSvc.update(updated);
            this.streaks = await this.streaksSvc.getAll();
          },
        },
      ],
    });

    await alert.present();
  }

  async confirmDelete(s: Streak) {
    const alert = await this.alertCtrl.create({
      header: 'Delete streak?',
      message: `Delete "${s.name}" permanently?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          role: 'destructive',
          handler: async () => {
            await this.streaksSvc.remove(s.id);
            this.streaks = await this.streaksSvc.getAll();
          },
        },
      ],
    });

    await alert.present();
  }

  canGoBack(): boolean {
    return this.selectedDate > this.today;
  }

  goBack() {
    if (!this.canGoBack()) return;
    this.selectedDate = addDays(this.selectedDate, -1);
    this.formattedDate = this.formatDateFromYmd(this.selectedDate);
  }

  goForward() {
    this.selectedDate = addDays(this.selectedDate, 1);
    this.formattedDate = this.formatDateFromYmd(this.selectedDate);
  }

  private formatDateFromYmd(ymd: string): string {
    const [y, m, d] = ymd.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    return this.formatDate(date);
  }
}
