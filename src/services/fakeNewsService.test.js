import { detectFakeNews } from './fakeNewsService';

test('detectFakeNews finds keyword', async () => {
  const results = await detectFakeNews('this is fake news');
  expect(results.length).toBeGreaterThan(0);
});

test('detectFakeNews returns empty array when nothing found', async () => {
  const results = await detectFakeNews('just normal text');
  expect(results.length).toBe(0);
});
