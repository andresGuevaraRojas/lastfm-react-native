import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  iconName: string;
  iconSize: number;
  iconColor: string;
  text: string;
  style?: ViewStyle;
  textStyle?: StyleProp<TextStyle>;
  onPress: () => void;
};
export default function MenuOption({
  iconName,
  iconSize,
  iconColor,
  text,
  onPress,
  style,
  textStyle,
}: Props) {
  return (
    <TouchableOpacity style={[styles.option, style]} onPress={onPress}>
      <Icon name={iconName} size={iconSize} color={iconColor} />
      <Text style={[styles.optionText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  option: {
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  optionText: {
    fontWeight: '600',
    color: '#142036',
    fontSize: 16,
  },
});
