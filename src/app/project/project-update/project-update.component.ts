
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { RepositoryService } from './../../shared/services/repository.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Project } from './../../_interfaces/project.model';


@Component({
  selector: 'app-project-update',
  templateUrl: './project-update.component.html',
  styleUrls: ['./project-update.component.css']
})
export class ProjectUpdateComponent implements OnInit {

  public errorMessage = '';
  public project: Project;
  public projectForm: FormGroup;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router,
    private activeRoute: ActivatedRoute) { }

    ngOnInit(): void {
      this.projectForm = new FormGroup({
        nameOfProject: new FormControl('', [Validators.required]),
        typeOfProject: new FormControl('', [Validators.required]),
        budget: new FormControl('', [Validators.required])
      });

      this.getProjectById();
    }

    private  getProjectById = () => {
      const projectId = this.activeRoute.snapshot.params['project.id'];

      const projectByIdUrl = `api/project/${projectId}`;

      this.repository.getData(projectByIdUrl)
        .subscribe(res => {
          this.project = res as Project;
          this.projectForm.patchValue(this.project);
        },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        });
    }

    public  validateControl = (controlName: string) => {
      if (this.projectForm.controls[controlName].invalid && this.projectForm.controls[controlName].touched)
        {
          return true;
        }

      return false;
    }

    public  hasError = (controlName: string, errorName: string)  => {
      if (this.projectForm.controls[controlName].hasError(errorName))
        {
          return true;
        }

      return false;
    }

    public  redirectToProjectList = () => {
      this.router.navigate(['/project/list']);
    }

public updateProject = (projectFormValue) => {
  if (this.projectForm.valid) {
    this.executeProjectUpdate(projectFormValue);
  }
}

private executeProjectUpdate = (projectFormValue) => {

  this.project.nameOfProject = projectFormValue.nameOfProject;
  this.project.typeOfProject = projectFormValue.typeOfProject;
  this.project.budget = projectFormValue.budget;

  const apiUrl = `api/project/${this.project.id}`;
  this.repository.update(apiUrl, this.project)
    .subscribe(res => {
      $('#successModal').modal();
    },
    (error => {
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    })
  );
}

}



