import { test, expect } from '@playwright/test';
import { ApiHelper } from '../../utils/apiHelper.js';
import { ENDPOINTS } from '../../utils/endpoints.js';
import { TEST_DATA } from '../../data/testData.js';

function validatePostSchema(post) {
  expect(typeof post.id).toBe('number');
  expect(typeof post.userId).toBe('number');
  expect(typeof post.title).toBe('string');
  expect(typeof post.body).toBe('string');

  expect(post.id).toBeGreaterThan(0);
  expect(post.userId).toBeGreaterThan(0);
  expect(post.title.length).toBeGreaterThan(0);
  expect(post.body.length).toBeGreaterThan(0);
}

test('SCHEMA - GET single post has correct schema', async ({ request }) => {
  const api = new ApiHelper(request);
  const response = await api.get(ENDPOINTS.POST_BY_ID(1));

  expect(response.status()).toBe(200);

  const body = await response.json();

  // Validate all expected fields exist
  expect(body).toHaveProperty('id');
  expect(body).toHaveProperty('userId');
  expect(body).toHaveProperty('title');
  expect(body).toHaveProperty('body');

  // Validate data types and values
  validatePostSchema(body);
});

test('SCHEMA - GET all posts have correct schema', async ({ request }) => {
  const api = new ApiHelper(request);
  const response = await api.get(ENDPOINTS.POSTS);

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(Array.isArray(body)).toBeTruthy();

  // Validate schema of first 5 posts
  body.slice(0, 5).forEach((post) => {
    expect(post).toHaveProperty('id');
    expect(post).toHaveProperty('userId');
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('body');

    validatePostSchema(post);
  });
});

test('SCHEMA - POST response has correct schema', async ({ request }) => {
  const api = new ApiHelper(request);
  const response = await api.post(ENDPOINTS.POSTS, TEST_DATA.newPost);

  expect(response.status()).toBe(201);

  const body = await response.json();

  // Validate all expected fields exist in response
  expect(body).toHaveProperty('id');
  expect(body).toHaveProperty('userId');
  expect(body).toHaveProperty('title');
  expect(body).toHaveProperty('body');

  // Validate types
  expect(typeof body.id).toBe('number');
  expect(typeof body.userId).toBe('number');
  expect(typeof body.title).toBe('string');
  expect(typeof body.body).toBe('string');

  // Validate values match what we sent
  expect(body.title).toBe(TEST_DATA.newPost.title);
  expect(body.userId).toBe(TEST_DATA.newPost.userId);
});

