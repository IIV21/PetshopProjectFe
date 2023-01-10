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
  selector: 'app-my-cards',
  templateUrl: './my-cards.component.html',
  styleUrls: ['./my-cards.component.css'],
})
export class MyCardsComponent {
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
  async deleteUser() {
    await this.http
      .delete(`https://localhost:7276/api/User/DeleteUser/${this.user.id}`)
      .subscribe((res) => console.log(res));
    this.router.navigateByUrl('/login');
  }
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private dataService: DataServiceService
  ) {}
}
