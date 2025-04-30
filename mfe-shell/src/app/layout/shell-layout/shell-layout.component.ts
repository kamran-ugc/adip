import { Component } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
@Component({
  selector: "app-shell-layout",
  templateUrl: "./shell-layout.component.html",
  styleUrls: ["./shell-layout.component.scss"],
  standalone: true,
  imports: [SharedModule],
})
export class ShellLayoutComponent {}
