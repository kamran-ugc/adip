import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { loadRemoteModule } from "@angular-architects/module-federation";
import { RamUnavailableComponent } from "./shared/components/ram-unavailable/ram-unavailable.component";
import { DashboardUnavailableComponent } from "./shared/components/dashboard-unavailable/dashboard-unavailable.component";
import { MosUnavailableComponent } from "./shared/components/mos-unavailable/mos-unavailable.component";

const MFE_APP_DASHBOARD_URL = "http://localhost:4100/remoteEntry.js";
const MFE_APP_GOALS_URL = "http://localhost:4200/remoteEntry.js";
const MFE_APP_ADMINISTRATION_URL = "http://localhost:4300/remoteEntry.js";
const MFE_APP_AGIS_URL = "http://localhost:4400/remoteEntry.js";
const MFE_APP_AMR_URL = "http://localhost:4500/remoteEntry.js";
const MFE_APP_RAM_URL = "http://localhost:4600/remoteEntry.js";
const MFE_APP_RIM_URL = "http://localhost:4700/remoteEntry.js";
const MFE_APP_MOS_URL = "http://localhost:4800/remoteEntry.js";

export const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  
  // Direct fallback routes
  { path: "ram-unavailable", component: RamUnavailableComponent },
  { path: "dashboard-unavailable", component: DashboardUnavailableComponent },
  { path: "mos-unavailable", component: MosUnavailableComponent },


  // Load ADM Microfrontend
  {
    path: "adm",
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: MFE_APP_GOALS_URL,
        remoteName: "admApp",
        exposedModule: "./TodoListModule",
      })
        .then((m) => m.TodoListModule)
        .catch((err) => {
          console.error("Error loading ADM App:", err);
          return import('./shared/modules/fallback.module').then(m => m.AdmUnavailableModule);
        }),
  },

  // Load Administration Microfrontend
  {
    path: "administration",
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: MFE_APP_ADMINISTRATION_URL,
        remoteName: "administrationApp",
        exposedModule: "./TodoListModule",
      })
        .then((m) => m.TodoListModule)
        .catch((err) => {
          console.error("Error loading Administration App:", err);
          return import('./shared/modules/fallback.module').then(m => m.AdministrationUnavailableModule);
        }),
  },

  // Load AGIS Microfrontend
  {
    path: "agis",
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: MFE_APP_AGIS_URL,
        remoteName: "agisApp",
        exposedModule: "./TodoListModule",
      })
        .then((m) => m.TodoListModule)
        .catch((err) => {
          console.error("Error loading AGIS App:", err);
          return import('./shared/modules/fallback.module').then(m => m.AgisUnavailableModule);
        }),
  },

  // Load AMR Microfrontend
  {
    path: "amr",
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: MFE_APP_AMR_URL,
        remoteName: "amrApp",
        exposedModule: "./TodoListModule",
      })
        .then((m) => m.TodoListModule)
        .catch((err) => {
          console.error("Error loading AMR App:", err);
          return import('./shared/modules/fallback.module').then(m => m.AmrUnavailableModule);
        }),
  },

  // Load Dashboard Microfrontend
  {
    path: "dashboard",
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: MFE_APP_DASHBOARD_URL,
        remoteName: "dashboardApp",
        exposedModule: "./TodoListModule",
      })
        .then((m) => m.TodoListModule)
        .catch((err) => {
          console.error("Error loading Dashboard App:", err);
          window.location.href = '/dashboard-unavailable';
          return Promise.reject(err);
        }),
  },

  // Load RAM Microfrontend
  {
    path: "ram",
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: MFE_APP_RAM_URL,
        remoteName: "ramApp",
        exposedModule: "./RamModule",
      })
        .then((m) => {
          console.log("RAM Module loaded successfully:", m);
          return m.RamModule;
        })
        .catch((err) => {
          console.error("Error loading RAM App:", err);
          // Try one more time before falling back
          return loadRemoteModule({
            remoteEntry: MFE_APP_RAM_URL,
            remoteName: "ramApp",
            exposedModule: "./RamModule",
          })
            .then((m) => m.RamModule)
            .catch((retryErr) => {
              console.error("RAM App failed on retry:", retryErr);
              return import('./shared/modules/fallback.module').then(m => m.RamUnavailableModule);
            });
        }),
  },

  // Load RIM Microfrontend
  {
    path: "rim",
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: MFE_APP_RIM_URL,
        remoteName: "rimApp",
        exposedModule: "./TodoListModule",
      })
        .then((m) => m.TodoListModule)
        .catch((err) => {
          console.error("Error loading RIM App:", err);
          return import('./shared/modules/fallback.module').then(m => m.RimUnavailableModule);
        }),
  },

  // Load MOS Microfrontend
  {
    path: "mos",
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: MFE_APP_MOS_URL,
        remoteName: "mosApp",
        exposedModule: "./MosModule",
      })
        .then((m) => {
          console.log("MOS Module loaded successfully:", m);
          return m.MosModule;
        })
        .catch((err) => {
          console.error("Error loading MOS App:", err);
          // Try one more time before falling back
          return loadRemoteModule({
            remoteEntry: MFE_APP_MOS_URL,
            remoteName: "mosApp",
            exposedModule: "./MosModule",
          })
            .then((m) => m.MosModule)
            .catch((retryErr) => {
              console.error("MOS App failed on retry:", retryErr);
              return import('./shared/modules/fallback.module').then(m => m.MosUnavailableModule);
            });
        }),
  },
];
