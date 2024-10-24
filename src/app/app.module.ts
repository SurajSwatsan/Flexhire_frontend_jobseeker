import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { LoginComponent } from './pages/login/login.component';
import { MessagesModule } from 'primeng/messages';
import { AppRoutingModule } from './app.routes';
import { DefaultLayoutComponent } from './common/default-layout/default-layout.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { MenubarModule } from 'primeng/menubar';


@NgModule({
  declarations: [AppComponent, ForgetPasswordComponent, LoginComponent,DefaultLayoutComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule, 
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,  
    InputTextModule, 
    PasswordModule, 
    MessageModule, 
    ButtonModule,
    ToggleButtonModule,
    MessagesModule,
    AppRoutingModule,
    MenubarModule,
  ],
  providers:[],
  bootstrap:[AppComponent]
})
export class AppModule { }
