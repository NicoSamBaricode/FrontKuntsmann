import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  closeResult: string;
  constructor(private modalService: NgbModal, private router: Router, private auth: AuthService) { }
  open(content: any) {
    this.modalService.open(content, { centered: true, windowClass: 'modal-min' });
  }
  loginForm: FormGroup;

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/home']);
    }


    // Login Form
    this.loginForm = new FormGroup({
      Email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      Password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]),
      recordar: new FormControl(false)
    });

    if (localStorage.getItem('email')) {
      this.loginForm.get('Email').setValue(localStorage.getItem('email'));
      this.loginForm.get('recordar').setValue(true);
    }

  }
  onSubmit() {
    this.auth.login(this.loginForm.value).subscribe(
      (resp: any) => {
        this.router.navigate(['/home']);
        if(this.loginForm.get('recordar').value){
          localStorage.setItem('email',this.loginForm.get('Email').value);
        }
      }, err => {
        Swal.fire({
          title: 'Error al ingresar',
          text: "Usuario o Contraseña incorrectos ",
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          
          
        }
        )
      }

    )
  }

  recordarValor(event) {
    if (event.checked) {
      
    } else {
      localStorage.removeItem('email');
    }
  }

  

}
