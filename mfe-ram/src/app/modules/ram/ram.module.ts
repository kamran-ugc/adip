import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { RamRoutingModule } from "./ram-routing.module";
import { RamComponent } from "./ram.component";

@NgModule({
  declarations: [],
  imports: [CommonModule, RamRoutingModule, RouterModule, RamComponent],
})
export class RamModule {}
