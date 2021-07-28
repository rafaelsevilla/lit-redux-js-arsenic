import { html, css, LitElement } from "lit-element";
import { store } from '../redux/store';
import stylesGlobal from '../stylesGlobal';
import { Access } from '../access/access';

export class Home extends Access(LitElement) {

  static styles = [
      stylesGlobal,
      css`
        .list-element {
          width: 100%;
          height: 100px;
          background: #d6ecb7;
          margin-bottom: 20px;
          color: white;
          font-size: 25px;
          display: flex;
          flex-flow: column;
          align-items: center;
          justify-content: center;
        }

        .delete {
          cursor: pointer;
          color: red;
        }
      `
    ]

  static get properties() {
    return {
      count: {type: Number},
      list: {type: Array}
    }
  }

  firstUpdated() {
    this.list = [];

    this.count = store.getState().data.count;
    store.subscribe(stateCount => this.count = stateCount, state => state.data.count);
  }

  render = () => html`
    <!-- TODO bring more pure grid examples -->
    <button @click=${() => {
      store.getState().set(state => {state.data.count = state.data.count + 50});
    }}>+50</button>

    Count: ${this.count}

    <div style="display: flex; flex-flow: column;">
    </div>
  `;
}

customElements.define('home-view', Home);
