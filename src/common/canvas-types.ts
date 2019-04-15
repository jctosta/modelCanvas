export enum Color {
    blue = 'blue',
    red = 'red'
}

export interface ContainerItem {
    id: string,
    content: string,
    color: Color
}

export interface Container {
  id: string,
  label: string,
  description: string,
  type: string,
  items: ContainerItem[]
}

export type Canvas = {
  name: string,
  containers: Container[]
}