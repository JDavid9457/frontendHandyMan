import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule,NgxMatNativeDateModule  } from '@angular-material-components/datetime-picker';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { ListTechnicalComponent } from 'src/app/pages/list-technical/list-technical.component';
import { DefaultComponent } from './default.component';
import { CreateTechnicalComponent } from 'src/app/pages/list-technical/modals/create-technical/create-technical.component';
import { DetailTechnicalHoursComponent } from 'src/app/pages/list-technical/modals/detail-technical-hours/detail-technical-hours.component';

@NgModule({
    declarations: [
        DefaultComponent,
        HomeComponent,
        ListTechnicalComponent,
        CreateTechnicalComponent,
        DetailTechnicalHoursComponent,
  
    ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        MatSidenavModule,
        MatDividerModule,
        FlexLayoutModule,
        MatCardModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatSortModule,
        NgxMatDatetimePickerModule,
        NgxMatNativeDateModule,
        NgxMatTimepickerModule,
  
        
    ]

})

export class DefaultModule { }