import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { SocialMedia } from '../model/socialMedia';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private jsonUrl = 'assets/data/employee.json';
  private dataSubject: BehaviorSubject<SocialMedia[]> = new BehaviorSubject<SocialMedia[]>([]);

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  getLocalData(): SocialMedia[] {
    const localData = this.localStorageService.getData();
    return localData || [];
  }

  private saveLocalData(data: SocialMedia[]): void {
    this.localStorageService.saveData(data);
    this.dataSubject.next(data);
  }

  getDataEmployees(): Observable<SocialMedia[]> {
    return this.dataSubject.asObservable();
  }

  addData(newData: SocialMedia): void {
    const currentData = this.getLocalData();
    currentData.push(newData);
    this.saveLocalData(currentData);
  }
}
