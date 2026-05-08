import { ConfigProvider } from 'antd';
import { theme } from 'style/Theme';

const ThemeConfig = ({ children }: any) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: `${theme?.color?.white}`,
          colorBgContainerDisabled: `${theme?.color?.grayLight}`,
          colorBgTextHover: `${theme?.color?.primaryLight}`,
          colorBorder: `${theme?.color?.inputborder}`,
          colorError: `${theme?.color?.danger}`,
          colorLink: `${theme?.color?.black}`,
          colorLinkActive: `${theme?.color?.primary}`,
          colorLinkHover: `${theme?.color?.primary}`,
          colorPrimary: `${theme?.color?.primary}`,
          colorPrimaryActive: `${theme?.color?.primary}`,
          colorPrimaryHover: `${theme?.color?.primary}`,
          colorText: `${theme?.color?.black}`,
          colorTextPlaceholder: `${theme?.color?.inputborder}`,
          colorTextDisabled: `${theme?.color?.gray}`,
          borderRadius: 6,
          borderRadiusLG: 6,
          borderRadiusSM: 6,
          controlHeight: 36,
          controlOutline: `${theme?.color?.transparent}`,
          fontSize: 14,
          fontFamily: `${theme?.font?.family?.montserrat}`,
          lineHeight: 1,
          controlPaddingHorizontal: 12
        },
        components: {
          Layout: {
            bodyBg: `${theme.color.light}`,
            footerBg: `${theme.color.white}`,
            footerPadding: '20px 30px',
            headerBg: `${theme.color.white}`,
            headerHeight: 64,
            headerPadding: '0 30px',
            siderBg: `${theme.color.white}`,
            triggerBg: `${theme.color.light}`,
            triggerColor: `${theme.color.black}`,
            triggerHeight: 56
          },
          Menu: {
            darkItemBg: `${theme.color.white}`,
            darkItemColor: `${theme.color.black}`,
            darkItemHoverBg: `${theme.color.primary}`,
            darkItemHoverColor: `${theme.color.white}`,
            darkItemSelectedBg: `${theme.color.primary}`,
            darkItemSelectedColor: `${theme.color.white}`,
            darkItemDisabledColor: `${theme.color.grayLight}`,
            darkSubMenuItemBg: 'inherit',
            iconSize: 16,
            collapsedIconSize: 16,
            itemBorderRadius: 10,
            itemHeight: 42,
            itemMarginBlock: 6,
            itemMarginInline: 12
          },
          Form: {
            itemMarginBottom: 0,
            labelColor: `${theme?.color?.gray}`,
            labelFontSize: 16,
            labelHeight: 30,
            verticalLabelPadding: '0 0 6px',
            colorError: `${theme?.color?.danger}`,
            lineHeight: 2
          },
          Table: {
            borderColor: `${theme?.color?.primaryLight}`,
            cellFontSizeSM: 14,
            headerBg: `${theme?.color?.primaryLight}`,
            headerColor: `${theme?.color?.black}`,
            rowHoverBg: `${theme?.color?.light}`,
            headerBorderRadius: 6
          },
          Button: {
            primaryColor: `${theme?.color?.white}`,
            fontWeight: '500',
            contentFontSize: 16,
            controlHeight: 50
          },

          Pagination: {
            itemSize: 30,
            itemSizeSM: 30
          }
        }
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeConfig;
