# React Native Base App

# Guide Run App

- Step 1: install node_modules

```bash
npm i
```

- Step 2: start app

```bash
expo start
```

- Step 3: open application ios/android/web

```bash
expo start --ios
expo start --android
expo start --web
```

# Video Demo Application

[demo.mp4](https://drive.google.com/file/d/1GayzkhuQh-Fku0I8uY7RG28ddp04yBBE/view?usp=sharing)

## Main libraries

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Native Base](https://nativebase.io/)
- [Redux(toolkit)](https://redux-toolkit.js.org/)

## Example of an app using this template

https://github.com/qlawmarq/pokemon-sv-clock

## API Server & DB Server

If you need API and DB server, please clone from the following:  
https://github.com/qlawmarq/fastapi-mysql-docker

## Development

This app are using `Expo CLI`, and it will be install in your local `node_modules`.

Minimum setup for development is just following commands:

```bash
npm i
expo start 
```

Now you are ready to develop your app, and you can check your app in a web browser or in the simulator of iOS/Android
OS.

Please check here for deatils:

- https://reactnative.dev/docs/environment-setup
- https://docs.expo.dev/get-started/installation/

## Building Native App

This app is using EAS Build for distribution.

EAS Build is a hosted service for building app binaries for your Expo and React Native projects.

Also, this app includes the EAS CLI as a dependency, so you can build it by just entering commands.

```bash
expo build:android
expo build:ios
```

Please check following for more details:

- https://docs.expo.dev/build/introduction/

### Android

```bash
expo login
expo build:android
expo submit:android
```

### iOS

```bash
expo login
expo build:ios
expo submit:ios
```

## Building Web App

```bash
expo build:web
```

Please check following for more details:

- https://docs.expo.dev/distribution/publishing-websites/

## Guide

### Expo

This app is using Expo to make your development easier and faster.
Also it make easily publish testing app with using Expo.

For more informations, please check [Expo.dev](https://docs.expo.dev/).

### Configuration

You can set the name of the app, version, permissions, etc. through `app.json`.

https://docs.expo.dev/versions/latest/config/app/

### State/Storage

This app are using [Redux(toolkit)](https://redux-toolkit.js.org/) for state management,
and [Redux Persist](https://github.com/rt2zz/redux-persist) for persisting store's state when app reload.  
And also using [Async Storage](https://react-native-async-storage.github.io/async-storage/) for data storage.

Here is an example case of getting stored data:

```ts
// state(redux)
import { useSelector } from 'react-redux';
import { RootState } from '../lib/redux/store';

// get user & token from redux
const { user, token } = useSelector((state: RootState) => state.auth);
```

### Theme

The theme settings of the app can be changed in `theme.ts`.  
You can customize color schema, style of component, font style, and more.

Learn more about extending/customizing theme:

- https://docs.nativebase.io/default-theme
- https://docs.nativebase.io/customizing-theme
- https://docs.nativebase.io/customizing-components
- https://docs.nativebase.io/utility-props#style-props
- https://reactnavigation.org/docs/themes/

Regarding dark mode and light mode, basically, it automatically sets by user's enviroment.  
However, it is also possible to set them manually:

```ts
import { theme } from './theme';

const mode = useColorScheme();
// you can set `dark` or `light` instead of system mode
theme.config.initialColorMode = mode;
```

The color theme for the component will also be set automatically, but you can customize them manually:

```tsx
<View
  _light={{
    borderColor: 'light.border',
  }}
  _dark={{
    borderColor: 'dark.border',
  }}
/>
```

### Navigation

You can setup routing inside of `navigation` folder.  
For more information, Please check [React Navigation](https://reactnavigation.org/) website.

### External API calling

This app are using [Axios](https://axios-http.com/) for API calling.
The configuration of axios is inside of `lib/axios` folder.

Already, there is some example of authentification api.
Of course, you can add your own api in `lib/axios`.

### Icon

You can explore the built-in icon families and icons on the web at following:

- https://icons.expo.fyi/

```ts
import { Icon } from 'native-base';
import { Feather } from '@expo/vector-icons';
```

## Giới thiệu về ứng dụng

### Mục đích sử dụng

- Ứng dụng được sử dụng với mục đích quản lý tài chính. Quản lý chi tiêu hàng ngày. Thống kê tài chính cá nhân.

### Các chức năng chính

- Nhập thông tin chi tiêu
- Nhập thông tin thu nhập
- Quản lý giao dịch thu chi
- Thống kê tài chính theo ngày, tháng, năm

### Công nghệ sử dụng

- React Native
- Expo
- Redux(toolkit)
- Axios
- Async Storage

