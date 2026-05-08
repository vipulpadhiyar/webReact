import React, {
  forwardRef,
  memo,
  Ref,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

import {styles} from './styles';

interface AppModalProps {
  cancelable?: boolean;
  children?: React.JSX.Element;
  containerStyle?: ViewStyle;
  setPropsData?: (values: any) => void;
}

export interface RefAppModalProps {
  open: (values?: any) => void;
  close: () => void;
}

// design for reusable modal with transparent backdrop and common open and close function.
export const AppModal = memo(
  forwardRef((props: AppModalProps, ref: Ref<RefAppModalProps | undefined>) => {
    const {
      cancelable = false,
      containerStyle,
      setPropsData,
      children = <></>,
    } = props;

    const [isModelVisible, setIsModelVisible] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
      // methods connected to `ref`
      open: values => open(values),
      close: () => close(),
    }));

    const open = useCallback((values: any) => {
      if (values && setPropsData) {
        setPropsData(values);
      }
      setIsModelVisible(true);
    }, []);

    const close = useCallback(() => {
      setIsModelVisible(false);
    }, []);

    const onCancelableClose = useCallback(() => {
      if (cancelable) {
        setIsModelVisible(false);
      }
    }, [cancelable]);

    return (
      <Modal
        animationType="slide"
        transparent={true}
        collapsable={true}
        visible={isModelVisible}
        onRequestClose={onCancelableClose}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}
          style={styles.keyboardAvoidContainer}>
          <TouchableWithoutFeedback onPress={onCancelableClose}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback>
                <View style={styles.modalView}>
                  <View style={[styles.container, containerStyle]}>
                    {children}
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    );
  }),
);
