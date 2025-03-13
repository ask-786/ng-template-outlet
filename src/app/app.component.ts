import { Component, inject, OnDestroy, resource, signal } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  firstValueFrom,
  map,
  Subject,
  takeUntil,
} from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { TableComponent } from './components/table/table.component';
import { DataService } from './services/data.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [TableComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {
  private dataService = inject(DataService);

  private destroy$ = new Subject();

  form = new FormGroup({
    name: new FormControl(''),
    country: new FormControl(''),
    company: new FormControl(''),
  });

  valueSignal = toSignal(
    this.form.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(
        (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr),
      ),
      takeUntil(this.destroy$),
    ),
  );

  users = resource({
    request: () => ({
      ...this.valueSignal(),
    }),
    defaultValue: [],
    loader: ({ request }) => {
      this.form.disable();
      return firstValueFrom(
        this.dataService
          .getUsers(request.name!, request.country!, request.company!)
          .pipe(
            map((val) => val.data.users),
            finalize(() => {
              this.form.enable();
            }),
          ),
      );
    },
  });

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
