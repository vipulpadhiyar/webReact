import { EyeOutlined } from '@ant-design/icons';
import { Button, Col, Flex, Row, Select, TablePaginationConfig, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DeleteModal from 'components/common/Modal/DeleteModal';
import ExportModal from 'components/common/Modal/ExportModal';
import SearchBar from 'components/common/SerachBar';
import { CommonTable } from 'components/common/Table';
import ContentHeader from 'components/layout/contentHeader';

import { paymentHistoryApi } from 'services/api/paymentHistory';
import { serviceList } from 'services/api/service/type';
import { vendorAPI } from 'services/api/vendor';
import { useCustomerList } from 'services/hooks/customer';
import { usePaymentHistoryList } from 'services/hooks/paymentHistory';
import { useVendorList } from 'services/hooks/vendor';

import { filterByPaymentStatus } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';
import { debounce, downloadExcelFile, isSorterType } from 'utils/functions';

const pathNames: any = [
  {
    title: 'Payment History Management'
  }
];

const PaymentHistoryManagement = () => {
  const navigate = useNavigate();
  const { Option } = Select;
  const { googleVerifyCode } = vendorAPI;
  const { exportPaymentHistoryExcel } = paymentHistoryApi;

  const [args, setArgs] = useState<any>({
    page: 1,
    limit: 10,
    search: '',
    sortBy: '',
    sortOrder: '',
    status: '',
    vendorId: '',
    customerId: ''
  });
  const [vendorIdArg, setVendorIdArg] = useState<any>({
    page: 1,
    limit: 10
  });
  const [customerIdArg, setCustomerIdArg] = useState<any>({
    page: 1,
    limit: 10
  });
  const [allVendorList, setAllVendorList] = useState<any>([]);
  const [allCustomerList, setAllCustomerList] = useState<any>([]);
  const [exportOpen, setExportOpen] = useState<boolean>(false);

  const { data } = usePaymentHistoryList(args);
  const { data: vendorList } = useVendorList(vendorIdArg);
  const { data: customerList } = useCustomerList(customerIdArg);

  useEffect(() => {
    setAllVendorList((prevList: any) => [...prevList, ...(vendorList?.list || [])]);
  }, [vendorList]);

  useEffect(() => {
    setAllCustomerList((prevList: any) => [...prevList, ...(customerList?.list || [])]);
  }, [customerList]);

  const columns: ColumnsType<any> = [
    {
      title: 'Booking Number',
      dataIndex: 'bookingNumber',
      key: 'bookingNumber',
      sorter: (a, b) => {
        return a.bookingNumber - b.bookingNumber;
      }
    },
    {
      title: 'Vendor Full Name',
      dataIndex: 'vendorName',
      key: 'vendorName',
      sorter: (a, b) => {
        const nameA = a.vendorName || ''; // Handle null values
        const nameB = b.vendorName || ''; // Handle null values
        return nameA.localeCompare(nameB);
      },
      render: (vendorName: string) => {
        return vendorName ? vendorName : 'Name not available';
      }
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
      sorter: (a, b) => {
        const nameA = a.customerName || ''; // Handle null values
        const nameB = b.customerName || ''; // Handle null values
        return nameA.localeCompare(nameB);
      },
      render: (customerName: string) => {
        return customerName ? customerName : 'Name not available';
      }
    },
    {
      title: 'Customer Phone Number',
      dataIndex: 'customerPhoneNumber',
      key: 'customerPhoneNumber'
    },
    {
      title: 'Payment Status',
      dataIndex: 'transactionStatus',
      key: 'transactionStatus',
      sorter: true
    },
    {
      title: 'Total Amount',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) => a.amount - b.amount
    },
    {
      title: 'Created Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
      sorter: (a, b) => a.createdDate.localeCompare(b.createdDate),
      render: (_, record) => <>{dayjs(record?.createdDate).format('M/D/YYYY h:mm A')}</>
    },
    {
      title: 'Action',
      dataIndex: 'actions',
      key: 'actions',

      render: (_cell: any, row: any) => {
        return (
          <div className="d-flex">
            <Button
              type="link"
              icon={<EyeOutlined />}
              onClick={() => navigate(ROUTES.viewPaymentHistory(row?._id))}
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
      vendorId: args?.vendorId,
      customerId: args?.customerId
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

  const handlePopupScroll = (e: any) => {
    // If the user has scrolled to the bottom and there are more pages to load
    if (
      e.target.scrollTop + e.target.offsetHeight === e.target.scrollHeight &&
      vendorList?.total_records !== allVendorList?.length
    ) {
      setVendorIdArg({ ...vendorIdArg, page: vendorIdArg?.page + 1 });
    }
  };

  const handlePopupScrollCustomer = (e: any) => {
    // If the user has scrolled to the bottom and there are more pages to load
    if (
      e.target.scrollTop + e.target.offsetHeight === e.target.scrollHeight &&
      customerList?.total_records !== allCustomerList?.length
    ) {
      setCustomerIdArg({ ...customerIdArg, page: customerIdArg?.page + 1 });
    }
  };

  const exportAction = (successMessage: string = '') => {
    const payload = {
      search: args?.search,
      sortBy: args?.sortBy,
      sortOrder: args?.sortOrder,
      status: args?.status,
      vendorId: args?.vendorId,
      customerId: args?.customerId
    };
    exportPaymentHistoryExcel(payload)
      .then((res) => {
        downloadExcelFile(res?.data?.URL, 'paymentHistory.xlsx', successMessage, setExportOpen);
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
            <Flex justify={'end'} gap="middle">
              <Select
                className="w-200"
                placeholder="Filter by status"
                onChange={(e) => setArgs({ ...args, page: 1, status: e })}
              >
                {filterByPaymentStatus?.map((val) => {
                  return <Option value={val?.value}>{val?.label}</Option>;
                })}
              </Select>
              <Select
                className="w-200"
                placeholder="Filter by vendor"
                onChange={(e) => setArgs({ ...args, page: 1, vendorId: e })}
                onPopupScroll={handlePopupScroll}
              >
                {allVendorList?.map((val: any) => {
                  return <Option value={val?._id}>{val?.firstName + ' ' + val?.lastName}</Option>;
                })}
              </Select>
              <Select
                className="w-200"
                placeholder="Filter by customer"
                onChange={(e) => setArgs({ ...args, page: 1, customerId: e })}
                onPopupScroll={handlePopupScrollCustomer}
              >
                {allCustomerList?.map((val: any) => {
                  return <Option value={val?._id}>{val?.fullName ?? val?.phoneNumber}</Option>;
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
          // dataSource={
          //   Array.isArray(data?.list) && data && data?.list?.length > 0
          //     ? data?.list?.map((item) => ({ ...item, key: item.rowId }))
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

export default PaymentHistoryManagement;
