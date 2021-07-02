import './styles.css'
import {html, LitElement} from 'lit'
import {customElement} from 'lit/decorators.js'
import {ListController} from './list-controller'
import {repeat} from 'lit/directives/repeat.js'
import {createRef, Ref, ref} from 'lit/directives/ref.js'

@customElement('my-component')
export class MyComponent extends LitElement {
  private list = new ListController(this)
  inputRef: Ref<HTMLInputElement> = createRef()

  protected createRenderRoot() {
    return this
  }

  firstUpdated() {
    this.focusInput()
  }

  private focusInput() {
    const input = this.inputRef.value!
    input.focus()
  }

  private add() {
    this.list.addItem(this.inputRef.value!.value)
    this.inputRef.value!.value = ''
    focus()
  }

  private removeItem(e: Event) {
    this.list.removeItem(
      parseInt((e.target as HTMLButtonElement).dataset.index!)
    )
  }

  render() {
    return html`<div class="flex flex-col bg-gray-50 h-screen max-h-screen">
      <h1 class="text-center p-3 bg-blue-500 text-white font-semibold">
        LitDo
      </h1>
      ${this.list.items.length == 0 ? this.showPlaceholder() : this.showList()}
      <form
        @submit="${(e: Event) => {
          e.preventDefault()
        }}"
        class="p-4 mt-auto flex justify-between bg-blue-500 gap-2"
      >
        <input
          class="flex-grow p-1"
          placeholder="New item..."
          ${ref(this.inputRef)}
        />
        <button @click="${this.add}" class="bg-white px-4 text-xl">+</button>
      </form>
    </div>`
  }

  private showPlaceholder() {
    return html`<div class="p-6 h-full text-gray-400 flex flex-col justify-center items-center">
      <span class="text-lg">Nothing to do, yet.</span><span>Lazy. Such Lazy.</span>
    </div>`
  }

  private showList() {
    return html`
      <ul class="p-4 max-h-full overflow-scroll">
        ${repeat(this.list.items, (item) => item, this.listItem)}
      </ul>
    `
  }

  private listItem = (val: string, i: number) => {
    return html`<li key=${i} class="flex justify-between mb-2 gap-2">
      <span class="flex-grow bg-blue-100 p-2">${i + 1}. ${val}</span
      ><button
        class="bg-green-200 px-4"
        @click="${this.removeItem}"
        data-index="${i}"
      >
        &#10003;
      </button>
    </li>`
  }
}
