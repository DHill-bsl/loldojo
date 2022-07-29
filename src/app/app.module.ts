import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AccountsFirestore } from './services/accounts.firestore';
import { AccountsComponent } from './accounts/accounts.component';
import { MatListModule } from '@angular/material/list';
import { BattleContainerComponent } from './battle-container/battle-container.component';
import { HallOfFameComponent } from './hall-of-fame/hall-of-fame.component';
import { BattleTableComponent } from './battle-table/battle-table.component';
import { DojoComponent } from './dojo/dojo.component';
import { MatStepperModule } from '@angular/material/stepper';
import { DojoWizardComponent } from './dojo/dojo-wizard/dojo-wizard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { DojoBattleComponent } from './dojo/dojo-battle/dojo-battle.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TemplateComponent } from './template/template.component';

const AngularMaterialModules = [
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatListModule,
  MatRippleModule,
  MatStepperModule,
  MatFormFieldModule,
  MatSelectModule,
  MatRadioModule,
  MatSidenavModule
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AccountsComponent,
    BattleContainerComponent,
    HallOfFameComponent,
    BattleTableComponent,
    DojoComponent,
    DojoWizardComponent,
    DojoBattleComponent,
    SidenavComponent,
    TemplateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ...AngularMaterialModules,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    AccountsFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
