import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { createGetUsers, GET_USERS } from '../queries/users.queries';
import type { User } from '../models/users.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apollo = inject(Apollo);

  getUsers(name = '', country = '', company = '') {
    return this.apollo.query<{ users: User[] }>({
      query: createGetUsers(name, country, company),
    });
  }
}
