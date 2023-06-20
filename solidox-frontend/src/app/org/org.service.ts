import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Org } from './org.model';

@Injectable({
  providedIn: 'root',
})
export class OrgService {
  constructor(private apiService: ApiService) {}

  async get(id: string) {
    const result = await this.apiService.get('/org/' + id);
    return Org.fromJson(result.data);
  }
}
