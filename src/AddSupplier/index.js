import React from 'react';
import {Platform, ScrollView, StatusBar, Text, View} from 'react-native';
import {t} from 'i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import {useTheme} from '@theme';
import {
    AppCommonTextInput,
    AppSinglePicker,
    AppTextInput,
    AppContainer,
    AppScrollView,
} from '@components/atoms';
import {ModalCustomHeader} from '@components/atoms';
import Loader from '@components/Loader';
import {useAddSupplierController} from './controller';
import {AppMultiLineTextInput} from '@components/atoms';

import styles from './styles';

const AddSupplier = () => {
    const {theme, variant} = useTheme();
    const insets = useSafeAreaInsets();

    const {
        supplier,
        isPending,
        updateSupplierName,
        updateAddress,
        onPressCountry,
        onPressCurrency,
        updateEmail,
        updateFirstName,
        updateLastName,
        updateTitle,
        onPressSubmit,
        onPressBack,
    } = useAddSupplierController();

    const [stickyHeaderHeight, setStickyHeaderHeight] = React.useState(0);

    const scrollContent = () => {
        return (
            <View style={[styles.container]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.contentContainerStyle}>
                    <View
                        style={[
                            styles.listItem,
                            {backgroundColor: theme.commonBgColor},
                        ]}>
                        <AppMultiLineTextInput
                            containerStyle={styles.containerStyle}
                            label={t('client_stack.address')}
                            value={supplier.address}
                            editable={true}
                            disable={false}
                            onChangeText={updateAddress}
                        />
                        <AppSinglePicker
                            containerStyle={styles.containerStyle}
                            label={t('client_stack.country')}
                            value={supplier.country?.name}
                            editable={true}
                            disable={false}
                            onPress={onPressCountry}
                            isBorder={false}
                            isNext={false}
                        />
                        {/* <AppTextInput
              containerStyle={styles.containerStyle}
              label={t('supplier_stack.code')}
              value={supplier.code}
              placeholder={`<${t('purchase.no_value')}>`}
              editable={true}
              disable={false}
              onChangeText={updateCode}
              separator={false}
            /> */}
                    </View>
                    <View
                        style={[
                            styles.listItem,
                            {backgroundColor: theme.commonBgColor},
                        ]}>
                        <Text
                            style={[
                                styles.sectionText,
                                {color: theme.textPrimary},
                            ]}>
                            {t('client_stack.contact')}
                        </Text>
                        <AppTextInput
                            containerStyle={styles.containerStyle}
                            label={`${t('client_stack.title')}`}
                            value={supplier.title}
                            editable={true}
                            disable={false}
                            placeholder={`<${t('purchase.no_value')}>`}
                            onChangeText={updateTitle}
                        />
                        <AppTextInput
                            containerStyle={styles.containerStyle}
                            label={`${t('client_stack.first_name')}`}
                            value={supplier.firstName}
                            editable={true}
                            disable={false}
                            placeholder={`<${t('purchase.no_value')}>`}
                            onChangeText={updateFirstName}
                        />
                        <AppTextInput
                            containerStyle={styles.containerStyle}
                            label={`${t('client_stack.last_name')}`}
                            value={supplier.lastName}
                            editable={true}
                            disable={false}
                            placeholder={`<${t('purchase.no_value')}>`}
                            onChangeText={updateLastName}
                        />
                        <AppTextInput
                            containerStyle={styles.containerStyle}
                            label={`${t('client_stack.email')}`}
                            value={supplier.email}
                            editable={true}
                            disable={false}
                            placeholder={`<${t('purchase.no_value')}>`}
                            onChangeText={updateEmail}
                            separator={false}
                        />
                    </View>
                    <View
                        style={[
                            styles.listItem,
                            {backgroundColor: theme.commonBgColor},
                        ]}>
                        <Text
                            style={[
                                styles.sectionText,
                                {color: theme.textPrimary},
                            ]}>
                            {t('client_stack.detail_section')}
                        </Text>
                        {/* <AppTextInput
              containerStyle={styles.containerStyle}
              label={`${t('supplier_stack.bank_beneficiary_name')}`}
              value={supplier.bankBeneficiaryName}
              editable={true}
              disable={false}
              placeholder={`<${t('purchase.no_value')}>`}
              onChangeText={updateBeneficiaryName}
            />
            <AppTextInput
              containerStyle={styles.containerStyle}
              label={`${t('supplier_stack.bank_beneficiary_account_number')}`}
              value={supplier.bankBeneficiaryAccountNumber}
              editable={true}
              disable={false}
              placeholder={`<${t('purchase.no_value')}>`}
              onChangeText={updateBeneficiaryAccountNumber}
            />
            <AppTextInput
              containerStyle={styles.containerStyle}
              label={`${t('supplier_stack.bank_bic')}`}
              value={supplier.bankBeneficiaryBankBIC}
              editable={true}
              disable={false}
              placeholder={`<${t('purchase.no_value')}>`}
              onChangeText={updateBankBic}
            /> */}
                        {/* <AppSinglePicker
              containerStyle={styles.containerStyle}
              label={t('supplier_stack.supplier_account')}
              value={supplier.supplierAccount?.name || ''}
              editable={true}
              onPress={onPressSupplierAccount}
              disable={false}
              isNext={false}
            /> */}
                        <AppSinglePicker
                            containerStyle={styles.containerStyle}
                            label={t('processing_hub.currency')}
                            value={supplier.currency}
                            editable={true}
                            onPress={onPressCurrency}
                            disable={false}
                            isBorder={false}
                            isNext={false}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    };
    return (
        <LinearGradient
            colors={[theme.bg_gradient_1, theme.bg_gradient_2]}
            style={{flex: 1}}>
            <AppContainer
                edges={Platform.OS == 'ios' ? ['bottom'] : ['top', 'bottom']}>
                <StatusBar
                    backgroundColor={theme.bg_gradient_1}
                    hidden={false}
                    barStyle={
                        variant === 'dark' ? 'light-content' : 'dark-content'
                    }
                />
                <ModalCustomHeader
                    centerText={t('supplier_stack.add_supplier')}
                    leftText={t('scan.cancel')}
                    rightText={t('processing_hub.submit')}
                    rightOnPress={onPressSubmit}
                    leftOnPress={onPressBack}
                />
                <View
                    style={styles.stickyHeader}
                    onLayout={e => {
                        setStickyHeaderHeight(e.nativeEvent.layout.height);
                    }}>
                    <View style={styles.headerContainer}>
                        <AppCommonTextInput
                            containerStyle={styles.containerStyle}
                            label={`${t('supplier_stack.supplier_name')}`}
                            value={supplier.name}
                            multiline={true}
                            editable={true}
                            disable={false}
                            placeholder={`${t('supplier_stack.supplier_name')}`}
                            onChangeText={updateSupplierName}
                        />
                    </View>
                </View>

                <AppScrollView extraScrollHeight={stickyHeaderHeight}>
                    {scrollContent()}
                </AppScrollView>
                {/* ) : (
                        <>{scrollContent()}</>
                    )}
                </KeyboardAvoidingView> */}
                <Loader visible={isPending} />
            </AppContainer>
        </LinearGradient>
    );
};

export default AddSupplier;
