import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Switch, TablePaginationConfig, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DeleteModal from 'components/common/Modal/DeleteModal';
import SearchBar from 'components/common/SerachBar';
import { CommonTable } from 'components/common/Table';
import ContentHeader from 'components/layout/contentHeader';

import { ICategoryListReq } from 'services/api/category/type';
import { customerAPI } from 'services/api/customer';
import { customerView } from 'services/api/customer/type';
import { useCustomerList } from 'services/hooks/customer';
import { customerKeys } from 'services/hooks/queryKeys';

import { VITE_REACT_APP_IMAGE_URL, uploadImageEnum } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';
import { debounce, isSorterType, toAbsoluteUrl } from 'utils/functions';

const pathNames: any = [
  {
    title: 'Customer Management'
  }
];
const CustomerManagement = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { activeInActiveCityCategory, deleteCustomerAction } = customerAPI;

  const [args, setArgs] = useState<ICategoryListReq>({
    page: 1,
    limit: 10,
    search: '',
    sortBy: '',
    sortOrder: ''
  });

  const { data } = useCustomerList(args);
  const [open, setIsOpen] = useState<boolean>(false);
  const [customerId, setCustomerId] = useState<string>('');

  const activeInActive = (_id: string) => {
    activeInActiveCityCategory(_id)
      .then((res) => {
        queryClient.invalidateQueries(customerKeys.all);
        message.success(res?.message);
      })
      .catch((_err) => {
        message.error(_err?.message);
      });
  };

  const deleteCustomer = () => {
    deleteCustomerAction(customerId)
      .then((res) => {
        queryClient.invalidateQueries(customerKeys.all);
        message.success(res?.message);
        setIsOpen(false);
      })
      .catch((_err) => {
        message.error(_err?.message);
      });
  };

  const columns: ColumnsType<any> = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (_cell: any, row: customerView) => (
        <picture>
          <img
            src={
              row?.profilePicture
                ? `${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.customer}/${row?.profilePicture}`
                : toAbsoluteUrl('/asset/dummy.png')
            }
            alt="dummy"
          />
        </picture>
      )
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      sorter: (a, b) => {
        const nameA = a.fullName || '';
        const nameB = b.fullName || '';
        return nameA.localeCompare(nameB);
      },
      render: (fullName: string, row: customerView) => (
        <span>{row?.fullName ? fullName : 'Full name not available'}</span>
      )
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      render: (phoneNumber: string) => {
        return phoneNumber ? phoneNumber : 'Phone number not available';
      }
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => {
        const nameA = a.email || '';
        const nameB = b.email || '';
        return nameA.localeCompare(nameB);
      },
      render: (email: string) => {
        return email ? email : 'Email not available';
      }
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean, row: customerView) => (
        <Switch checked={isActive} onChange={() => activeInActive(row?._id)} />
      )
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',

      render: (_cell: any, row: customerView) => (
        <div className="d-flex">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => navigate(ROUTES.viewCustomer(row?._id))}
          />
          <Button
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => {
              setCustomerId(row?._id);
              setIsOpen(true);
            }}
          />
        </div>
      )
    }
  ];

  const onChange: any = (
    pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any>
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
        <SearchBar
          showSearch={true}
          onSearch={handleSearch}
          onChange={(e: any) => optimizedFn(e?.target?.value)}
        />

        <CommonTable
          scroll={{ x: 1000 }}
          bordered
          columns={columns}
          dataSource={data?.list ?? []}
          pagination={{
            current: args?.page || 1,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50'],
            total: data?.total_records
          }}
          onChange={onChange}
        />
      </div>

      <DeleteModal
        modalTitle="Are you sure to delete this customer?"
        open={open}
        onOk={deleteCustomer}
        onCancel={() => setIsOpen(false)}
      />
    </>
  );
};

export default CustomerManagement;
