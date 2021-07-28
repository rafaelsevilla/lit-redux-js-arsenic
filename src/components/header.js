import { LitElement, html, css } from "lit-element";
import { store } from '../redux/store';
import stylesGlobal from '../stylesGlobal';

export class Header extends LitElement {

  static styles = [
    stylesGlobal,
    css`
      .header {
        background: black;
        height: 40px;
        color: white;
        font-size: 20px;
        display: flex;
        align-items: center;
        padding: 0 10px;
      }
    `
  ];

  static get properties() {
    return {
      title: { type: String },
      count: { type: Number },
    };
  }

  firstUpdated() {
    // initialize value from state
    this.count = store.getState().data.count;
    // subscribe to state updates
    store.subscribe(data => this.count = data, state => state.data.count);
  }

  render = () => html`<div class="header">
      <span>${this.title} - ${this.count}</span>
    </div>`;
}

customElements.define('app-header', Header);
