import { test, expect } from '@playwright/test';
import { ApiHelper } from '../../utils/apiHelper.js';
import { ENDPOINTS } from '../../utils/endpoints.js';
import { TEST_DATA } from '../../data/testData.js';

test.describe('Negative Tests @negative', () => {
test('GET - should return 404 for non-existent post', async ({ request }) => {
  const api = new ApiHelper(request);
  const response = await api.get(ENDPOINTS.POST_BY_ID(TEST_DATA.invalidId));

  expect(response.status()).toBe(404);

  const body = await response.json();
  expect(body).toEqual({});
});

test('POST - should handle missing fields gracefully', async ({ request }) => {
  const api = new ApiHelper(request);
  const response = await api.post(ENDPOINTS.POSTS, {});

  // JSONPlaceholder still returns 201 but with empty fields
  expect(response.status()).toBe(201);

  const body = await response.json();
  expect(body).toHaveProperty('id');
  expect(body.title).toBeUndefined();
  expect(body.body).toBeUndefined();
  expect(body.userId).toBeUndefined();
});

test('PUT - should return 500 for non-existent post', async ({ request }) => {
  const api = new ApiHelper(request);
  const response = await api.put(
    ENDPOINTS.POST_BY_ID(TEST_DATA.invalidId),
    TEST_DATA.updatedPost
  );

  // JSONPlaceholder returns 500 for PUT on non-existent resource
  expect(response.status()).toBe(500);
});

test('DELETE - should return 200 for non-existent post', async ({ request }) => {
  const api = new ApiHelper(request);
  const response = await api.delete(ENDPOINTS.POST_BY_ID(TEST_DATA.invalidId));

  // JSONPlaceholder returns 200 for DELETE on non-existent resource
  expect(response.status()).toBe(200);
});

});