import { Investor } from './investor.model';
import { ReactiveFormsModule } from '@angular/forms';



export interface Project
{
  id: string;
  nameOfProject: string;
  typeOfProject: string;
  budget: string;
  investors?: Investor[];
}

