import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { NotFoundComponent } from './error-page/not-found/not-found.component';
import { InternalServerComponent } from './error-page/internal-server/internal-server.component';






@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    NotFoundComponent,
    InternalServerComponent

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot([
      {path: 'home', component: HomeComponent},
      {path: 'project', loadChildren: () => import('./project/project.module').then(p => p.ProjectModule)},
      {path: '', redirectTo: '/home', pathMatch: 'full'},
      {path: '404', component: NotFoundComponent},
      {path: '**', redirectTo: '/404', pathMatch: 'full'},
      {path: '500', component: InternalServerComponent }

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
