import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

import { StreaksService } from '../streaks.service';

@Component({
  selector: 'app-add-streak',
  templateUrl: './add-streak.page.html',
  styleUrls: ['./add-streak.page.scss'],
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
  ],
})
export class AddStreakPage {
  name = '';

  constructor(private streaks: StreaksService, private router: Router) {}

  async save() {
    const trimmed = this.name.trim();
    if (!trimmed) return;
    await this.streaks.add(trimmed);
    await this.router.navigateByUrl('/home');
  }
}
