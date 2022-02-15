import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  defaultForm: FormGroup;

  update = false // para saber si es crear o actualizar
  constructor(private usuariosService: UsuariosService, private router: Router, private activatedRoute: ActivatedRoute) { 

  }

  ngOnInit(): void {
    // Default Form
    const params = this.activatedRoute.snapshot.params; // para obtener la id del usuario

    if (params.id) {
    this.getUsusario(params.id) // para obtener el usuario
    this.update = true
    }else{
      this.update = false
    }

    this.defaultForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      apellido: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
      rol: new FormControl('1', [
        Validators.required
      ]),
      estado: new FormControl('1')
      
    });
  }
  onSubmit() {
    if (this.update) {

      this.usuariosService.update(this.activatedRoute.snapshot.params.id, this.defaultForm.value)
        .subscribe((response:any) => {
          console.log(response);
          this.router.navigate(['/usuarios-list']);
        },err=>{
          console.log(err);
        })

    }else{

      this.usuariosService.create(this.defaultForm.value)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['usuarios-list']);
      }, error => {
        console.log(error);
      });
    }

  }

  getUsusario(id:string) {
    this.usuariosService.getOne(id)
      .subscribe((response:any) => {
        let data = response.result[0]
        
        this.defaultForm.controls["nombre"].setValue(data["nombre"]);
        this.defaultForm.controls["apellido"].setValue(data["apellido"]);
        this.defaultForm.controls["email"].setValue(data["email"]);
        this.defaultForm.controls["rol"].setValue(data["rol_id"]);
        this.defaultForm.controls["estado"].setValue(data["estado"]);
        console.log(response);
      }, error => {
        console.log(error);
      });
  }
  
}
