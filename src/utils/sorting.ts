import { ListItemModel } from '../models/ListItem';


export function sortItemsForDisplay(items: ListItemModel[]): ListItemModel[] {
  const undone = items.filter(i => !i.done);
  const done = items.filter(i => i.done);
  return [...undone, ...done];
}