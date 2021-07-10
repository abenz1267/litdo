import './styles.css'
import {html, LitElement} from 'lit'
import {customElement, state} from 'lit/decorators.js'
import {ListController} from './list-controller'
import {repeat} from 'lit/directives/repeat.js'
import {createRef, Ref, ref} from 'lit/directives/ref.js'
import {classMap} from 'lit/directives/class-map.js'

@customElement('lit-do')
export class LitDo extends LitElement {
  @state()
  private list = new ListController(this)

  @state()
  private cList = new ListController(this)

  @state()
  private inputRef: Ref<HTMLInputElement> = createRef()

  @state()
  private showCompleted = false

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
    const input = this.inputRef.value!.value.trim()
    if (input == '') return

    this.list.addItem(input)
    this.inputRef.value!.value = ''
    focus()
  }

  private completeItem(e: Event) {
    const index = parseInt((e.target as HTMLButtonElement).dataset.index!)

    if (!this.showCompleted) {
      const item = this.list.removeItem(index)

      this.cList.addItem(item)
      return
    }

    this.cList.removeItem(index)

    if (this.cList.items.length == 0) {
      this.toggleCompleted()
    }
  }

  private toggleCompleted() {
    if (this.cList.items.length == 0 && !this.showCompleted) return
    this.showCompleted = !this.showCompleted
  }

  private clearCompleted() {
    this.cList.clear()
    this.toggleCompleted()
  }

  render() {
    return html`<div class="flex flex-col bg-gray-50 h-screen max-h-screen">
      <h1 class="text-center p-3 bg-blue-500 text-white font-semibold">
        LitDo
      </h1>
      ${this.list.items.length == 0
        ? this.showPlaceholder()
        : this.showList(this.list.items, this.showCompleted)}
      <button
        class="bg-gray-200 rounded self-center py-2 px-4 m-2"
        @click=${this.toggleCompleted}
      >
        ${this.cList.items.length} completed tasks
      </button>
      ${this.showList(this.cList.items, !this.showCompleted)}
      <form
        @submit=${(e: Event) => {
          e.preventDefault()
        }}
        class="p-4 mt-auto flex justify-between bg-blue-500 gap-2"
      >
        <input
          class="flex-grow p-1"
          placeholder="New item..."
          ${ref(this.inputRef)}
        />
        <button @click=${this.add} class="bg-white px-4 text-xl">+</button>
      </form>
    </div>`
  }

  private showPlaceholder() {
    const classes = {
      'p-6': true,
      'h-full': true,
      'text-gray-400': true,
      flex: true,
      'flex-col': true,
      'justify-center': true,
      'items-center': true,
      hidden: this.showCompleted,
    }

    return html`<div class=${classMap(classes)}>
      <span class="text-lg">Nothing to do, yet.</span
      ><span>Lazy. Such Lazy.</span>
    </div>`
  }

  private showList(list: Array<string>, show: boolean) {
    const classes = {
      'max-h-full': true,
      'h-full': true,
      'overflow-scroll': true,
      flex: true,
      'flex-col': true,
      hidden: show,
    }

    return html`
      <div class=${classMap(classes)}>
        <ul class="max-h-full p-4 flex-grow h-full overflow-scroll">
          ${repeat(list, (item) => item, this.listItem)}
        </ul>
        <button
          class=${this.showCompleted ? 'm-2 p-2' : 'hidden'}
          @click=${this.clearCompleted}
        >
          clear all
        </button>
      </div>
    `
  }

  private listItem = (val: string, i: number) => {
    const classes = {
      'bg-green-200': !this.showCompleted,
      'bg-red-200': this.showCompleted,
      'px-4': true,
    }

    return html`<li key=${i} class="flex justify-between mb-2 gap-2">
      <span class="flex-grow bg-blue-100 p-2">${i + 1}. ${val}</span
      ><button
        class=${classMap(classes)}
        @click=${this.completeItem}
        data-index=${i}
      >
        ${this.showCompleted ? html`&#10007;` : html`&#10003;`}
      </button>
    </li>`
  }
}
