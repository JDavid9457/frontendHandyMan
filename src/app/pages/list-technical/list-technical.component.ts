import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { CreateTechnicalComponent } from './modals/create-technical/create-technical.component';
import { TechnicalService } from 'src/app/service/technical/technicalService.service';
import { DetailTechnicalHoursComponent } from './modals/detail-technical-hours/detail-technical-hours.component';


@Component({
  selector: 'app-list-technical',
  templateUrl: './list-technical.component.html',
  styleUrls: ['./list-technical.component.css']
})
export class ListTechnicalComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  public displayedColumns = ['identifyTechnical', 'identifyService', 'satartDate', 'endDate', 'numberWeek'];
  public dataSource = new MatTableDataSource();

  constructor(
    private technialService: TechnicalService,
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {

    this.getAllListTechnical();
  
  }

  /**
 * Metodo de obtener  los datos de la lista
 */
  getAllListTechnical() {
    this.technialService.getAllTechnicalList()
      .subscribe(resp => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.data = resp;
        console.log('Data', this.dataSource.data);
      });

  }

  openDialogRef(): void {

    const dialogRef = this.dialog.open(CreateTechnicalComponent, {
      width: '800px',
      height: '480px',

    });

  }

  

  openContentElement() {
    let dialogRef = this.dialog.open(DetailTechnicalHoursComponent,{
      width: '950px',
      height: '450px',
    });
   
  }
}
