import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  defaultForm: FormGroup;

  constructor() { }
  
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
      tipo: new FormControl('', [
        Validators.required
      ])
    });
  }
  onSubmit() {
    console.log(this.defaultForm);
  }
}
