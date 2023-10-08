import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ProfileHeaderBackImage(props: {tintColor: string}) {
  return <Icon name="close" size={30} color={props.tintColor} />;
}
