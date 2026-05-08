import { ApiEndPoints } from 'utils/constants';

import apiInstance from '..';
import { ICategoryListReq } from '../category/type';

export const supportTicketAPI = {
  // Category List
  async getSupportTicketList(data: ICategoryListReq): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.supportTicket.supportTicketList, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }
};
