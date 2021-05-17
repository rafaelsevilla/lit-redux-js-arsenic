import { LitElement, html, css } from "lit-element";

export class SimpleTable extends LitElement {

  static styles = [
    css`
      table {
        border-spacing: 0;
      }

    	thead {
        background: #e6e6e6;
      }

      tr {
        border-bottom: 1px solid #e6e6e6;
      }

      th {
        padding: 10px;
        width: 100px;
        cursor: pointer;
      }

      .td-content {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
      }
    `
  ];

  static get properties() {
    return {
      rows: { type: Array },
      headers: { type: Array }
    };
  }

  firstUpdated() {
    this.headers.forEach(header => !header.defaultSort ? header.sortingDirection = 'NONE' : null);
    this.rows.forEach((row, index) => row.originalIndex = index);

    const defaultSortHeader = this.headers.find(header => header.defaultSort);

    if (defaultSortHeader) {
      defaultSortHeader.sortingDirection = defaultSortHeader.defaultSort;
      this.sortData(defaultSortHeader);
    }

    this.requestUpdate();
  }

  changeSortingDirection(header) {
    if (header.sortingDirection === 'NONE') {
      header.sortingDirection = 'ASC';
    } else if (header.sortingDirection === 'ASC') {
      header.sortingDirection = 'DESC';
    } else if (header.sortingDirection === 'DESC') {
      header.sortingDirection = 'NONE';
    }

    this.headers.filter(h => h.value !== header.value).forEach(h => h.sortingDirection = 'NONE');

    this.sortData(header);
    this.requestUpdate();
  }

  sortData(header) {
    const index = this.headers.indexOf(header);

    this.rows.sort((a, b) => {
      if (header.sortingDirection === 'ASC') {

        if (a.columns[index].value < b.columns[index].value || this.hasNoValue(b.columns[index].value)) {
          return -1;
        } else if (a.columns[index].value > b.columns[index].value) {
          return 1;
        } else {
          return 0;
        }
      }

      if (header.sortingDirection === 'DESC') {
        if (a.columns[index].value > b.columns[index].value || this.hasNoValue(a.columns[index].value)) {
          return -1;
        } else if (a.columns[index].value < b.columns[index].value) {
          return 1;
        } else {
          return 0;
        }
      }

      if (header.sortingDirection === 'NONE') {
        if (a.originalIndex < b.originalIndex) {
          return -1;
        } else if (a.originalIndex > b.originalIndex) {
          return 1;
        } else {
          return 0;
        }
      }
    });
  }

  hasNoValue(v) {
    return v === undefined || v === null;
  }

  render = () => {
    return html`
      <div id="simple-table">

        <table>
          <thead>
            <tr>
              ${this.headers.map(header => html`
                <th @click=${() => this.changeSortingDirection(header)}>
                  ${header.value} ${header.sortingDirection}
                </th>
              `)}
            </tr>
          </thead>
          <tbody>
            ${this.rows.map(row => html`<tr>
              ${row.columns.map(column => html`
                <td>
                  ${column.component ? column.component : html`<div class="td-content">${column.value}</div>`}
                </td>`)}
            </tr>`)}
          </tbody>
        </table>

      </div>
    `;
  }
}

customElements.define('simple-table', SimpleTable);
