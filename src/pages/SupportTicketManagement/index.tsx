import { TablePaginationConfig } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useState } from 'react';

import SearchBar from 'components/common/SerachBar';
import { CommonTable } from 'components/common/Table';
import ContentHeader from 'components/layout/contentHeader';

import { ICategoryListReq } from 'services/api/category/type';
import { serviceList } from 'services/api/service/type';
import { useSupportTicketManagement } from 'services/hooks/supportTicket';

import { capitalizeWords, debounce, isSorterType } from 'utils/functions';

const pathNames: any = [
  {
    title: 'Support Ticket Management'
  }
];

const SupportTicketManagement = () => {
  const [args, setArgs] = useState<ICategoryListReq>({
    page: 1,
    limit: 10,
    search: '',
    sortBy: '',
    sortOrder: '',
    isActive: true
  });
  const { data } = useSupportTicketManagement(args);

  const columns: ColumnsType<any> = [
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      sorter: true,
      width: '300px',
      render: (value) => (value ? capitalizeWords(value) : '-')
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '300px'
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: '300px'
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note'
    }
  ];

  const onChange: any = (
    pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<serviceList>
  ) => {
    setArgs({
      ...args,
      page: pagination.current,
      limit: pagination.pageSize,
      search: args.search,
      sortOrder: isSorterType(sorter?.order) ?? args.sortOrder,
      sortBy: (sorter.field as string) ?? (args.sortBy as string)
    });
  };

  const handleSearch = (value: string) => {
    setArgs({
      ...args,
      search: value,
      page: 1
    });
  };

  const handleChange = (e: string) => {
    if (e.length >= 3 || e.length === 0)
      setArgs({
        ...args,
        search: e,
        page: 1
      });
  };

  const optimizedFn = debounce(handleChange);

  return (
    <>
      <div className="shadow-paper">
        <ContentHeader pathNames={pathNames} />
        <div className="set-filter">
          <SearchBar
            showSearch={true}
            onSearch={handleSearch}
            onChange={(e: any) => optimizedFn(e?.target?.value)}
          />
        </div>
        <CommonTable
          scroll={{ x: 1000 }}
          bordered
          columns={columns}
          dataSource={data?.list ?? []}
          // dataSource={
          //   Array.isArray(data?.list) && data && data?.list?.length > 0
          //     ? data?.list?.map((item) => ({ ...item, key: item.rowId }))
          //     : []
          // }
          pagination={{
            current: args?.page || 1,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50'],
            total: data?.total_records
          }}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default SupportTicketManagement;
