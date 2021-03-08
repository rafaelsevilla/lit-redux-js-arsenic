import { LitElement, html, css } from "lit-element";
import { connect } from 'lit-redux-watch';
import { store } from '../redux/store';
import { selectors } from '../redux/dialogSlice';
import stylesGlobal from '../stylesGlobal';

export class Header extends connect(store)(LitElement) {

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
      title: { type: String }
    };
  }

  static get watch() {
    return {
      value: {source: selectors.value},
      list: {source: selectors.list},
      doubleListLength: {source: selectors.doubleListLength}
    }
  }

  render = () => html`<div class="header">
      <span>${this.title} - ${this.list.length}</span>
    </div>`;
}

customElements.define('app-header', Header);