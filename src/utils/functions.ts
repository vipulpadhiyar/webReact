import { message } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';

import { setAxiosInterceptor } from 'services/api';
import { authStore } from 'services/store/auth';

// Import moment library for date manipulation
import {
  LocalStorageKeys,
  SubAdminRole,
  VITE_REACT_APP_GOOGLE_GEOCODER_API_KEY,
  VITE_REACT_APP_IMAGE_URL,
  sideBarItems
} from './constants';

const { actions } = authStore.getState();

//To concate the path for the public folder
export const toAbsoluteUrl = (pathname: string) => window.location.origin + pathname;

export const setupAxios = () => {
  const userStorage = localStorage.getItem(LocalStorageKeys.user);
  const tokenStorage = localStorage.getItem(LocalStorageKeys.authToken);

  if (userStorage && tokenStorage) {
    const token = JSON.parse(tokenStorage);
    const userData = JSON.parse(userStorage);

    if (token) {
      const USER_DATA = { ...userData, authToken: token };
      actions.authSuccess({ data: USER_DATA });
    } else {
      actions.authFail();
    }
  }

  // Set Axios Interceptor
  setAxiosInterceptor();
};

export const appLoader = (status: boolean) => actions.loaderChange(status);

export const isSorterType = function (order: any) {
  if (order === 'descend') {
    return 'DESC';
  }
  if (order === 'ascend') {
    return 'ASC';
  } else {
    return '';
  }
};

export const getCategoryList = async () => {
  return fetch(`${VITE_REACT_APP_IMAGE_URL}serviceJson/service.json?uid=${Math.random()}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      // Handle the error, you might want to return a default value or re-throw the error
      throw error;
    });
};

export const getCityList = async () => {
  return fetch(`${VITE_REACT_APP_IMAGE_URL}metaJson/cityMaster.json?uid=${Math.random()}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      // Handle the error, you might want to return a default value or re-throw the error
      throw error;
    });
};
export const getStaticJsonFile = async () => {
  return fetch(`${VITE_REACT_APP_IMAGE_URL}staticJson/static.json`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      // Handle the error, you might want to return a default value or re-throw the error
      throw error;
    });
};

export const generateLengthValidationRules = (
  fieldName: string,
  minLength: number,
  maxLength: number
) => [
  {
    validator: (_: any, value: string) => {
      const errors = [];

      if (value === '') {
        errors.push(`Please enter ${fieldName.toLowerCase()}`);
      } else if (value.charAt(0) === ' ') {
        errors.push(`${fieldName} should not start with a blank space`);
      } else if (value.length < minLength || value.length > maxLength) {
        errors.push(`${fieldName} should be between ${minLength} and ${maxLength} characters long`);
      }
      //  else if (/\d/.test(value) && !/\D\d\D/.test(value)) {
      //   errors.push(`${fieldName} cannot contain a number`);
      // }
      else if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        errors.push(`${fieldName} should not contain symbols`);
      }
      if (errors.length > 0) {
        return Promise.reject(errors);
      }
      return Promise.resolve();
    }
  }
];

export const generateLengthValidationRulesWithNumbers = (
  fieldName: string,
  minLength: number,
  maxLength: number
) => [
  { required: true, message: `Please enter ${fieldName.toLocaleLowerCase()}` },
  { min: minLength, message: `${fieldName} should be at least ${minLength} characters long` },
  { max: maxLength, message: `${fieldName} should be at most ${maxLength} characters long` }
  // {
  //   validator: (_: any, value: any) => {
  //     if (!value || value.match(/^[^\d]+$/)) {
  //       return Promise.resolve();
  //     }
  //     return Promise.reject(`${fieldName} should not contain numbers`);
  //   }
  // }
];
export function debounce<T>(this: T, func: (...args: any[]) => void): (...args: any[]) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return function (this: T, ...args: any[]): void {
    clearTimeout(timer as NodeJS.Timeout);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, 700);
  };
}

export function replaceAndCapitalize(str = '') {
  if (str?.includes('-')) {
    // Split the string by '-'
    const words = str?.split('-');

    // Capitalize the first letter of the first word
    words[0] = words?.[0]?.charAt(0)?.toUpperCase() + words?.[0]?.slice(1)?.toLowerCase();

    // Convert subsequent words to lowercase
    for (let i = 1; i < words.length; i++) {
      words[i] = words[i]?.charAt(0)?.toUpperCase() + words[i]?.slice(1)?.toLowerCase();
    }

    // Join the words back with spaces
    return words?.join(' ');
  }
  return str?.charAt(0)?.toUpperCase() + str?.slice(1)?.toLowerCase();
}

const removeHTMLTags = (value: any) => {
  return value.replace(/<(.|\n)*?>|&nbsp;/g, '').trim();
};
export const aboutCategoryValidator = (_: any, value: any, error: string) => {
  const trimmedValue = removeHTMLTags(value);
  if (!trimmedValue) {
    return Promise.reject(error ?? 'Please enter value');
  }
  return Promise.resolve();
};
export const aboutCategoryValidatorForCkEditor = (_: any, value: any, error: string) => {
  const trimmedValue = removeHTMLTags(value);
  if (!trimmedValue) {
    return Promise.reject(error ?? 'Please enter value');
  }
  return Promise.resolve();
};
export const formatDate = (dateString: string) => {
  if (!dateString) return ''; // Return empty string if dateString is null or undefined

  const date = new Date(dateString);

  // Extracting day, month, and year
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
  const year = date.getFullYear();

  return `${month}-${day}-${year}`;
};

export const removeHTMLTagsAll = (value: any) => {
  return value.replace(/<(.|\n)*?>/g, '').trim();
};

export function capitalizeWords(str: any) {
  return str
    ?.split(' ')
    ?.map((word: any) => word?.charAt(0)?.toUpperCase() + word?.slice(1)?.toLowerCase())
    ?.join(' ');
}

export const renderRoute = (userRoute: any) => {
  const getFilterRoute = sideBarItems?.filter(
    (item) => userRoute?.includes(item?.type) || userRoute?.includes(SubAdminRole.ALL)
  );
  return getFilterRoute[0]?.path;
};

export const getLatLongFromCityName = async (city: string = '', area: string = '') => {
  const address = area ? `${area}, ${city}` : `${city}`;
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: address,
        key: VITE_REACT_APP_GOOGLE_GEOCODER_API_KEY
      }
    });

    if (response.data.status === 'OK') {
      const { lat, lng } = response.data.results[0].geometry.location;
      const postalCodeComponent = response.data.results[0].address_components.find(
        (component: any) => component.types.includes('postal_code')
      );
      const postalCode = postalCodeComponent ? postalCodeComponent.long_name : '';
      return { lat, lng, postalCode };
    } else {
      throw new Error('Unable to fetch geocode data');
    }
  } catch (error) {
    throw new Error('Error fetching data from the Geocoding API');
  }
};

export const dynamicColumnWidth = (arr: any[], minWidth: string, maxWidth: string) => {
  const dynamicWidth = arr?.length >= 3 ? maxWidth : minWidth;
  return {
    width: dynamicWidth
  };
};

export const formatTimeDynamic = (timeInSeconds: number): string => {
  if (!timeInSeconds) return '-';
  if (timeInSeconds < 60) {
    return `${timeInSeconds} seconds`;
  } else if (timeInSeconds < 3600) {
    return `${(timeInSeconds / 60).toFixed(2)} minutes`;
  } else {
    return `${(timeInSeconds / 3600).toFixed(2)} hours`;
  }
};

export const downloadExcelFile = (
  fileURL: string,
  fileName: string = 'file.xlsx',
  successMessage: string = 'File downloaded successfully',
  setExportOpen?: (open: boolean) => void
) => {
  fetch(fileURL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    }
  })
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link: any = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      if (setExportOpen) {
        setExportOpen(false);
      }

      message.success(successMessage);
    })
    .catch((err) => {
      message.error(err?.message);
    });
};

export const renderDate = (date: string) => {
  return date ? dayjs(date).format('M/D/YYYY h:mm A') : '-';
};
