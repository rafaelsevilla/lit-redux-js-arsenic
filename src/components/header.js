import { LitElement, html } from "lit-element";

export class Header extends LitElement {
  static get properties() {
    return {
      title: { type: String }
    };
  }

  render = () => html`<span>${this.title}</span>`;
}

customElements.define('app-header', Header);