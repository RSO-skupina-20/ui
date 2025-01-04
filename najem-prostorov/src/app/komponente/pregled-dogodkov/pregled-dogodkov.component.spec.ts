import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledDogodkovComponent } from './pregled-dogodkov.component';

describe('PregledDogodkovComponent', () => {
  let component: PregledDogodkovComponent;
  let fixture: ComponentFixture<PregledDogodkovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PregledDogodkovComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PregledDogodkovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
