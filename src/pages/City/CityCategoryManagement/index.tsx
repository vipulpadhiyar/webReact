import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, TablePaginationConfig } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DeleteModal from 'components/common/Modal/DeleteModal';
import SearchBar from 'components/common/SerachBar';
import { CommonTable } from 'components/common/Table';
import ContentHeader from 'components/layout/contentHeader';

import { ICategoryListReq } from 'services/api/category/type';
import { cityAreaList, cityCategoryList } from 'services/api/city/type';
import { useCityCategoryList } from 'services/hooks/cityCategory';

import { ROUTES } from 'utils/constants/routes';
import { debounce, isSorterType, replaceAndCapitalize } from 'utils/functions';

const pathNames: any = [
  {
    title: 'City Category Management'
  }
];

const CityCategoryManagement = () => {
  const navigate = useNavigate();

  const [args, setArgs] = useState<ICategoryListReq>({
    page: 1,
    limit: 10,
    search: '',
    sortBy: '',
    sortOrder: ''
  });
  const { data } = useCityCategoryList(args);

  // const onDeleteCityCategory = (_id: string) => {
  //   deleteCityCategory(_id)
  //     .then((res) => {
  //       queryClient.invalidateQueries(cityCategoryKeys.all);
  //       message.success(res?.message);
  //     })
  //     .catch((_err) => {
  //       message.error(_err?.message);
  //     });
  // };

  const columns: ColumnsType<any> = [
    {
      title: 'City Name',
      dataIndex: 'cityName',
      key: 'cityName',
      sorter: (a, b) => a.cityName.localeCompare(b.cityName),
      render: (cityName: string) => <span>{replaceAndCapitalize(cityName)}</span>
    },
    // {
    //   title: 'Area Name',
    //   dataIndex: 'cityAreaName',
    //   key: 'cityAreaName',
    //   sorter: (a, b) => a.cityAreaName.localeCompare(b.cityAreaName),
    //   render: (cityAreaName: string) => (
    //     <span>
    //       {cityAreaName.charAt(0).toUpperCase() + cityAreaName.slice(1).replace(/-/g, ' ')}
    //     </span>
    //   )
    // },
    {
      title: 'Category Name',
      dataIndex: 'categoryName',
      key: 'categoryName',
      sorter: (a, b) => a.categoryName.localeCompare(b.categoryName),
      render: (categoryName: string) => <span>{replaceAndCapitalize(categoryName)}</span>
    },
    {
      title: 'Service Count',
      dataIndex: 'serviceCount',
      key: 'serviceCount'
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',

      render: (_cell: any, row: cityCategoryList) => (
        <div className="d-flex">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => navigate(ROUTES.viewCityCategory(row?._id))}
          />
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => navigate(ROUTES.editCityCategory(row?._id))}
          />
          {/* <Button
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => onDeleteCityCategory(row?._id)}
          /> */}
        </div>
      )
    }
  ];

  const onChange: any = (
    pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<cityAreaList>
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
            <Button type="primary" size="large" onClick={() => navigate(ROUTES.addCityCategory)}>
              Add
            </Button>
          }
          showSearch={true}
          onSearch={handleSearch}
          onChange={(e: any) => optimizedFn(e?.target?.value)}
        />

        <CommonTable
          scroll={{ x: 1000 }}
          bordered
          columns={columns}
          dataSource={data?.list ?? []}
          // dataSource={
          //   Array.isArray(data?.list) && data && data?.list.length > 0
          //     ? data?.list?.map((item) => ({ ...item, key: item._id }))
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

      <DeleteModal />
    </>
  );
};

export default CityCategoryManagement;
