/**
 * Copyright 2025 PlayGamesMakeGames
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
/**
 * `ddd-steps-list`
 * 
 * @demo index.html
 * @element ddd-steps-list
 */
export class DddStepsList extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "ddd-steps-list";
  }

  constructor() {
    super();
    // this.title = "";
    this.dddprimary = "0";
    this.checkChildren();
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/ddd-steps-list.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      dddprimary: { type: String, reflect: true },
      // title: { type: String },

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
        background-color: var(--ddd-theme-accent);
      }
      h3 span {
        font-size: var(--ddd-steps-list-label-font-size, var(--ddd-font-size-s));
      }
      .circle {
        width: 200px;
        height: 200px;
        line-height: 200px;
        border-radius: 50%; /* the magic */
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
        text-align: center;
        color: var(--lowContrast-override, white);
        background-color: var(--ddd-theme-primary, #74a024);
        font-size: 16px;
        text-transform: uppercase;
        font-weight: 700;
        margin: 0 auto 40px;
      }
      /* if mobile keep cicles above steps, if not, put circles beside steps*/
      /* mobile - circles above steps */
      @media (max-width: 765px){

      }
      /* pc - circles beside step */
      @media(min-width: 766px){

      }
    `];
  }

  checkChildren(){
    //remove children that are not ddd-steps-list-item
    console.log(this.children);
    let arrChildren = this.children;
    let i = 0;
    for(i = 0; i < this.children.length; i++){
      console.log(arrChildren[i]);
      if(arrChildren[i].tagName.toLowerCase() != "ddd-steps-list-item"){
        console.log("angry at " + arrChildren[i].tagName);
        this.children[i].remove();
        i--; //to accomodate removing the guy
      }
    }

    // this.children = arrChildren;
    //check this.children to make sure we removed correctly
    console.log(this.children);
    // this.children.forEach(item => {
    //   console.log(item);
    // });

    let index = 0;
    //insert circles with index+1 as number for numbered list of items
    document.querySelectorAll("ddd-steps-list-item").forEach(item => {
      console.log(item);
      // console.log(item.innerHTML);
      console.log("this.dddprimary: " + this.dddprimary);
      console.log("spacer");
      if(this.dddprimary){
        item.setAttribute("dddprimary", this.dddprimary);
      }
      let curCircle = `<div class='circle' 
        style='
        width: 50px;
        height: 50px;
        line-height: 50px;
        border-radius: 50%; /* the magic */
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
        text-align: center;
        color: var(--lowContrast-override, white);
        background-color: var(--ddd-primary-${this.dddprimary});
        font-size: 16px;
        text-transform: uppercase;
        font-weight: 700;
        margin: 0 left 40px;
        // margin-left: calc(-1 * var(--ddd-spacing-20, 16px));
        // margin-right: var(--ddd-spacing-4, 16px);
        // display: flex;
        // align-items: center;
        // justify-content: center;
        // position: absolute;
        '>
      ${index+1}</div>`
      //second param is evaluated html
      item.insertAdjacentHTML("beforebegin", curCircle);
      index = index+1;
    });
  }

  updated(changedProperties){
    if(changedProperties.has("dddprimary")){
      console.log("this.dddprimary: " + this.dddprimary);
      this.checkChildren();
    }
  }

  // Lit render the HTML
  render() {
    return html`
<div class="wrapper">
  <slot></slot>
</div>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(DddStepsList.tag, DddStepsList);