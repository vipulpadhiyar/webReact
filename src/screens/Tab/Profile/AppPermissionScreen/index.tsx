import React from 'react';
import {View} from 'react-native';

import {AppScreen} from '~/components';
import {IcBell} from '~/constants';
import {translate} from '~/localization';

import {SwitchButton} from './components/SwitchButton';
import {styles} from './styles';
import {useAppPermissionController} from './useAppPermissionController';

export const AppPermissionScreen = () => {
  const {notificationAllowed, onBack, onToggleNotification} =
    useAppPermissionController();
  return (
    <AppScreen header={translate('AppPermission')} onBack={onBack}>
      <View style={styles.subContainer}>
        <SwitchButton
          title={translate('Notifications')}
          leftIcon={IcBell}
          enable={notificationAllowed}
          onToggle={onToggleNotification}
        />
      </View>
    </AppScreen>
  );
};
