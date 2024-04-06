import { ListScreen } from '../screens/ListScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { SigninScreen } from '../screens/SigninScreen';
import { SignupScreen } from '../screens/SignupScreen';
import { CartScreen } from '../screens/CartScreen';
import { UserScreen } from '../screens/UserScreen';
import { SalesScreen } from '../screens/SalesScreen';
import { SearchScreen } from '../screens/SearchScreen';

const routes: any[] = [
  // auth
  {
    component: ListScreen,
    name: 'List',
    title: 'List',
    isAuth: true,
    isBottom: true,
    icon: 'format-list-bulleted',
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
    component: UserScreen,
    name: 'User',
    title: 'User',
    isAuth: true,
    isBottom: true,
    icon: 'account-group',
  },
  {
    component: SalesScreen,
    name: 'Sales',
    title: 'TotalSales',
    isAuth: true,
    isBottom: true,
    icon: 'tire',
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
