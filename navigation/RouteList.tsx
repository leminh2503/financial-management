import { CalendarScreen } from '../screens/CalendarScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { SignupScreen } from '../screens/SignupScreen';
import { UserScreen } from '../screens/UserScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ReportScreen } from '../screens/ReportScreen';

export enum IconBottom {
  HOME = 'Home',
  CALENDAR = 'Calendar',
  CHART = 'Chart',
  THREEDOTS = 'Threedots',
}

const routes: any[] = [
  {
    component: HomeScreen,
    name: 'Home',
    title: 'Home',
    isAuth: false,
    isBottom: true,
    icon: IconBottom.HOME,
  },
  {
    component: CalendarScreen,
    name: 'Calendar',
    title: 'Calendar',
    isAuth: false,
    isBottom: true,
    icon: IconBottom.CALENDAR,
  },
  {
    component: ReportScreen,
    name: 'Report',
    title: 'Report',
    isAuth: false,
    isBottom: true,
    icon: IconBottom.CHART,
  },
  {
    component: UserScreen,
    name: 'ListInvoice',
    title: 'Danh sách hoá đơn',
    isBottom: true,
    icon: IconBottom.THREEDOTS,
  },
  {
    component: UserScreen,
    name: 'User',
    title: 'User',
    isAuth: false,
  },
  {
    component: SettingsScreen,
    name: 'Settings',
    title: 'Settings',
    isAuth: false,
  },
  {
    component: SignupScreen,
    name: 'Signup',
    title: 'Signup',
    isAuth: false,
  },
];

export default routes;
