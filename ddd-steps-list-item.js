/**
 * Copyright 2025 PlayGamesMakeGames
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `ddd-steps-list-item`
 * 
 * @demo index.html
 * @element ddd-steps-list-item
 */
export class DddStepsListItem extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "ddd-steps-list-item";
  }

  constructor() {
    super();
    this.header = "";
    // this.content = this.createContent();
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      // localesPath:
      //   new URL("./locales/ddd-steps-list-item.ar.json", import.meta.url).href +
      //   "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      header: { type: String },
      // content: { type: String },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      h3 span {
        font-size: var(--ddd-steps-list-item-label-font-size, var(--ddd-font-size-s));
      }
      .header{
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
        font-size: 32px;
      }
      .infoList{
        margin: var(--ddd-spacing-1);
        padding: var(--ddd-spacing-1);
      }
    `];
  }

  // createContent(){
  //   let content = "content";
  //   const infoList = document.querySelector(".infoList");
  //   document.querySelectorAll("ddd-steps-list-item").forEach(item => {
  //     let curContent = item.innerHTML;
      
  //     console.log(item);
  //     console.log(item.innerHTML);
  //     console.log("spacer");

  //     // infoList.append(item);  NEED TO MAKE THIS APPEND EACH ITEM WHILE MAINTAINING TAG CONSTRAINTS? MAKE ANOTHER LOOP LOOPING THROUGH EACH TAG?
  //     content = content + item.innerHTML;
  //   });
  //   return content;
  // }

  // Lit render the HTML
  render() {
    return html`
<div class="wrapper">
  <div class="header">
    ${this.header}
  </div>
  <div class="infoList">
    <slot></slot>
    <!-- ${this.content} -->
  </div>
</div>`;
  }
}

globalThis.customElements.define(DddStepsListItem.tag, DddStepsListItem);