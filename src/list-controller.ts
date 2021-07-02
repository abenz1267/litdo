import { ReactiveController, ReactiveControllerHost } from "lit";

export class ListController implements ReactiveController {
  public items: Array<String> = [];

  host: ReactiveControllerHost;

  constructor(host: ReactiveControllerHost) {
    (this.host = host).addController(this)
  }

  public addItem(item: String) {
    this.items.push(item);
    this.host.requestUpdate();
  }

  public removeItem(i: number) {
    this.items = this.items.filter((_, index) => index != i)
    this.host.requestUpdate();
  }

  hostConnected() {}
  hostDisconnected() {}
}
