import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TechnicalService } from 'src/app/service/technical/technicalService.service';
import { TechnicalDayWord } from '../../config/TechnicalDayWord';

@Component({
  selector: 'app-create-technical',
  templateUrl: './create-technical.component.html',
  styleUrls: ['./create-technical.component.css']
})
export class CreateTechnicalComponent implements OnInit {


  technicalFrom: FormGroup;

  private technicalDayWord: TechnicalDayWord[] = [];
  private dayByHour = 0;
  private nightByHour = 0;
  private sundayByHour = 0;



  constructor(
    private fb: FormBuilder,
    private technicalService: TechnicalService,
    public dialogRf: MatDialogRef<CreateTechnicalComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string,

  ) {

  }

  ngOnInit(): void {
    this.validateForm();
    this.validateDate();
  }


  /**
   * Metodo para validar los campos requeridos 
   */
  validateForm(): void {
    this.technicalFrom = this.fb.group({
      wordIdentifyTechnical: ['', Validators.required],
      wordIdentifyService: ['', Validators.required],
      wordStartDate: ['', Validators.required],
      wordEndDate: ['', Validators.required],
    });

  }

  /**
   * Metodo encargado de validar la fechas
   */
  validateDate(): void {
    this.technicalFrom.controls.wordEndDate.valueChanges.subscribe((value) => {
      if (this.technicalFrom.controls.wordStartDate.value) {
        if (value && value <= this.technicalFrom.controls.wordStartDate.value) {
          this.technicalFrom.controls.wordEndDate.setErrors({ oldDate: true });
        } else {
          this.technicalFrom.controls.wordEndDate.setErrors(null);
        }
      }
    });

    this.technicalFrom.controls.wordStartDate.valueChanges.subscribe((value) => {
      if (this.technicalFrom.controls.wordEndDate.value) {
        if (value && value >= this.technicalFrom.controls.wordEndDate.value) {
          this.technicalFrom.controls.wordEndDate.setErrors({ oldDate: true });
        } else {
          this.technicalFrom.controls.wordEndDate.setErrors(null);
        }
      }
    });
  }

  /**
   * 
   * @param date 
  */
  getDayByHours(date: Date): Date {
    const dayBy = new Date(date.getTime());
    dayBy.setHours(23, 59, 59);
    return dayBy;
  }


  /**
   * 
   */
  getDateweek(date: Date): number {
    const time = new Date(date);
    time.setHours(0, 0, 0, 0);
    time.setDate(time.getDate() + 3 - (time.getDay() + 6) % 7);
    const newWeek = new Date(time.getFullYear(), 0, 4);
    return 1 + Math.round(((time.getTime() - newWeek.getTime()) / 86400000 - 3 + (newWeek.getDay() + 6) % 7) / 7);

  }

  /**
   * 
   */
  private getTypeHorus(hour: number, day: number): string {

    if(day ===0){
      return 'A';
    }else{
      if(hour >= 7 && hour <=19){
        return'B';
      }else{
        return 'N';
      }
    }
  }


  /**
   * 
   * @param startH 
   * @param endH 
   * @param day 
   */
  private timeByWork(startH: number, endH: number, day: number): void {
    for(let i = startH; i <  endH; i++){
      switch(this.getTypeHorus(i, day)){
        case 'A':
          this.sundayByHour++;
        break;
        case 'B':
          this.dayByHour++;
        break;
        case 'C':
          this.nightByHour++;
        break;
      }
    }
  }

  /***
   * 
   */
  private minutesWord(date: Date, minutes: boolean, hors?: Date): void {

    let num: number;
    if (hors) {
      num = (hors.getMinutes() - date.getMinutes()) / 60;
    } else {
      num = minutes ? (60 - date.getMinutes()) / 60 : date.getMinutes() / 60;
    }
    switch (this.getTypeHorus(date.getHours(), date.getDay())) {

      case 'A':
        this.sundayByHour = this.sundayByHour + num;
        break;

      case 'B':
        this.dayByHour = this.dayByHour + num;
        break;
      case 'C':
        this.nightByHour = this.nightByHour + num;
        break;
    }
    if (minutes) {
      date.setHours(date.getHours() + 1);
    }

  }

  /**
   * Metodo encardo  de guardar los del técnico
   */
  save() {
    this.calculateByService(new Date(this.technicalFrom.value.wordStartDate),
      new Date(this.technicalFrom.value.wordEndDate));

    //se llama el servico 
    this.technicalService.save({
      identifyTechnical: this.technicalFrom.value.wordIdentifyTechnical,
      identifyService: this.technicalFrom.value.wordIdentifyService,
      workedDays: this.technicalDayWord
     
    });
    this.technicalDayWord = [];
    this.dialogRf.close();
  }




  /**
   * 
   */
  private saveDaywork(startDate: Date, endDate: Date) {
    this.technicalDayWord.push({
      numberWeek: this.getDateweek(startDate),
      dayByHour: Number(this.dayByHour.toFixed(1)),
      nightByHour: Number(this.nightByHour.toFixed(1)),
      sundayByHour: Number(this.sundayByHour.toFixed(1)),
      startDate,
      endDate
    });
    this.dayByHour = 0;
    this.nightByHour = 0;
    this.sundayByHour = 0;
  }


  /**
   * 
   * 2
   * 
   */
  private calculateByTechnicalAndDay(starDate: Date, endDate: Date): void {

    let dateN: Date;
    if(starDate.getHours()=== endDate.getHours()){
      this.minutesWord(starDate, false, endDate)
    }else{
      if(starDate.getMinutes()!==0){
        dateN = new Date(starDate);
        this.minutesWord(starDate, true);
      }
      this.timeByWork(starDate.getHours(), endDate.getHours(), starDate.getDay());
      if(endDate.getMinutes()!==0){
        this.minutesWord(starDate, false);
      }
    }
    this.saveDaywork(dateN ? dateN : starDate, endDate);
  }





  /**
   * 
   *
   */
  private calculateByService(startDate: Date, endDate: Date): void {
  
    if (startDate.getFullYear() === endDate.getFullYear()
      && startDate.getMonth() === endDate.getMonth()
      && startDate.getDate() === endDate.getDate()) {

      this.calculateByTechnicalAndDay(startDate, endDate);

    } else {
      this.calculateByTechnicalAndDay(startDate, this.getDayByHours(startDate));
      startDate.setDate(startDate.getDate() + 1);
      startDate.setHours(0, 0, 0);

      while (startDate.getDate() !== endDate.getDate()) {
        this.calculateByTechnicalAndDay(startDate, this.getDayByHours(startDate));
        startDate.setDate(startDate.getDate() + 1);
        startDate.setHours(0, 0, 0);
      }
    }
    this.calculateByTechnicalAndDay(startDate, endDate);
  }

  /**
    * permite cerrar la ventana del dialog
    */
  onClickClose(): void {
    this.dialogRf.close();
  }

}
