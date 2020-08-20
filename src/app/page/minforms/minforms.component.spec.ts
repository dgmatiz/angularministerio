import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinformsComponent } from './forms.component';

describe('FormsComponent', () => {
  let component: MinformsComponent;
  let fixture: ComponentFixture<MinformsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinformsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
