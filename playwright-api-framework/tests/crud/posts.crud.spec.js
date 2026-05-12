import { test, expect } from '@playwright/test';
import { ApiHelper } from '../../utils/apiHelper.js';
import { ENDPOINTS } from '../../utils/endpoints.js';
import { TEST_DATA } from '../../data/testData.js';

test('GET - fetch all posts', async ({ request }) => {
  const api = new ApiHelper(request);
  const response = await api.get(ENDPOINTS.POSTS);

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(Array.isArray(body)).toBeTruthy();
  expect(body.length).toBeGreaterThan(0);
});

test('GET - fetch single post by ID', async ({ request }) => {
  const api = new ApiHelper(request);
  const response = await api.get(ENDPOINTS.POST_BY_ID(1));

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.id).toBe(1);
  expect(body).toHaveProperty('title');
  expect(body).toHaveProperty('body');
  expect(body).toHaveProperty('userId');
});

test('POST - create a new post', async ({ request }) => {
  const api = new ApiHelper(request);
  const response = await api.post(ENDPOINTS.POSTS, TEST_DATA.newPost);

  expect(response.status()).toBe(201);

  const body = await response.json();
  expect(body.title).toBe(TEST_DATA.newPost.title);
  expect(body.body).toBe(TEST_DATA.newPost.body);
  expect(body.userId).toBe(TEST_DATA.newPost.userId);
  expect(body).toHaveProperty('id');
});

test('PATCH - partially update a post', async ({ request }) => {
  const api = new ApiHelper(request);
  const response = await api.patch(ENDPOINTS.POST_BY_ID(1), TEST_DATA.patchedPost);

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.title).toBe(TEST_DATA.patchedPost.title);
  expect(body).toHaveProperty('body');
  expect(body).toHaveProperty('userId');
});

test('DELETE - delete a post', async ({ request }) => {
  const api = new ApiHelper(request);
  const response = await api.delete(ENDPOINTS.POST_BY_ID(1));

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body).toEqual({});
});

