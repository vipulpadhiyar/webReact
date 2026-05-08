import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Checkbox, Col, DatePicker, Flex, Row, Select, Space, Switch, message } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DeleteModal from 'components/common/Modal/DeleteModal';
import ExportModal from 'components/common/Modal/ExportModal';
import SearchBar from 'components/common/SerachBar';
import { CommonTable } from 'components/common/Table';
import ContentHeader from 'components/layout/contentHeader';

import { ICategoryListReq } from 'services/api/category/type';
import { vendorAPI } from 'services/api/vendor';
import { vendorList } from 'services/api/vendor/type';
import { vendorKeys } from 'services/hooks/queryKeys';
import { useVendorList } from 'services/hooks/vendor';

import { ROUTES } from 'utils/constants/routes';
import {
  debounce,
  downloadExcelFile,
  getCategoryList,
  getCityList,
  isSorterType,
  renderDate,
  replaceAndCapitalize
} from 'utils/functions';

const pathNames: any = [
  {
    title: 'Vendor Management'
  }
];

const VendorManagement = () => {
  const navigate = useNavigate();
  const { RangePicker } = DatePicker;

  const {
    activeInActiveVendor,
    deleteVendorAction,
    exportVendorExcel,
    restoreDeletedVendor,
    googleVerifyCode
  } = vendorAPI;
  const queryClient = useQueryClient();
  const [args, setArgs] = useState<ICategoryListReq>({
    page: 1,
    limit: 10,
    search: '',
    sortBy: '',
    sortOrder: '',
    startDate: '',
    endDate: '',
    categoryId: '',
    cityId: '',
    areaId: '',
    isOnline: undefined,
    isOffline: undefined,
    isAllTimeAvailable: undefined,
    isPrimary: undefined
  });
  const [open, setIsOpen] = useState<boolean>(false);
  const [exportOpen, setExportOpen] = useState<boolean>(false);

  const [onlineStatus, setOnlineStatus] = useState<string | null>(null);
  const [primaryCat, setPrimaryCat] = useState<boolean>(false);

  const [availableStatus, setAvailableStatus] = useState<string | null>(null);

  const [catId, setCatId] = useState<any>();
  const [cityId, setCityId] = useState<any>();
  const [areaId, setAreaId] = useState<any>();

  const [vendorId, setVendorId] = useState<string>('');
  const [categoryList, setCategoryList] = useState<any>();
  const [cityList, setCityList] = useState<any>([]);
  const [areaList, setAreaList] = useState<any>([]);

  const { data } = useVendorList(args);
  useEffect(() => {
    getCategoryList().then((data) => {
      setCategoryList(data);
    });
    getCityList().then((data) => {
      setCityList(data);
    });
  }, []);
  const activeInActiveCategory = (_id: string) => {
    activeInActiveVendor(_id)
      .then((res) => {
        queryClient.invalidateQueries(vendorKeys.all);
        message.success(res?.message);
      })
      .catch((_err) => {
        message.error(_err?.message);
      });
  };
  const deleteVendor = () => {
    deleteVendorAction(vendorId)
      .then((res) => {
        queryClient.invalidateQueries(vendorKeys.all);
        message.success(res?.message);
        setIsOpen(false);
      })
      .catch((_err) => {
        message.error(_err?.message);
      });
  };

  const restoreVendor = (id: string) => {
    restoreDeletedVendor({ _id: id })
      .then((res) => {
        message.success(res?.message);
        queryClient.invalidateQueries(vendorKeys.all);
      })
      .catch((err) => {
        message.error(err?.message);
      });
  };

  const columns: ColumnsType<any> = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      sorter: (a, b) => a.firstName.localeCompare(b.firstName)
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      sorter: (a, b) => a.lastName.localeCompare(b.lastName)
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber'
    },
    {
      title: 'Service City',
      dataIndex: 'serviceCity',
      key: 'serviceCity',
      render: (value) => (value ? replaceAndCapitalize(value) : '-')
    },
    {
      title: 'Service Areas',
      dataIndex: 'serviceArea',
      key: 'serviceArea',
      width: '300px',
      render: (serviceArea) => {
        return serviceArea?.length
          ? serviceArea?.map((val: any) => replaceAndCapitalize(val))?.join(', ')
          : '-';
      }
    },
    {
      title: 'Primary Category',
      dataIndex: 'primaryCategory',
      key: 'primaryCategory',
      render: (value: string) => (value ? replaceAndCapitalize(value) : '-')
    },
    {
      title: 'Primary Sub Category',
      dataIndex: 'primaryBusinessSubServiceName',
      key: 'primaryBusinessSubServiceName',
      width: '300px',
      render: (primaryBusinessSubServiceName) => {
        return primaryBusinessSubServiceName?.length
          ? primaryBusinessSubServiceName?.map((val: any) => replaceAndCapitalize(val))?.join(', ')
          : '-';
      }
    },
    {
      title: 'Secondary Category',
      dataIndex: 'secondaryCategory',
      key: 'secondaryCategory',
      width: '300px',
      render: (secondaryCategory) => {
        return secondaryCategory?.length
          ? secondaryCategory?.map((val: any) => replaceAndCapitalize(val))?.join(', ')
          : '-';
      }
    },
    {
      title: 'Secondary Sub Category',
      dataIndex: 'secondaryBusinessSubServiceName',
      key: 'secondaryBusinessSubServiceName',
      width: '300px',
      render: (secondaryBusinessSubServiceName) => {
        return secondaryBusinessSubServiceName?.length
          ? secondaryBusinessSubServiceName
              ?.map((val: any) => replaceAndCapitalize(val))
              ?.join(', ')
          : '-';
      }
    },
    {
      title: '24/7 Availability',
      dataIndex: 'isAllTimeAvailable',
      key: 'isAllTimeAvailable',
      render: (value: boolean) => (value ? 'Yes' : 'No')
    },
    {
      title: 'Vendor Status',
      dataIndex: 'isOnline',
      key: 'isOnline',
      render: (value: boolean) => (value ? 'Online' : 'Offline')
    },
    {
      title: 'Total Sub Category',
      dataIndex: 'totalSubCategoryCount',
      key: 'totalSubCategoryCount'
    },
    {
      title: 'Address Line 1',
      dataIndex: 'address',
      key: 'address',
      render: (value) => value?.addressLine1 ?? '-',
      width: '400px'
    },
    {
      title: 'Address Line 2',
      dataIndex: 'address',
      key: 'address',
      render: (value) => value?.addressLine2 ?? '-',
      width: '200px'
    },
    {
      title: 'City',
      dataIndex: 'address',
      key: 'address',
      render: (value) => value?.city ?? '-'
    },
    {
      title: 'State',
      dataIndex: 'address',
      key: 'address',
      render: (value) => value?.state ?? '-'
    },
    {
      title: 'PinCode',
      dataIndex: 'address',
      key: 'address',
      render: (value) => value?.pinCode ?? '-'
    },
    {
      title: 'Latitude',
      dataIndex: 'location',
      key: 'location',
      render: (value) => value?.coordinates?.[1] ?? '-'
    },
    {
      title: 'Longitude',
      dataIndex: 'location',
      key: 'location',
      render: (value) => value?.coordinates?.[0] ?? '-'
    },
    {
      title: 'Registration Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: renderDate
    },
    {
      title: 'Last Open App Date',
      dataIndex: 'lastOpenAppDate',
      key: 'lastOpenAppDate',
      render: renderDate
    },
    {
      title: 'Last Login Date',
      dataIndex: 'lastLoginDate',
      key: 'lastLoginDate',
      render: renderDate
    },
    {
      title: 'Last Location Updated Date',
      dataIndex: 'lastLocationUpdateDate',
      key: 'lastLocationUpdateDate',
      render: renderDate
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean, row: vendorList) => (
        <Switch
          disabled={row?.isDeleted}
          checked={isActive}
          onChange={() => activeInActiveCategory(row?._id)}
        />
      )
    },
    {
      title: 'Restore',
      dataIndex: 'isDeleted',
      key: 'isDeleted',
      render: (_value, record: vendorList) =>
        record?.isDeleted ? (
          <Button
            onClick={() => restoreVendor(record?._id)}
            type="primary"
            htmlType="button"
            size="small"
          >
            Restore
          </Button>
        ) : (
          '-'
        )
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',

      render: (_cell: any, row: vendorList) => {
        return (
          <div className="d-flex">
            <Button
              type="link"
              icon={<EyeOutlined />}
              onClick={() => navigate(ROUTES.viewVendor(row?._id))}
            />
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => navigate(ROUTES.editVendor(row?._id))}
            />

            <Button
              type="link"
              icon={<DeleteOutlined />}
              onClick={() => {
                setVendorId(row?._id);
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

  const handleDateChange = (dates: any) => {
    if (dates) {
      setArgs({
        ...args,
        startDate: dates?.[0] ? dayjs(dates[0])?.startOf('day')?.toDate() : '',
        endDate: dates?.[1] ? dayjs(dates[1])?.endOf('day')?.toDate() : '',
        page: 1
      });
    } else {
      setArgs({
        ...args,
        startDate: '',
        endDate: '',
        page: 1
      });
    }
  };

  const disabledDate = (current: any) => {
    return current && current > dayjs().endOf('day');
  };

  const handleOnlineChange = (checkedValue: string | null) => {
    const updatedStatus = onlineStatus === checkedValue ? null : checkedValue;

    setOnlineStatus(updatedStatus); // Update state

    setArgs({
      ...args,
      isOnline: updatedStatus === 'online' ? true : undefined, // If online selected
      isOffline: updatedStatus === 'offline' ? true : undefined, // If offline selected
      page: 1
    });
  };
  const handleAvailableChange = (checkedValue: string | null) => {
    const updatedStatus = availableStatus === checkedValue ? null : checkedValue;

    setAvailableStatus(updatedStatus);

    setArgs({
      ...args,
      isAllTimeAvailable:
        updatedStatus === 'yes' ? true : updatedStatus === 'no' ? false : undefined,
      page: 1
    });
  };

  const exportAction = (successMessage: string = '') => {
    const payload = {
      search: args?.search,
      sortBy: args?.sortBy,
      sortOrder: args?.sortOrder,
      startDate: args?.startDate,
      endDate: args?.endDate,
      categoryId: args?.categoryId,
      cityId: args?.cityId,
      areaId: args?.areaId,
      isOnline: args?.isOnline,
      isOffline: args?.isOffline,
      isAllTimeAvailable: args?.isAllTimeAvailable,
      isPrimary: args?.isPrimary
    };
    exportVendorExcel(payload)
      .then((res) => {
        downloadExcelFile(res?.data?.URL, 'vendor.xlsx', successMessage, setExportOpen);
      })
      .catch((err) => {
        message.error(err?.message);
      });
  };

  const verificationAction = (code: string) => {
    googleVerifyCode({ verificationCode: code })
      .then((res) => {
        exportAction(res?.message);
      })
      .catch((err) => {
        message.error(err?.message);
      });
  };

  const clearFilters = () => {
    setArgs({
      page: 1,
      limit: 10,
      search: '',
      sortBy: '',
      sortOrder: '',
      startDate: '',
      endDate: '',
      categoryId: '',
      cityId: '',
      areaId: '',
      isOnline: undefined,
      isOffline: undefined,
      isAllTimeAvailable: undefined,
      isPrimary: undefined
    });
    setCatId(null);
    setCityId(null);
    setAreaId(null);
    setOnlineStatus(null);
    setPrimaryCat(false);
    setAvailableStatus(null);
    setAreaList([]); // Reset area list when city is cleared
  };

  return (
    <>
      <>
        <div className="shadow-paper">
          <ContentHeader pathNames={pathNames} />
          <SearchBar
            extraButton={
              <>
                <Button type="primary" size="large" onClick={clearFilters}>
                  Clear Filters
                </Button>
                <Button type="primary" size="large" onClick={() => setExportOpen(true)}>
                  Export
                </Button>
                <Button type="primary" size="large" onClick={() => navigate(ROUTES.addVendor)}>
                  Add
                </Button>
              </>
            }
            showSearch={true}
            onSearch={handleSearch}
            onChange={(e: any) => optimizedFn(e?.target?.value)}
          />

          <Row className="mb-30 mt-20" align={'top'}>
            <Col xs={16}>
              <Space size={10} align="start">
                <Space size={5} direction="vertical">
                  <Select
                    className="w-100 category-filter"
                    value={catId}
                    placeholder="Filter by category"
                    onChange={(e) => {
                      setCatId(e);
                      setArgs({ ...args, page: 1, categoryId: e, isPrimary: primaryCat });
                    }}
                    showSearch
                    filterOption={(input, option: any) =>
                      option?.children.toLowerCase().includes(input.toLowerCase())
                    }
                  >
                    {categoryList?.map((val: any, i: any) => {
                      return (
                        <Select.Option key={i} value={val?._id}>
                          {val?.name ? replaceAndCapitalize(val?.name) : ''}
                        </Select.Option>
                      );
                    })}
                  </Select>{' '}
                  <Checkbox
                    checked={primaryCat}
                    onChange={(e: any) => {
                      setPrimaryCat(e.target.checked);
                      setArgs({
                        ...args,
                        page: 1,
                        isPrimary: catId ? e.target.checked : undefined
                      });
                    }}
                    disabled={!catId}
                  >
                    IsPrimary
                  </Checkbox>
                </Space>
                <Select
                  className="w-100 city-filter"
                  value={cityId}
                  placeholder="Filter by city"
                  onChange={(e) => {
                    setCityId(e);
                    setAreaList(cityList?.find((val: any) => val?._id === e)?.area ?? []);
                    setArgs({ ...args, page: 1, cityId: e });
                  }}
                  showSearch
                  filterOption={(input, option: any) =>
                    option?.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {cityList?.map((val: any, i: any) => {
                    return (
                      <Select.Option key={i} value={val?._id}>
                        {val?.name ? replaceAndCapitalize(val?.name) : ''}
                      </Select.Option>
                    );
                  })}
                </Select>
                <Select
                  className="w-200 area-filter"
                  value={areaId}
                  placeholder="Filter by area"
                  onChange={(e) => {
                    setAreaId(e);
                    setArgs({ ...args, page: 1, areaId: e });
                  }}
                  disabled={areaList?.length === 0}
                  showSearch
                  filterOption={(input, option: any) =>
                    option?.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {areaList?.map((val: any, i: any) => {
                    return (
                      <Select.Option key={i} value={val?._id}>
                        {val?.name ? replaceAndCapitalize(val?.name) : ''}
                      </Select.Option>
                    );
                  })}
                </Select>
                <RangePicker
                  className="range-filter"
                  format="YYYY-MM-DD"
                  value={
                    args?.startDate && args?.endDate
                      ? [dayjs(args?.startDate), dayjs(args?.endDate)]
                      : null
                  }
                  onChange={handleDateChange}
                  disabledDate={disabledDate}
                />
              </Space>
            </Col>
            <Col xs={8}>
              <Flex gap={8} align="flex-end" vertical={true} justify="flex-end">
                <Space align="center">
                  <div>
                    <strong> Status</strong>
                  </div>
                  <div>
                    <Checkbox
                      checked={onlineStatus === 'online'}
                      onChange={() => handleOnlineChange('online')}
                      disabled={onlineStatus === 'offline'}
                    >
                      Online
                    </Checkbox>
                    <Checkbox
                      checked={onlineStatus === 'offline'}
                      onChange={() => handleOnlineChange('offline')}
                      disabled={onlineStatus === 'online'}
                    >
                      Offline
                    </Checkbox>
                  </div>
                </Space>
                <Space align="center">
                  <div>
                    <strong>24/7 Availability</strong>
                  </div>
                  <div>
                    <Checkbox
                      checked={availableStatus === 'yes'} // Check if availability is 'yes'
                      onChange={() => handleAvailableChange('yes')} // Handle checkbox toggle for 'yes'
                      disabled={availableStatus === 'no'} // Disable if 'no' is selected
                    >
                      Yes
                    </Checkbox>
                    <Checkbox
                      checked={availableStatus === 'no'} // Check if availability is 'no'
                      onChange={() => handleAvailableChange('no')} // Handle checkbox toggle for 'no'
                      disabled={availableStatus === 'yes'} // Disable if 'yes' is selected
                    >
                      No
                    </Checkbox>
                  </div>
                </Space>
              </Flex>
            </Col>
          </Row>

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
            onChange={onChangePage}
          />
        </div>

        <DeleteModal
          modalTitle="Are you sure to delete this vendor?"
          open={open}
          onOk={deleteVendor}
          onCancel={() => setIsOpen(false)}
        />
        {exportOpen && (
          <ExportModal
            width={500}
            modalTitle="Please enter code"
            open={exportOpen}
            onCodeOk={(code: string) => {
              verificationAction(code);
            }}
            onCancel={() => setExportOpen(false)}
          />
        )}
      </>
    </>
  );
};

export default VendorManagement;
