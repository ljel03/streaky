import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { StreaksService } from '../streaks.service';

@Component({
  selector: 'app-add-streak',
  templateUrl: './add-streak.page.html',
  styleUrls: ['./add-streak.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, IonicModule],
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
