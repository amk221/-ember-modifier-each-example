import { module, test } from 'qunit';
import { visit, click, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'example/tests/helpers';

module('Acceptance | application', function (hooks) {
  setupApplicationTest(hooks);

  test('modifier', async function (assert) {
    await visit('/');

    assert.dom('.item').exists({ count: 5 });

    await click('.item:nth-child(1)');

    assert.dom('.clicked').containsText('You clicked: 0');

    await click('.item:nth-child(2)');

    assert.dom('.clicked').containsText('You clicked: 1');

    await click('.item:nth-child(3)');

    assert.dom('.clicked').containsText('You clicked: 2');
  });

  test('modifier + filtering', async function (assert) {
    await visit('/');

    await fillIn('input', '3');

    assert.dom('.item').exists({ count: 1 });

    await click('.item:nth-child(1)');

    // In the app (not in test app)
    // Clicking the item does not work on the first click
    // Therefore... why _does_ it work in the test app
    //
    // This makes it impossible for me to write a regression
    // test that ensures I am using `key=` on the each loop.

    assert.dom('.clicked').containsText('You clicked: 0');
  });
});
