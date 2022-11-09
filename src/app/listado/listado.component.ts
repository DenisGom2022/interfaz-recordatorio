import { Component, OnInit } from '@angular/core';
import { Recordatorio } from '../models/Recordatorio';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  public listado:Recordatorio[] = [];
  public modalVisible:boolean = false;
  public errorCampos:boolean = false;

  public recordatorio:Recordatorio;

  constructor(
    private servicio:DataServiceService
  ) { 
    this.recordatorio = new Recordatorio(null,"","","","");
  }

  ngOnInit(): void {
    this.obtenerDatos();
  }

  public obtenerDatos(){
    console.log("hola");
    this.servicio.getDatos().subscribe(res => {
      console.log(res);
      this.listado = res.data;
    }, err => {
      console.log("error")
      console.log(err);
    }) 
  }

  public cerrarForm(form:any){
    this.modalVisible=false;
    this.errorCampos = false;
  }

  public abrirModal(){
    this.recordatorio = new Recordatorio(null,"","","","");
    this.modalVisible=true;
  }

  public guardar(){
    if (this.recordatorio.id == null){
      //Guardar datos
      this.servicio.guardarDatos(this.recordatorio).subscribe(
        data => {
          this.obtenerDatos();
          this.cerrarForm(null);
          this.recordatorio = new Recordatorio(null,"","","","");
        }, 
        err => {
          this.errorCampos = true;
          console.log(err);
        }
      );
    } else {
    //Editar datos 
      this.servicio.editar(this.recordatorio).subscribe(
        data => {
          this.obtenerDatos();
          this.cerrarForm(null);
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  public editar(indice:number){
    this.recordatorio = this.listado[indice];
    this.modalVisible = true;

  }

  public eliminar(id:number){
    this.servicio.eliminar(id).subscribe(
      data => {
        console.log("todo bine " + data);
        this.obtenerDatos();
      },
      err => {
        console.log(err)
      }
    )
  }

}
