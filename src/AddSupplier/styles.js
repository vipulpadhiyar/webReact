import {StyleSheet} from 'react-native';
import {moderateScale, verticalScale, scale, fonts} from '@theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flex1: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: moderateScale(16),
        paddingTop: moderateScale(16),
        justifyContent: 'space-between',
    },
    contentContainerStyle: {
        paddingHorizontal: moderateScale(15),
        paddingBottom: verticalScale(60), // Reduced bottom padding since button is now sticky
    },
    containerStyle: {},
    innerContainer: {},
    submitText: {
        fontSize: moderateScale(16),
        fontFamily: fonts.Inter,
        fontWeight: '400',
        paddingBottom: moderateScale(8),
    },
    titleText: {
        fontSize: moderateScale(22),
        fontFamily: fonts.Inter,
        fontWeight: '500',
        paddingBottom: moderateScale(8),
    },
    sectionText: {
        fontSize: moderateScale(18),
        fontFamily: fonts.Inter,
        fontWeight: '500',
    },
    listItem: {
        justifyContent: 'center',
        // padding: moderateScale(10),
        paddingTop: moderateScale(10),
        paddingHorizontal: moderateScale(10),
        borderRadius: moderateScale(5),
        marginTop: moderateScale(20),
    },
    stickyHeader: {
        paddingHorizontal: moderateScale(15),
        paddingTop: verticalScale(10),
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: moderateScale(10),
        overflow: 'hidden',
        marginBottom: moderateScale(8),
    },
});

export default styles;
