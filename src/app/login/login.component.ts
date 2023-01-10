import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { DataServiceService } from '../Services/data-service.service';
interface User {
  nume: string;
  prenume: string;
  parola: string;
  email: string;
  cnp: string;
  telefon: string;
  adresa: string;
  isLogged: boolean;
  administrator: boolean;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    Email: ['', Validators.required],
    Parola: ['', Validators.required],
  });

  loggedUser = {} as User;

  async loginUser() {
    let queryParams = new HttpParams();
    queryParams = queryParams
      .append('email', this.loginForm.value.Email!)
      .append('parola', this.loginForm.value.Parola!);
    this.loggedUser = await lastValueFrom(
      this.http.get<any>('https://localhost:7276/api/User/Login', {
        params: queryParams,
      })
    );
    if (this.loggedUser.isLogged == true) {
      this.dataService.changeMessage(this.loggedUser);
      await this.router.navigateByUrl('/main');
    }
  }

  async navigateRegister() {
    await this.router.navigateByUrl('/register');
  }
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private dataService: DataServiceService
  ) {}

  ngOnInit(): void {
    this.dataService.currentMessage.subscribe(
      (message) => (this.loggedUser = message)
    );
  }
}
