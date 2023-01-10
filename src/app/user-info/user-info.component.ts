import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataServiceService } from '../Services/data-service.service';
import { count, lastValueFrom } from 'rxjs';
interface Card {
  id: number;
  numarCard: string;
  detinator: string;
  cvv: string;
}
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent {
  cards: Card[] = [];
  user: any = {};

  ngOnInit() {
    this.dataService.currentMessage.subscribe(
      (message) => (this.user = message)
    );
    console.log('user', this.user);
    this.getCards();
  }

  async getCards() {
    this.cards = await lastValueFrom(
      this.http.get<Card[]>(`https://localhost:7276/api/Card/${this.user.id}`)
    );
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private dataService: DataServiceService
  ) {}
}
