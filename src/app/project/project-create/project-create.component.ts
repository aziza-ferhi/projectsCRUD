import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectForCreation } from './../../_interfaces/projectForCreation.model';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { RepositoryService } from './../../shared/services/repository.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']

})
export class ProjectCreateComponent implements OnInit {
  public errorMessage = '';

  public projectForm: FormGroup;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      nameOfPrject: new FormControl('', [Validators.required]),
      typeOfProject: new FormControl('', [Validators.required]),
      budget: new FormControl('', [Validators.required])
    });
  }

  public validateControl = (controlName: string) => {
    if (this.projectForm.controls[controlName].invalid && this.projectForm.controls[controlName].touched)
      {
        return true;
      }


    return false;
  }

  public hasError = (controlName: string, errorName: string) => {
    if (this.projectForm.controls[controlName].hasError(errorName))
      {
        return true;
      }

    return false;
  }

  public createProject = (projectFormValue) => {
    if (this.projectForm.valid) {
      this.executeProjectCreation(projectFormValue);
    }
  }

  private executeProjectCreation = (projectFormValue) => {
    const project: ProjectForCreation = {
      nameOfProject: projectFormValue.name,
      typeOfProject: projectFormValue.typeOfProject,
      budget: projectFormValue.budget
    }

    const apiUrl = 'api/project';
    this.repository.create(apiUrl, project)
      .subscribe(res => {
        $('#successModal').modal();
      },
      (error => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
    )
  }

  public redirectToProjectList(): void{
    this.router.navigate(['/project/list']);
  }

}
