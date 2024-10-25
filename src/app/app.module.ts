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
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';


@NgModule({
  declarations: [AppComponent, ForgetPasswordComponent, LoginComponent, DefaultLayoutComponent, HeaderComponent, FooterComponent],
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
    RouterModule,
    ToastModule,
    HttpClientModule,
    RippleModule
  ],
  providers:[MessageService],
  bootstrap:[AppComponent]
})
export class AppModule { }
