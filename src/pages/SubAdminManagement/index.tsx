import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Switch, message } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DeleteModal from 'components/common/Modal/DeleteModal';
import SearchBar from 'components/common/SerachBar';
import { CommonTable } from 'components/common/Table';
import ContentHeader from 'components/layout/contentHeader';

import { subAdminApi } from 'services/api/subAdmin';
import { IGetSubAdminListResList } from 'services/api/subAdmin/type';
import { vendorList } from 'services/api/vendor/type';
import { subAdminKeys } from 'services/hooks/queryKeys';
import { useSubAdminList } from 'services/hooks/subAdmin';
import { ISubAdminListArg } from 'services/hooks/subAdmin/types';

import { checkBoxOptions } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';
import { capitalizeWords, debounce, isSorterType } from 'utils/functions';

const pathNames: any = [
  {
    title: 'Sub Admin Management'
  }
];

const SubAdminManagement = () => {
  const navigate = useNavigate();
  const { activeInActiveSub, deleteSubAdminAction, resendPasswordAction } = subAdminApi;
  const queryClient = useQueryClient();
  const [args, setArgs] = useState<ISubAdminListArg>({
    page: 1,
    limit: 10,
    search: '',
    sortBy: '',
    sortOrder: ''
  });
  const [open, setIsOpen] = useState<boolean>(false);
  const [subAdminId, setSubAdminId] = useState<string>('');
  const { data } = useSubAdminList(args);

  const activeInActiveSubAdmin = (_id: string) => {
    activeInActiveSub(_id)
      .then((res) => {
        queryClient.invalidateQueries(subAdminKeys.all);
        message.success(res?.message);
      })
      .catch((err) => {
        message.error(err?.message);
      });
  };
  const deleteSubAdmin = () => {
    deleteSubAdminAction(subAdminId)
      .then((res) => {
        queryClient.invalidateQueries(subAdminKeys.all);
        message.success(res?.message);
        setIsOpen(false);
      })
      .catch((err) => {
        message.error(err?.message);
      });
  };

  const resendPassword = (id: string) => {
    resendPasswordAction(id)
      .then((res) => {
        queryClient.invalidateQueries(subAdminKeys.all);
        message.success(res?.message);
      })
      .catch((err) => {
        message.error(err?.message);
      });
  };

  const columns: ColumnsType<any> = [
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      width: '150px',
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
      render: (_value, row: IGetSubAdminListResList) =>
        row?.fullName ? capitalizeWords(row?.fullName) : '-'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '200px',
      key: 'email'
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: '150px',
      render: (_value, row: IGetSubAdminListResList) =>
        row?.phoneNumber ? row?.countryCode + ' ' + row?.phoneNumber : '-'
    },
    {
      title: 'Role',
      dataIndex: 'access',
      key: 'access',
      width: '400px',
      render: (_value, row: IGetSubAdminListResList) => {
        return row?.access?.length
          ? checkBoxOptions
              .filter((option) => row?.access?.includes(option.value))
              .map((option) => `${option?.label}`)
              ?.join(', ')
          : '-';
      }
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean, row: IGetSubAdminListResList) => (
        <Switch checked={isActive} onChange={() => activeInActiveSubAdmin(row?._id)} />
      )
    },
    {
      title: 'Resend Password',
      dataIndex: 'resendPassword',
      key: 'resendPassword',
      render: (_value, row: IGetSubAdminListResList) => (
        <Button style={{ height: '20px' }} onClick={() => resendPassword(row?._id)} type="primary">
          Resend Password
        </Button>
      )
    },

    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      width: '100px',
      render: (_cell: any, row: IGetSubAdminListResList) => {
        return (
          <div className="d-flex">
            <Button
              type="link"
              icon={<EyeOutlined />}
              onClick={() => navigate(ROUTES.viewSubAdmin(row?._id))}
            />
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => navigate(ROUTES.editSubAdmin(row?._id))}
            />

            <Button
              type="link"
              icon={<DeleteOutlined />}
              onClick={() => {
                setSubAdminId(row?._id);
                setIsOpen(true);
              }}
            />
          </div>
        );
      }
    }
  ];

  const onChangePage: any = (
    pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<vendorList>
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
      <>
        <div className="shadow-paper">
          <ContentHeader pathNames={pathNames} />
          <SearchBar
            extraButton={
              <Button type="primary" size="large" onClick={() => navigate(ROUTES.addSubAdmin)}>
                Add
              </Button>
            }
            showSearch={true}
            onSearch={handleSearch}
            onChange={(e: any) => optimizedFn(e?.target?.value)}
          />
          <CommonTable
            columns={columns}
            // dataSource={data?.list ?? []}
            dataSource={
              data?.list?.map((item: any) => ({
                ...item,
                key: item._id
              })) ?? []
            }
            pagination={{
              current: args?.page || 1,
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '50'],
              total: data?.total_records
            }}
            onChange={onChangePage}
          />
        </div>

        <DeleteModal
          modalTitle="Are you sure to delete this Sub admin?"
          open={open}
          onOk={deleteSubAdmin}
          onCancel={() => setIsOpen(false)}
        />
      </>
    </>
  );
};

export default SubAdminManagement;
