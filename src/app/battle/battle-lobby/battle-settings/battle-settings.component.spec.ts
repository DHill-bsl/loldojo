import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleSettingsComponent } from './battle-settings.component';

describe('BattleSettingsComponent', () => {
  let component: BattleSettingsComponent;
  let fixture: ComponentFixture<BattleSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BattleSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BattleSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
