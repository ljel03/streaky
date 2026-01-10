import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-streak',
  templateUrl: './add-streak.page.html',
  styleUrls: ['./add-streak.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule, FormsModule],
})
export class AddStreakPage {
  name = '';

  save() {
    const trimmed = this.name.trim();

    if (!trimmed) {
      console.warn('Streak name is empty');
      return;
    }

    console.log('New streak name:', trimmed);
  }
}
