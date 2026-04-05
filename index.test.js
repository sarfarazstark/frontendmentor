const test = require('node:test');
const assert = require('node:assert');
const { frontendmentor } = require('./index.js');

test('frontendmentor function', async (t) => {
  await t.test('removes "main" from name', () => {
    const result = frontendmentor('my-project-main', 'xyz123');
    assert.strictEqual(result, 'my-project-xyz123');
  });

  await t.test('removes "master" from name', () => {
    const result = frontendmentor('my-project-master', 'xyz123');
    assert.strictEqual(result, 'my-project-xyz123');
  });

  await t.test('replaces digit followed by dash with digit', () => {
    const result = frontendmentor('project-1-name', 'xyz123');
    assert.strictEqual(result, 'project-1name-xyz123');
  });

  await t.test('handles multiple digits with dashes', () => {
    const result = frontendmentor('project-1-2-name', 'xyz123');
    // regex is / (\d)- / so it should only replace the first one
    assert.strictEqual(result, 'project-12-name-xyz123');
  });

  await t.test('removes "main" and handles digit-dash replacement', () => {
    const result = frontendmentor('my-1-project-main', 'abc');
    assert.strictEqual(result, 'my-1project-abc');
  });

  await t.test('does not remove "main" if it is part of another word', () => {
    const result = frontendmentor('maintainer-project', 'def');
    assert.strictEqual(result, 'maintainer-project-def');
  });

  await t.test('handles name without any dashes or special conditions', () => {
    const result = frontendmentor('project', 'ghi');
    assert.strictEqual(result, 'project-ghi');
  });
});
