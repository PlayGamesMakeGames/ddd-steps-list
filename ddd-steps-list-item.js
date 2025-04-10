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
    this.stepNumber = 0;
    this.dddprimary = "0";
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
      stepNumber: { type: Number, reflect: true },
      dddprimary: { type: String, reflect: true },
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
        margin-top: var(--ddd-spacing-5);
        margin-bottom: var(--ddd-spacing-10);
        background-color: var(--ddd-theme-accent);
        /* add padding for computer version to make space for circle */
        /* padding-left: var(--ddd-spacing-20); */
      }
      @media (min-width: 750px) {
        .wrapper {
          padding-left: var(--ddd-spacing-17);
        }
      }
      h3 span {
        font-size: var(--ddd-steps-list-item-label-font-size, var(--ddd-font-size-s));
      }
      .header{
        /* margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4); */
        font-size: 32px;
      }
      .infoList{
        /* display: flex; */
        /* margin: var(--ddd-spacing-1);
        padding: var(--ddd-spacing-1); */
        /* need this to update with one passed into ddd-steps-list */
        color: var(--ddd-primary); 
      }
      .circle {
        width: 50px;
        height: 50px;
        line-height: 50px;
        border-radius: 50%; /* the magic */
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
        text-align: center;
        color: var(--lowContrast-override, white);
        background-color: var(--circle-color, var(--ddd-theme-default-nittanyNavy));
        font-size: 16px;
        text-transform: uppercase;
        font-weight: 700;
        // margin: 0 left 40px;
        /* margin-left: calc(-1 * var(--ddd-spacing-20, -16px)); */
        // margin-right: var(--ddd-spacing-4, 16px);
        // display: flex;
        // align-items: center;
        // justify-content: center;
        position: relative;
      }

      /* if mobile keep cicles above steps, if not, put circles beside steps*/
      /* mobile - circles above steps */
      @media (max-width: 750px){
        .circle {
          position: relative;
          margin-bottom: var(--ddd-spacing-4);
        }
      }
      /* pc - circles beside step */
      @media(min-width: 750px){
        .circle {
          position: absolute;
          margin-left: calc(-1 * var(--ddd-spacing-15));
          margin-top: calc(var(--ddd-spacing-2) * -1);
        }
        .circle::after {
          content: "";
          display: block;
          width: 2px;
          height: 107px;
          border-left: 2px dashed var(--circle-color, var(--ddd-theme-default-nittanyNavy));
          position: relative;
          /* distance between circle and line */
          bottom: -10px;
          /* center line under circle */
          left: 50%;
          transform: translateX(-50%);
        }
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
    <!-- style="background-color: var(--ddd-primary-${this.dddprimary})" possibly in wrapper -->
<div class="wrapper">
  <div class="circle">${this.stepNumber}</div>
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