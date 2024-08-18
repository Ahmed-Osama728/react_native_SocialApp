import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('HomeScreen', () => {
  const posts = [
    {
      id: 1,
      user_id: 123,
      title: 'Post 1',
      body: 'This is the body of post 1'
    }
  ];

  it('renders posts from API correctly', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: posts });

    const { getByText } = render(
      <NavigationContainer>
        <HomeScreen navigation={{ navigate: jest.fn() }} />
      </NavigationContainer>
    );

    await waitFor(
      () => {
        expect(getByText('Post 1')).toBeTruthy();
        expect(getByText('This is the body of post 1')).toBeTruthy();
      },
      { timeout: 10000 }
    );
  });
});
