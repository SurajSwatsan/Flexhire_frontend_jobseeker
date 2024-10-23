import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [HeaderComponent, RouterModule],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss'
})
export class DefaultLayoutComponent {

}
