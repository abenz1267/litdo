import {html, LitElement} from 'lit'
import {customElement, property} from 'lit/decorators.js'

@customElement('my-component')
export class MyComponent extends LitElement {
  @property({type: String}) name = "";

  render() {
    return html`<p>Hello ${this.name}</p>`
  }
}
