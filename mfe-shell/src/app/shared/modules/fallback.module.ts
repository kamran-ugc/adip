import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardUnavailableComponent } from '../components/dashboard-unavailable/dashboard-unavailable.component';
import { RamUnavailableComponent } from '../components/ram-unavailable/ram-unavailable.component';
import { AdmUnavailableComponent } from '../components/adm-unavailable/adm-unavailable.component';
import { MosUnavailableComponent } from '../components/mos-unavailable/mos-unavailable.component';
import { AmrUnavailableComponent } from '../components/amr-unavailable/amr-unavailable.component';
import { RimUnavailableComponent } from '../components/rim-unavailable/rim-unavailable.component';
import { AdministrationUnavailableComponent } from '../components/administration-unavailable/administration-unavailable.component';
import { AgisUnavailableComponent } from '../components/agis-unavailable/agis-unavailable.component';

// Individual modules for each service
@NgModule({
  imports: [DashboardUnavailableComponent, RouterModule.forChild([
    { path: '', component: DashboardUnavailableComponent }
  ])],
  exports: [RouterModule]
})
export class DashboardUnavailableModule {}

@NgModule({
  imports: [RamUnavailableComponent, RouterModule.forChild([
    { path: '', component: RamUnavailableComponent }
  ])],
  exports: [RouterModule]
})
export class RamUnavailableModule {}

@NgModule({
  imports: [AdmUnavailableComponent, RouterModule.forChild([
    { path: '', component: AdmUnavailableComponent }
  ])],
  exports: [RouterModule]
})
export class AdmUnavailableModule {}

@NgModule({
  imports: [MosUnavailableComponent, RouterModule.forChild([
    { path: '', component: MosUnavailableComponent }
  ])],
  exports: [RouterModule]
})
export class MosUnavailableModule {}

@NgModule({
  imports: [AmrUnavailableComponent, RouterModule.forChild([
    { path: '', component: AmrUnavailableComponent }
  ])],
  exports: [RouterModule]
})
export class AmrUnavailableModule {}

@NgModule({
  imports: [RimUnavailableComponent, RouterModule.forChild([
    { path: '', component: RimUnavailableComponent }
  ])],
  exports: [RouterModule]
})
export class RimUnavailableModule {}

@NgModule({
  imports: [AdministrationUnavailableComponent, RouterModule.forChild([
    { path: '', component: AdministrationUnavailableComponent }
  ])],
  exports: [RouterModule]
})
export class AdministrationUnavailableModule {}

@NgModule({
  imports: [AgisUnavailableComponent, RouterModule.forChild([
    { path: '', component: AgisUnavailableComponent }
  ])],
  exports: [RouterModule]
})
export class AgisUnavailableModule {}