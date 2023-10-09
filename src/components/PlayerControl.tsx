import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  iconName: 'play-back' | 'play-circle' | 'play-forward' | 'pause-circle';
  iconSize: number;
  iconColor: string;
  onPress: () => void;
};

export default function PlayerControl({
  iconName,
  iconSize,
  iconColor,
  onPress,
}: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon name={iconName} size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
});
