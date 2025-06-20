import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

interface MosProject {
  mosId: string;
  locId: string;
  facilityName: string;
  aciesNo: string;
  category: string;
  acChapter: string;
  sponsor: string;
  state: string;
  lastModified: string;
  status: string;
  reviewDate: string;
  workflow: string;
}

@Component({
  selector: "app-project-list-simple",
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container-fluid px-4 py-3">
      <!-- Header Section -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div class="d-flex align-items-center">
          <h3 class="bold-18 text-gray-50 mb-0 me-3">My Active Projects</h3>
          <span class="badge bg-primary">MOS</span>
        </div>
        <div class="d-flex gap-2">
          <span class="badge bg-secondary">MOS</span>
          <span class="badge bg-light text-dark">Legacy</span>
        </div>
      </div>

      <!-- Simple Filter -->
      <div class="card mb-4">
        <div class="card-body">
          <div class="row">
            <div class="col-md-6">
              <label class="form-label bold-13">Filter by Status:</label>
              <select class="form-select" [(ngModel)]="selectedStatus">
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label bold-13">Search:</label>
              <input type="text" class="form-control" [(ngModel)]="searchText" placeholder="Search MOS ID or Facility">
            </div>
          </div>
        </div>
      </div>

      <!-- Simple Table -->
      <div class="card">
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover mb-0">
              <thead class="table-light">
                <tr>
                  <th class="bold-12 text-gray-70">MOS ID</th>
                  <th class="bold-12 text-gray-70">Loc ID</th>
                  <th class="bold-12 text-gray-70">Facility Name</th>
                  <th class="bold-12 text-gray-70">Category</th>
                  <th class="bold-12 text-gray-70">Sponsor</th>
                  <th class="bold-12 text-gray-70">State</th>
                  <th class="bold-12 text-gray-70">Status</th>
                  <th class="bold-12 text-gray-70">Workflow</th>
                  <th class="bold-12 text-gray-70">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let project of filteredProjects" class="hover-row">
                  <td class="bold-12 text-primary">
                    <a [routerLink]="['../project', project.mosId]" class="text-primary text-decoration-none">
                      {{ project.mosId }}
                    </a>
                  </td>
                  <td class="regular-12 text-gray-50">{{ project.locId }}</td>
                  <td class="regular-12 text-gray-50">{{ project.facilityName }}</td>
                  <td class="regular-12 text-gray-50">{{ project.category }}</td>
                  <td class="regular-12 text-gray-50">{{ project.sponsor }}</td>
                  <td class="regular-12 text-gray-50">{{ project.state }}</td>
                  <td>
                    <span [class]="getStatusBadgeClass(project.status)" class="bold-12">
                      {{ project.status }}
                    </span>
                  </td>
                  <td>
                    <span [class]="getWorkflowBadgeClass(project.workflow)" class="bold-12">
                      {{ project.workflow }}
                    </span>
                  </td>
                  <td>
                    <div class="dropdown">
                      <button class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        Actions
                      </button>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">View</a></li>
                        <li><a class="dropdown-item" href="#">Edit</a></li>
                        <li><a class="dropdown-item text-danger" href="#">Delete</a></li>
                      </ul>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Pagination Info -->
      <div class="mt-3">
        <div class="regular-12 text-gray-60">
          Showing {{ filteredProjects.length }} of {{ mockData.length }} results
        </div>
      </div>
    </div>
  `,
  styles: [`
    .hover-row:hover {
      background-color: #f8f9fa !important;
    }
    
    .card {
      border-radius: 8px;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
      border: none;
    }
    
    .table {
      border: none;
    }
    
    .table thead th {
      border-bottom: 1px solid var(--gray-94, #ebecf0);
      background-color: #f8f9fa;
      border-right: none;
    }
    
    .table tbody td {
      border-bottom: 1px solid var(--gray-94, #ebecf0);
      border-right: none;
    }
    
    .dropdown-toggle::after {
      margin-left: 0.5rem;
    }
    
    tbody, td, tfoot, th, thead, tr {
      border-radius: 6px;
    }
  `],
  standalone: true,
})
export class ProjectListSimpleComponent {
  selectedStatus = 'all';
  searchText = '';

  mockData: MosProject[] = [
    {
      mosId: "ENW_2024_39314",
      locId: "ENW",
      facilityName: "EMMET CROLL RGNL",
      aciesNo: "1505300-60",
      category: "Methods",
      acChapter: "Chapter 4",
      sponsor: "Cory Palm",
      state: "WI",
      lastModified: "2025-06-11",
      status: "In Progress",
      reviewDate: "2024-03-08",
      workflow: "Region Approval",
    },
    {
      mosId: "LAX_2024_42156",
      locId: "LAX",
      facilityName: "LOS ANGELES INTL",
      aciesNo: "1505201-45",
      category: "Design",
      acChapter: "Chapter 2",
      sponsor: "Maria Rodriguez",
      state: "CA",
      lastModified: "2025-06-10",
      status: "Completed",
      reviewDate: "2024-05-15",
      workflow: "ADO Approval",
    },
    {
      mosId: "ATL_2024_38902",
      locId: "ATL",
      facilityName: "HARTSFIELD-JACKSON",
      aciesNo: "1505100-23",
      category: "Standards",
      acChapter: "Chapter 1",
      sponsor: "James Wilson",
      state: "GA",
      lastModified: "2025-06-09",
      status: "Draft",
      reviewDate: "2024-07-20",
      workflow: "Draft",
    },
    {
      mosId: "ORD_2024_41847",
      locId: "ORD",
      facilityName: "CHICAGO O'HARE INTL",
      aciesNo: "1505400-78",
      category: "Equipment",
      acChapter: "Chapter 5",
      sponsor: "Sarah Johnson",
      state: "IL",
      lastModified: "2025-06-08",
      status: "In Progress",
      reviewDate: "2024-04-12",
      workflow: "ADO Pre Approval",
    },
    {
      mosId: "DFW_2024_40123",
      locId: "DFW",
      facilityName: "DALLAS FORT WORTH",
      aciesNo: "1505250-33",
      category: "Procedures",
      acChapter: "Chapter 3",
      sponsor: "Michael Brown",
      state: "TX",
      lastModified: "2025-06-07",
      status: "In Progress",
      reviewDate: "2024-06-01",
      workflow: "Region Pre Approval",
    },
  ];

  get filteredProjects(): MosProject[] {
    let filtered = this.mockData;

    // Filter by status
    if (this.selectedStatus !== 'all') {
      filtered = filtered.filter(project => 
        project.status.toLowerCase().includes(this.selectedStatus.toLowerCase())
      );
    }

    // Filter by search text
    if (this.searchText) {
      const search = this.searchText.toLowerCase();
      filtered = filtered.filter(project =>
        project.mosId.toLowerCase().includes(search) ||
        project.facilityName.toLowerCase().includes(search) ||
        project.sponsor.toLowerCase().includes(search)
      );
    }

    return filtered;
  }

  getStatusBadgeClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'in progress':
        return 'badge bg-info';
      case 'completed':
        return 'badge bg-success';
      case 'draft':
        return 'badge bg-secondary';
      default:
        return 'badge bg-secondary';
    }
  }

  getWorkflowBadgeClass(workflow: string): string {
    switch (workflow.toLowerCase()) {
      case 'region approval':
        return 'badge bg-primary';
      case 'ado approval':
        return 'badge bg-success';
      case 'ado pre approval':
        return 'badge bg-warning';
      case 'region pre approval':
        return 'badge bg-warning text-dark';
      case 'draft':
        return 'badge bg-secondary';
      default:
        return 'badge bg-secondary';
    }
  }
}