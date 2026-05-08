import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Switch, message } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CommonTable } from 'components/common/Table';

import { ICategoryListReq } from 'services/api/category/type';
import { contactUsAPI } from 'services/api/contactUs';
import { contactUsListDT } from 'services/api/contactUs/type';
import { deleteFaq, faqListDT } from 'services/api/faq/type';
import { useContactUsList } from 'services/hooks/contactUs';
import { contactUsKeys } from 'services/hooks/queryKeys';

import { VITE_REACT_APP_IMAGE_URL, cmsTypeEnum, uploadImageEnum } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';
import { isSorterType, toAbsoluteUrl } from 'utils/functions';

const ContactUsManagement = () => {
  const navigate = useNavigate();
  const { deleteContact, activeInActive } = contactUsAPI;
  const queryClient = useQueryClient();

  const [args, setArgs] = useState<ICategoryListReq>({
    page: 1,
    limit: 10,
    search: '',
    sortBy: '',
    sortOrder: '',
    isActive: true
  });
  const { data } = useContactUsList(args);

  const onDeleteContact = (_id: string) => {
    const reqPayload: deleteFaq = {
      _id,
      cmsType: cmsTypeEnum.contactsUs
    };
    deleteContact(reqPayload)
      .then((res) => {
        queryClient.invalidateQueries(contactUsKeys.all);
        message.success(res?.message);
      })
      .catch((_err) => {
        message.error(_err?.message);
      });
  };

  const activeInActiveFaq = (_id: string) => {
    const reqPayload: deleteFaq = {
      _id,
      cmsType: cmsTypeEnum.contactsUs
    };
    activeInActive(reqPayload)
      .then((res) => {
        queryClient.invalidateQueries(contactUsKeys.all);
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
      render: (_cell: any, row: contactUsListDT) => (
        <picture>
          <img
            src={
              row?.image
                ? `${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.cms}/${row?.image}`
                : toAbsoluteUrl('/asset/dummy.png')
            }
            alt="dummy"
          />
        </picture>
      )
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      sorter: true
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      sorter: true
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      sorter: true
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: true
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

      render: (_cell: any, row: faqListDT) => (
        <div className="d-flex">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => navigate(ROUTES.viewContactUs(row?._id))}
          />
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => navigate(ROUTES.editContactUs(row?._id))}
          />
          <Button type="link" icon={<DeleteOutlined />} onClick={() => onDeleteContact(row?._id)} />
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

  return (
    <>
      <div className="shadow-paper">
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
    </>
  );
};

export default ContactUsManagement;
