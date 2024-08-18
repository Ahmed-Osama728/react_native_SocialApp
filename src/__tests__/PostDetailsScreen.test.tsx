import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import PostDetailsScreen from '../screens/PostDetailsScreen';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('PostDetailsScreen', () => {
  const post = {
    id: 1,
    user_id: 123,
    title: 'Post Title',
    body: 'Post body content'
  };

  const comments = [
    {
      id: 1,
      name: 'Commenter 1',
      email: 'test@example.com',
      body: 'This is a comment.'
    }
  ];

  it('renders post details and comments correctly', async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: post })
      .mockResolvedValueOnce({ data: comments });

    const { getByText } = render(
      <NavigationContainer>
        <PostDetailsScreen route={{ params: { postId: 1 } }} />
      </NavigationContainer>
    );

    await waitFor(
      () => {
        expect(getByText('Post Title')).toBeTruthy();
        expect(getByText('This is a comment.')).toBeTruthy();
      },
      { timeout: 10000 }
    );
  });
});
