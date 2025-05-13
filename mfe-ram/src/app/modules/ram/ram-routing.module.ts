import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RamComponent } from "./ram.component";
import { ProjectListComponent } from "../../pages/project-list/project-list.component";
import { CreateProjectComponent } from "../../pages/create-project/create-project.component";

const routes: Routes = [
  {
    path: "",
    component: RamComponent,
    children: [
      {
        path: "projects",
        component: ProjectListComponent,
      },
      {
        path: "create-project",
        component: CreateProjectComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RamRoutingModule {}
