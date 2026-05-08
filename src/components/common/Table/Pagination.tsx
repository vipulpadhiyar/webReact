import { TablePaginationConfig } from 'antd';

export const PaginationSettings: Partial<TablePaginationConfig> = {
  showSizeChanger: true,
  showQuickJumper: true,
  defaultPageSize: 2,
  pageSizeOptions: ['2', '20', '50', '100'],
  size: 'small',
  position: ['bottomRight'],
  showTotal: (total) => `Total ${total} items`
};
