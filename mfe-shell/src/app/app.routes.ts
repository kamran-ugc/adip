import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { loadRemoteModule } from "@angular-architects/module-federation";

const MFE_APP_DASHBOARD_URL = "http://localhost:4100/remoteEntry.js";
const MFE_APP_GOALS_URL = "http://localhost:4200/remoteEntry.js";
const MFE_APP_ADMINISTRATION_URL = "http://localhost:4300/remoteEntry.js";
const MFE_APP_AGIS_URL = "http://localhost:4400/remoteEntry.js";
const MFE_APP_AMR_URL = "http://localhost:4500/remoteEntry.js";
const MFE_APP_RAM_URL = "http://localhost:4600/remoteEntry.js";
const MFE_APP_RIM_URL = "http://localhost:4700/remoteEntry.js";

export const routes: Routes = [
  // { path: '', component: AppComponent },
  { path: "home", component: HomeComponent },

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
        .catch((err) => console.error("Error loading adm App", err)),
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
        .catch((err) => console.error("Error loading administration App", err)),
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
        .catch((err) => console.error("Error loading agis App", err)),
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
        .catch((err) => console.error("Error loading amr App", err)),
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
        .catch((err) => console.error("Error loading dashboard App", err)),
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
        .then((m) => m.RamModule)
        .catch((err) => console.error("Error loading ram App", err)),
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
        .catch((err) => console.error("Error loading rim App", err)),
  },
];
