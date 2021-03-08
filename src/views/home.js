import { html, css, LitElement } from "lit-element";
import { store } from '../redux/store';
import { actions, selectors } from '../redux/dialogSlice';
import { connect } from 'lit-redux-watch';
import stylesGlobal from '../stylesGlobal';
import { Access } from '../access/access';

export class Home extends Access(connect(store)(LitElement)) {

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

  static get watch() {
    return {
      value: {source: selectors.value},
      list: {source: selectors.list},
      doubleListLength: {source: selectors.doubleListLength}
    }
  }

  static get properties() {
    return {
      index: {type: Number}
    }
  }

  firstUpdated() {
    this.index = 0;
  }

  render = () => html`
    <div>home</div>
    <button @click=${() => {
      store.dispatch(actions.addToList(this.index));
      this.index++;
    }}>do something</button>
    <button @click=${() => {
      this.get('http://slowwly.robertomurray.co.uk/delay/5000/url/https://www.google.co.uk');
    }}>request something (slow)</button>
    <!-- not yet working -->
    <!-- <span>Double list length: ${this.doubleListLength}</span> -->

    <div style="display: flex; flex-flow: column;">
      ${this.list.map((listValue, index) => {
        return html`
          <div class="list-element">
            <span>listValue: ${listValue}</span>
            <span class="delete" @click=${() => store.dispatch(actions.removeFromList(index))}>x</span>
          </div>`;
      })}
    </div>
  `;
}

customElements.define('home-view', Home);