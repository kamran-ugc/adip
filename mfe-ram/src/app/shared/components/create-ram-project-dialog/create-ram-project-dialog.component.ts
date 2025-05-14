import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatIcon } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { Router } from "@angular/router";
import { MatChipsModule } from "@angular/material/chips";
import { MatDividerModule } from "@angular/material/divider";
@Component({
  selector: "app-create-ram-project-dialog",
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIcon,
    MatCardModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatDividerModule,
  ],
  templateUrl: "./create-ram-project-dialog.component.html",
  styleUrl: "./create-ram-project-dialog.component.scss",
})
export class CreateRamProjectDialogComponent {
  facilitySearch = "";
  facilities = [
    { id: "12NC", name: "ATLANTIC FLD", code: "MCO" },
    { id: "13NC", name: "OAK GROVE", code: "MOC" },
    { id: "14NC", name: "CAMP DAVIS MCOLF", code: "" },
    { id: "2VA6", name: "NIMCOCK", code: "" },
    { id: "80PA", name: "PAMCO PA", code: "" },
  ];
  filteredFacilities = this.facilities;
  favoriteFacilities = [
    { code: "JAX", name: "JACKSONVILLE INTL" },
    { code: "MCO", name: "ORLANDO INTL" },
    { code: "MIA", name: "MIAMI INTL" },
    { code: "FLL", name: "FORT LAUDERDALE-HOLLYWOOD" },
  ];

  constructor(
    public dialogRef: MatDialogRef<CreateRamProjectDialogComponent>,
    private router: Router
  ) {}

  onSearchChange(value: string) {
    this.filteredFacilities = this.facilities.filter((f) =>
      (f.id + " - " + f.name + " " + f.code)
        .toLowerCase()
        .includes(value.toLowerCase())
    );
  }

  selectFacility(facility: any) {
    this.facilitySearch =
      `${facility.id} - ${facility.name} ${facility.code}`.trim();
    this.dialogRef.close();

    this.router.navigate([`/ram/create-project`]);
    // Optionally, set other fields here
  }

  selectFacilityFromFavorite(facility: any) {
    this.facilitySearch = `${facility.code} - ${facility.name}`;
    this.dialogRef.close();
    this.router.navigate([`/ram/create-project`]);
    // Optionally, trigger search or close dialog, etc.
  }

  highlightMatch(text: string): string {
    if (!this.facilitySearch) return text;
    const search = this.facilitySearch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // escape regex
    return text.replace(
      new RegExp(search, "gi"),
      (match) => `<span class="highlight">${match}</span>`
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(this.facilitySearch);
  }
}
