import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  contentChild,
  effect,
  input,
  signal,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-table',
  imports: [NgTemplateOutlet],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  styles: [
    `
      host {
        max-height: 100%;
      }
    `,
  ],
})
export class TableComponent<T extends { [key: string]: any }> {
  title = input('Table');
  data = input.required<T[]>();

  header = contentChild<TemplateRef<any>>('header');
  body = contentChild<TemplateRef<any>>('body');

  headers = signal<string[]>([]);

  eff = effect(() => {
    const data = this.data();
    console.log(data);
    this.setHeaders(data);
  });

  setHeaders(data: T[]) {
    const firstElem = data[0];
    if (
      typeof firstElem === 'object' &&
      firstElem !== null &&
      !Array.isArray(firstElem)
    ) {
      this.headers.set(Object.keys(firstElem));
    }
  }
}
