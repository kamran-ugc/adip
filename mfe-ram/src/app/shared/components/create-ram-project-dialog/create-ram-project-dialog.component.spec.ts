import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CreateRamProjectDialogComponent } from "./create-ram-project-dialog.component";

describe("CreateRamProjectDialogComponent", () => {
  let component: CreateRamProjectDialogComponent;
  let fixture: ComponentFixture<CreateRamProjectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRamProjectDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateRamProjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
