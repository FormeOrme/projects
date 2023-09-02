class Utils {
	/* STRING TO HSL COLOR */
	static toH = (s, d = 210, k = 6, n = 13) => `hsla(${(Array.from(s).reduce((a, c, i) => a + c.charCodeAt() * n * (k + i), d) % 360)}, 72%, 65%, 1)`;

	/* ADD STYLE NODE UTIL */
	static addStyleNode = (s) => {
		let style = document.createElement('style');
		document.head.appendChild(style);
		style.appendChild(document.createTextNode(s));
	}

	static djb2(str) {
		let hash = 5381;
		for (let i = 0; i < str.length; i++) {
			hash = (hash * 33) ^ str.charCodeAt(i);
		}
		return hash >>> 0;
	}

	static fnv1a(str) {
		let hash = 2166136261;
		for (let i = 0; i < str.length; i++) {
			hash ^= str.charCodeAt(i);
			hash *= 16777619;
		}
		return hash >>> 0;
	}

	static prc = (current, max) => Utils.normalize(current, max) * 100;
	static normalize = (current, max) => current / max;

	static toX = (i, w) => i % w;
	static toY = (i, w) => ~~(i / w);
	static toXY = (i, w) => ({ x: toX(i, w), y: toY(i, w) });
	static toID = (x, y, w) => y * w + x;
	static toID_O = (xy, w) => toID(xy.x, xy.y, w);
	static toID_A = (xy, w) => toID(xy[0], xy[1], w);

	static clone = o => Object.setPrototypeOf(JSON.parse(JSON.stringify(o)), o.constructor.prototype);
	static createElement = (e) => {
		const node = document.createElement(e.type);
		!e.id || (node.id = e.id);
		!e.innerText || (node.innerText = e.innerText);
		!e.value || (node.value = e.value);
		if (!!e.children) {
			(Array.isArray(e.children) ? e.children : [e.children]).forEach((c) => {
				node.appendChild(Utils.createElement(c));
			});
		}
		if (!!e.class) {
			e.class = Array.isArray(e.class) ? e.class : e.class.trim().split(" ");
			node.classList.add(...e.class);
		}
		!e.attribute || Object.entries(e.attribute).forEach(([k, v]) => node.setAttribute(k, v));
		!e.event || Object.entries(e.event).forEach(([k, v]) => node.addEventListener(k, (e) => v(e, node), false));
		node.custom = e.custom;
		return node;
	};

	static monitor(parent, target, callback) {
		var mObs = new window.MutationObserver(() => {
			if (!!document.querySelector(target)) {
				callback();
				console.log("called", parent, target)
				mObs.disconnect();
			}
		})
		const observe = () => mObs
			.observe(document.querySelector(parent),
				{ childList: true, subtree: true });
		observe();
		window.addEventListener("animationend", e => { observe(); });
	}

	static loaded() {
		document.dispatchEvent(new Event("utils-loaded"));
	}

	static Elem = class {
		get type() {
			return this.constructor.name;
		}
		static with(obj) {
			return Object.assign(eval(`new ${this.name}()`), obj);
		}
		static create() {
			return this.with().create();
		}
		create() {
			return Utils.createElement(this);
		}
		toJSON() {
			return {
				type: this.type,
				...this
			}
		}
	}
}

class Table extends Utils.Elem { }
class THead extends Utils.Elem { }
class TBody extends Utils.Elem { }
class TFoot extends Utils.Elem { }
class TR extends Utils.Elem { }
class TD extends Utils.Elem { }
class TH extends Utils.Elem { }
class Div extends Utils.Elem { }
class Input extends Utils.Elem { }
class Span extends Utils.Elem { }
class Button extends Utils.Elem { }
class TextArea extends Utils.Elem { }
class BR extends Utils.Elem { }
class Img extends Utils.Elem { }

Utils.loaded();
