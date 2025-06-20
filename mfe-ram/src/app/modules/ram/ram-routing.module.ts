import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RamComponent } from "./ram.component";
import { ProjectListComponent } from "../../pages/project-list/project-list.component";
import { CreateProjectComponent } from "../../pages/create-project/create-project.component";
import { ProjectDetailComponent } from "../../pages/project-detail/project-detail.component";

const routes: Routes = [
  {
    path: "",
    component: RamComponent,
    children: [
      {
        path: "",
        redirectTo: "projects",
        pathMatch: "full",
      },
      {
        path: "projects",
        component: ProjectListComponent,
      },
      {
        path: "project/:ramId",
        component: ProjectDetailComponent,
      },
      {
        path: "create-project",
        component: CreateProjectComponent,
      },
      {
        path: "airport-project-history",
        component: ProjectListComponent, // Placeholder - using project list for now
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RamRoutingModule {}
