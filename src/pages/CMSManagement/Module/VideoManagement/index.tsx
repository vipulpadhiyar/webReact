import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Avatar, Button, Switch, message } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import DeleteModal from 'components/common/Modal/DeleteModal';
import SearchBar from 'components/common/SerachBar';
import { CommonTable } from 'components/common/Table';
import ContentHeader from 'components/layout/contentHeader';

import { videoApi } from 'services/api/video';
import { IGetVideoListResList } from 'services/api/video/type';
import { videoKeys } from 'services/hooks/queryKeys';
import { useVideoList } from 'services/hooks/video';
import { IVideoListArg } from 'services/hooks/video/types';

import { VITE_REACT_APP_IMAGE_URL, uploadImageEnum } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';
import { debounce, isSorterType, toAbsoluteUrl } from 'utils/functions';

const pathNames: any = [
  {
    title: 'Video Management'
  }
];

const VideoManagement = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { activeInActiveVideo, deleteVideoAction } = videoApi;

  const [args, setArgs] = useState<IVideoListArg>({
    page: 1,
    limit: 10,
    search: '',
    sortBy: '',
    sortOrder: ''
  });
  const [open, setIsOpen] = useState<boolean>(false);
  const [videoId, setVideoId] = useState<string>('');

  const { data } = useVideoList(args);

  const onDeleteVideo = () => {
    deleteVideoAction(videoId)
      .then((res) => {
        queryClient.invalidateQueries(videoKeys.all);
        message.success(res?.message);
        setIsOpen(false);
      })
      .catch((_err) => {
        message.error(_err?.message);
      });
  };

  const activeInActiveAction = (id: string) => {
    activeInActiveVideo(id)
      .then((res) => {
        queryClient.invalidateQueries(videoKeys.all);

        message.success(res?.message);
      })
      .catch((_err) => {
        message.error(_err?.message);
      });
  };

  const columns: ColumnsType<any> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '400px'
    },
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      width: '400px',
      render: (_cell: any, row: IGetVideoListResList) => (
        <Avatar
          shape="square"
          size={56}
          src={
            row?.thumbnail
              ? `${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.video}/${row?.thumbnail}`
              : toAbsoluteUrl('/asset/dummy.png')
          }
          alt="dummy"
        />
      )
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      width: '200px',
      render: (isActive: boolean, row: IGetVideoListResList) => (
        <Switch checked={isActive} onChange={() => activeInActiveAction(row?._id)} />
      )
    },

    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',

      render: (_cell: any, row: IGetVideoListResList) => {
        return (
          <div className="d-flex">
            <Button
              type="link"
              icon={<EyeOutlined />}
              onClick={() => navigate(ROUTES.viewVideo(row?._id))}
            />
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => navigate(ROUTES.editVideo(row?._id))}
            />
            <Button
              type="link"
              icon={<DeleteOutlined />}
              onClick={() => {
                setVideoId(row?._id);
                setIsOpen(true);
              }}
            />
          </div>
        );
      }
    }
  ];

  const onChange: any = (
    pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any>
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
            <Button type="primary" size="large" onClick={() => navigate(ROUTES.addVideo)}>
              Add
            </Button>
          }
          showSearch={true}
          onSearch={handleSearch}
          onChange={(e: any) => optimizedFn(e?.target?.value)}
        />
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
          onChange={onChange}
        />
      </div>

      <DeleteModal
        modalTitle="Are you sure to delete this video?"
        open={open}
        onOk={onDeleteVideo}
        onCancel={() => setIsOpen(false)}
      />
    </>
  );
};

export default React.memo(VideoManagement);
