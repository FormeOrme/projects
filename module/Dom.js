import { Utils } from "./Utils.js";
import SUtils from "./SUtils.js";

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

export class Dom {

    static formatKeys = (obj, format = SUtils.kebabCase) =>
        Object.entries(obj)
            .filter(([_, v]) => Boolean(v) || v === 0)
            .map(([k, v]) => [Dom.svgCamelCaseAttributes.includes(k) || k.includes("--") ? k : format(k), v])

    static nodes = new Proxy(new Nodes(), {
        get(target, key) {
            return target[key] ?? target.getElementById(key);
        }
    });

    static createElement(e, namespace) {
        namespace = namespace || e.namespace;
        const type = e.constructor.name.replace('_', '').toLowerCase();
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
            node.className = Utils.compact(e.class).join(" ").trim();
        }
        if (e.event) {
            for (let k in e.event) {
                node.addEventListener(k, e.event[k].bind(null, node), false);
            }
        }
        if (e.attribute) {
            Dom.formatKeys(e.attribute).forEach(([k, v]) => node.setAttribute(k, v));
        }
        if (e.style) {
            Dom.formatKeys(e.style).forEach(([k, v]) =>
                node.style.setProperty(k, ...(v.split ? v.split('!') : [v]))
            );
        }
        if (e.function) {
            Object.entries(e.function)
                .forEach(([k, v]) => node[k] = v);
        }
        if (e.children) {
            const fragment = document.createDocumentFragment();
            for (const child of Utils.compact(e.children)) {
                fragment.appendChild(Dom.createElement(child, namespace));
            }
            node.appendChild(fragment);
        }
        return node;
    }

    static addStyleNode = (css) => document.head.appendChild(Style.with({
        innerText: css,
        attribute: {
            type: "text/css"
        }
    }).create());

    static monitor(parentSelector, targetSelector, callback) {
        const parent = document.querySelector(parentSelector);
        if (!parent) return;

        const observer = new MutationObserver((mutationsList, observer) =>
            mutationsList.forEach(mutation => {
                if (mutation.type !== 'childList') return;
                Array.from(mutation.addedNodes).forEach(node => {
                    if (node.nodeType !== Node.ELEMENT_NODE) return;
                    if (node.matches(targetSelector)) {
                        callback(node, observer);
                        return;
                    }
                    node.querySelectorAll(targetSelector)
                        .forEach(child => callback(child, observer));
                });
            }));
        observer.observe(parent, { childList: true, subtree: true });
        document.querySelectorAll(targetSelector)
            .forEach(element => callback(element, observer));
    }

    static Elem = class {

        static with(obj) {
            return Object.assign(new this(), obj);
        }

        and(obj) {
            const updated = Object.create(Object.getPrototypeOf(this));
            return Utils.deepMerge(Object.assign(updated, this), obj);
        }

        create({ profile, namespace } = {}) {
            return Utils.profile(profile, () => Dom.createElement(this, namespace));
        }

        wrapWith(element, options = {}) {
            if (!options?.optional) {
                return this;
            }
            element.children = Array.isArray(element.children) ? element.children : (element.children ? [element.children] : []);
            element.children.splice(options?.position === undefined ? element.children.length : options.position, 0, this);
            return element;
        }

        addChild(child) {
            if (child) {
                this.children = Array.isArray(this.children) ? this.children : (this.children ? [this.children] : []);
                this.children.push(child);
            }
            return this;
        }
    }

    static svgCamelCaseAttributes = [
        "allowReorder", "attributeName", "attributeType", "autoReverse", "baseFrequency",
        "baseProfile", "calcMode", "clipPathUnits", "contentScriptType", "contentStyleType",
        "diffuseConstant", "edgeMode", "externalResourcesRequired", "filterRes", "filterUnits",
        "glyphRef", "gradientTransform", "gradientUnits", "kernelMatrix", "kernelUnitLength",
        "keyPoints", "keySplines", "keyTimes", "lengthAdjust", "limitingConeAngle",
        "markerHeight", "markerUnits", "markerWidth", "maskContentUnits", "maskUnits",
        "numOctaves", "pathLength", "patternContentUnits", "patternTransform", "patternUnits",
        "pointsAtX", "pointsAtY", "pointsAtZ", "preserveAlpha", "preserveAspectRatio",
        "primitiveUnits", "refX", "refY", "repeatCount", "repeatDur", "requiredExtensions",
        "requiredFeatures", "specularConstant", "specularExponent", "spreadMethod", "startOffset",
        "stdDeviation", "stitchTiles", "surfaceScale", "systemLanguage", "tableValues",
        "targetX", "targetY", "textLength", "viewBox", "viewTarget",
        "xChannelSelector", "yChannelSelector", "zoomAndPan"];
}

/* TextElements */
export class Div extends Dom.Elem { };
export class Span extends Dom.Elem { };
export class P extends Dom.Elem { };
export class Small extends Dom.Elem { };
export class Menu extends Dom.Elem { };
export class A extends Dom.Elem { };
/* HeadingElements */
export class H1 extends Dom.Elem { };
export class H2 extends Dom.Elem { };
export class H3 extends Dom.Elem { };
export class H4 extends Dom.Elem { };
export class H5 extends Dom.Elem { };
export class H6 extends Dom.Elem { };
export class HGroup extends Dom.Elem { };
/* InlineTextElements */
export class I extends Dom.Elem { };
export class Strong extends Dom.Elem { };
export class Em extends Dom.Elem { };
export class Mark extends Dom.Elem { };
export class Abbr extends Dom.Elem { };
export class Code extends Dom.Elem { };
export class Pre extends Dom.Elem { };
export class Kbd extends Dom.Elem { };
export class Samp extends Dom.Elem { };
/* SectionElements */
export class Header extends Dom.Elem { };
export class Footer extends Dom.Elem { };
export class Article extends Dom.Elem { };
export class Aside extends Dom.Elem { };
export class Section extends Dom.Elem { };
/* ListElements */
export class UL extends Dom.Elem { };
export class OL extends Dom.Elem { };
export class LI extends Dom.Elem { };
export class Nav extends Dom.Elem { };
/* FormElements */
export class Form extends Dom.Elem { };
export class Input extends Dom.Elem { };
export class Output extends Dom.Elem { };
export class TextArea extends Dom.Elem { };
export class Button extends Dom.Elem { };
export class Label extends Dom.Elem { };
export class Select extends Dom.Elem { };
export class Option_ extends Dom.Elem { };
/* MediaElements */
export class Img extends Dom.Elem { };
export class Audio_ extends Dom.Elem { };
export class Video extends Dom.Elem { };
/* TableElements */
export class Table extends Dom.Elem { };
export class TR extends Dom.Elem { };
export class TD extends Dom.Elem { };
export class TH extends Dom.Elem { };
export class TBody extends Dom.Elem { };
export class TFoot extends Dom.Elem { };
export class THead extends Dom.Elem { };
export class ColGroup extends Dom.Elem { };
export class Col extends Dom.Elem { };
export class Caption extends Dom.Elem { };
/* EmbeddedElements */
export class IFrame extends Dom.Elem { };
export class Canvas extends Dom.Elem { };
/* MiscElements */
export class HR extends Dom.Elem { };
export class BR extends Dom.Elem { };
export class Style extends Dom.Elem { };
export class Blockquote extends Dom.Elem { };
export class Cite extends Dom.Elem { };
export class Sup extends Dom.Elem { };
export class Sub extends Dom.Elem { };
/* HeadElements */
export class Link extends Dom.Elem { };
export class Title extends Dom.Elem { };
export class Meta extends Dom.Elem { };