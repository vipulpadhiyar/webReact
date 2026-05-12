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
import { serviceList } from 'services/api/service/type';
import { subServiceAPI } from 'services/api/subService';
import { subServiceKeys } from 'services/hooks/queryKeys';
import { useSubServiceList } from 'services/hooks/subService';

import { VITE_REACT_APP_IMAGE_URL, uploadImageEnum } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';
import { debounce, isSorterType, replaceAndCapitalize, toAbsoluteUrl } from 'utils/functions';

const pathNames: any = [
  {
    title: 'Sub Service Management'
  }
];

const SubServiceManagement = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { activeInActiveSubService } = subServiceAPI;

  const [args, setArgs] = useState<ICategoryListReq>({
    page: 1,
    limit: 10,
    search: '',
    sortBy: '',
    sortOrder: ''
  });
  const [open, setIsOpen] = useState<boolean>(false);
  const [subSerId, setSubSerId] = useState<string>('');
  const { data } = useSubServiceList(args);

  // const onDeleteService = (_id: string) => {
  //   deleteService(_id)
  //     .then((res) => {
  //       queryClient.invalidateQueries(serviceKeys.all);
  //       message.success(res?.message);
  //     })
  //     .catch((_err) => {
  //       message.error(_err?.message);
  //     });
  // };

  const activeInActive = () => {
    activeInActiveSubService(subSerId)
      .then((res) => {
        queryClient.invalidateQueries(subServiceKeys.all);
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
      render: (_cell: any, row: serviceList) => (
        <picture>
          <img
            src={
              row?.image
                ? `${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.subService}/${row?.image}`
                : toAbsoluteUrl('/asset/dummy.png')
            }
            alt="dummy"
          />
        </picture>
      )
    },
    {
      title: 'Sub Service Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name: string) => <span>{replaceAndCapitalize(name)}</span>
    },
    {
      title: 'Service Name',
      dataIndex: 'serviceName',
      key: 'serviceName',
      sorter: (a, b) => a.serviceName.localeCompare(b.serviceName),
      render: (serviceName: string) => <span>{replaceAndCapitalize(serviceName)}</span>
    },
    {
      title: 'Sub Service Price',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'Sub Service Commission',
      dataIndex: 'commission',
      key: 'commission',
      render: (commission: string) => <span>{`${commission}%`}</span>
    },
    {
      title: 'About Sub Service',
      dataIndex: 'aboutSubService',
      key: 'aboutSubService',
      render: (aboutSubService) => (
        <div className="about-category" dangerouslySetInnerHTML={{ __html: aboutSubService }} />
      )
    },
    // {
    //   title: 'Status',
    //   dataIndex: 'isActive',
    //   key: 'isActive',
    //   render: (isActive: boolean, row: serviceList) => (
    //     <Switch checked={isActive} onChange={() => activeInActive(row?._id)} />
    //   )
    // },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',

      render: (_cell: any, row: serviceList) => (
        <div className="d-flex">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => navigate(ROUTES.viewSubService(row?._id))}
          />
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => navigate(ROUTES.editSubService(row?._id))}
          />
          <Button
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => {
              setSubSerId(row?._id);
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
    sorter: SorterResult<serviceList>
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
            <Button type="primary" size="large" onClick={() => navigate(ROUTES.addSubService)}>
              Add
            </Button>
          }
          showSearch={true}
          onSearch={handleSearch}
          onChange={(e: any) => optimizedFn(e?.target?.value)}
        />

        <div className="d-flex justify-content-end mb-30 "></div>

        <CommonTable
          scroll={{ x: 1000 }}
          bordered
          columns={columns}
          dataSource={data?.list ?? []}
          // dataSource={
          //   Array.isArray(data?.list) && data && data?.list?.length > 0
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

      <DeleteModal
        modalTitle="Are you sure to delete this sub service?"
        open={open}
        onOk={activeInActive}
        onCancel={() => setIsOpen(false)}
      />
    </>
  );
};

export default SubServiceManagement;
