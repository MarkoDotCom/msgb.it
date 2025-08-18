import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-resumen',
  imports: [CommonModule],
  templateUrl: './resumen.html',
  styleUrl: './resumen.scss',
})
export class Resumen implements OnInit {
  contenido = '';
  cargando = true;
  error?: string;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // OJO: tu config sirve archivos desde la raíz -> '/RESUMEN.csv'
    this.http.get('assets/RESUMEN.csv', { responseType: 'text' }).subscribe({
      next: (csv) => {
        const clean = csv.replace(/^\uFEFF/, ''); // quita BOM si existiera
        const parsed = Papa.parse(clean, {
          header: true,
          skipEmptyLines: true
        });
        const fila0 = (parsed.data as any[])[0] ?? {};
        this.contenido = (fila0['contenido'] ?? '').toString().trim();
        this.cargando = false;
      },
      error: (e) => {
        this.error = 'No se pudo cargar RESUMEN.csv';
        this.cargando = false;
        console.error(e);
      }
    });
  }

  // Parser simple (coma como separador, sin comillas escapadas)
  private parseCSV(csv: string): { headers: string[]; rows: any[] } {
    const lines = csv.trim().split(/\r?\n/);
    const headers = (lines.shift() ?? '').split(',').map((h) => h.trim());
    const rows = lines.map((line) => {
      const cols = line.split(',').map((c) => c.trim());
      return Object.fromEntries(headers.map((h, i) => [h, cols[i] ?? '']));
    });
    return { headers, rows };
  }
}
