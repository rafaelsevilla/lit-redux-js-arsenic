import { LitElement, html } from 'lit-element';
import { registerTranslateConfig, use } from '@appnest/lit-translate';
import { Router } from '@vaadin/router';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/av-icons.js';
import './components/header';

// initialization
window.addEventListener('load', () => {
  initRouter();
  initLocalization();
});

function initRouter() {
  window.router = new Router(document.querySelector('main'));
  window.router.setRoutes([
    {
      path: '/',
      component: 'home-view',
      action: async () => {
        await import('./views/home');
      },
    },
    {
      path: '(.*)',
      component: 'x-not-found-view',
    },
  ]);
}

function initLocalization() {
  registerTranslateConfig({
    loader: language =>
      fetch(`assets/i18n/${language}.json`).then(response => response.json()),
  });

  use('en');
}

export class App extends LitElement {
  constructor() {
    super();
  }

  render() {
    return html`
      <!-- <hsp-preload></hsp-preload>
      <dialog-container></dialog-container>
      <load-indicator></load-indicator> -->
      <!-- <app-header></app-header> -->
      <app-header title="(arsenic) 33 Demo"></app-header>
      <slot></slot>
    `;
  }

  navigate() {
    Router.go(
      window.router.urlForName('tool-view', { someParam: 'cat' })
    );
  }
}

customElements.define('arsenic-pwa', App);
