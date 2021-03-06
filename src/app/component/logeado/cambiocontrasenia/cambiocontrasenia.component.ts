import { ListaEvaluacionesComponent } from './../../lista-evaluaciones/lista-evaluaciones.component';
import { PasswordService } from './../../../service/changePassword/password.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { HttpErrorResponse } from '@angular/common/http';
import { ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { EvaluacionProveedorComponent } from '../evaluacion-proveedor/evaluacion-proveedor.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cambiocontrasenia',
  templateUrl: './cambiocontrasenia.component.html',
  styleUrls: ['./cambiocontrasenia.component.less']
})
export class CambiocontraseniaComponent implements OnInit {
  displayedColumns: string[] = ['userProviderNit', 'userProviderName', 'UserProviderLastname', 'providertypeId', 'userProviderEmail', 'symbol', 'evaluationData'];
  dataTerceros: any;
  dataSource: MatTableDataSource<any>;
  pageSizeOptions: number[] = [5, 10, 20];
  length = 800;
  pageSize = 5;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog,
              public serviceTerceros: PasswordService,
              private changeDetectorRefs: ChangeDetectorRef,
              private router: Router) {}


    ngOnInit() {


    this.serviceTerceros.allPaginate(1).subscribe(
      (data: any) => {
       // this.spinnerService.hide();
        if (data) {
          console.log(data.listaUsuarios);
          this.dataTerceros = data.listaUsuarios;
          this.dataSource = new MatTableDataSource<any>(this.dataTerceros);
          this.dataSource.paginator = this.paginator;

        } else {



        }
      }, err => {
        // this.spinnerService.hide();
        swal({
          title: 'Error',
          text: 'Error registrando la autorización, por favor intente nuevamente',
          icon: 'warning',
        });
      });



  }

  openDialogAutorizacion(datoCita){

    console.log(datoCita);

    const dialogRef = this.dialog.open(EvaluacionProveedorComponent, {
      data: { datoCita },
      height: '500px',
      disableClose: true
    });

  }

  openDialogListaEvaluaciones(datoCita){

    this.router.navigate(['listaEvaluaciones', datoCita.userProviderNit]);

  }

  setPageSizeOptions(setPageSizeOptionsInput: any) {

    console.log("test1", setPageSizeOptionsInput.pageIndex);

    this.dataTerceros = null;
    this.serviceTerceros.allPaginate((setPageSizeOptionsInput.pageIndex))
            .subscribe((data: any) => {
            this.dataTerceros = data.listaUsuarios;
            this.dataSource = new MatTableDataSource<any>(this.dataTerceros);
          }, (error: HttpErrorResponse) => {
            setPageSizeOptionsInput.pageIndex -1;

            if (setPageSizeOptionsInput.pageIndex === 0) {

              this.serviceTerceros.allPaginate((setPageSizeOptionsInput.pageIndex + 1 ))
              .subscribe((data: any) => {
              this.dataTerceros = data.listaUsuarios;
              this.dataSource = new MatTableDataSource<any>(this.dataTerceros);
            })

            } else {

              this.serviceTerceros.allPaginate((setPageSizeOptionsInput.pageIndex -1 ))
              .subscribe((data: any) => {
              this.dataTerceros = data.listaUsuarios;
              this.dataSource = new MatTableDataSource<any>(this.dataTerceros);
            })

            }
         });

  }




}

/*
export interface PeriodicElement {
  userProviderNit: string;
  userProviderName: string;
  UserProviderLastname: string;
} */

export interface PeriodicElement {
  position: number;
  name: string;
  weight: string;
}


const ELEMENT_DATA: any[] = [
  {position: 1, name: 'Hydrogen', weight: 'Jurídica', symbol: 'diego.guiza@siscomputo.com'},
  {position: 2, name: 'Helium', weight: 'Jurídica', symbol: 'hugo.alarcon@siscomputo.com'},
  {position: 3, name: 'Lithium', weight: 'Natural', symbol: 'adn.alarcon@gmail.com'},
  {position: 4, name: 'Beryllium', weight: 'Jurídica', symbol: 'danigarcia_1@hotmail.com'},
  {position: 5, name: 'Boron', weight: 'Natural', symbol: 'prueba1@corre.com'},
  {position: 6, name: 'Carbon', weight: 'Jurídica', symbol: 'diego.guiza@siscomputo.com'},
  {position: 7, name: 'Nitrogen', weight: 'Jurídica', symbol: 'hugo.alarcon@siscomputo.com'},
  {position: 8, name: 'Oxygen', weight: 'Natural', symbol: 'adn.alarcon@gmail.com'},
  {position: 9, name: 'Fluorine', weight: 'Jurídica', symbol: 'danigarcia_1@hotmail.com'},
  {position: 10, name: 'Neon', weight: 'Natural', symbol: 'prueba1@corre.com'},
  {position: 11, name: 'Sodium', weight: 'Jurídica', symbol: 'diego.guiza@siscomputo.com'},
  {position: 12, name: 'Magnesium', weight: 'Natural', symbol: 'hugo.alarcon@siscomputo.com'},
  {position: 13, name: 'Aluminum', weight: 'Jurídica', symbol: 'adn.alarcon@gmail.com'},
  {position: 14, name: 'Silicon', weight: 'Natural', symbol: 'danigarcia_1@hotmail.com'},
  {position: 15, name: 'Phosphorus', weight: 'Jurídica', symbol: 'prueba1@corre.com'},
  {position: 16, name: 'Sulfur', weight: 'Natural', symbol: 'diego.guiza@siscomputo.com'},
  {position: 17, name: 'Chlorine', weight: 'Jurídica', symbol: 'hugo.alarcon@siscomputo.com'},
  {position: 18, name: 'Argon', weight: 'Jurídica', symbol: 'adn.alarcon@gmail.com'},
  {position: 19, name: 'Potassium', weight: 'Jurídica', symbol: 'danigarcia_1@hotmail.com'},
  {position: 20, name: 'Calcium', weight: 'Natural', symbol: 'prueba1@corre.com'},
];
