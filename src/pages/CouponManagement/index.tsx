import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, message } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import DeleteModal from 'components/common/Modal/DeleteModal';
import SearchBar from 'components/common/SerachBar';
import { CommonTable } from 'components/common/Table';
import ContentHeader from 'components/layout/contentHeader';

import { ICategoryListReq, categoryList } from 'services/api/category/type';
import { couponAPI } from 'services/api/coupon';
import { useCouponList } from 'services/hooks/coupon';
import { couponKey } from 'services/hooks/queryKeys';

import { ROUTES } from 'utils/constants/routes';
import { debounce, formatDate, isSorterType } from 'utils/functions';

const pathNames: any = [
  {
    title: 'Coupon Management'
  }
];

const CouponManagement = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { deleteCoupon } = couponAPI;

  const [args, setArgs] = useState<ICategoryListReq>({
    page: 1,
    limit: 10,
    search: '',
    sortBy: '',
    sortOrder: ''
  });
  const [open, setIsOpen] = useState<boolean>(false);
  const [coupenId, setCoupenId] = useState<string>('');
  const { data } = useCouponList(args);

  // const onDeleteCategory = (_id: string) => {
  //   deleteCategory(_id)
  //     .then((res) => {
  //       queryClient.invalidateQueries(categoryKeys.all);
  //       message.success(res?.message);
  //     })
  //     .catch((_err) => {
  //       message.error(_err?.message);
  //     });
  // };

  const deleteCouponAction = () => {
    deleteCoupon(coupenId)
      .then((res) => {
        queryClient.invalidateQueries(couponKey.all);
        setIsOpen(false);
        message.success(res?.message);
      })
      .catch((_err) => {
        message.error(_err?.message);
      });
  };

  const columns: ColumnsType<any> = [
    {
      title: 'Coupon Code',
      dataIndex: 'couponCode',
      key: 'couponCode',
      sorter: (a, b) => a.couponCode.localeCompare(b.couponCode)
    },
    {
      title: 'Discount Type',
      dataIndex: 'discountType',
      key: 'discountType'
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount'
    },
    {
      title: 'Category Count',
      dataIndex: 'categoryCount',
      key: 'categoryCount'
    },
    {
      title: 'User Count',
      dataIndex: 'userCount',
      key: 'userCount'
    },
    {
      title: 'Expire date',
      dataIndex: 'validateDate',
      key: 'validateDate',
      render: (validateDate) => <span>{formatDate(validateDate)}</span>
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',

      render: (_cell: any, row: categoryList) => {
        return (
          <div className="d-flex">
            <Button
              type="link"
              icon={<EyeOutlined />}
              onClick={() => navigate(ROUTES.viewCoupon(row?._id))}
            />
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => navigate(ROUTES.editCoupon(row?._id))}
            />
            <Button
              type="link"
              icon={<DeleteOutlined />}
              onClick={() => {
                setCoupenId(row?._id);
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
    sorter: SorterResult<categoryList>
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
            <Button type="primary" size="large" onClick={() => navigate(ROUTES.addCoupon)}>
              Add
            </Button>
          }
          showSearch={true}
          onSearch={handleSearch}
          onChange={(e: any) => optimizedFn(e?.target?.value)}
        />
        <CommonTable
          columns={columns}
          dataSource={data?.list ?? []}
          // dataSource={
          //   data?.list?.map((item) => ({
          //     ...item,
          //     key: item._id
          //   })) ?? []
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

      <DeleteModal
        modalTitle="Are you sure to delete this coupon?"
        open={open}
        onOk={deleteCouponAction}
        onCancel={() => setIsOpen(false)}
      />
    </>
  );
};

export default React.memo(CouponManagement);
