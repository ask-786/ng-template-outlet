import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_USERS } from './queries/users.queries';
import { Subject, takeUntil } from 'rxjs';
import { User } from './models/users.model';
import { TableComponent } from './components/table/table.component';

@Component({
  selector: 'app-root',
  imports: [TableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  private apollo = inject(Apollo);

  private destroy$ = new Subject();

  loading = signal(false);

  users = signal<User[]>([]);

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.apollo
      .watchQuery<{ users: User[] }>({
        query: GET_USERS,
      })
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.users.update((val) => [...val, ...res.data.users]);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
