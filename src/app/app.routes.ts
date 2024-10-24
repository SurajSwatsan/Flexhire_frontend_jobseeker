import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DefaultLayoutComponent } from './common/default-layout/default-layout.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { NgModule } from '@angular/core';

 const routes: Routes = [

    {path:'', redirectTo:"deafault-layout", pathMatch:'full'},

    {path:'login', component:LoginComponent},
    {path:'forget-password', component:ForgetPasswordComponent},


    {path:'default-layout', component:DefaultLayoutComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]

})
export class AppRoutingModule{}