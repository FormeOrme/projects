class LoStMan /* Local Storage Manager */ {
	static getObj(id, proto) {
		const parsed = JSON.parse(localStorage.getItem(id));
		return !proto ? parsed : Object.setPrototypeOf(parsed, proto);
	}
	static setObj(id, o) {
		localStorage.setItem(id, JSON.stringify(o))
	}
}

class QueStMan /* Query String Manager */ {
	static get(key) {
		return new URLSearchParams(window.location.search).get(key);
	}
	static set(key, value) {
		const url = new URL(window.location.href);
		url.searchParams.set(key, value);
		window.location.href !== url.href && window.history.replaceState({}, document.title, url.toString());
	}
}

class Utils {
	static get UUID() {
		return self.crypto.randomUUID();
	}
	static get ID() {
		const array = new Uint32Array(1);
		window.crypto.getRandomValues(array);
		return array[0];
	}
	static get HID() {
		return Utils.ID.toString(16);
	}

	static load() { document.dispatchEvent(new Event("utils-loaded")); }

	static toHRoot(options = {}) {
		const { sat = 72, light = 65, opacity = 1 } = options;
		return (`:root{--sat: ${sat}%; --lht: ${light}%; --opy: ${opacity};}`)
	}
	static toH = (s, options = {}) => {
		const { baseHue = 210, multiplier = 6, charWeight = 13, sat = 72, light = 65, opacity = 1, global = true } = options;
		const hue = (Array.from(s).reduce((a, c, i) => a + c.charCodeAt() * charWeight * (multiplier + i), baseHue) % 360);
		const pfx = `${Utils.HID}_`;
		const gpfx = global ? "" : pfx;
		return (`var(--${pfx}color); --${pfx}hue: ${hue};`)
			+ (global ? "" : `--${pfx}sat: ${sat}%; --${pfx}lht: ${light}%; --${pfx}opy: ${opacity};`)
			+ (`--${pfx}color: hsla(var(--${pfx}hue), var(--${gpfx}sat), var(--${gpfx}lht), var(--${gpfx}opy))`);
	}

	static kvMap = (arr, k, v) => Utils.vkMap(arr, v, k);
	static vkMap = (arr, v = o => o, k = o => o.id) =>
		Object.fromEntries(arr.map(c => [k(c), v(c)]));

	static fetchJson = (o) => fetch(o.url, o.options)
		.then(r => r.json())
		.then(r => ({ ...o, json: r }));

	static fetchAll = (o) => Promise.all(o.map(Utils.fetchJson))
		.then(c => Utils.vkMap(c, o => o.json))

	static normalize = (current, max) => current / max;
	static prc = (current, max) => Utils.normalize(current, max) * 100;

	static toX = (i, w) => i % w;
	static toY = (i, w) => ~~(i / w);
	static toXY = (i, w) => ({ x: Utils.toX(i, w), y: Utils.toY(i, w) });
	static toID = (x, y, w) => y * w + x;
	static toID_O = (xy, w) => Utils.toID(xy.x, xy.y, w);
	static toID_A = (xy, w) => Utils.toID(xy[0], xy[1], w);

	static clone = o => Object.setPrototypeOf(JSON.parse(JSON.stringify(o)), o.constructor.prototype);

	static shuffle = (array) => {
		for (var i = array.length - 1; i > 0; i--) {
			var rand = Math.floor(Math.random() * (i + 1));
			[array[i], array[rand]] = [array[rand], array[i]]
		}
		return array;
	}

	static shuffleNew = arr => this.shuffle(arr.slice());
	static hideClass = "d-none";
}

class SUtils {
	static trimAndFill = (s, n, c) => s.length > n ? s.substring(0, n) : s.padEnd(n, c);
	static sentenceCase = s => s.replaceAll('_', ' ').replace(/(?<![A-Z\s])(?<=.)([A-Z])/g, ' $1');
	static snakeCase = s => this.sentenceCase(s).replaceAll(' ', '_').toUpperCase();
	static camelCase = s => s.replace(/^(\w)/g, (_, c) => c.toLowerCase());

	static enhance = () => {
		String.prototype.map = function (f) {
			return f(this);
		};
	}
}

class Filter {
	static first = (o, i) => i === 0;
	static last = (o, i, a) => i === a.length - 1;
	static notNull = Boolean;
	static not = (f) => (...a) => !f(...a);
}
const F = Filter;

const Identity = o => o;

class Sort {
	static alpha = (func = Identity) => (o1, o2) => (func(o1) || '').localeCompare(func(o2) || '');
	static asc = (func = Identity) => (o1, o2) => (func(o1) || 0) - (func(o2) || 0);
}

class Reduce {
	static with = (func) => (a, c) => { func(a, c); return a; }
}

class Dom {
	static id = (id) => document.getElementById(id);
	static qs = (selector) => document.querySelector(selector);
	static qsa = (selector) => Array.from(document.querySelectorAll(selector));

	static addStyleNode = (css) => document.head.appendChild(Style.with({ innerText: css }).create());

	static monitor(parentSelector, targetSelector, callback) {
		const parent = document.querySelector(parentSelector);
		if (!parent) return;

		const observer = new MutationObserver((mutationsList, observer) => {
			mutationsList.forEach(mutation => {
				if (mutation.type === 'childList') {
					Array.from(mutation.addedNodes).forEach(node => {
						if (node.nodeType === Node.ELEMENT_NODE) {
							if (node.matches(targetSelector)) {
								callback(node, observer);
								return;
							}
							node.querySelectorAll(targetSelector).forEach(child => {
								callback(child, observer);
							});
						}
					});
				}
			});
		})
		observer.observe(parent, { childList: true, subtree: true });
		document.querySelectorAll(targetSelector).forEach(element => callback(element, observer));
	}

	static NODES = {};
	static createElement(e) {
		const node = document.createElement(e._type);
		!!e.id && ((node.id = e.id) && (Dom.NODES[e.id] = node));
		!!e.innerText && (node.textContent = e.innerText);
		!!e.value && (node.value = e.value);
		!!e.type && (node.type = e.type);
		!!e.class && node.classList.add(...Array.isArray(e.class) ? e.class : e.class.trim().split(/\s+/));
		!!e.attribute && Object.entries(e.attribute).forEach(([k, v]) => node.setAttribute(k, v));
		!!e.event && Object.entries(e.event).forEach(([k, v]) => node.addEventListener(k, (e) => v(e, node), false));
		!!e.children && (Array.isArray(e.children) ? e.children : [e.children]).filter(Filter.notNull).forEach((c) => {
			node.appendChild(Dom.createElement(c));
		});
		!!e.style && Object.entries(e.style).forEach(([k, v]) => { node.style[k] = v; });
		!!e.function && Object.entries(e.function).forEach(([k, v]) => { node[k] = v; });
		e.node = node;
		return node;
	}

	static Elem = class {
		get _type() { return this.constructor.name; }
		static with(obj) {
			return Object.assign(new this(), obj);
		}
		create() { return Dom.createElement(this); }
		toJSON() { return ({ _type: this._type, ...this }); }
		wrapWith(element, options = {}) {
			if (!options?.optional) {
				return this;
			}
			element.children = Array.isArray(element.children) ? element.children : (element.children ? [element.children] : []);
			element.children.splice(options?.position === undefined ? element.children.length : options.position, 0, this);
			return element;
		}
	}

	static TextElements = "Div,Span,P,Small,Section,Menu";
	static HeadingElements = "H1,H2,H3,H4,H5,H6";
	static InlineTextElements = "I,Strong,Em,Mark,Abbr,Code,Pre,Kbd,Samp";
	static ListElements = "UL,OL,LI";
	static FormElements = "Form,Input,Textarea,Button,Label,Select,Option";
	static MediaElements = "Img,Audio,Video";
	static TableElements = "Table,TR,TD,TH,TBody,Tfoot,Thead";
	static InteractiveElements = "Button,A";
	static EmbeddedElements = "Iframe,Canvas,Svg";
	static MiscellaneousElements = "HR,BR,Style,Blockquote,Cite,Sup,Sub";
	static SvgBaseElements = "Svg,Defs,G,Path,Line,Rect,Circle,Ellipse,Polygon";
	static HeadElements = "Link,Title,Meta";

	static AllElements = [
		Dom.TextElements,
		Dom.HeadingElements,
		Dom.InlineTextElements,
		Dom.ListElements,
		Dom.FormElements,
		Dom.MediaElements,
		Dom.TableElements,
		Dom.InteractiveElements,
		Dom.EmbeddedElements,
		Dom.MiscellaneousElements,
		Dom.SvgBaseElements,
		Dom.HeadElements,
	].join().split(",");

	// 	static evalNode = e => eval(`class ${e} extends Dom.Elem {}; window.${e} = ${e};`);
	static clazz = (name, cls) => ({ [name]: class extends cls { } })[name];
	static evalNode = e => window[e] = Dom.clazz(e, Dom.Elem);

	static evalNodes = nodes => nodes.forEach(Dom.evalNode);
}

Dom.evalNodes(Dom.AllElements);

Utils.load();// must be last line
