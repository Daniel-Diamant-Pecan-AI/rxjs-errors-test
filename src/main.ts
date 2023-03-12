import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { of, Subject, switchMap, throwError } from 'rxjs';

let counter = 0;

function fetchData() {
  counter++;
  if (counter % 5 === 0) {
    return throwError(() => 'fail');
  }
  return of(counter);
}

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button (click)="click$.next(1)">refresh</button>
    data: {{data$ | async}}
  `,
})
export class App {
  public click$ = new Subject();
  public data$ = this.click$.pipe(switchMap(() => fetchData()));
}

bootstrapApplication(App);
