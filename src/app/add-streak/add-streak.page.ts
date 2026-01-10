import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-streak',
  templateUrl: './add-streak.page.html',
  styleUrls: ['./add-streak.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule],
})
export class AddStreakPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
