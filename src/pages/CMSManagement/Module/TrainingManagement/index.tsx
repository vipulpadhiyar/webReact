import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Switch, message } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DeleteModal from 'components/common/Modal/DeleteModal';
import SearchBar from 'components/common/SerachBar';
import { CommonTable } from 'components/common/Table';

import { ICategoryListReq } from 'services/api/category/type';
import { deleteFaq, faqListDT } from 'services/api/faq/type';
import { trainingAPI } from 'services/api/training';
import { trainingKeys } from 'services/hooks/queryKeys';
import { useTrainingList } from 'services/hooks/training';

import { cmsTypeEnum } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';
import { debounce, isSorterType } from 'utils/functions';

const TrainingManagement = () => {
  const navigate = useNavigate();
  const { deleteTraining, activeInActive } = trainingAPI;
  const queryClient = useQueryClient();

  const [args, setArgs] = useState<ICategoryListReq>({
    page: 1,
    limit: 10,
    search: '',
    sortBy: '',
    sortOrder: '',
    isActive: true
  });
  const [open, setIsOpen] = useState<boolean>(false);
  const [trainingId, setTrainingId] = useState<string>('');
  const { data } = useTrainingList(args);

  const onDeleteTraining = () => {
    const reqPayload: deleteFaq = {
      _id: trainingId,
      cmsType: cmsTypeEnum.training
    };
    deleteTraining(reqPayload)
      .then((res) => {
        queryClient.invalidateQueries(trainingKeys.all);
        setIsOpen(false);
        message.success(res?.message);
      })
      .catch((_err) => {
        message.error(_err?.message);
      });
  };

  const activeInActiveTraining = (_id: string) => {
    const reqPayload: deleteFaq = {
      _id,
      cmsType: cmsTypeEnum.training
    };
    activeInActive(reqPayload)
      .then((res) => {
        queryClient.invalidateQueries(trainingKeys.all);
        message.success(res?.message);
      })
      .catch((_err) => {
        message.error(_err?.message);
      });
  };
  const columns: ColumnsType<any> = [
    {
      title: 'Title',
      dataIndex: 'titleKey',
      key: 'titleKey',
      sorter: (a, b) => a.titleKey.localeCompare(b.titleKey)
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      sorter: (a, b) => a.content.localeCompare(b.content)
    },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'link',
      sorter: true
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean, row: faqListDT) => (
        <Switch checked={isActive} onChange={() => activeInActiveTraining(row?._id)} />
      )
    },

    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',

      render: (_cell: any, row: faqListDT) => (
        <div className="d-flex">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => navigate(ROUTES.viewTraining(row?._id))}
          />
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => navigate(ROUTES.editTraining(row?._id))}
          />
          <Button
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => {
              setTrainingId(row?._id);
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
            <Button type="primary" size="large" onClick={() => navigate(ROUTES.addTraining)}>
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
        modalTitle="Are you sure to delete this training?"
        open={open}
        onOk={onDeleteTraining}
        onCancel={() => setIsOpen(false)}
      />
    </>
  );
};

export default TrainingManagement;
