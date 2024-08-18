import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Alert } from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/rootTypes';

type PostDetailsScreenProps = {
  navigation?: StackNavigationProp<RootStackParamList, 'PostDetails'>;
  route: Partial<RouteProp<RootStackParamList, 'PostDetails'>> & {
    params: { postId: number };
  };
};
type Post = {
  id: number;
  user_id: number;
  title: string;
  body: string;
};

type Comment = {
  id: number;
  name: string;
  email: string;
  body: string;
};

const PostDetailsScreen: React.FC<PostDetailsScreenProps> = ({ route }) => {
  const { postId } = route.params;
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    axios
      .get(`https://gorest.co.in/public/v2/posts/${postId}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to load posts');
      });

    axios
      .get(`https://gorest.co.in/public/v2/posts/${postId}/comments`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to load comments');
      });
  }, [postId]);

  const renderComment = ({ item }: { item: Comment }) => (
    <View style={styles.commentCard}>
      <Image
        style={styles.avatar}
        source={{ uri: `https://i.pravatar.cc/150?u=${item.email}` }}
      />
      <View style={styles.bodyWrapper}>
        <Text style={styles.commentUserName}>{item.name}</Text>
        <Text style={styles.commentBody}>{item.body}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {post && (
        <View style={styles.postContainer}>
          <Image
            style={styles.avatar}
            source={{ uri: `https://i.pravatar.cc/150?img=${post.body}` }}
          />
          <Text style={styles.postUserName}>User {post.user_id}</Text>
          <Text style={styles.postTitle}>{post.title}</Text>
          <Text style={styles.postBody}>{post.body}</Text>
        </View>
      )}

      {comments.length === 0 ? (
        <View style={styles.noCommentsContainer}>
          <Text style={styles.noCommentsText}>No comments available</Text>
        </View>
      ) : (
        <FlatList
          data={comments}
          renderItem={renderComment}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5'
  },
  postContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10
  },
  postUserName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#6200ea'
  },
  postTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333'
  },
  postBody: {
    fontSize: 16,
    color: '#666'
  },
  commentsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6200ea'
  },
  commentCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10
  },
  commentUserName: {
    fontWeight: 'bold'
  },
  commentBody: {
    fontSize: 14,
    color: '#666'
  },
  bodyWrapper: {
    flex: 1,
    justifyContent: 'center'
  },
  noCommentsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noCommentsText: {
    fontSize: 18,
    color: '#999'
  }
});
export default PostDetailsScreen;
