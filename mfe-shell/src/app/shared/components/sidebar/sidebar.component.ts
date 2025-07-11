import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  Renderer2,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  Router,
  RouterModule,
  NavigationEnd,
  Event as RouterEvent,
} from "@angular/router";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { MatBadgeModule } from "@angular/material/badge";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatSidenav } from "@angular/material/sidenav";
import { MatTooltipModule } from "@angular/material/tooltip";
import { filter, Subscription } from "rxjs";
import { trigger, state, style, transition, animate } from "@angular/animations";
import { ThemeToggleComponent } from "../theme-toggle/theme-toggle.component";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatBadgeModule,
    MatCardModule,
    MatExpansionModule,
    MatTooltipModule,
    ThemeToggleComponent,
  ],
  animations: [
    trigger('flyoutAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-10px)' }),
        animate('200ms ease-in', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('150ms ease-out', style({ opacity: 0, transform: 'translateX(-10px)' }))
      ])
    ])
  ]
})
export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {
  // Current sidebar width for tracking changes
  private currentWidth = 330;
  // Maximum width the sidebar can be resized to
  private maxWidth = 330;
  // Original width to restore when toggling
  private originalWidth = 330;
  @Input() sidenav!: MatSidenav;
  @ViewChild("sidebarElement") sidebarElement!: ElementRef;

  isMinimized = true;
  expandedItem: string | null = null;
  hoveredItem: string | null = null;
  submenuTop: number = 0;
  private hideSubmenuTimeout: any = null;

  private resizing = false;
  private startX = 0;
  private startWidth = 0;
  private mouseMoveListener: (() => void) | null = null;
  private mouseUpListener: (() => void) | null = null;

  // For tracking router events
  private routerSubscription: Subscription | null = null;

  toggleSidebar() {
    // Toggle minimized state
    this.isMinimized = !this.isMinimized;

    if (this.isMinimized) {
      // Minimize the sidebar
      this.sidenav.mode = "side";
      this.sidenav.opened = true;
      this.sidenav.disableClose = true;

      // Set fixed width for minimized state (both DOM element and CSS variable)
      document.documentElement.style.setProperty("--sidebar-width", "80px");

      // Update sidebar class and width
      document.querySelector(".mat-drawer-side")?.classList.add("minimized");
      const sidenavElement = document.querySelector(".shell-sidebar");
      if (sidenavElement) {
        this.renderer.setStyle(sidenavElement, "width", "80px");
      }

      // Directly set the width of the sidebar element
      if (this.sidebarElement && this.sidebarElement.nativeElement) {
        this.renderer.setStyle(
          this.sidebarElement.nativeElement,
          "width",
          "80px",
        );
      }
    } else {
      // ALWAYS restore to the MAXIMUM width, ignoring any manual resizing or current state
      this.sidenav.mode = "side";
      this.sidenav.opened = true;

      // Remove minimized class
      document.querySelector(".mat-drawer-side")?.classList.remove("minimized");

      // Hard-set to the maximum width (force overriding any current width)
      const maxWidthValue = this.maxWidth;
      document.documentElement.style.setProperty(
        "--sidebar-width",
        `${maxWidthValue}px`,
      );

      // Apply max width to ALL elements that might control width
      if (this.sidebarElement && this.sidebarElement.nativeElement) {
        this.renderer.setStyle(
          this.sidebarElement.nativeElement,
          "width",
          `${maxWidthValue}px`,
        );
      }

      // Update the sidenav element directly
      const sidenavElement = document.querySelector(".shell-sidebar");
      if (sidenavElement) {
        this.renderer.setStyle(sidenavElement, "width", `${maxWidthValue}px`);
      }

      // Reset the current width to the maximum
      this.currentWidth = maxWidthValue;
    }
  }

  // This method handles panel expansion
  onPanelOpened(label: string) {
    // Simply set the expanded item - Angular binding will handle the rest
    this.expandedItem = label;
  }

  // Method to handle panel closing
  onPanelClosed(label: string) {
    // Only reset if this is the currently expanded item
    if (this.expandedItem === label) {
      this.expandedItem = null;
    }
  }

  navItems = [
    { label: "Home", route: "/dashboard", icon: "home" },
    {
      label: "MOS",
      icon: "build",
      children: [{ label: "My Projects", route: "/mos/projects", icon: "folder" }],
    },
    {
      label: "RAM",
      icon: "center_focus_strong",
      children: [
        { label: "My Projects", route: "/ram/projects", icon: "folder" },
        {
          label: "Create New Project",
          route: "/ram/create-project",
          icon: "add_box",
        },
        {
          label: "User Guide",
          route: "/ram/airport-project-history",
          icon: "menu_book",
        },
      ],
    },
    {
      label: "ADM",
      icon: "business",
      children: [
        { label: "My Projects", route: "/adm", icon: "folder" },
        {
          label: "View Facility Data",
          route: "/adm/view-facility-data",
          icon: "visibility",
        },
        {
          label: "Create New Project",
          route: "/adm/create-new-project",
          icon: "add_box",
        },
        {
          label: "Airport Project History",
          route: "/adm/airport-project-history",
          icon: "history",
        },
        {
          label: "Update Wildlife Survey",
          route: "/adm/update-wildlife-survey",
          icon: "update",
        },
        {
          label: "User Management",
          route: "/administration/user-management",
          icon: "people",
        },
        {
          label: "User Management Activity",
          route: "/administration/user-management-activity",
          icon: "assignment",
        },
        {
          label: "Active Sessions",
          route: "/administration/active-sessions",
          icon: "access_time",
        },
        {
          label: "System Transactions",
          route: "/administration/system-transactions",
          icon: "receipt_long",
        },
        {
          label: "Administrator Tools",
          route: "/administration/administrator-tools",
          icon: "build",
        },
        {
          label: "System Stats & Reports",
          route: "/administration/system-stats-reports",
          icon: "bar_chart",
        },
        {
          label: "Notification Manager",
          route: "/administration/notification-manager",
          icon: "notifications",
        },
        {
          label: "Notification Queue",
          route: "/administration/notification-queue",
          icon: "queue",
        },
        {
          label: "BDE File Parsing",
          route: "/administration/bde-file-parsing",
          icon: "file_upload",
        },
        {
          label: "Survey Admin Tools",
          route: "/administration/survey-admin-tools",
          icon: "poll",
        },
        {
          label: "All Survey Uploads",
          route: "/administration/all-survey-uploads",
          icon: "cloud_upload",
        },
        {
          label: "18B Feature/Attributes",
          route: "/administration/18b-feature-attributes",
          icon: "category",
        },
        {
          label: "Supported Coordinate Systems",
          route: "/administration/supported-coordinate-systems",
          icon: "map",
        },
        {
          label: "FME Node Status",
          route: "/administration/fme-node-status",
          icon: "computer",
        },
      ],
    },

    {
      label: "AMR",
      icon: "assignment",
      children: [{ label: "My Projects", route: "/amr", icon: "folder" }],
    },
    {
      label: "RIM",
      icon: "edit",
      children: [{ label: "My Projects", route: "/rim", icon: "folder" }],
    },
  ];

  constructor(
    private router: Router,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    // Subscribe to router events to detect navigation to RAM create project page
    this.routerSubscription = this.router.events
      .pipe(
        filter(
          (event: RouterEvent): event is NavigationEnd =>
            event instanceof NavigationEnd,
        ),
      )
      .subscribe((event: NavigationEnd) => {
        if (event.urlAfterRedirects === "/ram/create-project") {
          // Ensure sidebar is minimized for RAM create project page
          if (!this.isMinimized) {
            this.toggleSidebar();
          }
        }
      });
  }

  isRouteActive(item: any): boolean {
    if (item.children) {
      return item.children.some((child: any) => {
        return this.router.isActive(child.route, false);
      });
    } else {
      return this.router.isActive(item.route, false);
    }
  }

  ngAfterViewInit() {
    // Initialize default sidebar width values without changing DOM yet
    this.currentWidth = 330;  // Default width
    this.maxWidth = 330;     // Maximum width
    this.originalWidth = 330; // Original width for toggling
    
    // Set the appropriate initial state
    if (this.isMinimized) {
      // Set minimized state
      document.documentElement.style.setProperty("--sidebar-width", "80px");
      if (this.sidebarElement && this.sidebarElement.nativeElement) {
        this.renderer.setStyle(this.sidebarElement.nativeElement, "width", "80px");
      }
    } else {
      // Set expanded state with proper width
      document.documentElement.style.setProperty("--sidebar-width", "330px");
      if (this.sidebarElement && this.sidebarElement.nativeElement) {
        this.renderer.setStyle(this.sidebarElement.nativeElement, "width", "330px");
      }
    }

    // Check if we're on the RAM create project page and collapse sidebar if so
    setTimeout(() => {
      if (this.router.url === "/ram/create-project" && !this.isMinimized) {
        this.toggleSidebar();
      }
    }, 0);
  }

  ngOnDestroy() {
    // Clean up event listeners
    this.removeMouseListeners();

    // Clear any pending hide timeout
    if (this.hideSubmenuTimeout) {
      clearTimeout(this.hideSubmenuTimeout);
      this.hideSubmenuTimeout = null;
    }

    // Unsubscribe from router events
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
      this.routerSubscription = null;
    }
  }

  startResize(event: MouseEvent) {
    event.preventDefault();

    if (this.isMinimized) {
      return; // Don't allow resizing when minimized
    }

    this.resizing = true;
    this.startX = event.clientX;
    this.startWidth = this.sidebarElement.nativeElement.offsetWidth;

    // Add mouse move and mouse up listeners
    this.mouseMoveListener = this.renderer.listen(
      "document",
      "mousemove",
      (e) => this.onResize(e),
    );
    this.mouseUpListener = this.renderer.listen("document", "mouseup", () =>
      this.stopResize(),
    );

    // Add a class to body to indicate resizing is in progress
    document.body.classList.add("sidebar-resizing");
  }

  onResize(event: MouseEvent) {
    if (!this.resizing) return;

    const newWidth = this.startWidth + (event.clientX - this.startX);

    // Apply constraints: Can't be smaller than 200px or larger than maxWidth (initial width)
    if (newWidth >= 200 && newWidth <= this.maxWidth) {
      // Update the sidebar element width
      this.renderer.setStyle(
        this.sidebarElement.nativeElement,
        "width",
        `${newWidth}px`,
      );

      // Update the mat-sidenav width by accessing the DOM directly
      const sidenavElement = document.querySelector(".shell-sidebar");
      if (sidenavElement) {
        this.renderer.setStyle(sidenavElement, "width", `${newWidth}px`);
      }

      // Update the CSS variable for the content margin
      document.documentElement.style.setProperty(
        "--sidebar-width",
        `${newWidth}px`,
      );

      // Save the current width
      this.currentWidth = newWidth;
    }
  }

  stopResize() {
    this.resizing = false;
    document.body.classList.remove("sidebar-resizing");

    // Update the currentWidth with the final width
    this.currentWidth = this.sidebarElement.nativeElement.offsetWidth;

    this.removeMouseListeners();
  }

  private removeMouseListeners() {
    if (this.mouseMoveListener) {
      this.mouseMoveListener();
      this.mouseMoveListener = null;
    }

    if (this.mouseUpListener) {
      this.mouseUpListener();
      this.mouseUpListener = null;
    }
  }

  showSubmenu(item: any, event: MouseEvent): void {
    if (this.isMinimized && item.children) {
      // Clear any pending hide timeout
      if (this.hideSubmenuTimeout) {
        clearTimeout(this.hideSubmenuTimeout);
        this.hideSubmenuTimeout = null;
      }
      
      this.hoveredItem = item.label;
      
      // Calculate position based on the hovered element
      const target = event.target as HTMLElement;
      const rect = target.getBoundingClientRect();
      this.submenuTop = rect.top;
    }
  }

  hideSubmenu(): void {
    // Add a small delay before hiding to allow for mouse movement between elements
    this.hideSubmenuTimeout = setTimeout(() => {
      this.hoveredItem = null;
      this.submenuTop = 0;
    }, 150);
  }

  keepSubmenuOpen(): void {
    // Clear any pending hide timeout when hovering over the submenu
    if (this.hideSubmenuTimeout) {
      clearTimeout(this.hideSubmenuTimeout);
      this.hideSubmenuTimeout = null;
    }
  }

  getHoveredItemChildren(): any[] {
    if (!this.hoveredItem) return [];
    const item = this.navItems.find(nav => nav.label === this.hoveredItem);
    return item?.children || [];
  }

  getSubmenuPosition(): number {
    return this.submenuTop;
  }
}
