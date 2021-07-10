import {ReactiveController, ReactiveControllerHost} from 'lit'

export class ListController implements ReactiveController {
  public items: Array<string> = []

  host: ReactiveControllerHost

  constructor(host: ReactiveControllerHost) {
    this.host = host
    this.host.addController(this)
  }

  public addItem(item: string) {
    this.items.push(item)
    this.host.requestUpdate()
  }

  public removeItem(i: number): string {
    const item = this.items[i]

    this.items = this.items.filter((_, index) => index != i)
    this.host.requestUpdate()

    return item
  }

  public clear() {
    this.items = []
    this.host.requestUpdate()
  }

  hostConnected() {}
  hostDisconnected() {}
}
