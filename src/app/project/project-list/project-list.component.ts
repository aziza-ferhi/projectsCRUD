import { Component, OnInit } from '@angular/core';
import { Project } from './../../_interfaces/project.model';
import { RepositoryService } from '../../shared/services/repository.service';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})

export class ProjectListComponent implements OnInit {

 public projects: Project[];
 public errorMessage = '';

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit(): void {
  }

  public GetAllProjects = () => {
    const apiAddress = 'api/project';
    this.repository.getData(apiAddress).subscribe(res => {this.projects = res as Project[];
    },
    (error) =>
    {
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    }
    );
  }

  public getProjectDetails = (id) => {
    const detailsUrl = `/project/details/${id}`;
    this.router.navigate([detailsUrl]);
  }

  public redirectToUpdatePage = (id) => {
    const updateUrl = `/project/update/${id}`;
    this.router.navigate([updateUrl]);
}



}
