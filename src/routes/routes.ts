import { TasksComponent } from 'src/app/components/tasks/tasks.component';
import { AboutComponent } from 'src/app/components/about/about.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';

export interface Route {
  path: string;
  component: any;
}

export const APPROUTES: Route[] = [
  {
    path: '',
    component: TasksComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
];
