class LoStMan /* Local Store Manager */ {
	static getObj(id, proto) {
		const parsed = JSON.parse(localStorage.getItem(id));
		return !proto ? parsed : Object.setPrototypeOf(parsed, proto);
	}
	static setObj(id, o) {
		localStorage.setItem(id, JSON.stringify(o))
	}
}

class QueStMan /* Query String Manager */ {
	static queryString = new Proxy(new URLSearchParams(window.location.search), {
		get: (qs, id) => qs.get(id),
	});
	static get(name) {
		return QueStMan.queryString[name];
	}
}

class StringUtils {
	static capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);
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

	static toH = (s, d = 210, k = 6, n = 13) => `hsla(${(Array.from(s).reduce((a, c, i) => a + c.charCodeAt() * n * (k + i), d) % 360)}, 72%, 65%, 1)`;

	static getType(s) {
		s = s?.trim();
		if (/<[^>]*>/.test(s)) {
			return "xml";
		}
		if (Utils.isJSON(s)) {
			return "json";
		}
	}

	static isJSON(s) {
		try {
			JSON.parse(s);
			return true;
		} catch {
			return false;
		}
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
	static toXY = (i, w) => ({ x: toX(i, w), y: toY(i, w) });
	static toID = (x, y, w) => y * w + x;
	static toID_O = (xy, w) => toID(xy.x, xy.y, w);
	static toID_A = (xy, w) => toID(xy[0], xy[1], w);

	static clone = o => Object.setPrototypeOf(JSON.parse(JSON.stringify(o)), o.constructor.prototype);

	static shuffle = (array) => {
		for (var i = array.length - 1; i > 0; i--) {
			var rand = Math.floor(Math.random() * (i + 1));
			[array[i], array[rand]] = [array[rand], array[i]]
		}
		return array;
	}

	static shuffleNew = arr => Utils.shuffle(arr.slice());

	static hideClass = "d-none";
}

class Filter {
	static notNull = Boolean;
}

class Sort {
	static localeCompare(func) {
		return (o1, o2) => (func(o1) || '').localeCompare(func(o2) || '');
	}
	static desc(func) {
		return (o1, o2) => (func(o2) || 0) - (func(o1) || 0);
	}
}

class Dom {
	static id = (id) => document.getElementById(id);
	static qs = (selector) => document.querySelector(selector);
	static qsa = (selector) => document.querySelectorAll(selector);

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
	static InlineTextElements = "I,Strong,Em,Mark,Abbr,Code,Pre";
	static ListElements = "UL,OL,LI";
	static FormElements = "Form,Input,Textarea,Button,Label,Select,Option";
	static MediaElements = "Img,Audio,Video";
	static TableElements = "Table,TR,TD,TH,TBody,Tfoot,Thead";
	static InteractiveElements = "Button,A";
	static EmbeddedElements = "Iframe,Canvas,Svg";
	static MiscellaneousElements = "HR,BR,Style,Blockquote,Cite,Sup,Sub";

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
	].join().split(",");

	static evalNode = e => eval(`class ${e} extends Dom.Elem {}; window.${e} = ${e};`);
	static evalNodes = nodes => nodes.forEach(Dom.evalNode);
}

Dom.evalNodes(Dom.AllElements);

Utils.load();// must be last line
