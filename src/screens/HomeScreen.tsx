import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  Dimensions
} from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/rootTypes';

const { width } = Dimensions.get('window');

type Post = {
  id: number;
  user_id: number;
  title: string;
  body: string;
};

type HomeScreenProps = {
  navigation: Partial<StackNavigationProp<RootStackParamList, 'Home'>>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://gorest.co.in/public/v2/posts')
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to load posts');
        setLoading(false);
      });
  }, []);

  const renderPost = ({ item }: { item: Post }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('PostDetails', { postId: item.id })}
      style={styles.card}
    >
      <Image
        style={styles.avatar}
        source={{ uri: `https://i.pravatar.cc/150?img=${item.body}` }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.userName}>User {item.user_id}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text numberOfLines={2} style={styles.body}>
          {item.body}
        </Text>
      </View>
    </TouchableOpacity>
  );
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#6200ea' />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: width - 20,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5
  },
  body: {
    fontSize: 14,
    color: '#666'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  textContainer: {
    flex: 1
  }
});

export default HomeScreen;
