declare module 'react-native-safe-area-context' {
  import * as React from 'react';
  import { ViewProps } from 'react-native';

  export interface SafeAreaViewProps extends ViewProps {}

  export const SafeAreaView: React.ComponentType<SafeAreaViewProps>;
}

