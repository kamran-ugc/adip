import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

// Material Imports
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatBadgeModule } from "@angular/material/badge";
import { MatMenuModule } from "@angular/material/menu";
import { MatDividerModule } from "@angular/material/divider";
import { MatSelectModule } from "@angular/material/select";

// Components
import { HeaderComponent } from "./components/header/header.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { FooterComponent } from "./components/footer/footer.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    // Import standalone components
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    // Import Material modules
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatBadgeModule,
    MatMenuModule,
    MatDividerModule,
    MatSelectModule,
  ],
  exports: [
    // Export standalone components
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    // Export commonly used modules
    CommonModule,
    RouterModule,
    FormsModule,
    // Export Material modules that might be needed in other components
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatBadgeModule,
    MatMenuModule,
    MatDividerModule,
    MatSelectModule,
  ],
})
export class SharedModule {}
