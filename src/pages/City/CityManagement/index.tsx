import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, TablePaginationConfig, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DeleteModal from 'components/common/Modal/DeleteModal';
import SearchBar from 'components/common/SerachBar';
import { CommonTable } from 'components/common/Table';
import ContentHeader from 'components/layout/contentHeader';

import { ICategoryListReq } from 'services/api/category/type';
import { cityAPI } from 'services/api/city';
import { cityList } from 'services/api/city/type';
import { useCityList } from 'services/hooks/city';
import { cityKeys } from 'services/hooks/queryKeys';

import { VITE_REACT_APP_IMAGE_URL, uploadImageEnum } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';
import { debounce, isSorterType, replaceAndCapitalize, toAbsoluteUrl } from 'utils/functions';

const pathNames: any = [
  {
    title: 'City Management'
  }
];

const CityManagement = () => {
  const { activeInActiveCity } = cityAPI;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [args, setArgs] = useState<ICategoryListReq>({
    page: 1,
    limit: 10,
    search: '',
    sortBy: '',
    sortOrder: ''
  });
  const [open, setIsOpen] = useState<boolean>(false);
  const [cityId, setCityId] = useState<string>('');
  const { data } = useCityList(args);

  // const onDeleteCity = (_id: string) => {
  //   deleteCity(_id)
  //     .then((res) => {
  //       queryClient.invalidateQueries(cityKeys.all);
  //       message.success(res?.message);
  //     })
  //     .catch((_err) => {
  //       message.error(_err?.message);
  //     });
  // };

  const activeInActive = () => {
    activeInActiveCity(cityId)
      .then((res) => {
        queryClient.invalidateQueries(cityKeys.all);
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
      render: (_cell: any, row: cityList) => (
        <picture>
          <img
            src={
              row?.image
                ? `${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.city}/${row?.image}`
                : toAbsoluteUrl('/asset/dummy.png')
            }
            alt="dummy"
          />
        </picture>
      )
    },
    {
      title: 'City Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name: string) => <span>{replaceAndCapitalize(name)}</span>
    },
    {
      title: 'About City',
      dataIndex: 'aboutCity',
      key: 'aboutCity',
      render: (aboutCity) => (
        <div className="about-category" dangerouslySetInnerHTML={{ __html: aboutCity }} />
      )
    },
    {
      title: 'Number of Area',
      dataIndex: 'cityAreaCount',
      key: 'cityAreaCount',
      sorter: (a, b) => a.cityAreaCount - b.cityAreaCount
    },
    // {
    //   title: 'Status',
    //   dataIndex: 'isActive',
    //   key: 'isActive',
    //   render: (isActive: boolean, row: cityList) => (
    //     <Switch checked={isActive} onChange={() => activeInActive(row?._id)} />
    //   )
    // },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',

      render: (_cell: any, row: cityList) => (
        <div className="d-flex">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => navigate(ROUTES.viewCity(row?._id))}
          />
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => navigate(ROUTES.editCity(row?._id))}
          />
          <Button
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => {
              setCityId(row?._id);
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
    sorter: SorterResult<cityList>
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
            <Button type="primary" size="large" onClick={() => navigate(ROUTES.addCity)}>
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
          //   Array.isArray(data?.list) && data && data?.list?.length > 0
          //     ? data?.list.map((item) => ({ ...item, key: item._id }))
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

      <DeleteModal
        modalTitle="Are you sure to delete this city?"
        open={open}
        onOk={activeInActive}
        onCancel={() => setIsOpen(false)}
      />
    </>
  );
};

export default CityManagement;
