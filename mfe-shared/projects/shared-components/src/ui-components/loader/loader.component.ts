import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-loader",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.scss"],
})
export class LoaderComponent {
  constructor() {}
  @Input() size: "small" | "medium" | "large" = "medium";
  @Input() color: "primary" | "secondary" | "white" = "primary";
  @Input() isLoading: boolean = true; // Control visibility
}


