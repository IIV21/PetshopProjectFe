import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  user = {} as any;
  updateProductID : number = 0;
  private messageSource = new BehaviorSubject<any>(this.user);
  private messageSource2 = new BehaviorSubject<number>(this.updateProductID);

  currentMessage = this.messageSource.asObservable();
  currentMessage2 = this.messageSource2.asObservable();

  constructor() {}

  changeMessage(user: any) {
    this.messageSource.next(user);
  }
  changeMessage2(updateProductID : number){
    this.messageSource2.next(updateProductID);
  }
}
