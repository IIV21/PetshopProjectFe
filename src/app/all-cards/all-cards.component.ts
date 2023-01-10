import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataServiceService } from '../Services/data-service.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-all-cards',
  templateUrl: './all-cards.component.html',
  styleUrls: ['./all-cards.component.css'],
})
export class AllCardsComponent {
  cards: any[] = [];
  ngOnInit() {
    this.getAllCards();
  }
  async getAllCards() {
    this.cards = await lastValueFrom(
      this.http.get<any[]>('https://localhost:7276/api/Card')
    );
    console.log(this.cards);
  }
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private dataService: DataServiceService
  ) {}
}
