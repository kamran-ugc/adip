import { Component, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
interface RamProject {
  ramId: string;
  facilityId: string;
  facilityName: string;
  state: string;
  type: string;
  totalObjects: number;
  createdBy: string;
  createdOn: string;
  lastUpdatedBy: string;
  lastModified: string;
  workflowStatus: string;
}

@Component({
  selector: "app-project-list",
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
    ReactiveFormsModule,
  ],
  templateUrl: "./project-list.component.html",
  styleUrl: "./project-list.component.scss",
  standalone: true,
})
export class ProjectListComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<RamProject>;
  selectedFilter = "ramId";
  filterText = "";

  filterOptions = [
    { value: "ramId", viewValue: "RAM ID" },
    { value: "facilityId", viewValue: "Facility ID" },
    { value: "name", viewValue: "Facility Name" },
    { value: "state", viewValue: "State" },
    { value: "type", viewValue: "Type" },
    { value: "totalObjects", viewValue: "Total Objects" },
    { value: "createdBy", viewValue: "Created By" },
    { value: "createdOn", viewValue: "Created On" },
    { value: "lastUpdatedBy", viewValue: "Last Updated By" },
    { value: "lastModified", viewValue: "Last Modified" },
    { value: "workflowStatus", viewValue: "Workflow Status" },
  ];

  displayedColumns: string[] = [
    "ramId",
    "facilityId",
    "facilityName",
    "state",
    "type",
    "totalObjects",
    "createdBy",
    "createdOn",
    "lastUpdatedBy",
    "lastModified",
    "workflowStatus",
  ];

  constructor() {
    this.dataSource = new MatTableDataSource(this.data);
  }

  data: RamProject[] = [
    {
      ramId: "ISM-2024-OMP-642",
      facilityId: "ISM",
      facilityName: "KISSIMMEE GATEWAY",
      state: "FL",
      type: "Obstacle Management",
      totalObjects: 3,
      createdBy: "Shaun Germolus",
      createdOn: "2024-06-13",
      lastUpdatedBy: "Vani DEV Kanuparthy",
      lastModified: "2024-07-25",
      workflowStatus: "Draft",
    },
    {
      ramId: "XVG-2025-OMP-690",
      facilityId: "XVG",
      facilityName: "LONGVILLE MUNI",
      state: "MN",
      type: "Obstacle Management",
      totalObjects: 2,
      createdBy: "System User",
      createdOn: "2024-07-26",
      lastUpdatedBy: "Vani DEV Kanuparthy",
      lastModified: "2025-03-21",
      workflowStatus: "Draft",
    },
    {
      ramId: "MPL-2024-OMP-233",
      facilityId: "MPL",
      facilityName: "MAPLETON AIRFIELD",
      state: "OH",
      type: "Obstacle Management",
      totalObjects: 3,
      createdBy: "Anna Smith",
      createdOn: "2024-08-01",
      lastUpdatedBy: "Vani DEV Kanuparthy",
      lastModified: "2024-09-30",
      workflowStatus: "Final Review",
    },
    {
      ramId: "DDH-2024-OMP-676",
      facilityId: "DDH",
      facilityName: "WILLIAM H MORSE STATE",
      state: "VT",
      type: "Obstacle Management",
      totalObjects: 2,
      createdBy: "System User",
      createdOn: "2024-07-24",
      lastUpdatedBy: "Vani DEV Kanuparthy",
      lastModified: "2024-07-24",
      workflowStatus: "Sponsor Review",
    },
    {
      ramId: "BHF-2024-OMP-800",
      facilityId: "BHF",
      facilityName: "BRADFORD HOSPITAL",
      state: "PA",
      type: "Obstacle Management",
      totalObjects: 1,
      createdBy: "Rachel Green",
      createdOn: "2024-08-10",
      lastUpdatedBy: "Vani DEV Kanuparthy",
      lastModified: "2024-12-01",
      workflowStatus: "Final Review",
    },
    {
      ramId: "QRP-2024-OMP-555",
      facilityId: "QRP",
      facilityName: "QUEEN RIVER PARK",
      state: "TX",
      type: "Obstacle Management",
      totalObjects: 4,
      createdBy: "Tom Hardy",
      createdOn: "2024-09-15",
      lastUpdatedBy: "Vani DEV Kanuparthy",
      lastModified: "2024-11-20",
      workflowStatus: "Under Review",
    },
    {
      ramId: "LKP-2024-OMP-789",
      facilityId: "LKP",
      facilityName: "LAKEVIEW PARK",
      state: "CA",
      type: "Obstacle Management",
      totalObjects: 5,
      createdBy: "Cathy Nguyen",
      createdOn: "2024-07-30",
      lastUpdatedBy: "Vani DEV Kanuparthy",
      lastModified: "2024-10-10",
      workflowStatus: "Sponsor Review",
    },
    {
      ramId: "RDT-2023-OMP-412",
      facilityId: "RDT",
      facilityName: "REDWOOD STRATEGY",
      state: "WA",
      type: "Obstacle Management",
      totalObjects: 2,
      createdBy: "Henry Ford",
      createdOn: "2024-07-29",
      lastUpdatedBy: "Vani DEV Kanuparthy",
      lastModified: "2024-11-12",
      workflowStatus: "Draft",
    },
  ];

  ngOnInit() {
    this.dataSource.filterPredicate = (data: RamProject, filter: string) => {
      const filterObj = JSON.parse(filter);
      const filterValue = filterObj.value.trim().toLowerCase();
      const filterKey = filterObj.key;
      if (!filterValue) return true;
      let dataValue = "";
      switch (filterKey) {
        case "ramId":
          dataValue = data.ramId;
          break;
        case "facilityId":
          dataValue = data.facilityId;
          break;
        case "name":
          dataValue = data.facilityName;
          break;
        case "state":
          dataValue = data.state;
          break;
        case "type":
          dataValue = data.type;
          break;
        case "totalObjects":
          dataValue = data.totalObjects.toString();
          break;
        case "createdBy":
          dataValue = data.createdBy;
          break;
        case "createdOn":
          dataValue = data.createdOn;
          break;

        case "lastUpdatedBy":
          dataValue = data.lastUpdatedBy;
          break;
        case "lastModified":
          dataValue = data.lastModified;
          break;

        case "workflowStatus":
          dataValue = data.workflowStatus;
          break;
        case "createdBy":
          dataValue = data.createdBy;
          break;
        case "createdOn":
          dataValue = data.createdOn;
          break;

        default:
          dataValue = "";
      }
      return dataValue.toLowerCase().includes(filterValue);
    };
  }

  onFilterByChange() {
    this.applyTableFilter();
  }

  applyTableFilter() {
    this.dataSource.filter = JSON.stringify({
      key: this.selectedFilter,
      value: this.filterText,
    });
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
