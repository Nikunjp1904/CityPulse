import { I18nManager, Platform, TextInput, TextInputProps } from 'react-native';

export const AppTextInput = (props: TextInputProps) => {
  return (
    <TextInput
      {...props}
      style={[
        props.style,
        Platform.OS === 'ios' && {
          textAlign: I18nManager.isRTL ? 'right' : 'left'
        }
      ]}
    />
  );
};
