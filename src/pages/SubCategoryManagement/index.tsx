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
import { subCategoryAPI } from 'services/api/subCategory';
import { subCategoryKeys } from 'services/hooks/queryKeys';
import { useSubCategoryList } from 'services/hooks/subCategory';

import { VITE_REACT_APP_IMAGE_URL, uploadImageEnum } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';
import { debounce, isSorterType, replaceAndCapitalize, toAbsoluteUrl } from 'utils/functions';

const pathNames: any = [
  {
    title: 'Sub Category Management'
  }
];

const SubCategoryManagement = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { activeInActive } = subCategoryAPI;

  const [args, setArgs] = useState<ICategoryListReq>({
    page: 1,
    limit: 10,
    search: '',
    sortBy: '',
    sortOrder: ''
  });
  const [open, setIsOpen] = useState<boolean>(false);
  const [subCatId, setSubCatId] = useState<string>('');
  const { data } = useSubCategoryList(args);

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
    activeInActive(subCatId)
      .then((res) => {
        queryClient.invalidateQueries(subCategoryKeys.all);
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
                ? `${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.subCategory}/${row?.image}`
                : toAbsoluteUrl('/asset/dummy.png')
            }
            alt="dummy"
          />
        </picture>
      )
    },
    {
      title: 'Sub Category Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name: string) => <span>{replaceAndCapitalize(name)}</span>
    },
    {
      title: 'Category Name',
      dataIndex: 'categoryName',
      key: 'categoryName',
      sorter: (a, b) => a.categoryName.localeCompare(b.categoryName),
      render: (categoryName: string) => <span>{replaceAndCapitalize(categoryName)}</span>
    },
    {
      title: 'About Sub Category',
      dataIndex: 'aboutSubCategory',
      key: 'aboutSubCategory',
      render: (aboutSubCategory) => (
        <div className="about-category" dangerouslySetInnerHTML={{ __html: aboutSubCategory }} />
      )
    },
    {
      title: 'Number of Service',
      dataIndex: 'serviceCount',
      key: 'serviceCount'
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
              onClick={() => navigate(ROUTES.viewSubCategory(row?._id))}
            />
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => navigate(ROUTES.editSubCategory(row?._id))}
            />
            <Button
              type="link"
              icon={<DeleteOutlined />}
              onClick={() => {
                setSubCatId(row?._id);
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
            <Button type="primary" size="large" onClick={() => navigate(ROUTES.addSubCategory)}>
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
        modalTitle="Are you sure to delete this sub category?"
        open={open}
        onOk={activeInActiveCategory}
        onCancel={() => setIsOpen(false)}
      />
    </>
  );
};

export default React.memo(SubCategoryManagement);
