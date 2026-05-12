import { Layout } from 'antd';
import { responsive } from 'style/Common/Mixin';
import { theme } from 'style/Theme';

import { styled } from 'styled-components';

export const StyledLayout = styled(Layout)`
  --headerHeight: 60px;
  --footerHeight: 60px;
  --bodyHeight: calc(100vh - var(--headerHeight));

  &.ant-layout {
    min-height: 100vh;
    background-color: ${theme?.color?.transparent};
    .siteLayout {
      overflow: auto;
    }
    /* Sidebar */
    .ant-layout-sider {
      height: 100vh;
      .logoWrapper {
        height: var(--headerHeight);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        img {
          &.logoSm {
            max-width: 30px;
            max-height: 30px;
          }
        }
      }
      .ant-menu {
        &.sidebarMenu {
          height: calc(100vh - var(--headerHeight) - var(--footerHeight));
          overflow: auto;
        }
        .ant-menu-item {
          &:focus {
            background-color: ${theme.color.primary};
            color: ${theme.color.white};
            outline: none;
          }
        }
        .ant-menu-submenu {
          color: ${theme.color.black};

          .ant-menu-submenu-title {
            color: ${theme.color.black};
          }
          &.ant-menu-submenu-active,
          &.ant-menu-submenu-selected {
            .ant-menu-submenu-title {
              color: ${theme.color.white};
              background-color: ${theme.color.primary};
            }
          }
          .ant-menu {
            .ant-menu-item {
              color: ${theme.color.black};
              &.ant-menu-item-active,
              &.ant-menu-item-selected {
                color: ${theme.color.white};
              }
            }
          }
        }

        .ant-menu-submenu-active {
          color: ${theme?.color?.white};
        }
      }
      .ant-layout-sider-trigger {
        height: var(--footerHeight);
        line-height: var(--footerHeight);
        background-color: ${theme?.color?.transparent};
        border-top: 1px solid ${theme?.color?.primaryLight};
      }
    }
    /* Header */
    .ant-layout-header {
      height: var(--headerHeight);
      background-color: ${theme?.color?.transparent};
      padding: 0 16px;
      z-index: 1;
      .profile-avatar {
        padding: 6px;
        border: 1px solid ${theme?.color?.black};
        background-color: ${theme?.color?.white};
        width: 35px;
        height: 35px;
      }
    }

    /* Content */
    .ant-layout-content {
      height: var(--bodyHeight);
    }
    /* Footer */
    .ant-layout-footer {
      height: var(--footerHeight);
      text-align: center;
    }
  }
  .content-body {
    padding: 15px 0;
  }
  .content-wrap {
    padding: 0 15px;
  }
  ${responsive('lg')`
    &.ant-layout {      
      .ant-layout-header{
        background-color: #fff;
        box-shadow: 0px 19px 13px -10px rgba(0, 0, 0, 0.05), 0px 0px 0px 2px rgba(17, 17, 22, 0.10);
        border-left: 1px solid #F2EEF7;
      } 
      .ant-layout-content{
        overflow: auto;        
      } 
  `}
  ${responsive('md')`
    &.ant-layout {   
      .ant-layout-sider {
        .ant-menu {
          &.sidebarMenu {
            height: calc(100vh - 60px);
          }
        }   
      }
      .ant-layout-header{
        padding:0 16px 0 60px;
        border-left: none;
      }  
      .ant-layout-sider{
        z-index: 999;
        position: fixed !important;
        .ant-layout-sider-children{
          position: relative;
          z-index: 999;
          background-color: #fff;

        }
        &::before {
          content: "";
          position: fixed;
          background-color: rgba(26, 33, 52, 0.7);
          inset: 0;
          z-index: 111;
        }
        .ant-layout-sider-trigger{
          position: fixed;
          top: 14px;
          left: 260px;
          width: 35px!important;
          background-color: #fff;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index:999;
          border-radius:0 6px 6px 0;
        }
        &.ant-layout-sider-collapsed {
          left: -350px;
          &::before {
            display:none;
          }   
          .ant-layout-sider-trigger{      
            left: 15px;      
            border-radius:6px;
          }       
        }
        
      }
    }
`}
`;
