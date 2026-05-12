import { EyeOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, TablePaginationConfig, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DeleteModal from 'components/common/Modal/DeleteModal';
import ExportModal from 'components/common/Modal/ExportModal';
import SearchBar from 'components/common/SerachBar';
import { CommonTable } from 'components/common/Table';
import ContentHeader from 'components/layout/contentHeader';

import { bookingView } from 'services/api/booking/type';
import { ICategoryListReq } from 'services/api/category/type';
import { serviceList } from 'services/api/service/type';
import { vendorAPI } from 'services/api/vendor';
import { vendorPaymentAPI } from 'services/api/vendorPayment';
import { vendorPaymentView } from 'services/api/vendorPayment/type';
import { vendorPaymentKeys } from 'services/hooks/queryKeys';
import { useVendorPaymentList } from 'services/hooks/vendorPayment';

import { ROUTES } from 'utils/constants/routes';
import { debounce, downloadExcelFile, isSorterType } from 'utils/functions';

const pathNames: any = [
  {
    title: 'Vendor Payment Management'
  }
];

const staticFilter = [
  { name: 'All', value: 'All' },
  { name: 'Outstanding', value: 'outstanding' },
  { name: 'Settled', value: 'settled' },
  { name: 'Payable', value: 'Payable' }
];
const VendorPaymentManagement = () => {
  const navigate = useNavigate();
  const { googleVerifyCode } = vendorAPI;
  const { payNowToRender, exportVendorPaymentExcel, makeOutStandingZero } = vendorPaymentAPI;
  const queryClient = useQueryClient();

  const [args, setArgs] = useState<ICategoryListReq>({
    page: 1,
    limit: 10,
    search: '',
    sortBy: '',
    sortOrder: '',
    filter: 'all'
  });
  const [exportOpen, setExportOpen] = useState<boolean>(false);

  const { data } = useVendorPaymentList(args);

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: any) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
    getCheckboxProps: (record: vendorPaymentView) => ({
      disabled: record.amount <= 0 // Disable checkbox if type is 'settled'
    })
  };

  const payNow = (vendorData: vendorPaymentView) => {
    const payload = {
      vendorId: vendorData?._id,
      amount: vendorData?.amount?.toString()
    };
    payNowToRender(payload)
      .then((res) => {
        queryClient.invalidateQueries(vendorPaymentKeys.all);
        message.success(res?.message);
      })
      .catch((_err) => {
        message.error(_err?.message);
      });
  };

  const columns: ColumnsType<any> = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      sorter: (a, b) => {
        const nameA = a.firstName || ''; // Handle null values
        const nameB = b.firstName || ''; // Handle null values
        return nameA.localeCompare(nameB);
      },
      render: (firstName: string) => {
        return firstName ? firstName : 'Name not available';
      }
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      sorter: (a, b) => {
        const nameA = a.lastName || ''; // Handle null values
        const nameB = b.lastName || ''; // Handle null values
        return nameA.localeCompare(nameB);
      },
      render: (lastName: string) => {
        return lastName ? lastName : 'Name not available';
      }
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      render: (phoneNumber, record) => {
        const { countryCode } = record;
        return phoneNumber ? `${countryCode} ${phoneNumber}` : '-';
      }
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount, record) => {
        const { isFlag } = record;
        return isFlag && amount > 0 ? `${amount}` : amount > 0 ? `- ${amount}` : amount;
      }
    },
    {
      title: 'Pay Now',
      dataIndex: 'actions',
      key: 'actions',
      render: (_cell: any, row: vendorPaymentView) => {
        if (row?.isFlag && row?.amount > 0) {
          return (
            <div className="d-flex">
              <Button
                style={{ height: '40px', width: '40px' }}
                type="primary"
                onClick={() => payNow(row)}
              >
                Pay
              </Button>
            </div>
          );
        } else if (!row?.isFlag && row?.amount > 0) {
          return (
            <div className="d-flex">
              <Button style={{ height: '40px', width: '40px' }} type="primary">
                OutStanding
              </Button>
            </div>
          );
        } else {
          return (
            <div className="d-flex">
              <Button style={{ height: '40px', width: '40px' }} type="primary">
                Settled
              </Button>
            </div>
          );
        }
      }
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
              onClick={() => navigate(ROUTES.viewVendorPayment(row?._id))}
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

  const onChangeFilter = (value: string) => {
    setArgs({
      ...args,
      page: 1,
      filter: value
    });
  };

  const exportAction = (successMessage: string = '') => {
    const payload = {
      search: args?.search,
      sortBy: args?.sortBy,
      sortOrder: args?.sortOrder,
      filter: args?.filter
    };
    exportVendorPaymentExcel(payload)
      .then((res) => {
        downloadExcelFile(res?.data?.URL, 'vendorPayment.xlsx', successMessage, setExportOpen);
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

  const makeOutStandingZeroAction = () => {
    const payload = {
      _id: selectedRowKeys
    };
    makeOutStandingZero(payload)
      .then((res) => {
        message.success(res?.message);
        queryClient.invalidateQueries(vendorPaymentKeys.all);
        setSelectedRowKeys([]);
      })
      .catch((err) => {
        message.error(err?.message);
      });
  };

  return (
    <>
      <div className="shadow-paper">
        <ContentHeader pathNames={pathNames} />
        <div className="set-filter">
          <SearchBar
            showSearch={true}
            onSearch={handleSearch}
            onChange={(e: any) => optimizedFn(e?.target?.value)}
            staticFilter={staticFilter}
            showFilter={true}
            onChangeFilter={onChangeFilter}
            extraButton={
              <>
                <Button
                  type="primary"
                  size="large"
                  disabled={selectedRowKeys?.length === 0}
                  onClick={makeOutStandingZeroAction}
                >
                  Make OutStanding Zero
                </Button>
                <Button type="primary" size="large" onClick={() => setExportOpen(true)}>
                  Export
                </Button>
              </>
            }
          />
        </div>
        <CommonTable
          scroll={{ x: 1000 }}
          bordered
          columns={columns}
          dataSource={
            data?.list?.map((item) => ({
              ...item,
              key: item?._id
            })) ?? []
          }
          rowSelection={{
            type: 'checkbox',
            ...rowSelection
          }}
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

export default VendorPaymentManagement;
