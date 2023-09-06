class Utils {
	static toH = (s, d = 210, k = 6, n = 13) => `hsla(${(Array.from(s).reduce((a, c, i) => a + c.charCodeAt() * n * (k + i), d) % 360)}, 72%, 65%, 1)`;

	static addStyleNode = s => (document.head.appendChild(document.createElement('style')).appendChild(document.createTextNode(s)));

	static kvMap = (arr, k, v) => Utils.vkMap(arr, v, k);
	static vkMap = (arr, v = o => o, k = o => o.id) =>
		Object.fromEntries(arr.map(c => [k(c), v(c)]));

	static fetchJson = (o) => fetch(o.url)
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

	static context = {};
	static createElement(e) {
		const node = e.node = document.createElement(e.type);
		!!e.id && ((node.id = e.id) && (Utils.context[e.id] = e));
		!!e.innerText && (node.textContent = e.innerText);
		!!e.value && (node.value = e.value);
		!!e.class && node.classList.add(...Array.isArray(e.class) ? e.class : e.class.trim().split(" "));
		!!e.attribute && Object.entries(e.attribute).forEach(([k, v]) => node.setAttribute(k, v));
		!!e.event && Object.entries(e.event).forEach(([k, v]) => node.addEventListener(k, (e) => v(e, node), false));
		!!e.children && (Array.isArray(e.children) ? e.children : [e.children]).forEach((c) => {
			node.appendChild(Utils.createElement(c));
		});
		node.custom = e.custom;
		return node;
	}

	static monitor(parent, target, callback) {
		var mObs = new window.MutationObserver(() => {
			if (!!document.querySelector(target)) {
				callback();
				console.log("called", parent, target);
				mObs.disconnect();
			}
		})
		const observe = () => mObs
			.observe(document.querySelector(parent),
				{ childList: true, subtree: true });
		observe();
		window.addEventListener("animationend", observe);
	}

	static hideClass = "hide";
	static Elem = class {
		get type() { return this.constructor.name; }
		static with(obj) {
			return Object.assign(new this(), obj);
		}
		create() { return Utils.createElement(this); }
		toJSON() { return ({ type: this.type, ...this }); }
		show() { this.node.classList.remove(Utils.hideClass); }
		hide() { this.node.classList.add(Utils.hideClass); }
	}
	static load() { document.dispatchEvent(new Event("utils-loaded")); }
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

Utils.load();// must be last line
