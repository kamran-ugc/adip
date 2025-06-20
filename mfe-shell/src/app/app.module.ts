import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// Angular Material Imports

import { AppComponent } from "./app.component";
import { ShellLayoutComponent } from "./layout/shell-layout/shell-layout.component";
import { SharedModule } from "./shared/shared.module";
import { TestComponent } from "./test/test.component";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";

@NgModule({
  declarations: [AppComponent, TestComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([]),
    SharedModule,
    ShellLayoutComponent,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
