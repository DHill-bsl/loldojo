import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DojoBattleChampionComponent } from './dojo-battle-champion.component';

describe('DojoBattleChampionComponent', () => {
  let component: DojoBattleChampionComponent;
  let fixture: ComponentFixture<DojoBattleChampionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DojoBattleChampionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DojoBattleChampionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
