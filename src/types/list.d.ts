type ListPaginateType = PaginationData<ListItemType[]>;

type ListRequestType = {
  page: number;
  limit: number;
  type: number;
};

type ListItemType = {
  id: number;
  teacher_id: number;
  batch_name: string;
};

type ListResponseType = {
  list: ListItemType[];
  total_count: number;
};
