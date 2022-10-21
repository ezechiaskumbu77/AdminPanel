export interface SortableByEdit {
  edited: string
}
export function sortByEdit(item1: any, item2: any): number {
  return item1.edited < item2.edited ? 1 : -1
}

export function sortByEditInv(item1: any, item2: any): number {
  return item1.edited < item2.edited ? -1 : 1
}
