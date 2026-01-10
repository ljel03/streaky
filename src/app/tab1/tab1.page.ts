import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule],
})
export class Tab1Page {
  formattedDate = this.formatDate(new Date());

  private formatDate(date: Date): string {
    const days = ['ne', 'po', 'út', 'st', 'čt', 'pá', 'so'];

    const dayName = days[date.getDay()];
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();

    return `${dayName} ${dd}.${mm}.${yyyy}`;
  }
}
