import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./components/layout/header/header.component";
import {DevExtremeModule} from "devextreme-angular";
import { DxButtonModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet, HeaderComponent,DevExtremeModule,DxButtonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'myproject';
}
