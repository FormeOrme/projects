class LoStMan /* Local Storage Manager */ {
	static getObj(id, proto) {
		const parsed = JSON.parse(localStorage.getItem(id));
		return !proto ? parsed : Object.setPrototypeOf(parsed, proto);
	}
	static setObj(id, o) {
		localStorage.setItem(id, JSON.stringify(o))
	}

	static remove(id) {
		localStorage.removeItem(id);
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
		return IdUtils.ID.toString(16);
	}

	static toX = (i, w) => i % w;
	static toY = (i, w) => ~~(i / w);
	static toXY = (i, w) => ({
		x: IdUtils.toX(i, w),
		y: IdUtils.toY(i, w)
	});
	static toID = (x, y, w) => Math.floor(y) * w + Math.floor(x);
	static toID_O = ({ x, y }, w) => IdUtils.toID(x, y, w);
	static toID_A = (xy, w) => IdUtils.toID(xy[0], xy[1], w);
}

const Identity = o => o;

class Utils {

	static tween = (v, r1, r2, m1, m2) => m1 + (m2 - m1) * ((v - r1) / (r2 - r1));

	static rpt({ a, b, c, d }) {
		if (!a) return (b * c) / d;
		if (!b) return (a * d) / c;
		if (!c) return (a * d) / b;
		if (!d) return (b * c) / a;
	}

	static normalize = (current, max) => current / max;
	static prc = (current, max) => Utils.normalize(current, max) * 100;

	static kvMap = (arr, k, v) => Utils.vkMap(arr, v, k);
	static vkMap = (arr, v = Identity, k = o => o.id) =>
		Object.fromEntries(arr.map(c => [k(c), v(c)]));

	static fetchJson = (o) => fetch(o.url, o.options)
		.then(r => r.json())
		.then(r => ({ ...o, json: r }));

	static fetchAll = (o) => Promise.all(o.map(Utils.fetchJson))
		.then(c => Utils.vkMap(c, o => o.json))

	static clone = o => Object.setPrototypeOf(JSON.parse(JSON.stringify(o)), o.constructor.prototype);

	static range = (n, fn = (_, i) => i) => Array.from({ length: n }, fn);
	static deduplicate = a => [...new Set(a)];
	static shuffle = (array) => {
		for (var i = array.length - 1; i > 0; i--) {
			var rand = Math.floor(Math.random() * (i + 1));
			[array[i], array[rand]] = [array[rand], array[i]]
		}
		return array;
	}
	static shuffleNew = arr => this.shuffle([...arr]);
	static randomElement = arr => arr[(Math.random() * arr.length) | 0];
	static chance = c => Math.random() * 100 < c;

	static get location() { return new URL(window.location.href) }

	static deepMerge(target, source) {
		for (const key of Object.keys(source)) {
			if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
				target[key] = Utils.deepMerge(target[key] || {}, source[key]);
			} else {
				target[key] = source[key];
			}
		}
		return target;
	};

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
}

class MUtils {
	static circleIntersectionPoints({
		x1, y1, r1,
		x2, y2, r2,
		cx, cy }) {

		// Calculate the distance between the centers
		const dx = x2 - x1;
		const dy = y2 - y1;
		const d2 = dx ** 2 + dy ** 2; // Squared distance for efficiency
		const d = d2 ** (1 / 2);

		// Check if there are no intersections
		if (d > r1 + r2 || d < (r1 - r2) ** 2 || d === 0) {
			return []; // No intersection
		}

		// Calculate the distance from the first circle's center to the midpoint between the intersection points
		const r1Sq = r1 ** 2;
		const r2Sq = r2 ** 2;
		const a = (r1Sq - r2Sq + d2) / (2 * d);

		// Find the midpoint
		const xm = x1 + (dx * a) / d;
		const ym = y1 + (dy * a) / d;

		// Calculate the height of the intersection points above or below the line
		const h2 = r1Sq - a ** 2; // h squared for efficiency
		const h = h2 > 0 ? h2 ** (1 / 2) : 0; // Ensure h2 is non-negative to avoid NaN

		// The offsets from the midpoint
		const rx = -(dy * h) / d;
		const ry = (dx * h) / d;

		// Intersection points
		const p1x = xm + rx, p1y = ym + ry;
		const p2x = xm - rx, p2y = ym - ry;

		// Precompute squared distances to the center (cx, cy) for sorting
		const d1Sq = (p1x - cx) ** 2 + (p1y - cy) ** 2;
		const d2Sq = (p2x - cx) ** 2 + (p2y - cy) ** 2;

		// Return points sorted by squared distance to avoid square root computation
		return d1Sq <= d2Sq
			? [{ x: p1x, y: p1y }, { x: p2x, y: p2y }]
			: [{ x: p2x, y: p2y }, { x: p1x, y: p1y }];
	}
	static random(l) { return Math.floor(Math.random() * l) }
}

class Filter {
	static first = (o, i) => i === 0;
	static last = (o, i, a) => i === a.length - 1;
	static notNull = Boolean;
	static not = (f) => (...a) => !f(...a);
}

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
	static with = (func) => (a, c, i, f) => {
		func(a, c, i, f);
		return a;
	}

	static combineN = (N) => Reduce.with((acc, _, index, full) => {
		let v = []
		const fn = (i) => {
			v.push(full[i])
			if (v.length == N) {
				acc.push([...v]);
			} else {
				for (let j = i + 1; j < full.length; j++) {
					fn(j)
				}
			}
			v.pop();
		}
		fn(index)
	})
	static combine = Reduce.combineN(2)
	static fullCombine = Reduce.with((a, _, i, f) => {
		const rl = a.length;
		for (let j = 0; j < Math.pow(2, i); j++) {
			const c = [];
			for (let k = 0; k < f.length; k++) {
				if ((rl + j + 1) & (1 << k)) {
					c.push(f[k]);
				}
			}
			a.push(c);
		}
	})

	static permutations = (acc, current) => {
		if (acc.length === 0) {
			return [[current]];
		}
		const newPermutations = [];
		for (const perm of acc) {
			for (let i = 0; i <= perm.length; i++) {
				const newPerm = [...perm.slice(0, i), current, ...perm.slice(i)];
				newPermutations.push(newPerm);
			}
		}
		return newPermutations;
	};
}

class CacheMap extends Map {
	fetch(key, func) {
		return this.get(key) || this.set(key, func()).get(key);
	}
}

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
	static nodes = new Proxy(new Nodes(), {
		get(target, key) {
			return target[key] ?? target.getElementById(key);
		}
	});

	static createElement(e, namespace) {
		namespace = namespace || e.namespace;
		const node = namespace
			? document.createElementNS(namespace, e._type)
			: document.createElement(e._type);

		e.node = node;
		node.source = e;

		if (e.id) node.id = e.id;
		if (e.innerText !== undefined) node.textContent = e.innerText;
		if (e.text !== undefined) node.textContent = e.text;
		if (e.value != undefined) node.value = e.value;
		if (e.type) node.type = e.type;
		if (e.editable) node.contentEditable = e.editable;

		if (e.class) {
			const classList = Array.isArray(e.class) ? e.class.join(" ") : e.class;
			node.className = classList.trim();
		}
		if (e.attribute) {
			for (let k in e.attribute) {
				if (e.attribute[k] !== undefined) {
					node.setAttribute(k, e.attribute[k]);
				}
			}
		}
		if (e.event) {
			for (let k in e.event) {
				node.addEventListener(k, e.event[k].bind(null, node), false);
			}
		}
		if (e.children) {
			const children = Array.isArray(e.children)
				? e.children.filter(Boolean)
				: (e.children ? [e.children] : []);

			for (let i = 0, len = children.length; i < len; i++) {
				node.appendChild(Dom.createElement(children[i], namespace));
			}
		}
		if (e.style) {
			for (let k in e.style) {
				const val = e.style[k];
				const important = val.includes('!important') ? 'important' : '';
				node.style.setProperty(k, val.replace('!important', '').trim(), important);
			}
		}
		if (e.function) {
			for (let k in e.function) {
				node[k] = e.function[k];
			}
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

	static Elem = class {
		get _type() { return this.constructor.name.replace('_', '').toLowerCase(); }
		static with(obj) {
			return Object.assign(new this(), obj);
		}
		and(obj) {
			const updated = Object.create(Object.getPrototypeOf(this));
			return Utils.deepMerge(Object.assign(updated, this), obj);
		}

		create({ profile, namespace } = {}) {
			if (profile) { console.profile(profile) };
			const created = Dom.createElement(this, namespace);
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
		addChild(child) {
			this.children = Array.isArray(this.children) ? this.children : (this.children ? [this.children] : []);
			this.children.push(child);
			return this;
		}
	}

	// 	static clazz = (name, cls) => eval(`class ${name} extends ${cls} {};`);
	static clazz = (name, cls) => ({
		[name]: class extends cls { }
	})[name];
	static evalNode = node => window[node] = Dom.clazz(node, Dom.Elem);

	static evalNodes = nodes => nodes.forEach(Dom.evalNode);

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
}

if (typeof window !== 'undefined') {
	Dom.evalNodes(Dom.AllElements);
} else {
	module.exports = ({ Sort });
}
