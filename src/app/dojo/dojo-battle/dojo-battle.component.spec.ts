import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DojoBattleComponent } from './dojo-battle.component';

describe('DojoBattleComponent', () => {
  let component: DojoBattleComponent;
  let fixture: ComponentFixture<DojoBattleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DojoBattleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DojoBattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
