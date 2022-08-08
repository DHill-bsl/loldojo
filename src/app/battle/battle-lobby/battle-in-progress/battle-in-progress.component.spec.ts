import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleInProgressComponent } from './battle-in-progress.component';

describe('BattleInProgressComponent', () => {
  let component: BattleInProgressComponent;
  let fixture: ComponentFixture<BattleInProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BattleInProgressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BattleInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
