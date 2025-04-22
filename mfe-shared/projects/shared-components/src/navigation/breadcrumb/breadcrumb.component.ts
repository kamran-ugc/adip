import { Component, OnInit, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { BreadcrumbService } from "./breadcrumb.service";
import { Breadcrumb } from "./breadcrumb.model";

@Component({
  selector: "app-breadcrumb",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./breadcrumb.component.html",
  styleUrls: ["./breadcrumb.component.scss"],
})
export class BreadcrumbComponent implements OnInit {
  @Input() customClass: string = '';
  @Input() separator: string = '/';
  @Input() showIcons: boolean = true;
  @Input() activeItemClass: string = '';
  @Input() inactiveItemClass: string = '';

  breadcrumbs: Breadcrumb[] = [];

  constructor(private breadcrumbService: BreadcrumbService) { }

  ngOnInit() {
    this.breadcrumbService.breadcrumbs$.subscribe((breadcrumbs) => {
      this.breadcrumbs = breadcrumbs;
    });
  }
}


