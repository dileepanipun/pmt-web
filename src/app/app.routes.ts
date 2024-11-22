import {Routes} from '@angular/router';
import {WindowTestComponent} from './common/window-test/window-test.component';
import {CommingSoonPageComponent} from './temp/comming-soon-page/comming-soon-page.component';

export const routes: Routes = [
  {
    path: '',
    component: WindowTestComponent
  },
  {
    path: 'window-test',
    component: WindowTestComponent
  },
  {
    path: 'coming-soon',
    component: CommingSoonPageComponent
  },
  {
    path: '**',
    redirectTo: 'coming-soon'
  }
];
