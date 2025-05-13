import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "../../shared/shared.module";
@Component({
  selector: "app-shell-layout",
  templateUrl: "./shell-layout.component.html",
  styleUrls: ["./shell-layout.component.scss"],
  standalone: true,
  imports: [SharedModule, MatIconModule],
})
export class ShellLayoutComponent {
  isMobile() {
    return window.innerWidth < 768;
  }
}
