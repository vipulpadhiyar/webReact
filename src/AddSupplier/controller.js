import {DeviceEventEmitter} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import Toast from 'react-native-toast-message';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {useTheme} from '@theme';
import {useEffect, useMemo, useState} from 'react';
import {NavScreen, accountGroup} from '@utils/constant';
import {useBaseData, useOrganization} from '@hooks';
import {SuppliersQuery} from '@services';

/**
 * Controller for PurchaseDocumentDetails screen
 * Handles all business logic, API calls, state management, and calculations
 */
export const useAddSupplierController = () => {
    const {t} = useTranslation();
    const {theme} = useTheme();
    const navigation = useNavigation();
    const route = useRoute();
    const {fromSale} = route.params || {};
    const {organization} = useOrganization();
    const queryClient = useQueryClient(); // Get queryClient instance

    const [supplier, setSupplier] = useState({
        name: '',
        address: '',
        country: {},
        regNumber: '',
        taxRegNumber: '',
        title: '',
        firstName: '',
        lastName: '',
        email: '',
        vatRegNumber: '',
        currency: '',
    });
    const {currencies, countries} = useBaseData();

    const currenciesSelectSource = useMemo(
        () =>
            currencies?.map(curr => ({
                value: curr.code,
                name: `${curr.code} - ${curr.name}`,
                currency: curr,
            })) || [],
        [currencies],
    );

    const countriesSelectSource = useMemo(
        () =>
            countries.map(country => ({
                value: country.name,
                name: country.name,
                country,
            })),
        [countries],
    );

    const chartAssetsAndExpensesList = useMemo(() => {
        if (!organization?.chartOfAccounts) return [];

        const pureChart = organization.chartOfAccounts.filter(
            acc => !acc.isParent && !acc.isClient && !acc.isSupplier,
        );

        const chartAssetsAndExpenses = pureChart.filter(
            acc =>
                acc.groupId === accountGroup.ACC_ASSETS ||
                acc.groupId === accountGroup.ACC_LIABILITIES,
        );

        return chartAssetsAndExpenses.map(acc => ({
            ...acc,
            value: acc.name,
            name: `${acc.accountCode} - ${acc.name}`,
        }));
    }, [organization?.chartOfAccounts]);

    const {mutate: addSupplier, isPending} = useMutation({
        mutationFn: payload => SuppliersQuery.addSupplier(payload),

        onSuccess: async res => {
            Toast.show({
                type: 'success',
                position: 'bottom',
                text1: t('supplier_stack.supplier_added_successfully'),
            });
            const newSupplier = res?.data; // adjust if API structure differs

            queryClient.setQueryData(['getListOfSuppliers', ''], oldData => {
                if (!oldData) return oldData;

                return {
                    ...oldData,
                    pages: oldData.pages.map((page, index) => {
                        if (index === 0) {
                            return {
                                ...page,
                                data: {
                                    ...page.data,
                                    suppliers: [
                                        newSupplier,
                                        ...page.data.suppliers,
                                    ],
                                },
                            };
                        }
                        return page;
                    }),
                };
            });

            navigation.goBack();
        },

        onError: error => {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: errorMessage,
            });
        },
    });

    /**
     * Update name
     */
    const updateSupplierName = text => {
        setSupplier(prev => ({
            ...prev,
            name: text,
        }));
    };

    /**
     * Update address
     */
    const updateAddress = text => {
        setSupplier(prev => ({
            ...prev,
            address: text,
        }));
    };

    /**
     * Update title
     */
    const updateTitle = text => {
        setSupplier(prev => ({
            ...prev,
            title: text,
        }));
    };

    /**
     * Update first name
     */
    const updateFirstName = text => {
        setSupplier(prev => ({
            ...prev,
            firstName: text,
        }));
    };

    /**
     * Update last name
     */
    const updateLastName = text => {
        setSupplier(prev => ({
            ...prev,
            lastName: text,
        }));
    };

    /**
     * Update email
     */
    const updateEmail = text => {
        setSupplier(prev => ({
            ...prev,
            email: text,
        }));
    };

    /**
     * Navigate to currency selection screen
     */
    const onPressCountry = () => {
        const obj = {
            title: t('purchase.select_account'),
            noDataText: t('purchase_.no_account_found'),
            updateValue: 'updateCountry',
            options: countriesSelectSource,
        };
        navigation.navigate(NavScreen.SELECT_OPTION_SCREEN, obj);
    };

    useEffect(() => {
        const subscription = DeviceEventEmitter.addListener(
            'updateCurrencySupplier',
            newData => {
                setSupplier(prev => ({
                    ...prev,
                    currency: newData?.name,
                }));
            },
        );

        return () => {
            subscription.remove();
        };
    }, []);

    useEffect(() => {
        const subscription = DeviceEventEmitter.addListener(
            'updateCountry',
            newData => {
                console.log('newData', newData);
                setSupplier(prev => ({
                    ...prev,
                    country: newData,
                }));
            },
        );
        return () => {
            subscription.remove();
        };
    }, []);

    const onPressSubmit = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // simple email validation

        if (!supplier.name) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: t('supplier_stack.supplier_name_is_required'),
            });
        } else if (!supplier.email) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: t('client_stack.email_is_required'),
            });
        } else if (!emailRegex.test(supplier.email)) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: t('client_stack.enter_a_valid_email'),
            });
        } else {
            let payload = {
                name: supplier.name,
                country:
                    supplier.country?.country?.name ||
                    organization?.country ||
                    'Cyprus',
                defaultCurrency:
                    supplier.currency ||
                    organization?.baseCurrency?.code ||
                    'EUR',
                address: supplier.address,
                email: supplier.email,
                contactTitle: supplier.title,
                contactFirstName: supplier.firstName,
                contactLastName: supplier.lastName,
                contactEmail: supplier.email,
            };

            console.log('onPressSubmit called ✅', payload);
            addSupplier(payload);
        }
    };

    const onPressBack = () => {
        navigation.goBack();
    };

    /**
     * Navigate to currency selection screen
     */
    const onPressCurrency = () => {
        const obj = {
            title: t('processing_hub.select_currency'),
            noDataText: t('drawer_items.no_currency_found'),
            updateValue: 'updateCurrencySupplier',
            options: currenciesSelectSource,
        };
        navigation.navigate(NavScreen.SELECT_OPTION_SCREEN, obj);
    };

    return {
        navigation,
        supplier,
        isPending,
        updateSupplierName,
        updateAddress,
        onPressCountry,
        updateTitle,
        updateFirstName,
        updateLastName,
        updateEmail,
        onPressSubmit,
        onPressBack,
        onPressCurrency,
    };
};
