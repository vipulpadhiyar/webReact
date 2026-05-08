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

import { categoryAPI } from 'services/api/category';
import { ICategoryListReq, categoryList } from 'services/api/category/type';
import { useCategoryList } from 'services/hooks/category/index';
import { categoryKeys } from 'services/hooks/queryKeys';

import { VITE_REACT_APP_IMAGE_URL, uploadImageEnum } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';
import { debounce, isSorterType, replaceAndCapitalize, toAbsoluteUrl } from 'utils/functions';

const pathNames: any = [
  {
    title: 'Category Management'
  }
];

const CategoryManagement = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { activeInActive } = categoryAPI;

  const [args, setArgs] = useState<ICategoryListReq>({
    page: 1,
    limit: 10,
    search: '',
    sortBy: '',
    sortOrder: ''
  });
  const [open, setIsOpen] = useState<boolean>(false);
  const [catId, setCatId] = useState<string>('');
  const { data } = useCategoryList(args);

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

  const activeInActiveCategory = () => {
    activeInActive(catId)
      .then((res) => {
        queryClient.invalidateQueries(categoryKeys.all);
        setIsOpen(false);
        message.success(res?.message);
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
      render: (_cell: any, row: categoryList) => (
        <picture>
          <img
            src={
              row?.image
                ? `${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.category}/${row?.image}`
                : toAbsoluteUrl('/asset/dummy.png')
            }
            alt="dummy"
          />
        </picture>
      )
    },
    {
      title: 'Category Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name: string) => <span>{replaceAndCapitalize(name)}</span>
    },
    {
      title: 'About Category',
      dataIndex: 'aboutCategory',
      key: 'aboutCategory',
      render: (aboutCategory) => (
        <div className="about-category" dangerouslySetInnerHTML={{ __html: aboutCategory }} />
      )
    },
    {
      title: 'Number of Sub Category',
      dataIndex: 'subCategoryCount',
      key: 'subCategoryCount',
      sorter: (a, b) => a.subCategoryCount - b.subCategoryCount
    },
    // {
    //   title: 'Status',
    //   dataIndex: 'isActive',
    //   key: 'isActive',
    //   render: (isActive: boolean, row: categoryList) => (
    //     <Switch checked={isActive} onChange={() => activeInActiveCategory(row?._id)} />
    //   )
    // },

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
              onClick={() => navigate(ROUTES.viewCategory(row?._id))}
            />
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => navigate(ROUTES.editCategory(row?._id))}
            />
            <Button
              type="link"
              icon={<DeleteOutlined />}
              onClick={() => {
                setCatId(row?._id);
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
            <Button type="primary" size="large" onClick={() => navigate(ROUTES.addCategory)}>
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
        modalTitle="Are you sure to delete this category?"
        open={open}
        onOk={activeInActiveCategory}
        onCancel={() => setIsOpen(false)}
      />
    </>
  );
};

export default React.memo(CategoryManagement);
