import { Utils } from "./Utils.js";
import { SUtils } from "./SUtils.js";

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

class Dom {

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

    static Elements = {};
    static evalNodes = nodes => eval(`"use strict"; ${nodes.map(e => `class ${e} extends Dom.Elem {}; Dom.Elements.${e} = ${e};`).join("")}`);

    static TextElements = "Div,Span,P,Small,Menu";
    static HeadingElements = "H1,H2,H3,H4,H5,H6,HGroup";
    static InlineTextElements = "I,Strong,Em,Mark,Abbr,Code,Pre,Kbd,Samp";
    static SectionElements = "Header,Footer,Article,Aside,Section";
    static ListElements = "UL,OL,LI,Nav";
    static FormElements = "Form,Input,Output,TextArea,Button,Label,Select,Option_";
    static MediaElements = "Img,Audio_,Video";
    static TableElements = "Table,TR,TD,TH,TBody,TFoot,THead,ColGroup,Col,Caption";
    static InteractiveElements = "Button,A";
    static EmbeddedElements = "IFrame,Canvas";
    static MiscElements = "HR,BR,Style,Blockquote,Cite,Sup,Sub";
    static SvgBaseElements = "Svg,Defs,G,Path,Line,Rect,Circle,Ellipse,Polygon,Polyline";
    static SvgDefElements = "LinearGradient,Stop";
    static HeadElements = "Link,Title,Meta";

    static AllElements = Utils.deduplicate([
        Dom.TextElements,
        Dom.HeadingElements,
        Dom.InlineTextElements,
        Dom.SectionElements,
        Dom.ListElements,
        Dom.FormElements,
        Dom.MediaElements,
        Dom.TableElements,
        Dom.InteractiveElements,
        Dom.EmbeddedElements,
        Dom.MiscElements,
        Dom.SvgBaseElements,
        Dom.SvgDefElements,
        Dom.HeadElements,
    ].join().split(","));

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

Dom.evalNodes(Dom.AllElements);

export default {
    Dom,
    ...Dom.Elements
};