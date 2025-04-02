import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '',
    loadChildren: () => import ('./authentication/authentication.module').then( (m) => m.AuthenticationModule)
  },
  { path: 'admin',
    loadChildren: () => import ('./admin/admin.module').then( (m) => m.AdminModule)
  },
 
  { path: 'designer',
    loadChildren: () => import ('./designer/designer.module').then( (m) => m.DesignerModule)
  },
  { path: 'developer',
    loadChildren: () => import ('./developer/developer.module').then( (m) => m.DeveloperModule)
  },
  { path: 'human-resourse',
    loadChildren: () => import ('./human-resourse/human-resourse.module').then( (m) => m.HumanResourseModule)
  }, 
  {
    path: '',
    redirectTo: 'authentication',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
