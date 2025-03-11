import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { User } from './models/users.model';
import { TableComponent } from './components/table/table.component';
import { DataService } from './services/data.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [TableComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  private dataService = inject(DataService);

  private destroy$ = new Subject();

  loading = signal(false);

  users = signal<User[]>([]);

  form = new FormGroup({
    name: new FormControl(''),
    country: new FormControl(''),
    company: new FormControl(''),
  });

  ngOnInit(): void {
    this.getUsers();
    this.listenForm();
  }

  listenForm() {
    this.form.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr),
        ),
        takeUntil(this.destroy$),
      )
      .subscribe((val) => {
        this.getUsers(val.name!, val.country!, val.company!);
      });
  }

  getUsers(name = '', country = '', company = '') {
    console.log(name, country, company);
    this.dataService
      .getUsers(name, country, company)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.users.update((val) => [...res.data.users]);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
