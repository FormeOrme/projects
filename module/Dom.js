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

export class Elem {
    constructor(obj) {
        if (!obj) return;

        if (obj instanceof Elem || obj instanceof Array) {
            this.children = obj;
        } else if (typeof obj === "string" || typeof obj === "number") {
            this.text = obj;
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

const elementClasses = [
    /* TextElements */
    class Div extends Elem {},
    class Span extends Elem {},
    class P extends Elem {},
    class Small extends Elem {},
    class Menu extends Elem {},
    class A extends Elem {},
    /* HeadingElements */
    class H1 extends Elem {},
    class H2 extends Elem {},
    class H3 extends Elem {},
    class H4 extends Elem {},
    class H5 extends Elem {},
    class H6 extends Elem {},
    class HGroup extends Elem {},
    /* InlineTextElements */
    class I extends Elem {},
    class Strong extends Elem {},
    class Em extends Elem {},
    class Mark extends Elem {},
    class Abbr extends Elem {},
    class Code extends Elem {},
    class Pre extends Elem {},
    class Kbd extends Elem {},
    class Samp extends Elem {},
    /* SectionElements */
    class Header extends Elem {},
    class Footer extends Elem {},
    class Article extends Elem {},
    class Aside extends Elem {},
    class Section extends Elem {},
    /* ListElements */
    class UL extends Elem {},
    class OL extends Elem {},
    class LI extends Elem {},
    class Nav extends Elem {},
    /* FormElements */
    class Form extends Elem {},
    class Input extends Elem {},
    class Output extends Elem {},
    class TextArea extends Elem {},
    class Button extends Elem {},
    class Label extends Elem {},
    class Select extends Elem {},
    class Option_ extends Elem {},
    /* MediaElements */
    class Img extends Elem {},
    class Audio_ extends Elem {},
    class Video extends Elem {},
    /* TableElements */
    class Table extends Elem {},
    class TR extends Elem {},
    class TD extends Elem {},
    class TH extends Elem {},
    class TBody extends Elem {},
    class TFoot extends Elem {},
    class THead extends Elem {},
    class ColGroup extends Elem {},
    class Col extends Elem {},
    class Caption extends Elem {},
    /* EmbeddedElements */
    class IFrame extends Elem {},
    class Canvas extends Elem {},
    /* MiscElements */
    class HR extends Elem {},
    class BR extends Elem {},
    class Style extends Elem {},
    class Blockquote extends Elem {},
    class Cite extends Elem {},
    class Sup extends Elem {},
    class Sub extends Elem {},
    /* HeadElements */
    class Link extends Elem {},
    class Title extends Elem {},
    class Meta extends Elem {},
];

export function asFunctions(elementClasses) {
    return Object.fromEntries(elementClasses.map((cls) => [cls.name, (o) => new cls(o)]));
}

export const {
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
} = asFunctions(elementClasses);
