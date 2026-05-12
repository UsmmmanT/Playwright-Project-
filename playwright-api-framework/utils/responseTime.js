import { expect } from '@playwright/test';

export const RESPONSE_THRESHOLDS = {
  GET: 2000,      // GET requests should respond within 2 seconds
  POST: 3000,     // POST requests should respond within 3 seconds
  PUT: 3000,      // PUT requests should respond within 3 seconds
  PATCH: 3000,    // PATCH requests should respond within 3 seconds
  DELETE: 2000,   // DELETE requests should respond within 2 seconds
};

export function assertResponseTime(startTime, threshold) {
  const duration = Date.now() - startTime;
  console.log(`Response time: ${duration}ms (threshold: ${threshold}ms)`);
  expect(duration).toBeLessThanOrEqual(threshold);
}