import { TuiRoot } from "@taiga-ui/core";
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Resumen } from "./resumen/resumen";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRoot, Resumen],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('msgb.it');
}
