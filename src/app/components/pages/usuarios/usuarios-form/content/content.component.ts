import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  defaultForm: FormGroup;

  constructor(private usuariosService: UsuariosService, private router: Router) {

  }

  ngOnInit(): void {
    // Default Form
    this.defaultForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      apellido: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      usuario: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      pasword: new FormControl('', [
        Validators.required
      ]),
      tipo: new FormControl('1', [
        Validators.required
      ])
    });
  }
  onSubmit() {
    console.log(this.defaultForm);
    this.usuariosService.create(this.defaultForm)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['usuarios-list']);
      }, error => {
        console.log(error);
      });

  }
}
