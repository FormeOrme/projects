import { deepMerge, compact, profile } from "./Utils.js";
import { kebabCase } from "./SUtils.js";

class Nodes extends Array {
    querySelector(query) {
        return document.querySelector(query);
    }
    querySelectorAll(query) {
        return document.querySelectorAll(query);
    }
    getElementById(id) {
        return document.getElementById(id);
    }
}

function createElement(e, namespace) {
    namespace = namespace || e.namespace;
    const type = e.constructor.name.replace("_", "").toLowerCase();
    const node = namespace
        ? document.createElementNS(namespace, type)
        : document.createElement(type);

    e.node = node;
    node.source = e;

    if (e.id) node.id = e.id;
    if (e.innerText !== undefined) node.textContent = e.innerText;
    if (e.text !== undefined) node.textContent = e.text;
    if (e.value !== undefined) node.value = e.value;
    if (e.type) node.type = e.type;
    if (e.editable) node.contentEditable = e.editable;

    if (e.class) {
        node.className = compact(e.class).join(" ").trim();
    }
    if (e.event) {
        for (let k in e.event) {
            node.addEventListener(k, e.event[k].bind(node, node), false);
        }
    }
    if (e.attribute) {
        Dom.formatKeys(e.attribute).forEach(([k, v]) => node.setAttribute(k, v));
    }
    if (e.style) {
        Dom.formatKeys(e.style).forEach(([k, v]) =>
            node.style.setProperty(k, ...(v.split ? v.split("!") : [v])),
        );
    }
    if (e.function) {
        Object.entries(e.function).forEach(([k, v]) => (node[k] = v));
    }
    if (e.children) {
        const fragment = document.createDocumentFragment();
        for (const child of compact(e.children)) {
            fragment.appendChild(createElement(child, namespace));
        }
        node.appendChild(fragment);
    }
    return node;
}

class Elem {
    constructor(obj) {
        if (!obj) return;

        if (obj instanceof Elem || obj instanceof Array) {
            this.children = obj;
        } else if (typeof obj === "string" || typeof obj === "number") {
            this.innerText = obj;
        } else {
            Object.assign(this, obj);
        }
    }

    static with(obj = {}) {
        return new this(obj);
    }

    and(obj) {
        const updated = Object.create(Object.getPrototypeOf(this));
        return deepMerge(Object.assign(updated, this), obj);
    }

    create({ profile: profileName, namespace } = {}) {
        return profile(profileName, () => createElement(this, namespace));
    }

    wrapWith(element, options = {}) {
        if (!options?.optional) {
            return this;
        }
        element.children = Array.isArray(element.children)
            ? element.children
            : element.children
              ? [element.children]
              : [];
        element.children.splice(
            options?.position === undefined ? element.children.length : options.position,
            0,
            this,
        );
        return element;
    }

    addChild(child) {
        if (child) {
            this.children = Array.isArray(this.children)
                ? this.children
                : this.children
                  ? [this.children]
                  : [];
            this.children.push(child);
        }
        return this;
    }
}

export class Dom {
    static formatKeys = (obj, format = kebabCase) =>
        Object.entries(obj)
            .filter(([_, v]) => Boolean(v) || v === 0)
            .map(([k, v]) => [
                Dom.svgCamelCaseAttributes.includes(k) || k.includes("--") ? k : format(k),
                v,
            ]);

    static nodes = new Proxy(new Nodes(), {
        get(target, key) {
            return target[key] ?? target.getElementById(key);
        },
    });

    static addStyleNode = (css) =>
        document.head.appendChild(
            Style.with({
                innerText: css,
                attribute: {
                    type: "text/css",
                },
            }).create(),
        );

    static monitor(parentSelector, targetSelector, callback) {
        const parent = document.querySelector(parentSelector);
        if (!parent) return;

        const observer = new MutationObserver((mutationsList, observer) =>
            mutationsList.forEach((mutation) => {
                if (mutation.type !== "childList") return;
                Array.from(mutation.addedNodes).forEach((node) => {
                    if (node.nodeType !== Node.ELEMENT_NODE) return;
                    if (node.matches(targetSelector)) {
                        callback(node, observer);
                        return;
                    }
                    node.querySelectorAll(targetSelector).forEach((child) =>
                        callback(child, observer),
                    );
                });
            }),
        );
        observer.observe(parent, { childList: true, subtree: true });
        document.querySelectorAll(targetSelector).forEach((element) => callback(element, observer));
    }

    static svgCamelCaseAttributes = [
        "allowReorder",
        "attributeName",
        "attributeType",
        "autoReverse",
        "baseFrequency",
        "baseProfile",
        "calcMode",
        "clipPathUnits",
        "contentScriptType",
        "contentStyleType",
        "diffuseConstant",
        "edgeMode",
        "externalResourcesRequired",
        "filterRes",
        "filterUnits",
        "glyphRef",
        "gradientTransform",
        "gradientUnits",
        "kernelMatrix",
        "kernelUnitLength",
        "keyPoints",
        "keySplines",
        "keyTimes",
        "lengthAdjust",
        "limitingConeAngle",
        "markerHeight",
        "markerUnits",
        "markerWidth",
        "maskContentUnits",
        "maskUnits",
        "numOctaves",
        "pathLength",
        "patternContentUnits",
        "patternTransform",
        "patternUnits",
        "pointsAtX",
        "pointsAtY",
        "pointsAtZ",
        "preserveAlpha",
        "preserveAspectRatio",
        "primitiveUnits",
        "refX",
        "refY",
        "repeatCount",
        "repeatDur",
        "requiredExtensions",
        "requiredFeatures",
        "specularConstant",
        "specularExponent",
        "spreadMethod",
        "startOffset",
        "stdDeviation",
        "stitchTiles",
        "surfaceScale",
        "systemLanguage",
        "tableValues",
        "targetX",
        "targetY",
        "textLength",
        "viewBox",
        "viewTarget",
        "xChannelSelector",
        "yChannelSelector",
        "zoomAndPan",
    ];
}

/* TextElements */
export class Div extends Elem {}
export class Span extends Elem {}
export class P extends Elem {}
export class Small extends Elem {}
export class Menu extends Elem {}
export class A extends Elem {}
/* HeadingElements */
export class H1 extends Elem {}
export class H2 extends Elem {}
export class H3 extends Elem {}
export class H4 extends Elem {}
export class H5 extends Elem {}
export class H6 extends Elem {}
export class HGroup extends Elem {}
/* InlineTextElements */
export class I extends Elem {}
export class Strong extends Elem {}
export class Em extends Elem {}
export class Mark extends Elem {}
export class Abbr extends Elem {}
export class Code extends Elem {}
export class Pre extends Elem {}
export class Kbd extends Elem {}
export class Samp extends Elem {}
/* SectionElements */
export class Header extends Elem {}
export class Footer extends Elem {}
export class Article extends Elem {}
export class Aside extends Elem {}
export class Section extends Elem {}
/* ListElements */
export class UL extends Elem {}
export class OL extends Elem {}
export class LI extends Elem {}
export class Nav extends Elem {}
/* FormElements */
export class Form extends Elem {}
export class Input extends Elem {}
export class Output extends Elem {}
export class TextArea extends Elem {}
export class Button extends Elem {}
export class Label extends Elem {}
export class Select extends Elem {}
export class Option_ extends Elem {}
/* MediaElements */
export class Img extends Elem {}
export class Audio_ extends Elem {}
export class Video extends Elem {}
/* TableElements */
export class Table extends Elem {}
export class TR extends Elem {}
export class TD extends Elem {}
export class TH extends Elem {}
export class TBody extends Elem {}
export class TFoot extends Elem {}
export class THead extends Elem {}
export class ColGroup extends Elem {}
export class Col extends Elem {}
export class Caption extends Elem {}
/* EmbeddedElements */
export class IFrame extends Elem {}
export class Canvas extends Elem {}
/* MiscElements */
export class HR extends Elem {}
export class BR extends Elem {}
export class Style extends Elem {}
export class Blockquote extends Elem {}
export class Cite extends Elem {}
export class Sup extends Elem {}
export class Sub extends Elem {}
/* HeadElements */
export class Link extends Elem {}
export class Title extends Elem {}
export class Meta extends Elem {}

const elementClasses = [
    Div,
    Span,
    P,
    Small,
    Menu,
    A,
    H1,
    H2,
    H3,
    H4,
    H5,
    H6,
    HGroup,
    I,
    Strong,
    Em,
    Mark,
    Abbr,
    Code,
    Pre,
    Kbd,
    Samp,
    Header,
    Footer,
    Article,
    Aside,
    Section,
    UL,
    OL,
    LI,
    Nav,
    Form,
    Input,
    Output,
    TextArea,
    Button,
    Label,
    Select,
    Option_,
    Img,
    Audio_,
    Video,
    Table,
    TR,
    TD,
    TH,
    TBody,
    TFoot,
    THead,
    ColGroup,
    Col,
    Caption,
    IFrame,
    Canvas,
    HR,
    BR,
    Style,
    Blockquote,
    Cite,
    Sup,
    Sub,
    Link,
    Title,
    Meta,
];
export const FN = Object.fromEntries(elementClasses.map((cls) => [cls.name, (o) => new cls(o)]));
