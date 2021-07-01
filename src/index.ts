import "./styles.css"
import {html, LitElement} from 'lit'
import {customElement, property} from 'lit/decorators.js'

@customElement('my-component')
export class MyComponent extends LitElement {
  @property({type: String}) name = "";

  protected createRenderRoot() {
    return this;
  }

  render() {
    return html`<p class="mx-auto text-center p-8">Hello ${this.name}</p>`
  }
}
