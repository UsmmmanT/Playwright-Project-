import { test, expect } from '@playwright/test';
import { ApiHelper } from '../../utils/apiHelper.js';
import { ENDPOINTS } from '../../utils/endpoints.js';
import { TEST_DATA } from '../../data/testData.js';
import { RESPONSE_THRESHOLDS, assertResponseTime } from '../../utils/responseTime.js';
test.describe('CRUD Tests @crud', () => {
test('GET - fetch all posts', async ({ request }) => {
  const api = new ApiHelper(request);
  const startTime = Date.now();
  const response = await api.get(ENDPOINTS.POSTS);
  assertResponseTime(startTime, RESPONSE_THRESHOLDS.GET);

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(Array.isArray(body)).toBeTruthy();
  expect(body.length).toBeGreaterThan(0);
});

test('GET - fetch single post by ID', async ({ request }) => {
  const api = new ApiHelper(request);
  const startTime = Date.now();
  const response = await api.get(ENDPOINTS.POST_BY_ID(1));
  assertResponseTime(startTime, RESPONSE_THRESHOLDS.GET);

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.id).toBe(1);
  expect(body).toHaveProperty('title');
  expect(body).toHaveProperty('body');
  expect(body).toHaveProperty('userId');
});

test('POST - create a new post', async ({ request }) => {
  const api = new ApiHelper(request);
  const startTime = Date.now();
  const response = await api.post(ENDPOINTS.POSTS, TEST_DATA.newPost);
  assertResponseTime(startTime, RESPONSE_THRESHOLDS.POST);

  expect(response.status()).toBe(201);

  const body = await response.json();
  expect(body.title).toBe(TEST_DATA.newPost.title);
  expect(body.body).toBe(TEST_DATA.newPost.body);
  expect(body.userId).toBe(TEST_DATA.newPost.userId);
  expect(body).toHaveProperty('id');
});

test('PUT - fully update a post', async ({ request }) => {
  const api = new ApiHelper(request);
  const startTime = Date.now();
  const response = await api.put(ENDPOINTS.POST_BY_ID(1), TEST_DATA.updatedPost);
  assertResponseTime(startTime, RESPONSE_THRESHOLDS.PUT);

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.title).toBe(TEST_DATA.updatedPost.title);
  expect(body.body).toBe(TEST_DATA.updatedPost.body);
  expect(body.userId).toBe(TEST_DATA.updatedPost.userId);
});

test('DELETE - delete a post', async ({ request }) => {
  const api = new ApiHelper(request);
  const startTime = Date.now();
  const response = await api.delete(ENDPOINTS.POST_BY_ID(1));
  assertResponseTime(startTime, RESPONSE_THRESHOLDS.DELETE);

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body).toEqual({});
});

test('PATCH - partially update a post', async ({ request }) => {
  const api = new ApiHelper(request);
  const startTime = Date.now();
  const response = await api.patch(ENDPOINTS.POST_BY_ID(1), TEST_DATA.patchedPost);
  assertResponseTime(startTime, RESPONSE_THRESHOLDS.PATCH);

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.title).toBe(TEST_DATA.patchedPost.title);
  expect(body).toHaveProperty('body');
  expect(body).toHaveProperty('userId');
});
});
