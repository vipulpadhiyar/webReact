type FileUploadRequestType = {
  file: FileType;
  moduleName: string;
};

type FileResponseItemType = {
  name: string;
  url: string;
};

type FileUploadResponse = {
  statusCode: number;
  message: string;
  data: FileResponseItemType;
};
