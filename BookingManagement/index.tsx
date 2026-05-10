import { EyeOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Checkbox, Col, Flex, Row, Select, TablePaginationConfig, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BidModal from 'components/common/Modal/BidModal';
import DeleteModal from 'components/common/Modal/DeleteModal';
import ExportModal from 'components/common/Modal/ExportModal';
import SearchBar from 'components/common/SerachBar';
import { CommonTable } from 'components/common/Table';
import ContentHeader from 'components/layout/contentHeader';

import { bookingAPI } from 'services/api/booking';
import { VendorList, bookingView } from 'services/api/booking/type';
import { ICategoryListReq } from 'services/api/category/type';
import { serviceList } from 'services/api/service/type';
import { vendorAPI } from 'services/api/vendor';
import { useBookingList } from 'services/hooks/booking';
import { bookingKeys } from 'services/hooks/queryKeys';

import {
  BookingRequestStatus,
  BookingType,
  VITE_REACT_APP_IMAGE_URL,
  filterByStatus,
  updateBookingStatusArr,
  updateBookingVendorStatusArr
} from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';
import { debounce, downloadExcelFile, isSorterType, replaceAndCapitalize } from 'utils/functions';

const pathNames: any = [
  {
    title: 'Booking Management'
  }
];

const BookingManagement = () => {
  const navigate = useNavigate();
  const { Option } = Select;
  const queryClient = useQueryClient();
  const { bookingStatusUpdate, findNearByVendors, sendBidToVendor, exportBookingExcel } =
    bookingAPI;
  const { googleVerifyCode } = vendorAPI;

  const [args, setArgs] = useState<ICategoryListReq>({
    page: 1,
    limit: 10,
    search: '',
    sortBy: '',
    sortOrder: '',
    status: '',
    vendorStatus: '',
    city: '',
    isManual: false
  });
  const [cityList, setCityList] = useState<{ name: string }[]>([]);
  const [bidModal, setBidModal] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [otherSelectedValues, setOtherSelectedValues] = useState<string[]>([]);
  const [vendorList, setVendorList] = useState<
    { label: string; value: string; phoneNumber: string }[]
  >([]);
  const [randomVendorList, setRandomVendorList] = useState<
    { label: string; value: string; phoneNumber: string }[]
  >([]);
  const [bookingId, setBookingId] = useState<string>('');
  const [manualCheck, setManualCheck] = useState<boolean>(false);
  const [exportOpen, setExportOpen] = useState<boolean>(false);

  const { data } = useBookingList(args);

  useEffect(() => {
    const fetchCityList = async () => {
      try {
        const cityResponse = await fetch(
          `${VITE_REACT_APP_IMAGE_URL}metaJson/cityMaster.json?uid=${Math.random()}`
        );
        const cityJsonData = await cityResponse.json();
        setCityList(
          cityJsonData?.map((val: any) => {
            return {
              name: val?.name
            };
          })
        );
      } catch (error) {
        if (error) {
          setCityList([]);
        }
      }
    };
    fetchCityList();
  }, []);

  const handleOk = (values: string[] | []) => {
    if (!values || values?.length === 0) {
      message.error('Please select at least one vendor');
      return;
    }
    const uniqueVendors = [...new Set(values)];

    const isRandomVendorExist = values?.filter((value) =>
      randomVendorList.some((obj) => obj.value === value)
    );

    const payload = {
      _id: bookingId,
      passVendor: uniqueVendors?.length ? uniqueVendors : [],
      isRandomVendor: isRandomVendorExist?.length > 0
    };
    sendBidToVendor(payload)
      .then((res) => {
        queryClient.invalidateQueries(bookingKeys.all);
        message.success(res?.message);
        setSelectedValues([]);
        setOtherSelectedValues([]);
        setVendorList([]);
        setRandomVendorList([]);
        setBookingId('');
        setBidModal(false);
      })
      .catch((err) => {
        if (err) message.error(err?.message);
      });
  };

  const handleSelectChange = (values: string[]) => {
    if (values?.includes('all')) {
      setSelectedValues(
        vendorList?.map(
          (opt: { label: string; value: string; phoneNumber: string }) => opt?.value
        ) ?? []
      );
    } else {
      setSelectedValues(values);
    }
  };

  const handleOtherSelectChange = (values: string[]) => {
    if (values?.includes('all')) {
      setOtherSelectedValues(
        randomVendorList?.map(
          (opt: { label: string; value: string; phoneNumber: string }) => opt?.value
        ) ?? []
      );
    } else {
      setOtherSelectedValues(values);
    }
  };

  const handleCancel = () => {
    setSelectedValues([]);
    setVendorList([]);
    setOtherSelectedValues([]);
    setRandomVendorList([]);
    setBookingId('');
    setBidModal(false);
  };

  const updateBooking = (value: string, id: string) => {
    bookingStatusUpdate({ _id: id, status: value })
      .then((res) => {
        queryClient.invalidateQueries(bookingKeys.all);
        message.success(res?.message);
      })
      .catch((_err) => {
        message.error(_err?.message);
      });
  };

  const modalOpenAndFetchVendor = (id: string) => {
    setBidModal(true);
    setBookingId(id);
    const payload = {
      _id: id,
      isRandomVendor: false
    };
    findNearByVendors(payload)
      .then((res) => {
        const response = res?.list;
        const vendorData = response?.length
          ? response?.map((val: VendorList) => {
              return {
                label: val?.name,
                value: val?._id,
                phoneNumber: val?.phoneNumber
              };
            })
          : [];
        setVendorList(vendorData);
        const otherPayload = {
          _id: id,
          isRandomVendor: true
        };
        findNearByVendors(otherPayload)
          .then((otherRes) => {
            const otherResponse = otherRes?.list;
            const vendorDataMap = new Set(vendorData?.map((vendor) => vendor.value)); // Map to store existing vendors
            const randomVendorData = otherResponse?.length
              ? otherResponse
                  ?.filter((val: VendorList) => !vendorDataMap.has(val?._id)) // Exclude vendors in vendorData
                  .map((val: VendorList) => {
                    return {
                      label: val?.name,
                      value: val?._id,
                      phoneNumber: val?.phoneNumber
                    };
                  })
              : [];
            setRandomVendorList(randomVendorData);
          })
          .catch((err) => {
            if (err) setRandomVendorList([]);
          });
      })
      .catch((err) => {
        if (err) setVendorList([]);
      });
  };

  const columns: ColumnsType<any> = [
    {
      title: 'Booking Id',
      dataIndex: 'bookingNumber',
      key: 'bookingNumber',
      width: '30px',
      sorter: true
    },
    {
      title: 'Vendor Full Name',
      dataIndex: 'vendorFullName',
      key: 'vendorFullName',
      sorter: true,
      render: (vendorFullName: string) => {
        return vendorFullName ? vendorFullName : 'Name not available';
      }
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerFullName',
      key: 'customerFullName',
      sorter: true,
      render: (customerFullName: string) => {
        return customerFullName ? customerFullName : 'Name not available';
      }
    },
    {
      title: 'Category Name',
      dataIndex: 'categoryName',
      key: 'categoryName',
      sorter: true,
      render: (categoryName: string) => {
        return categoryName ? (
          <span>{replaceAndCapitalize(categoryName)}</span>
        ) : (
          'Name not available'
        );
      }
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      sorter: true,
      render: (city: string) => city ?? '-'
    },
    {
      title: 'Customer Phone Number',
      dataIndex: 'customerPhoneNumber',
      key: 'customerPhoneNumber'
    },
    {
      title: 'Booking Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => {
        const getStatusOptions = (status: any) => {
          switch (status) {
            case 'pending':
            case 'accept':
              return updateBookingStatusArr.filter((val) => val.value === 'cancel');
            case 'cancel':
            case 'complete':
            case 'vendor_not_found':
              return [];
            default:
              return updateBookingStatusArr;
          }
        };

        const options = getStatusOptions(record?.status);
        const isDisabled = options.length === 0;

        return (
          <Select
            className="w-100"
            placeholder="Update status"
            onChange={(e) => updateBooking(e, record?._id)}
            defaultValue={record?.status}
            value={record?.status}
            disabled={isDisabled}
          >
            {options?.map((val) => {
              return (
                <Option key={val?.value} value={val?.value}>
                  {val?.label}
                </Option>
              );
            })}
          </Select>
        );
      }
    },
    {
      title: 'Vendor Status',
      dataIndex: 'vendorStatus',
      key: 'vendorStatus',
      render: (value) => updateBookingVendorStatusArr?.find((val) => val?.value === value)?.label
    },
    {
      title: 'Manual',
      dataIndex: 'isManual',
      key: 'isManual',
      render: (value) => (value ? 'Yes' : 'No')
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount'
    },
    {
      title: 'Booking Type',
      dataIndex: 'bookingType',
      key: 'bookingType',
      sorter: true,
      render: (_, record) => (
        <>
          {record?.bookingType
            ? record?.bookingType === BookingType.INSTANT
              ? 'Instant'
              : 'Schedule'
            : '-'}
        </>
      )
    },
    {
      title: 'Schedule',
      dataIndex: 'schedule',
      key: 'schedule',
      render: (_, record) => (
        <>
          {record?.bookingType === BookingType.SCHEDULE
            ? `${dayjs(record?.scheduleDate).format('MM/DD/YYYY')} (${record?.scheduleSlot})`
            : '-'}
        </>
      )
    },
    {
      title: 'Send Bid',
      dataIndex: 'sendBid',
      key: 'sendBid',
      render: (_, record) =>
        record?.status === BookingRequestStatus['VENDOR_NOT_FOUND'] ? (
          <Button
            onClick={() => modalOpenAndFetchVendor(record?._id)}
            type="primary"
            htmlType="button"
            size="small"
          >
            Send Bid
          </Button>
        ) : (
          '-'
        )
    },
    {
      title: 'Created Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
      sorter: true,
      render: (_, record) => <>{dayjs(record?.createdDate).format('M/D/YYYY h:mm A')}</>
    },
    {
      title: 'Action',
      dataIndex: 'actions',
      key: 'actions',
      render: (_cell: any, row: bookingView) => {
        return (
          <div className="d-flex">
            <Button
              type="link"
              icon={<EyeOutlined />}
              onClick={() => navigate(ROUTES.viewBooking(row?._id))}
            />
          </div>
        );
      }
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
      sortBy: (sorter.field as string) ?? (args.sortBy as string),
      status: args?.status,
      vendorStatus: args?.vendorStatus,
      city: args?.city
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

  const exportAction = (successMessage: string = '') => {
    const payload = {
      search: args?.search,
      sortBy: args?.sortBy,
      sortOrder: args?.sortOrder,
      status: args?.status,
      vendorStatus: args?.vendorStatus,
      city: args?.city,
      isManual: args?.isManual
    };
    exportBookingExcel(payload)
      .then((res) => {
        downloadExcelFile(res?.data?.URL, 'booking.xlsx', successMessage, setExportOpen);
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

  return (
    <>
      <div className="shadow-paper">
        <ContentHeader pathNames={pathNames} />
        <Row justify={'space-between'}>
          <Col md={8} sm={24}>
            <SearchBar
              showSearch={true}
              onSearch={handleSearch}
              onChange={(e: any) => optimizedFn(e?.target?.value)}
            />
          </Col>
          <Col md={16} sm={24}>
            <Flex justify={'end'} gap="middle" align="center">
              <Checkbox
                checked={manualCheck}
                onChange={(e: any) => {
                  setManualCheck(e.target.checked);
                  setArgs({
                    ...args,
                    page: 1,
                    isManual: e.target.checked
                  });
                }}
              >
                Is Manual
              </Checkbox>
              <Select
                className="w-200"
                placeholder="Filter by city"
                onChange={(e) => setArgs({ ...args, page: 1, city: e })}
              >
                {cityList?.map((val) => {
                  const replaceCity = replaceAndCapitalize(val?.name);
                  return <Option value={replaceCity}>{replaceCity}</Option>;
                })}
              </Select>
              <Select
                className="w-200"
                placeholder="Filter by vendor status"
                onChange={(e) => setArgs({ ...args, page: 1, vendorStatus: e })}
              >
                {updateBookingVendorStatusArr?.map((val) => {
                  return <Option value={val?.value}>{val?.label}</Option>;
                })}
              </Select>
              <Select
                className="w-200"
                placeholder="Filter by status"
                onChange={(e) => setArgs({ ...args, page: 1, status: e })}
              >
                {filterByStatus?.map((val) => {
                  return <Option value={val?.value}>{val?.label}</Option>;
                })}
              </Select>
              <Button type="primary" size="large" onClick={() => setExportOpen(true)}>
                Export
              </Button>
            </Flex>
          </Col>
        </Row>

        <CommonTable
          scroll={{ x: 1000 }}
          bordered
          columns={columns}
          dataSource={data?.list ?? []}
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
      {bidModal && (
        <BidModal
          open={bidModal}
          onOk={handleOk}
          onCancel={handleCancel}
          selectedValues={selectedValues}
          otherSelectedValues={otherSelectedValues}
          onSelectionChange={handleSelectChange}
          onOtherSelectionChange={handleOtherSelectChange}
          options={vendorList}
          otherOptions={randomVendorList}
          modalTitle="Send Manual Bid"
          modalDesc="Are you sure you want to send manual bid ?"
        />
      )}
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
  );
};

export default BookingManagement;
