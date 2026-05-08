import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Avatar, Button, Switch, message } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import DeleteModal from 'components/common/Modal/DeleteModal';
import SearchBar from 'components/common/SerachBar';
import { CommonTable } from 'components/common/Table';
import ContentHeader from 'components/layout/contentHeader';

import { homeBannerApi } from 'services/api/homeBanner';
import { IGetHomeBannerListResList } from 'services/api/homeBanner/type';
import { useHomeBannerList } from 'services/hooks/homeBanner';
import { IHomeBannerListArg } from 'services/hooks/homeBanner/types';
import { homeBannerKeys } from 'services/hooks/queryKeys';

import { VITE_REACT_APP_IMAGE_URL, uploadImageEnum } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';
import { debounce, isSorterType, toAbsoluteUrl } from 'utils/functions';

const pathNames: any = [
  {
    title: 'Home Banner Management'
  }
];

const HomeBannerManagement = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { activeInActiveHomeBanner, deleteHomeBannerAction } = homeBannerApi;

  const [args, setArgs] = useState<IHomeBannerListArg>({
    page: 1,
    limit: 10,
    search: '',
    sortBy: '',
    sortOrder: ''
  });
  const [open, setIsOpen] = useState<boolean>(false);
  const [homeBannerId, setHomeBannerId] = useState<string>('');

  const { data } = useHomeBannerList(args);

  const onDeleteHomeBanner = () => {
    deleteHomeBannerAction(homeBannerId)
      .then((res) => {
        queryClient.invalidateQueries(homeBannerKeys.all);
        message.success(res?.message);
        setIsOpen(false);
      })
      .catch((_err) => {
        message.error(_err?.message);
      });
  };

  const activeInActiveAction = (id: string) => {
    activeInActiveHomeBanner(id)
      .then((res) => {
        queryClient.invalidateQueries(homeBannerKeys.all);

        message.success(res?.message);
      })
      .catch((_err) => {
        message.error(_err?.message);
      });
  };

  const columns: ColumnsType<IGetHomeBannerListResList> = [
    {
      title: 'Banner Name',
      dataIndex: 'name',
      key: 'name',
      width: '400px'
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      width: '400px',
      render: (_cell: any, row: IGetHomeBannerListResList) => (
        <Avatar
          shape="square"
          size={56}
          src={
            row?.image
              ? `${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.homePageBanner}/${row?.image}`
              : toAbsoluteUrl('/asset/dummy.png')
          }
          alt="dummy"
        />
      )
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      width: '200px',
      render: (isActive: boolean, row: IGetHomeBannerListResList) => (
        <Switch checked={isActive} onChange={() => activeInActiveAction(row?._id)} />
      )
    },

    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',

      render: (_cell: any, row: IGetHomeBannerListResList) => {
        return (
          <div className="d-flex">
            <Button
              type="link"
              icon={<EyeOutlined />}
              onClick={() => navigate(ROUTES.viewHomeBanner(row?._id))}
            />
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => navigate(ROUTES.editHomeBanner(row?._id))}
            />
            <Button
              type="link"
              icon={<DeleteOutlined />}
              onClick={() => {
                setHomeBannerId(row?._id);
                setIsOpen(true);
              }}
            />
          </div>
        );
      }
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
          extraButton={
            <Button type="primary" size="large" onClick={() => navigate(ROUTES.addHomeBanner)}>
              Add
            </Button>
          }
          showSearch={true}
          onSearch={handleSearch}
          onChange={(e: any) => optimizedFn(e?.target?.value)}
        />
        <CommonTable
          columns={columns}
          dataSource={
            data?.list?.map((item) => ({
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
          onChange={onChange}
        />
      </div>

      <DeleteModal
        modalTitle="Are you sure to delete this home banner image?"
        open={open}
        onOk={onDeleteHomeBanner}
        onCancel={() => setIsOpen(false)}
      />
    </>
  );
};

export default React.memo(HomeBannerManagement);
