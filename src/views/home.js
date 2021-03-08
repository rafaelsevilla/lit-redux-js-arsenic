import { html, LitElement } from "lit-element";
import { store } from '../app';
import { actions } from '../redux/dialogSlice';
import { connect } from 'lit-redux-watch';

export class Home extends connect(store)(LitElement) {
  static get watch() {
    return {
      value: {source: 'counter.value'}
    }
  }

  render = () => html`
    <div>home</div>
    <button @click=${() => store.dispatch(actions.increment())}>do something</button>
    <span>v: ${this.value}</span>
  `;
}

customElements.define('home-view', Home);