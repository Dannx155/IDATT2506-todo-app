import { ListItemModel } from './ListItem';


export type ListModel = {
  id: string;
  name: string;
  items: ListItemModel[];
};