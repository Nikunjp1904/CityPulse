import { I18nManager, Platform, Text, TextProps } from 'react-native';

export const AppText = (props: TextProps) => {
  return (
    <Text
      {...props}
      style={[
        props.style,
        Platform.OS === 'ios' && {
          writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'
        }
      ]}
    />
  );
};
