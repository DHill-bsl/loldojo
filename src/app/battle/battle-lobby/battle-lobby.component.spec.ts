import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleLobbyComponent } from './battle-lobby.component';

describe('BattleLobbyComponent', () => {
  let component: BattleLobbyComponent;
  let fixture: ComponentFixture<BattleLobbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BattleLobbyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BattleLobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
