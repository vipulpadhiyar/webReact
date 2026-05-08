import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {render, RenderResult} from '@testing-library/react-native';

export const renderWithProviders = (
  routes: RenderProviderParams[],
  initialRouteName?: string,
): RenderResult => {
  const Stack = createNativeStackNavigator<AuthStackParamList>();
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRouteName ?? routes[0].name}>
          {routes.map(obj => (
            <Stack.Screen
              key={obj.name}
              name={obj.name}
              component={obj.screen}
              initialParams={obj?.initialParam}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>,
  );
};

export const renderWithProvidersRow = (
  ui: React.ReactElement,
): RenderResult => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
};
