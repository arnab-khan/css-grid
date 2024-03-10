import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()), // for add # to router url
    importProvidersFrom(
      HttpClientModule, // HttpClient for api call
      MonacoEditorModule.forRoot() // for ngx-monaco-editor-v2 code editor
    ),
    provideRouter(routes)]
};