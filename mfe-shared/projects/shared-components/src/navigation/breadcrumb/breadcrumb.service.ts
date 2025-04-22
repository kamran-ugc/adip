import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Breadcrumb } from './breadcrumb.model';

@Injectable({
  providedIn: 'root', // Automatically provides the service globally
})
export class BreadcrumbService {
  private breadcrumbs = new BehaviorSubject<Breadcrumb[]>([]);
  breadcrumbs$ = this.breadcrumbs.asObservable();

  setBreadcrumbs(breadcrumbs: Breadcrumb[]) {
    this.breadcrumbs.next(breadcrumbs);
  }
}
