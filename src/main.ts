// Angular.
import { bootstrapApplication } from '@angular/platform-browser';

// Componentes.
import { AppComponent } from './app/app.component';

// Configuración de la aplicación.
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig).catch(console.error);
