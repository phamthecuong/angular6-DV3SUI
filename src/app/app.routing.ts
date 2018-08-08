import { RouterModule, Routes } from '@angular/router';
import { SurveillanceComponent } from './components/surveillance/surveillance.component';
import { SettingComponent } from './components/setting/setting.component';

const appRoutes: Routes = [
  {
    path: 'surveillance',
    component: SurveillanceComponent
  },
  {
    path: 'setting',
    component: SettingComponent
  },
  { 
  	path: '**', 
  	redirectTo: 'setting' 
  }
 
];

export const routing = RouterModule.forRoot(appRoutes);