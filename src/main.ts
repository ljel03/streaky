import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppComponent } from './app/app.component';
import { addIcons } from 'ionicons';
import { routes } from './app/app-routing.module';
import {
  add,
  chevronBackOutline,
  chevronForwardOutline,
  trashOutline,
  reloadOutline,
} from 'ionicons/icons';

addIcons({
  add,
  chevronBackOutline,
  chevronForwardOutline,
  trashOutline,
  reloadOutline,
});

addIcons({
  add,
  chevronBackOutline,
  chevronForwardOutline,
  trashOutline,
  reloadOutline,
});

bootstrapApplication(AppComponent, {
  providers: [
    provideIonicAngular(),
    importProvidersFrom(IonicStorageModule.forRoot()),
    provideRouter(routes),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
});
