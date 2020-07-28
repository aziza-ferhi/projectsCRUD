import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';

import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProjectUpdateComponent } from './project-update/project-update.component';




@NgModule({

  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'list', component: ProjectListComponent},
      { path: 'details/:id', component: ProjectDetailsComponent},
      { path: 'create', component: ProjectCreateComponent },
      { path: 'update/:id', component: ProjectUpdateComponent}

    ])
  ],
  declarations: [ProjectListComponent, ProjectDetailsComponent, ProjectCreateComponent, ProjectUpdateComponent]
})
export class ProjectModule { }
