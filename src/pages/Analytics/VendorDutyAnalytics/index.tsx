import { Button, Checkbox, DatePicker, TablePaginationConfig, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import { useState } from 'react';

import ExportModal from 'components/common/Modal/ExportModal';
import SearchBar from 'components/common/SerachBar';
import { CommonTable } from 'components/common/Table';
import ContentHeader from 'components/layout/contentHeader';

import { analyticsApi } from 'services/api/analytics';
import { VendorDutyList } from 'services/api/analytics/type';
import { ICategoryListReq } from 'services/api/category/type';
import { vendorAPI } from 'services/api/vendor';
import { useVendorDutyAnalyticsList } from 'services/hooks/analytics';

import {
  capitalizeWords,
  debounce,
  downloadExcelFile,
  formatTimeDynamic,
  isSorterType
} from 'utils/functions';

const pathNames: any = [
  {
    title: 'Vendor Duty Analytics'
  }
];

const VendorDutyAnalytics = () => {
  const { RangePicker } = DatePicker;
  const { googleVerifyCode } = vendorAPI;
  const { exportVendorDutyExcel } = analyticsApi;

  const [args, setArgs] = useState<ICategoryListReq>({
    page: 1,
    limit: 10,
    search: '',
    sortBy: '',
    sortOrder: '',
    startDate: '',
    endDate: '',
    isManual: false
  });
  const [manualCheck, setManualCheck] = useState<boolean>(false);
  const [exportOpen, setExportOpen] = useState<boolean>(false);

  const { data } = useVendorDutyAnalyticsList(args);

  const formatDate = (date: string) => (date ? dayjs(date).format('M/D/YYYY h:mm A') : '-');

  const columns: ColumnsType<VendorDutyList> = [
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
      title: 'Vendor Name',
      dataIndex: 'vendorFullName',
      key: 'vendorFullName',
      render: (vendorFullName: string) => (
        <span>{vendorFullName ? capitalizeWords(vendorFullName) : '-'}</span>
      ),
      sorter: true
    },
    {
      title: 'Accepted Time',
      dataIndex: 'acceptBookingTime',
      key: 'acceptBookingTime',
      render: formatDate,
      sorter: true
    },
    {
      title: 'Reaching On Location Time',
      dataIndex: 'reachLocationTime',
      key: 'reachLocationTime',
      render: formatDate,
      sorter: true
    },
    {
      title: 'Service Start Time',
      dataIndex: 'serviceStartDate',
      key: 'serviceStartDate',
      render: formatDate,
      sorter: true
    },
    {
      title: 'Service Completed Time',
      dataIndex: 'serviceEndDate',
      key: 'serviceEndDate',
      render: formatDate,
      sorter: true
    },
    {
      title: 'Total Time Of Acceptance And Reaching On Location',
      dataIndex: 'differenceAcceptAndReach',
      key: 'differenceAcceptAndReach',
      render: (differenceAcceptAndReach: number) => formatTimeDynamic(differenceAcceptAndReach),
      sorter: true
    },
    {
      title: 'Total Service Time',
      dataIndex: 'serviceCompleteTime',
      key: 'serviceCompleteTime',
      render: (serviceCompleteTime: number) => formatTimeDynamic(serviceCompleteTime),
      sorter: true
    }
  ];

  const onChange: any = (
    pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<VendorDutyList>
  ) => {
    setArgs({
      ...args,
      page: pagination.current,
      limit: pagination.pageSize,
      search: args?.search,
      sortOrder: isSorterType(sorter?.order) ?? args.sortOrder,
      sortBy: (sorter.field as string) ?? (args.sortBy as string),
      startDate: args?.startDate,
      endDate: args?.endDate
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
      isManual: args?.isManual
    };
    exportVendorDutyExcel(payload)
      .then((res) => {
        downloadExcelFile(res?.data?.URL, 'vendorDuty.xlsx', successMessage, setExportOpen);
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

export default VendorDutyAnalytics;
