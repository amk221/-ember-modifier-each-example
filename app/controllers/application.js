import Controller from '@ember/controller';
import { modifier } from 'ember-modifier';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
  @tracked query = '';
  @tracked clicked;

  groups = [
    {
      title: 'Group 1',
      items: [{ name: 'Item 1' }, { name: 'Item 2' }, { name: 'Item 3' }],
    },
    {
      title: 'Group 2',
      items: [{ name: 'Item 4' }, { name: 'Item 5' }],
    },
  ];

  get filteredGroups() {
    return this.groups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) =>
          item.name.toLowerCase().includes(this.query.toLowerCase())
        ),
      }))
      .filter((group) => group.items.length > 0);
  }

  handleClick = (index) => {
    this.clicked = index;
  };

  item = modifier(
    (element, _, { onClick }) => {
      element.addEventListener('click', onClick);

      return () => {
        element.removeEventListener('click', onClick);
      };
    },
    { eager: false }
  );
}
