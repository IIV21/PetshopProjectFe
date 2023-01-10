import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm = this.fb.group({
    Email: ['', Validators.required],
    Parola: ['', Validators.required],
    Nume: ['', Validators.required],
    Prenume: ['', Validators.required],
    CNP: ['', Validators.required],
    Telefon: ['', Validators.required],
    Adresa: ['', Validators.required],
  });

  async registerUser() {
    console.log(this.registerForm.value);
    const url = 'https://localhost:7276/api/User/Register';
    this.http
      .post(url, this.registerForm.value)
      .subscribe((res) => console.log(res));

    this.router.navigateByUrl('login');
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}
}
