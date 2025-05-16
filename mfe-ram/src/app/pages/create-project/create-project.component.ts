import { Component, ViewChild, AfterViewInit } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MatTabsModule } from "@angular/material/tabs";
import { MatBadgeModule } from "@angular/material/badge";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatChip, MatChipRow } from "@angular/material/chips";
import { MatListModule } from "@angular/material/list";
import { CommonModule } from "@angular/common";

interface FilterButton {
  label: string;
  isActive: boolean;
}

@Component({
  selector: "app-create-project",
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    RouterModule,
    MatTabsModule,
    MatBadgeModule,
    MatExpansionModule,
    MatChipRow,
    MatChip,
    MatListModule,
  ],
  templateUrl: "./create-project.component.html",
  styleUrl: "./create-project.component.scss",
})
export class CreateProjectComponent implements AfterViewInit {
  displayedColumns: string[] = [
    "obstacleId",
    "type",
    "amsl",
    "mitigationAction",
    "completionDate",
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  defaultPageSize = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  mitigationFilters: FilterButton[] = [
    { label: "Bridge", isActive: false },
    { label: "Completed", isActive: true },
    { label: "Building", isActive: false },
    { label: "Power Line", isActive: false },
    { label: "Terminated", isActive: false },
  ];

  objectFilters: FilterButton[] = [
    { label: "Bridge", isActive: true },
    { label: "Completed", isActive: false },
    { label: "Building", isActive: false },
    { label: "Power Line", isActive: false },
    { label: "Terminated", isActive: false },
  ];

  toggleFilter(filter: FilterButton, filterType: "migration" | "object"): void {
    const filterArray =
      filterType === "migration" ? this.mitigationFilters : this.objectFilters;
    filterArray.forEach((f) => (f.isActive = f === filter));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}

const ELEMENT_DATA = [
  {
    obstacleId: "11-020178",
    type: "Tree",
    amsl: 853,
    mitigationAction: "Demolished",
    completionDate: "2024-07-25",
  },
  {
    obstacleId: "11-020179",
    type: "Building",
    amsl: 1200,
    mitigationAction: "Reinforced",
    completionDate: "2024-08-15",
  },
  {
    obstacleId: "11-020180",
    type: "Power Line",
    amsl: 900,
    mitigationAction: "Relocated",
    completionDate: "2024-09-10",
  },
  {
    obstacleId: "11-020181",
    type: "Pylon",
    amsl: 1500,
    mitigationAction: "Shielded",
    completionDate: "2024-10-05",
  },
  {
    obstacleId: "11-020182",
    type: "Water Tank",
    amsl: 1100,
    mitigationAction: "Lowered",
    completionDate: "2024-11-22",
  },
  {
    obstacleId: "11-020183",
    type: "Communication Tower",
    amsl: 1300,
    mitigationAction: "Replaced",
    completionDate: "2025-01-16",
  },
  {
    obstacleId: "11-020184",
    type: "Building",
    amsl: 950,
    mitigationAction: "Modified",
    completionDate: "2025-02-12",
  },
  {
    obstacleId: "11-020185",
    type: "Bridge",
    amsl: 1350,
    mitigationAction: "Reinforced",
    completionDate: "2025-03-20",
  },
  {
    obstacleId: "11-020186",
    type: "Tree",
    amsl: 800,
    mitigationAction: "Pruned",
    completionDate: "2025-04-05",
  },
  {
    obstacleId: "11-020187",
    type: "Building",
    amsl: 1400,
    mitigationAction: "Demolished",
    completionDate: "2025-05-15",
  },
  {
    obstacleId: "11-020188",
    type: "Power Line",
    amsl: 950,
    mitigationAction: "Undergrounded",
    completionDate: "2025-06-18",
  },
  {
    obstacleId: "11-020189",
    type: "Tank",
    amsl: 1200,
    mitigationAction: "Repaired",
    completionDate: "2025-07-30",
  },
  {
    obstacleId: "11-020190",
    type: "Wind Turbine",
    amsl: 1600,
    mitigationAction: "Decommissioned",
    completionDate: "2025-08-25",
  },
  {
    obstacleId: "11-020191",
    type: "Cell Tower",
    amsl: 1700,
    mitigationAction: "Relocated",
    completionDate: "2025-09-14",
  },
  {
    obstacleId: "11-020192",
    type: "Factory",
    amsl: 1250,
    mitigationAction: "Modified",
    completionDate: "2025-10-10",
  },
  {
    obstacleId: "11-020193",
    type: "Substation",
    amsl: 1100,
    mitigationAction: "Shielded",
    completionDate: "2025-11-21",
  },
];
