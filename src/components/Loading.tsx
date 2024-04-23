import React from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';

type LoadingProps = {
  visible: boolean;
};

const Loading: React.FC<LoadingProps> = ({visible}) => {
  if (visible) {
    return <ActivityIndicator style={styles.loader} size="large" />;
  }
  return null;
};

const styles = StyleSheet.create({
  loader: {
    marginVertical: 20,
  },
});

export default Loading;
