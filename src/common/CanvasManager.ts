import { Canvas, Container, ContainerItem } from "./canvas-types";

export class CanvasManager {
    private _canvas: Canvas;

    constructor(canvasInstance: Canvas) {
        this._canvas = canvasInstance;
    }

    get canvas(): Canvas {
        return this._canvas;
    }

    set canvas(canvasInstance: Canvas) {
        this._canvas = canvasInstance;
    }

    findContainerById(containerId: string): Container | undefined {
        return this._canvas.containers.find((e) => e.id === containerId);
    }

    insertContainer(containerInstance: Container) {
        this._canvas.containers.push(containerInstance);
    }

    replaceContainer(containerInstance: Container, containerId: string) {
        let index = this._canvas.containers.findIndex((e) => e.id === containerId);
        this._canvas.containers[index] = containerInstance;
    }

    removeContainer(containerId: string) {
        let index = this._canvas.containers.findIndex((e) => e.id === containerId);
        this._canvas.containers.splice(index, 1);
    }

    findContainerItemById(itemId: string, containerId: string): ContainerItem | undefined {
        let index = this._canvas.containers.findIndex((e) => e.id === containerId);
        return this._canvas.containers[index].items.find(i => i.id === itemId);
    }

    insertContainerItem(itemInstance: ContainerItem, containerId: string) {
        let index = this._canvas.containers.findIndex((e) => e.id === containerId);
        this._canvas.containers[index].items.push(itemInstance);
    }

    replaceContainerItem(itemInstance: ContainerItem, itemId: string, containerId: string) {
        let index = this._canvas.containers.findIndex((e) => e.id === containerId);
        let itemIndex = this._canvas.containers[index].items.findIndex(i => i.id === itemId);
        this._canvas.containers[index].items[itemIndex] = itemInstance;
    }

    removeContainerItem(itemId: string, containerId: string) {
        let index = this._canvas.containers.findIndex((e) => e.id === containerId);
        let itemIndex = this._canvas.containers[index].items.findIndex(i => i.id === itemId);
        this._canvas.containers[index].items.splice(itemIndex, 1);
    }
}