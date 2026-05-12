import { Button, Checkbox, DatePicker, Select, TablePaginationConfig, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import { useState } from 'react';

import ExportModal from 'components/common/Modal/ExportModal';
import SearchBar from 'components/common/SerachBar';
import { CommonTable } from 'components/common/Table';
import ContentHeader from 'components/layout/contentHeader';

import { analyticsApi } from 'services/api/analytics';
import { VendorLeadAnalyticsList } from 'services/api/analytics/type';
import { ICategoryListReq } from 'services/api/category/type';
import { vendorAPI } from 'services/api/vendor';
import { useVendorLeadsAnalyticsList } from 'services/hooks/analytics';

import { filterByStatus, updateBookingStatusArr } from 'utils/constants';
import { debounce, downloadExcelFile, dynamicColumnWidth, isSorterType } from 'utils/functions';

const pathNames: any = [
  {
    title: 'Vendor Leads Analytics'
  }
];

const VendorLeadsAnalytics = () => {
  const { RangePicker } = DatePicker;
  const { googleVerifyCode } = vendorAPI;
  const { exportVendorLeadsExcel } = analyticsApi;

  const [args, setArgs] = useState<ICategoryListReq>({
    page: 1,
    limit: 10,
    search: '',
    sortBy: '',
    sortOrder: '',
    startDate: '',
    endDate: '',
    status: '',
    isManual: false
  });
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [expandAddressRows, setExpandAddressRows] = useState<Record<string, boolean>>({});
  const [manualCheck, setManualCheck] = useState<boolean>(false);
  const [exportOpen, setExportOpen] = useState<boolean>(false);

  const { data } = useVendorLeadsAnalyticsList(args);

  const formatDate = (date: string) => (date ? dayjs(date).format('M/D/YYYY h:mm A') : '-');

  const renderVendorList = (vendors: any[], bookingNumber: number, dataIndex: string) => {
    const rowKey = `${bookingNumber}-${dataIndex}`; // Unique key for each row based on bookingNumber and column
    const toggleExpand = (rowKey: string) => {
      setExpandedRows((prevState) => ({
        ...prevState,
        [rowKey]: !prevState[rowKey] // Toggle the expanded state for this specific row and column
      }));
    };
    const isExpanded = expandedRows[rowKey];
    const vendorNames = vendors?.map((vendor: any) =>
      vendor?.vendorName
        ? `(${vendor?.vendorName}${
            vendor?.vendorPhoneNumber ? ` : ${vendor?.vendorPhoneNumber}` : ''
          })`
        : '-'
    );

    if (vendorNames?.length <= 3) {
      return vendorNames?.length > 0 ? vendorNames?.join(', ') : '-';
    }

    return (
      <>
        {isExpanded ? vendorNames?.join(', ') + ' ' : vendorNames?.slice(0, 3).join(', ') + '... '}
        <span
          onClick={() => toggleExpand(rowKey)}
          style={{ color: 'blue', cursor: 'pointer', border: 'none', background: 'transparent' }}
        >
          {isExpanded ? 'Read less' : 'Read more'}
        </span>
      </>
    );
  };

  const renderAddress = (address: string, rowKey: number) => {
    const toggleExpand = (rowKey: number) => {
      setExpandAddressRows((prevState) => ({
        ...prevState,
        [rowKey]: !prevState[rowKey]
      }));
    };

    const isExpanded = expandAddressRows[rowKey];
    const maxLength = 50;

    if (!address) return '-';

    return (
      <>
        {isExpanded
          ? address + ' '
          : address?.slice(0, maxLength) + (address?.length > maxLength ? '... ' : '')}
        {address?.length > maxLength && (
          <button
            onClick={() => toggleExpand(rowKey)}
            style={{ color: 'blue', cursor: 'pointer', border: 'none', background: 'transparent' }}
          >
            {isExpanded ? 'Read less' : 'Read more'}
          </button>
        )}
      </>
    );
  };

  const columns: ColumnsType<VendorLeadAnalyticsList> = [
    {
      title: 'Booking Id',
      dataIndex: 'bookingNumber',
      key: 'bookingNumber',
      sorter: true
    },
    {
      title: 'Booking Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: formatDate,
      sorter: true
    },
    {
      title: 'Customer Name',
      dataIndex: 'userName',
      key: 'userName',
      render: (userName: string) => userName ?? '-',
      sorter: true
    },
    {
      title: 'Customer Phone Number',
      dataIndex: 'userPhoneNumber',
      key: 'userPhoneNumber',
      render: (userPhoneNumber: string) => userPhoneNumber ?? '-'
    },
    {
      title: 'Booking Status',
      dataIndex: 'status',
      key: 'status',
      render: (bookingStatus: string) =>
        updateBookingStatusArr?.find((val) => val?.value === bookingStatus)?.label ?? '-'
    },
    {
      title: 'Manual',
      dataIndex: 'isManual',
      key: 'isManual',
      render: (value) => (value ? 'Yes' : 'No')
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: '300px',
      render: (address: string, record) => renderAddress(address, record?.bookingNumber)
    },
    {
      title: 'Service Accepted By',
      dataIndex: 'acceptVendor',
      key: 'acceptVendor',
      render: (acceptVendor) =>
        acceptVendor?.vendorName
          ? `(${acceptVendor?.vendorName}${
              acceptVendor?.vendorPhoneNumber ? ` : ${acceptVendor?.vendorPhoneNumber}` : ''
            })`
          : '-'
    },
    {
      title: 'Attempt To Accept',
      dataIndex: 'acceptService',
      key: 'acceptService',
      onCell: (record) => dynamicColumnWidth(record?.acceptService, '200px', '300px'),
      render: (vendors, record) => renderVendorList(vendors, record?.bookingNumber, 'acceptService')
    },
    {
      title: 'All Vendors',
      dataIndex: 'allVendorLead',
      key: 'allVendorLead',
      onCell: (record) => dynamicColumnWidth(record?.allVendorLead, '150px', '300px'),
      render: (vendors, record) => renderVendorList(vendors, record?.bookingNumber, 'allVendorLead')
    },
    {
      title: 'Service Ignored',
      dataIndex: 'ignoreService',
      key: 'ignoreService',
      onCell: (record) => dynamicColumnWidth(record?.ignoreService, '150px', '300px'),
      render: (vendors, record) => renderVendorList(vendors, record?.bookingNumber, 'ignoreService')
    },
    {
      title: 'Offline Vendors',
      dataIndex: 'offlineVendor',
      key: 'offlineVendor',
      onCell: (record) => dynamicColumnWidth(record?.offlineVendor, '150px', '300px'),
      render: (vendors, record) => renderVendorList(vendors, record?.bookingNumber, 'offlineVendor')
    },
    {
      title: 'Online Vendors',
      dataIndex: 'onlineVendor',
      key: 'onlineVendor',
      onCell: (record) => dynamicColumnWidth(record?.onlineVendor, '150px', '300px'),
      render: (vendors, record) => renderVendorList(vendors, record?.bookingNumber, 'onlineVendor')
    }
  ];

  const onChange: any = (
    pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<VendorLeadAnalyticsList>
  ) => {
    setArgs({
      ...args,
      page: pagination.current,
      limit: pagination.pageSize,
      search: args?.search,
      sortOrder: isSorterType(sorter?.order) ?? args.sortOrder,
      sortBy: (sorter.field as string) ?? (args.sortBy as string),
      startDate: args?.startDate,
      endDate: args?.endDate,
      status: args?.status
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

  const exportAction = (successMessage: string = '') => {
    const payload = {
      search: args?.search,
      sortBy: args?.sortBy,
      sortOrder: args?.sortOrder,
      startDate: args?.startDate,
      endDate: args?.endDate,
      status: args?.status,
      isManual: args.isManual
    };
    exportVendorLeadsExcel(payload)
      .then((res) => {
        downloadExcelFile(res?.data?.URL, 'vendorLead.xlsx', successMessage, setExportOpen);
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
        <SearchBar
          extraButton={
            <>
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
                placeholder="Filter by status"
                onChange={(e) => setArgs({ ...args, page: 1, status: e })}
              >
                {filterByStatus?.map((val, i) => {
                  return (
                    <Select.Option key={i} value={val?.value}>
                      {val?.label}
                    </Select.Option>
                  );
                })}
              </Select>
              <RangePicker
                format="YYYY-MM-DD"
                onChange={handleDateChange}
                disabledDate={disabledDate}
              />
              <Button type="primary" size="large" onClick={() => setExportOpen(true)}>
                Export
              </Button>
            </>
          }
          showSearch={true}
          onSearch={handleSearch}
          onChange={(e: any) => optimizedFn(e?.target?.value)}
        />

        <CommonTable
          rowKey={'_id'}
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

export default VendorLeadsAnalytics;
