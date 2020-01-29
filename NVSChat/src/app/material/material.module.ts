import { NgModule } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list'; 
import {MatDividerModule, MatIconModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import {MatBadgeModule} from '@angular/material/badge'; 
import {MatDialogModule} from '@angular/material/dialog'; 
import {MatToolbarModule} from '@angular/material/toolbar'; 


@NgModule({
  imports: [  
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatSidenavModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatDialogModule,
    MatToolbarModule
  ],
  exports: [  
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatSidenavModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatDialogModule,
    MatToolbarModule
  ]
})
export class MaterialModule { }
