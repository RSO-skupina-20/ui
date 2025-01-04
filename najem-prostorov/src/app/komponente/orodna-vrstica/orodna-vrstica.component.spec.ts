import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrodnaVrsticaComponent } from './orodna-vrstica.component';

describe('OrodnaVrsticaComponent', () => {
  let component: OrodnaVrsticaComponent;
  let fixture: ComponentFixture<OrodnaVrsticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrodnaVrsticaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrodnaVrsticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
