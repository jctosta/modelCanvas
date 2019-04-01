export enum Color {
    blue = 'blue',
    red = 'red'
}

export interface ContainerItem {
    content: string,
    color: Color
}

export interface Container {
  label: string,
  description: string,
  type: string,
  items: ContainerItem[]
}

export type Canvas = {
  name: string,
  containers: Container[]
}