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
import { cityAreaList } from 'services/api/city/type';
import { cityAreaAPI } from 'services/api/cityArea';
import { useCityAreaList } from 'services/hooks/cityArea';
import { cityAreaKeys } from 'services/hooks/queryKeys';

import { VITE_REACT_APP_IMAGE_URL, uploadImageEnum } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';
import { debounce, isSorterType, replaceAndCapitalize, toAbsoluteUrl } from 'utils/functions';

const pathNames: any = [
  {
    title: 'City Area Management'
  }
];

const CityAreaManagement = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { activeInActiveCityArea } = cityAreaAPI;

  const [args, setArgs] = useState<ICategoryListReq>({
    page: 1,
    limit: 10,
    search: '',
    sortBy: '',
    sortOrder: ''
  });
  const [open, setIsOpen] = useState<boolean>(false);
  const [cityAreaId, setCityAreaId] = useState<string>('');
  const { data } = useCityAreaList(args);

  // const onDeleteCityArea = (_id: string) => {
  //   deleteCityArea(_id)
  //     .then((res) => {
  //       queryClient.invalidateQueries(cityAreaKeys.all);
  //       message.success(res?.message);
  //     })
  //     .catch((_err) => {
  //       message.error(_err?.message);
  //     });
  // };

  const activeInActiveCity = () => {
    activeInActiveCityArea(cityAreaId)
      .then((res) => {
        queryClient.invalidateQueries(cityAreaKeys.all);
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
      render: (_cell: any, row: cityAreaList) => (
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
      title: 'City Area Name',
      dataIndex: 'cityAreaName',
      key: 'cityAreaName',
      sorter: (a, b) => a.cityAreaName.localeCompare(b.cityAreaName),
      render: (cityAreaName: string) => <span>{replaceAndCapitalize(cityAreaName)}</span>
    },
    {
      title: 'City Name',
      dataIndex: 'cityName',
      key: 'cityName',
      sorter: (a, b) => a.cityName.localeCompare(b.cityName),
      render: (cityName: string) => <span>{replaceAndCapitalize(cityName)}</span>
    },
    {
      title: 'About Area',
      dataIndex: 'cityAreaDesc',
      key: 'cityAreaDesc',
      render: (cityAreaDesc) => (
        <div className="about-category" dangerouslySetInnerHTML={{ __html: cityAreaDesc }} />
      )
    },
    // {
    //   title: 'Status',
    //   dataIndex: 'isActive',
    //   key: 'isActive',
    //   render: (isActive: boolean, row: cityAreaList) => (
    //     <Switch checked={isActive} onChange={() => activeInActiveCity(row?._id)} />
    //   )
    // },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',

      render: (_cell: any, row: cityAreaList) => (
        <div className="d-flex">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => navigate(ROUTES.viewCityArea(row?._id))}
          />
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => navigate(ROUTES.editCityArea(row?._id))}
          />
          <Button
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => {
              setCityAreaId(row?._id);
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
            <Button type="primary" size="large" onClick={() => navigate(ROUTES.addCityArea)}>
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
        modalTitle="Are you sure to delete this area?"
        open={open}
        onOk={activeInActiveCity}
        onCancel={() => setIsOpen(false)}
      />
    </>
  );
};

export default CityAreaManagement;
