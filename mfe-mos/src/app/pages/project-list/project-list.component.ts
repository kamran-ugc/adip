import { Component, ViewChild, OnInit, AfterViewInit } from "@angular/core";
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
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatMenuModule } from "@angular/material/menu";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router, RouterModule, ActivatedRoute } from "@angular/router";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatChipsModule } from "@angular/material/chips";
import { SelectionModel } from "@angular/cdk/collections";

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
    MatCheckboxModule,
    MatMenuModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDividerModule,
    MatChipsModule,
  ],
  templateUrl: "./project-list.component.html",
  styleUrl: "./project-list.component.scss",
  standalone: true,
})
export class ProjectListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  dataSource: MatTableDataSource<MosProject>;
  selection = new SelectionModel<MosProject>(true, []);
  
  // Filter properties
  selectedProjectStatus = 'active';
  selectedWorkflow = 'all';
  itemsPerPage = 15;
  filterText = '';
  
  // Heading
  headingText = 'My Active Projects';
  
  // Filter button data
  projectStatusButtons = [
    { label: 'Active', value: 'active' },
    { label: 'All', value: 'all' },
    { label: 'Completed', value: 'completed' },
    { label: 'Terminated', value: 'terminated' },
    { label: 'Closed', value: 'closed' }
  ];
  
  workflowButtons = [
    { label: 'All', value: 'all' },
    { label: 'Draft', value: 'draft' },
    { label: 'Sponsor', value: 'sponsor' },
    { label: 'ADO', value: 'ado' },
    { label: 'Region', value: 'region' },
    { label: 'HQ', value: 'hq' }
  ];
  
  pageOptions = [15, 25, 50, 100];
  
  displayedColumns: string[] = [
    'select',
    'mosId',
    'locId', 
    'facilityName',
    'aciesNo',
    'category',
    'acChapter',
    'sponsor',
    'state',
    'lastModified',
    'status',
    'reviewDate',
    'workflow',
    'actions'
  ];
  
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.dataSource = new MatTableDataSource(this.sampleData);
  }

  sampleData: MosProject[] = [
    {
      mosId: 'ENW_2024_39314',
      locId: 'ENW',
      facilityName: 'EMMET CROLL RGNL',
      aciesNo: '1505300-60',
      category: 'Methods',
      acChapter: 'Chapter 4',
      sponsor: 'Cory Palm',
      state: 'WI',
      lastModified: '2025-06-11',
      status: 'In Progress',
      reviewDate: '2024-03-08',
      workflow: 'Region Approval'
    },
    {
      mosId: 'LAX_2024_42156',
      locId: 'LAX',
      facilityName: 'LOS ANGELES INTL',
      aciesNo: '1505201-45',
      category: 'Design',
      acChapter: 'Chapter 2',
      sponsor: 'Maria Rodriguez',
      state: 'CA',
      lastModified: '2025-06-10',
      status: 'Completed',
      reviewDate: '2024-05-15',
      workflow: 'ADO Approval'
    },
    {
      mosId: 'ORD_2024_78923',
      locId: 'ORD',
      facilityName: 'CHICAGO O\'HARE INTL',
      aciesNo: '1505400-78',
      category: 'Operations',
      acChapter: 'Chapter 6',
      sponsor: 'John Williams',
      state: 'IL',
      lastModified: '2025-06-09',
      status: 'Draft',
      reviewDate: '2024-07-20',
      workflow: 'ADO Pre Approval'
    },
    {
      mosId: 'JFK_2024_15689',
      locId: 'JFK',
      facilityName: 'JOHN F KENNEDY INTL',
      aciesNo: '1505500-92',
      category: 'Safety',
      acChapter: 'Chapter 8',
      sponsor: 'Sarah Johnson',
      state: 'NY',
      lastModified: '2025-06-08',
      status: 'In Progress',
      reviewDate: '2024-04-12',
      workflow: 'Region Pre Approval'
    },
    {
      mosId: 'DEN_2024_56734',
      locId: 'DEN',
      facilityName: 'DENVER INTL',
      aciesNo: '1505600-34',
      category: 'Environmental',
      acChapter: 'Chapter 10',
      sponsor: 'Michael Brown',
      state: 'CO',
      lastModified: '2025-06-07',
      status: 'In Progress',
      reviewDate: '2024-08-05',
      workflow: 'Draft'
    },
    {
      mosId: 'ATL_2024_98765',
      locId: 'ATL',
      facilityName: 'HARTSFIELD JACKSON INTL',
      aciesNo: '1505700-56',
      category: 'Technology',
      acChapter: 'Chapter 12',
      sponsor: 'Lisa Davis',
      state: 'GA',
      lastModified: '2025-06-06',
      status: 'Completed',
      reviewDate: '2024-09-18',
      workflow: 'Region Approval'
    }
  ];

  ngOnInit(): void {
    this.updateHeadingText();
  }
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }
  
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: MosProject): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.mosId}`;
  }
  
  onProjectStatusChange(status: string): void {
    this.selectedProjectStatus = status;
    this.applyFilter();
    this.updateHeadingText();
  }
  
  onWorkflowChange(workflow: string): void {
    this.selectedWorkflow = workflow;
    this.applyFilter();
  }
  
  onPageSizeChange(): void {
    if (this.paginator) {
      this.paginator.pageSize = this.itemsPerPage;
      this.paginator.firstPage();
    }
  }
  
  applyTableFilter(): void {
    this.applyFilter();
  }
  
  applyFilter(): void {
    // Combine all filters
    this.dataSource.filterPredicate = (data: MosProject, filter: string) => {
      const searchTerms = JSON.parse(filter);
      
      // Status filter
      const statusMatch = searchTerms.status === 'all' || 
        data.status.toLowerCase().includes(searchTerms.status.toLowerCase());
      
      // Workflow filter
      const workflowMatch = searchTerms.workflow === 'all' || 
        data.workflow.toLowerCase().includes(searchTerms.workflow.toLowerCase());
      
      // Text filter
      const textMatch = !searchTerms.text || 
        data.mosId.toLowerCase().includes(searchTerms.text.toLowerCase());
      
      return statusMatch && workflowMatch && textMatch;
    };
    
    const filterValue = JSON.stringify({
      status: this.selectedProjectStatus,
      workflow: this.selectedWorkflow,
      text: this.filterText
    });
    
    this.dataSource.filter = filterValue;
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  updateHeadingText(): void {
    if (this.selectedProjectStatus === 'all') {
      this.headingText = 'All MOS Projects';
    } else if (this.selectedProjectStatus === 'active') {
      this.headingText = 'My Active Projects';
    } else {
      const statusLabel = this.projectStatusButtons.find(
        btn => btn.value === this.selectedProjectStatus
      )?.label || this.selectedProjectStatus;
      this.headingText = `${statusLabel} MOS Projects`;
    }
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
        return 'badge bg-light text-dark';
    }
  }
  
  getWorkflowBadgeClass(workflow: string): string {
    switch (workflow.toLowerCase()) {
      case 'region approval':
        return 'badge bg-primary';
      case 'ado approval':
        return 'badge bg-success';
      case 'ado pre approval':
        return 'badge bg-warning text-dark';
      case 'region pre approval':
        return 'badge bg-warning';
      case 'draft':
        return 'badge bg-secondary';
      default:
        return 'badge bg-light text-dark';
    }
  }
  
  viewProject(mosId: string): void {
    this.router.navigate(['../project', mosId], { relativeTo: this.route });
  }
  
  editProject(mosId: string): void {
    this.router.navigate(['../edit', mosId], { relativeTo: this.route });
  }
  
  deleteProject(mosId: string): void {
    if (confirm(`Are you sure you want to delete project ${mosId}?`)) {
      // Implement delete logic here
      console.log('Deleting project:', mosId);
    }
  }
}