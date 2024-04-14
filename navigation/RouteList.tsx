import { ListScreen } from '../screens/ListScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { SigninScreen } from '../screens/SigninScreen';
import { SignupScreen } from '../screens/SignupScreen';
import { CartScreen } from '../screens/CartScreen';
import { UserScreen } from '../screens/UserScreen';
import { SalesScreen } from '../screens/SalesScreen';
import { SearchScreen } from '../screens/SearchScreen';
import InvoiceDetail from '../screens/InvoiceScreen/InvoiceDetail';
import { ListInvoiceScreen } from '../screens/InvoiceScreen';
import { SaffScreen } from '../screens/SaffScreen';

const routes: any[] = [
  {
    component: SalesScreen,
    name: 'Sales',
    title: 'TotalSales',
    isAuth: true,
    isBottom: true,
    icon: 'tire',
  },
  {
    component: ListScreen,
    name: 'List',
    title: 'List',
    isAuth: true,
    isBottom: true,
    icon: 'store-outline',
  },
  {
    component: CartScreen,
    name: 'Cart',
    title: 'Cart',
    isAuth: true,
    isBottom: true,
    icon: 'cart',
  },
  {
    component: ListInvoiceScreen,
    name: 'ListInvoice',
    title: 'Danh sách hoá đơn',
    icon: 'format-list-bulleted',
    isBottom: true,
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
    isBottom: true,
    icon: 'account',
  },
  {
    component: UserScreen,
    name: 'User',
    title: 'User',
    isAuth: true,
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
    isAuth: true,
  },
  {
    component: SigninScreen,
    name: 'Signin',
    title: 'Signin',
    isAuth: true,
  },
  {
    component: SignupScreen,
    name: 'Signup',
    title: 'Signup',
    isAuth: true,
  },
];

export default routes;
