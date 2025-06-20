import { Component } from "@angular/core";
import { RouterOutlet, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { ShellLayoutComponent } from "./layout/shell-layout/shell-layout.component";
import { ThemeService } from "./shared/services/theme.service";

@Component({
  selector: "app-root",
  imports: [
    RouterModule,
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    ShellLayoutComponent,
  ],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  currentNavItem: any[] = [];
  currentActiveNavLabel = "";

  profileNavItems = [
    {
      label: "Logout",
      link: "/logout",
      icon: "logout",
      function: () => this.openLogout(),
    },
  ];

  navItems = [
    {
      label: "Home",
      link: "/home",
      icon: "dashboard",
      function: () => this.openHome(),
    },
    {
      label: "Dashboard",
      link: "/dashboard",
      icon: "dashboard",
      function: () => this.openDashboard(),
    },
    {
      label: "AGIS",
      link: "/agis",
      icon: "agis",
      function: () => this.openAGIS(),
    },
    {
      label: "AMR",
      link: "/amr",
      icon: "amr",
      function: () => this.openAMR(),
    },
    {
      label: "RAM",
      link: "/ram",
      icon: "ram",
      function: () => this.openRAM(),
    },
    {
      label: "RIM",
      link: "/rim",
      icon: "rim",
      function: () => this.openRIM(),
    },
  ];

  constructor(private themeService: ThemeService) {
    this.currentNavItem = this.navItems;
  }

  navigateTo(callback: () => void) {
    if (callback) {
      callback(); // ✅ Now TypeScript recognizes it as a function
    }
  }

  expandedMenu: string | null = "";

  toggleSubmenu(menu: string) {
    this.expandedMenu = this.expandedMenu === menu ? null : menu;
  }

  openDashboard() {
    console.log("Navigating to Dashboard");
  }
  openAGIS() {
    console.log("Navigating to AGIS");
  }
  openAMR() {
    console.log("Navigating to AMR");
  }
  openRAM() {
    console.log("Navigating to RAM");
  }
  openRIM() {
    console.log("Navigating to RIM");
  }
  openLogout() {
    console.log("Navigating to Logout");
  }
  openHome() {
    console.log("Navigating to Home");
  }
}
