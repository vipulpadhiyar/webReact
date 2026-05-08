type LibPermissionType = import('react-native-permissions').Permission;

type FileType = {
  uri: string;
  type: string;
  name: string;
  fileSize: number;
};

/*
 * types for DropdownPickerType
 */
type DropdownPickerType = {
  label: string;
  value: string;
  isSelected: boolean;
};

type FilePickerType = {
  CAMERA;
  GALLERY;
  CANCEL;
};

type MultiplePermissionResType = {
  Permission: LibPermissionType;
  status: boolean;
};
