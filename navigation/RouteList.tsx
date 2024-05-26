import { CalendarScreen } from '../screens/CalendarScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { SignupScreen } from '../screens/SignupScreen';
import { CartScreen } from '../screens/CartScreen';
import { UserScreen } from '../screens/UserScreen';
import { SearchScreen } from '../screens/SearchScreen';
import InvoiceDetail from '../screens/InvoiceScreen/InvoiceDetail';
import { ListInvoiceScreen } from '../screens/InvoiceScreen';
import { SaffScreen } from '../screens/SaffScreen';
import { HomeScreen } from '../screens/HomeScreen';

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
    component: CartScreen,
    name: 'Cart',
    title: 'Cart',
    isAuth: false,
    isBottom: true,
    icon: IconBottom.CHART,
  },
  {
    component: ListInvoiceScreen,
    name: 'ListInvoice',
    title: 'Danh sách hoá đơn',
    isBottom: true,
    icon: IconBottom.THREEDOTS,
  },
  {
    component: InvoiceDetail,
    name: 'InvoiceDetail',
    title: 'InvoiceDetail',
  },
  {
    component: SaffScreen,
    name: 'Saff',
    title: 'Saff Info',
    isBottom: false,
    icon: 'account',
  },
  {
    component: UserScreen,
    name: 'User',
    title: 'User',
    isAuth: false,
  },
  {
    component: SearchScreen,
    name: 'Search',
    title: 'Search',
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
