import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ProjectListComponent } from "../../pages/project-list/project-list.component";

@Component({
  selector: "app-ram",
  templateUrl: "./ram.component.html",
  styleUrls: ["./ram.component.scss"],
  standalone: true,
  imports: [RouterModule, ProjectListComponent],
})
export class RamComponent {}
