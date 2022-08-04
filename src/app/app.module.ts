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
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { DojoBattleComponent } from './dojo/dojo-battle/dojo-battle.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TemplateComponent } from './template/template.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { StyleService } from "./services/style.service";
import { DojoVictoryComponent } from './dojo/dojo-victory/dojo-victory.component';
import { ChampionService } from "./services/champion.service";
import { HttpClientModule } from "@angular/common/http";
import { LolPatchService } from "./services/lol-patch.service";
import { DojoBattleChampionComponent } from './dojo/dojo-battle/dojo-battle-champion/dojo-battle-champion.component';
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { QuoteComponent } from './quote/quote.component';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { BattleService } from "./services/battle.service";

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
  MatSidenavModule,
  MatTooltipModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatInputModule,
  MatProgressSpinnerModule
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
    TemplateComponent,
    ToolbarComponent,
    DojoVictoryComponent,
    DojoBattleChampionComponent,
    QuoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    ...AngularMaterialModules,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    AccountsFirestore,
    StyleService,
    ChampionService,
    LolPatchService,
    BattleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
