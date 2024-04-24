import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ListItemProps {
  title: string;
  imageUrl: string;
  isFavorited: boolean;
  onItemPress: () => void;
  onToggleFavorite: () => void;
}

const ListItem: React.FC<ListItemProps> = ({
  title,
  imageUrl,
  isFavorited,
  onItemPress,
  onToggleFavorite,
}) => {
  return (
    <TouchableOpacity onPress={onItemPress} style={styles.container}>
      <Image source={{uri: imageUrl}} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Icon
        name={isFavorited ? 'favorite' : 'favorite-border'}
        size={24}
        color={isFavorited ? 'red' : 'grey'}
        style={styles.icon}
        onPress={onToggleFavorite}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EEE',
  },
  title: {
    width: Dimensions.get('window').width - 150,
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    marginRight: 10,
  },
  icon: {
    padding: 10,
  },
});

export default React.memo(ListItem);
