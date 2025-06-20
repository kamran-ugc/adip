import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MosComponent } from "./mos.component";
import { ProjectListComponent } from "../pages/project-list/project-list.component";

const routes: Routes = [
  {
    path: "",
    component: MosComponent,
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MosRoutingModule {}