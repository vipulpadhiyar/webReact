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
import { reviewAPI } from 'services/api/review';
import { reviewKeys } from 'services/hooks/queryKeys';
import { useReviewList } from 'services/hooks/review';

import { ROUTES } from 'utils/constants/routes';
import { debounce, isSorterType } from 'utils/functions';

const pathNames: any = [
  {
    title: 'Review Management'
  }
];

const ReviewManagement = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { deleteReview } = reviewAPI;

  const [args, setArgs] = useState<ICategoryListReq>({
    page: 1,
    limit: 10,
    search: '',
    sortBy: '',
    sortOrder: ''
  });
  const [open, setIsOpen] = useState<boolean>(false);
  const [reviewId, setReviewId] = useState<string>('');

  const { data } = useReviewList(args);

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

  const deleteReviewAction = () => {
    deleteReview(reviewId)
      .then((res) => {
        queryClient.invalidateQueries(reviewKeys.all);
        setIsOpen(false);
        message.success(res?.message);
      })
      .catch((_err) => {
        message.error(_err?.message);
      });
  };

  const columns: ColumnsType<any> = [
    {
      title: 'Vendor name',
      dataIndex: 'vendorFullName',
      key: 'vendorFullName',
      sorter: (a, b) => a.vendorFullName.localeCompare(b.vendorFullName),
      render: (value) => value ?? '-'
    },
    {
      title: 'User name',
      dataIndex: 'userFullName',
      key: 'userFullName',
      sorter: (a, b) => a.userFullName.localeCompare(b.userFullName),
      render: (value) => value ?? '-'
    },
    {
      title: 'Vendor phone number',
      dataIndex: 'vendorPhoneNumber',
      key: 'vendorPhoneNumber',
      render: (value) => value ?? '-'
    },
    {
      title: 'User phone number',
      dataIndex: 'userPhoneNumber',
      key: 'userPhoneNumber',
      render: (value) => value ?? '-'
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating'
    },
    {
      title: 'Review',
      dataIndex: 'review',
      key: 'review',
      render: (value) => (value ? value : '-')
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
              onClick={() => navigate(ROUTES.viewReview(row?._id))}
            />
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => navigate(ROUTES.editReview(row?._id))}
            />
            <Button
              type="link"
              icon={<DeleteOutlined />}
              onClick={() => {
                setReviewId(row?._id);
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
            <Button type="primary" size="large" onClick={() => navigate(ROUTES.addReview)}>
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
        modalTitle="Are you sure to delete this review?"
        open={open}
        onOk={deleteReviewAction}
        onCancel={() => setIsOpen(false)}
      />
    </>
  );
};

export default React.memo(ReviewManagement);
