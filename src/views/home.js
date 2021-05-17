import { html, LitElement } from "lit-element";
import '../components/table';
import { pureLit } from 'pure-lit';

pureLit('x-co', ({someProp, iterable}) =>
  html`
    SomeProp: ${someProp + 1}
    Iterable: ${iterable.map((element, index) => html`${index}: ${element}`)}
  `);

pureLit('some-input', (element) => {

  const emit = () => {
    window.dispatchEvent(new CustomEvent('changed', {details: 'window'}));
    element.dispatchEvent(new CustomEvent('changed', {details: 'this'}));
  }

  return html`<input type="text" @keyup=${emit} />`;
});

export class Home extends LitElement {

  static get properties() {
    return {
      rows: {type: Array},
      headers: {type: Array}
    }
  }

  listen = () => {
    window.addEventListener('changed', event => this.printWindow(event.details))
  }

  printWindow = details => console.log(details)

  firstUpdated() {
    this.listen();

    const data = [
      {brand: 'BMW', model: 'M3', price: 67000},
      {brand: 'BMW', model: '440i', price: 55000},
      {brand: 'BMW', model: '740i', price: 100000},
      {brand: 'BMW', model: '750i'},
      {model: '760Li'},
    ];

    this.rows = data.map(vehicle => {
      return {
        columns: [
          {value: vehicle.brand},
          {value: vehicle.model},
          {component: html`<span style="color: red; float: right">${vehicle.price} EUR</span>`, value: vehicle.price}
        ]
      }
    });

    this.headers = [
      {value: 'Brand'},
      {value: 'Model'},
      {value: 'Price'}
    ];
  }

  render = () => html`
    <!-- <simple-table .rows=${this.rows} .headers=${this.headers} /> -->
    <!-- <x-co .someProp=${5} .iterable=${['🥵', 'y']}></x-co> -->
    <some-input @changed="${event => this.printWindow(event.details)}"></some-input>
  `;
}

customElements.define('home-view', Home);
