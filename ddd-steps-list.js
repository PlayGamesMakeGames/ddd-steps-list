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
    this.childrenNum = 0;
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
      childrenNum: { type: Number, reflect: true },
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
    `];
  }

  circleMobile(){
    document.querySelectorAll(".circle").forEach(curCircle => {
      curCircle.style.position = "relative";
    });
  }

  circlePC(){
    document.querySelectorAll(".circle").forEach(curCircle => {
      curCircle.style.position = "absolute";
    });
  }

  checkChildren(){
    //remove children that are not ddd-steps-list-item
    //console.log(this.children);
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
    //after removing unwanted children, update the number of children (makes sure it works if someone hacks dom and adds children)
    this.childrenNum = this.children.length;
    
    //check this.children to make sure we removed correctly
    // console.log(this.children);

    let index = 0;
    //insert circles with index+1 as number for numbered list of items
    document.querySelectorAll("ddd-steps-list-item").forEach(item => {
      if(this.dddprimary){
        item.style.setProperty("--circle-color", `var(--ddd-primary-${this.dddprimary})`);
      }
      item.setAttribute("stepNumber", index+1);
      index = index+1;
    });
  }

  updated(changedProperties){
    //update dddprimary (data-primary) for children
    if(changedProperties.has("dddprimary")){
      console.log("this.dddprimary: " + this.dddprimary);
      this.checkChildren();
    }
    //if someone hacks dom and adds children, rerun checkChildren
    const observer = new MutationObserver(() => {
      if(this.children.length != this.childrenNum) {
        console.log("children: " + this.childrenNum); 
        this.checkChildren();
      }
    });
    observer.observe(this, {childList: true});
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