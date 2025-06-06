/**
 * Fake news detection service placeholder.
 * Returns an array of detected inconsistencies with their sources.
 */
export async function detectFakeNews(text) {
  if (!text) return [];
  const results = [];
  if (text.toLowerCase().includes('fake')) {
    results.push({
      incoherence: 'Contains potential fake news keyword "fake".',
      source: 'local-check'
    });
  }
  return Promise.resolve(results);
}
