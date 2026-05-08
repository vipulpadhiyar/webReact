import React, {
  forwardRef,
  memo,
  Ref,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import DatePicker, {DatePickerProps} from 'react-native-date-picker';

/* The `interface IAppDatePickerModalProps` is extending the `DatePickerProps` interface and adding an
optional property `key` of type string to it. By extending `DatePickerProps`, the
`IAppDatePickerModalProps` interface inherits all properties and methods defined in
`DatePickerProps` while also allowing the addition of the `key` property specifically for the
`AppDatePickerModal` component. This allows the `AppDatePickerModal` component to accept additional
props beyond what `DatePicker` component expects, including the `key` prop which can be used for
React's list rendering optimization. */
interface IAppDatePickerModalProps extends DatePickerProps {
  key?: string;
}

/* The `export interface IAppDatePickerModalRefProps` is defining a TypeScript interface that specifies
the shape of the reference object that can be used to interact with the `AppDatePickerModal`
component. In this case, it defines two methods: */
export interface IAppDatePickerModalRefProps {
  openPicker: () => void;
  closePicker: () => void;
}

/* This code snippet is defining a React functional component called `AppDatePickerModal`. Here's a
breakdown of what it does: */
export const AppDatePickerModal = memo(
  forwardRef(
    (
      props: IAppDatePickerModalProps,
      ref: Ref<IAppDatePickerModalRefProps | undefined>,
    ) => {
      const {key} = props;

      const [open, setOpen] = useState<boolean>(false);

      const show = useCallback(() => {
        setOpen(true);
      }, []);

      const hide = useCallback(() => {
        setOpen(false);
      }, []);

      /* The `const onConfirm` function defined using `useCallback` is a callback function that handles
     the confirmation action when a date is selected in the date picker component. Here's a
     breakdown of what it does: */
      const onConfirm = useCallback(
        (date: Date) => {
          setOpen(false);
          if (props.onConfirm) {
            props.onConfirm(date);
          }
        },
        [props],
      );

      const onCancel = useCallback(() => {
        setOpen(false);
      }, []);

      /* The `useImperativeHandle` hook in React allows a functional component to customize the instance
    value that is exposed to parent components when using `ref`. */
      useImperativeHandle(ref, () => ({
        // methods connected to `ref`
        openPicker: () => {
          show();
        },
        closePicker: () => {
          hide();
        },
      }));

      return (
        <DatePicker
          {...props}
          theme="light"
          key={key}
          open={open}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      );
    },
  ),
);
