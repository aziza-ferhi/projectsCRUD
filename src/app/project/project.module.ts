import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProjectListComponent } from './project-list/project-list.component';



@NgModule({

  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'list', component: ProjectListComponent}
    ])
  ],
  declarations: [ProjectListComponent]
})
export class ProjectModule { }
