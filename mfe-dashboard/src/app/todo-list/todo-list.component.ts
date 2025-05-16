import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { SelectionModel } from "@angular/cdk/collections";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { NgChartsModule } from "ng2-charts";
import { ChartConfiguration, ChartType } from "chart.js";

export interface ProjectData {
  id: string;
  facility: string;
  projectType: string;
  projectId: string;
  status: string;
  progress: string;
  date: string;
}

interface StatusStyle {
  color: string;
  background: string;
}

/** Constants used to fill up our data base. */

const NAMES: string[] = [
  "TWD",
  "WDR",
  "ACH",
  "IUQ",
  "PRS",
  "ABY",
  "APU",
  "XYZ",
  "ABC",
  "DEF",
  "GHI",
  "JKL",
  "MNO",
  "PQR",
  "STU",
  "VWX",
  "YZA",
  "BCD",
  "EFG",
];

const STATUS: string[] = [
  "In Progress",
  "Completed",
  "On Hold",
  "Cancelled",
  "Not Started",
  "Under Review",
  "Pending Approval",
  "Approved",
  "Rejected",
  "Delayed",
];

const STATUS_STYLES: { [key: string]: StatusStyle } = {
  "In Progress": { color: "#FF9800", background: "#FFF3E0" },
  Completed: { color: "#4CAF50", background: "#E8F5E9" },
  "On Hold": { color: "#9C27B0", background: "#F3E5F5" },
  Cancelled: { color: "#F44336", background: "#FFEBEE" },
  "Not Started": { color: "#607D8B", background: "#ECEFF1" },
  "Under Review": { color: "rgb(106 0 255)", background: "rgb(237 229 250)" },
  "Pending Approval": { color: "#FFC107", background: "#FFF8E1" },
  Approved: { color: "#4CAF50", background: "#E8F5E9" },
  Rejected: { color: "#F44336", background: "#FFEBEE" },
  Delayed: { color: "#FF5722", background: "#FBE9E7" },
};

@Component({
  selector: "app-todo-list",
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    NgChartsModule,
  ],
  templateUrl: "./todo-list.component.html",
  styleUrl: "./todo-list.component.scss",
})
export class TodoListComponent implements AfterViewInit {
  displayedColumns: string[] = [
    "select",
    "facility",
    "projectType",
    "projectId",
    "status",
    "progress",
    "date",
  ];
  dataSource: MatTableDataSource<ProjectData>;
  selection = new SelectionModel<ProjectData>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  chartData: ChartConfiguration<"line">["data"] = {
    labels: ["January", "February", "March"],
    datasets: [
      { 
        data: [6, 100, 80], 
        label: "Blocked Items",
        borderColor: '#e62e2e',
        backgroundColor: 'rgba(230, 46, 46, 0.1)',
      },
      { 
        data: [1, 23, 90], 
        label: "Revisions Needed",
        borderColor: '#8833ff',
        backgroundColor: 'rgba(136, 51, 255, 0.1)',
      },
      { 
        data: [3, 48, 50], 
        label: "Submissions in Progress",
        borderColor: '#ffcb33',
        backgroundColor: 'rgba(255, 203, 51, 0.1)',
      },
    ],
  };

  chartLabels: string[] = ["January", "February", "March"];

  chartOptions: ChartConfiguration<"line">["options"] = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#4d5e80', // gray-50
        bodyColor: '#8c99b3', // gray-70
        borderColor: '#ebecf0', // gray-94
        borderWidth: 1,
        padding: 10,
        displayColors: true,
        titleFont: {
          family: 'Roboto, "Helvetica Neue", sans-serif',
          size: 14
        },
        bodyFont: {
          family: 'Roboto, "Helvetica Neue", sans-serif',
          size: 12
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#8c99b3', // Explicit gray-70 color
          font: {
            family: 'Roboto, "Helvetica Neue", sans-serif',
            size: 12,
            weight: '400'
          }
        }
      },
      y: {
        grid: {
          display: false
        },
        ticks: {
          color: '#8c99b3', // Explicit gray-70 color
          font: {
            family: 'Roboto, "Helvetica Neue", sans-serif',
            size: 12,
            weight: '400'
          }
        }
      }
    }
  };

  chartType: "line" = "line";

  constructor() {
    // Create 100 users
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  getStatusStyle(status: string) {
    return STATUS_STYLES[status] || { color: "#000000", background: "#FFFFFF" };
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ProjectData): string {
    if (!row) {
      return `${this.isAllSelected() ? "deselect" : "select"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
      row.id
    }`;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
/** Builds and returns a new User. */
function createNewUser(id: number): ProjectData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))];
  const status = STATUS[Math.round(Math.random() * (STATUS.length - 1))];

  return {
    id: id.toString(),
    facility: name,
    projectType: "ADM",
    projectId: "TWD_2025_" + Math.round(Math.random() * 100).toString(),
    status: status,
    progress: "0",
    date: new Date().toLocaleDateString(),
  };
}
