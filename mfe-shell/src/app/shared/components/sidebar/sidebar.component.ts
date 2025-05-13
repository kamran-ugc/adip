import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
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
  ],
})
export class SidebarComponent {
  @Input() sidenav!: MatSidenav;
  isMinimized = false;

  toggleSidebar() {
    this.isMinimized = !this.isMinimized;
    if (this.isMinimized) {
      this.sidenav.mode = "side";
      this.sidenav.opened = true;
      this.sidenav.disableClose = true;
      document.querySelector(".mat-drawer-side")?.classList.add("minimized");
    } else {
      this.sidenav.mode = "side";
      this.sidenav.opened = true;
      document.querySelector(".mat-drawer-side")?.classList.remove("minimized");
    }
  }

  navItems = [
    { label: "Dashboard", route: "/dashboard", icon: "dashboard" },
    {
      label: "ADM",
      icon: "business",
      children: [
        { label: "My Projects", route: "/adm", icon: "dashboard" },
        {
          label: "View Facility Data",
          route: "/adm/view-facility-data",
          icon: "dashboard",
        },
        {
          label: "Create New Project",
          route: "/adm/create-new-project",
          icon: "dashboard",
        },
        {
          label: "Airport Project History",
          route: "/adm/airport-project-history",
          icon: "dashboard",
        },
        {
          label: "Update Wildlife Survey",
          route: "/adm/update-wildlife-survey",
          icon: "dashboard",
        },
      ],
    },
    {
      label: "RAM",
      icon: "sync",
      children: [
        { label: "My Projects", route: "/ram/projects", icon: "dashboard" },
        {
          label: "Create New Project",
          route: "/ram/create-project",
          icon: "dashboard",
        },
        {
          label: "Airport Project History",
          route: "/ram/airport-project-history",
          icon: "dashboard",
        },
        {
          label: "Update Wildlife Survey",
          route: "/ram/update-wildlife-survey",
          icon: "dashboard",
        },
      ],
    },
    {
      label: "RSA",
      icon: "assignment",
      children: [{ label: "My Projects", route: "/rsa", icon: "dashboard" }],
    },
    {
      label: "RIM",
      icon: "edit",
      children: [{ label: "My Projects", route: "/rim", icon: "dashboard" }],
    },
  ];

  resources = [
    { label: "Help Desk", route: "/help-desk", icon: "help" },
    {
      label: "Documents & Downloads",
      route: "/documents-downloads",
      icon: "description",
    },
    { label: "Users Guides", route: "/users-guides", icon: "menu_book" },
  ];

  constructor(private router: Router) {}

  isRouteActive(item: any): boolean {
    if (item.children) {
      return item.children.some((child: any) => {
        return this.router.isActive(child.route, false);
      });
    } else {
      return this.router.isActive(item.route, false);
    }
  }
}
