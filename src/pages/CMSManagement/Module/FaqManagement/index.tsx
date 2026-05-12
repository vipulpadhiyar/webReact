import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Select, Switch, message } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DeleteModal from 'components/common/Modal/DeleteModal';
import SearchBar from 'components/common/SerachBar';
import { CommonTable } from 'components/common/Table';

import { ICategoryListReq } from 'services/api/category/type';
import { faqAPI } from 'services/api/faq';
import { deleteFaq, faqListDT } from 'services/api/faq/type';
import { useFaqList } from 'services/hooks/faq';
import { faqKeys } from 'services/hooks/queryKeys';

import { UserRoleFaq, cmsTypeEnum, userRole } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';
import { debounce, isSorterType } from 'utils/functions';

const FaqManagement = () => {
  const navigate = useNavigate();
  const { deleteFaq, activeInActive } = faqAPI;
  const queryClient = useQueryClient();

  const { Option } = Select;

  const [args, setArgs] = useState<ICategoryListReq>({
    page: 1,
    limit: 10,
    search: '',
    sortBy: '',
    sortOrder: '',
    isActive: true,
    role: ''
  });
  const [open, setIsOpen] = useState<boolean>(false);
  const [faqId, setFaqId] = useState<string>('');
  const { data } = useFaqList(args);

  const onDeleteFaq = () => {
    const reqPayload: deleteFaq = {
      _id: faqId,
      cmsType: cmsTypeEnum.faq
    };
    deleteFaq(reqPayload)
      .then((res) => {
        queryClient.invalidateQueries(faqKeys.all);
        setIsOpen(false);
        message.success(res?.message);
      })
      .catch((_err) => {
        message.error(_err?.message);
      });
  };

  const activeInActiveFaq = (_id: string) => {
    const reqPayload: deleteFaq = {
      _id,
      cmsType: cmsTypeEnum.faq
    };
    activeInActive(reqPayload)
      .then((res) => {
        queryClient.invalidateQueries(faqKeys.all);
        message.success(res?.message);
      })
      .catch((_err) => {
        message.error(_err?.message);
      });
  };
  const columns: ColumnsType<any> = [
    {
      title: 'Question',
      dataIndex: 'question',
      key: 'question',
      width: '300px',
      sorter: true
    },
    {
      title: 'Answer',
      dataIndex: 'answer',
      key: 'answer',
      width: '500px',
      sorter: true
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (value: string) => (value === UserRoleFaq.VENDOR ? 'Vendor' : 'Customer')
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean, row: faqListDT) => (
        <Switch checked={isActive} onChange={() => activeInActiveFaq(row?._id)} />
      )
    },

    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      width: '130px',
      render: (_cell: any, row: faqListDT) => (
        <div className="d-flex">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => navigate(ROUTES.viewFaq(row?._id))}
          />
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => navigate(ROUTES.editFaq(row?._id))}
          />
          <Button
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => {
              setFaqId(row?._id);
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
    sorter: SorterResult<faqListDT>
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
        <SearchBar
          extraButton={
            <>
              <Select
                className="w-200"
                placeholder="Filter by role"
                onChange={(e) => setArgs({ ...args, page: 1, role: e })}
              >
                {userRole?.map((val) => {
                  return <Option value={val?._id}>{val?.name}</Option>;
                })}
              </Select>
              <Button type="primary" size="large" onClick={() => navigate(ROUTES.addFaq)}>
                Add
              </Button>
            </>
          }
          showSearch={true}
          onSearch={handleSearch}
          onChange={(e: any) => optimizedFn(e?.target?.value)}
        />

        <CommonTable
          scroll={{ x: 1000 }}
          bordered
          columns={columns}
          dataSource={
            Array.isArray(data?.list) && data && data?.list.length > 0
              ? data?.list.map((item) => ({ ...item, key: item._id }))
              : []
          }
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
        modalTitle="Are you sure to delete this faq?"
        open={open}
        onOk={onDeleteFaq}
        onCancel={() => setIsOpen(false)}
      />
    </>
  );
};

export default FaqManagement;
