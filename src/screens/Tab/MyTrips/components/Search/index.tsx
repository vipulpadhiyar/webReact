import React from 'react';

import {AppTextInput} from '~/components';
import {IcSearch} from '~/constants';
import {translate} from '~/localization';

import styles from './styles';
/**
 *  @param testID - for testing purpose
 *  @param search - search value
 *  @param onChange - function to handle search value change
 */
interface Props {
  testID?: string;
  search: string;
  onChange: (value: string) => void;
}

/**
 *
 * @param props
 * @description This component displays a search bar with a search icon.
 * @param testID
 * @param search
 * @param onChange
 * @returns
 */

export const SearchBar: React.FC<Props> = (props: Props) => {
  const {search, onChange} = props;
  return (
    <AppTextInput
      testID={props.testID}
      style={styles.input}
      containerStyle={styles.inputContainer}
      rightIcon={IcSearch}
      placeholder={translate('SearchHere')}
      onChangeText={onChange}
      value={search}
    />
  );
};
