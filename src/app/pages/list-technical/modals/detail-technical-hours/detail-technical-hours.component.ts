import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TechnicalService } from 'src/app/service/technical/technicalService.service';
import { TechinialDetail } from '../../config/TechinialDetail';



@Component({
  selector: 'app-detail-technical-hours',
  templateUrl: './detail-technical-hours.component.html',
  styleUrls: ['./detail-technical-hours.component.css']
})
export class DetailTechnicalHoursComponent implements OnInit {

  public techinialDetail: TechinialDetail;
  technicalDetailFrom: FormGroup;
  constructor(
    private fb: FormBuilder,
    private technicalService: TechnicalService,
    public dialogRf: MatDialogRef<DetailTechnicalHoursComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit(): void {
    this.validateForm();
  }

  /**
    * Metodo para validar los campos requeridos 
    */
  validateForm(): void {
    this.technicalDetailFrom = this.fb.group({
      wordIdentifyTechnical: ['', Validators.required],
      wordNumberWeek: ['', Validators.required],
    });
  console.log(this.technicalDetailFrom);
  
  }

  calculationHours(): void {
    this.technicalService.getTechnical(this.technicalDetailFrom.value.wordIdentifyTechnical,
      this.technicalDetailFrom.value.wordNumberWeek).then((rep:TechinialDetail )=>{

        this.techinialDetail =rep;
        console.log('Datos enviados', this.techinialDetail=rep);
        
      });
 
    console.log('Campos',this.technicalDetailFrom.value.wordIdentifyTechnical);
    console.log('Campos',this.technicalDetailFrom.value.wordNumberWeek);
  }


  onClickClose(): void {
    this.dialogRf.close();
  }


}
