import { Routes } from "@angular/router";
import { ProjectListComponent } from "./pages/project-list/project-list.component";

export const routes: Routes = [
  { path: "", component: ProjectListComponent },
  {
    path: "ram",
    loadChildren: () =>
      import("./modules/ram/ram.module").then((m) => m.RamModule),
  },
];
