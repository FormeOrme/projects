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

class IdUtils {
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

	static toX = (i, w) => i % w;
	static toY = (i, w) => ~~(i / w);
	static toXY = (i, w) => ({ x: Utils.toX(i, w), y: Utils.toY(i, w) });
	static toID = (x, y, w) => y * w + x;
	static toID_O = ({ x, y }, w) => Utils.toID(x, y, w);
	static toID_A = (xy, w) => Utils.toID(xy[0], xy[1], w);
}

class Utils {

	static tween = (v, r1, r2, m1, m2) => m1 + (m2 - m1) * ((v - r1) / (r2 - r1));

	static normalize = (current, max) => current / max;
	static prc = (current, max) => Utils.normalize(current, max) * 100;

	static kvMap = (arr, k, v) => Utils.vkMap(arr, v, k);
	static vkMap = (arr, v = o => o, k = o => o.id) =>
		Object.fromEntries(arr.map(c => [k(c), v(c)]));

	static fetchJson = (o) => fetch(o.url, o.options)
		.then(r => r.json())
		.then(r => ({ ...o, json: r }));

	static fetchAll = (o) => Promise.all(o.map(Utils.fetchJson))
		.then(c => Utils.vkMap(c, o => o.json))

	static clone = o => Object.setPrototypeOf(JSON.parse(JSON.stringify(o)), o.constructor.prototype);

	static deduplicate = a => [...new Set(a)];
	static shuffle = (array) => {
		for (var i = array.length - 1; i > 0; i--) {
			var rand = Math.floor(Math.random() * (i + 1));
			[array[i], array[rand]] = [array[rand], array[i]]
		}
		return array;
	}
	static shuffleNew = arr => this.shuffle(arr.slice());
}

class SUtils {
	static trimAndFill = (s, n, c) => s.length > n ? s.substring(0, n) : s.padEnd(n, c);
	static sentenceCase = s => s.replaceAll('_', ' ').replace(/(?<![A-Z\s])(?<=.)([A-Z])/g, ' $1');
	static snakeCase = s => SUtils.sentenceCase(s?.trim()).replaceAll(/\s+/g, '_').toUpperCase();
	static camelCase = s => s.replace(/^(\w)/g, (_, c) => c.toLowerCase());
	static capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
	static strip = (s) => SUtils.normalize(s)?.split("/")[0]?.trim().replace(/\W+/g, "_").toLowerCase();
	static normalize = (s) => s?.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

	static trim = (s) => s?.trim();

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

const Identity = o => o;

class Sort {
	static alpha = (func = Identity) => (o1, o2) => (func(o1) || '').localeCompare(func(o2) || '');
	static asc = (func = Identity) => (o1, o2) => (func(o1) || 0) - (func(o2) || 0);
	static multiSort = (...functions) => (a, b) => {
		for (let fn of functions) {
			const result = fn(a, b);
			if (result !== 0) return result;
		}
		return 0;
	};
}

class Reduce {
	static with = (func) => (a, c) => { func(a, c); return a; }
}

class Nodes extends Array {
	querySelector(query) {
		return this.find(e => e.matches(query))
	}
	querySelectorAll(query) {
		return this.filter(e => e.matches(query))
	}
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
		document.querySelectorAll(targetSelector)
			.forEach(element => callback(element, observer));
	}

	static nodes = new Nodes();
	static createElement(e) {
		const node = document.createElement(e._type);
		Dom.nodes.push(node);
		e.node = node;
		node.source = e;

		if (e.id) {
			node.id = e.id;
		}
		if (e.innerText) { node.textContent = e.innerText; }
		if (e.value) { node.value = e.value; }
		if (e.type) { node.type = e.type; }
		if (e.class) {
			const classes = (Array.isArray(e.class) ? e.class.join(" ") : e.class).split(/\s+/);
			node.classList.add(...classes.map(SUtils.trim).filter(Boolean));
		}
		if (e.attribute) {
			Object.entries(e.attribute).forEach(([k, v]) => node.setAttribute(k, v));
		}
		if (e.event) {
			Object.entries(e.event).forEach(([k, v]) => node.addEventListener(k, (ev) => v(ev, node), false));
		}
		if (e.children) {
			(Array.isArray(e.children) ? e.children : [e.children])
				.filter(Boolean)
				.forEach((child) => node.appendChild(Dom.createElement(child)));
		}
		if (e.style) {
			Object.entries(e.style).forEach(([k, v]) => {
				const important = v.includes('!important') ? 'important' : '';
				node.style.setProperty(k, v.replace('!important', '').trim(), important);
			});
		}
		if (e.function) {
			Object.entries(e.function).forEach(([k, v]) => node[k] = v);
		}
		return node;
	}

	static Elem = class {
		get _type() { return this.constructor.name; }
		static with(obj) {
			return Object.assign(new this(), obj);
		}
		create(profile = false) {
			if (profile) { console.profile(profile) };
			const created = Dom.createElement(this);
			if (profile) { console.profileEnd(profile) };
			return created;
		}
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

	static TextElements = "Div,Span,P,Small,Menu";
	static HeadingElements = "H1,H2,H3,H4,H5,H6,Hgroup";
	static InlineTextElements = "I,Strong,Em,Mark,Abbr,Code,Pre,Kbd,Samp";
	static SectionElements = "Header,Footer,Article,Aside,Section";
	static ListElements = "UL,OL,LI,Nav";
	static FormElements = "Form,Input,Textarea,Button,Label,Select,Option_";
	static MediaElements = "Img,Audio_,Video";
	static TableElements = "Table,TR,TD,TH,TBody,Tfoot,Thead,ColGroup,Col,Caption";
	static InteractiveElements = "Button,A";
	static EmbeddedElements = "Iframe,Canvas,Svg";
	static MiscellaneousElements = "HR,BR,Style,Blockquote,Cite,Sup,Sub";
	static SvgBaseElements = "Svg,Defs,G,Path,Line,Rect,Circle,Ellipse,Polygon";
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
		Dom.MiscellaneousElements,
		Dom.SvgBaseElements,
		Dom.HeadElements,
	].join().split(","));

	// 	static clazz = (name, cls) => eval(`class ${name} extends ${cls} {};`);
	static clazz = (name, cls) => ({ [name]: class extends cls { } })[name];
	static evalNode = node => window[node] = Dom.clazz(node, Dom.Elem);

	static evalNodes = nodes => nodes.forEach(Dom.evalNode);
}

Dom.evalNodes(Dom.AllElements);
