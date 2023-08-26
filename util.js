class Utils {
	static PRC = (w, m) => m / 100 * w;
	static toX = (i, w) => i % w;
	static toY = (i, w) => ~~(i / w);
	static toXY = (i, w) => ({ x: toX(i, w), y: toY(i, w) });
	static toID = (x, y, w) => y * w + x;
	static toID_O = (xy, w) => xy.y * w + xy.x;
	static toID_A = (xy, w) => xy[1] * w + xy[0];
	static clone = o => JSON.parse(JSON.stringify(o));
	static createElement = (e) => {
		const node = document.createElement(e.type);
		!e.id || (node.id = e.id);
		!e.children ||
			e.children.forEach((c) => {
				node[c.class] = Utils.createElement(c);
				node.appendChild(node[c.class]);
			});
		!e.innerText || (node.innerText = e.innerText);
		!e.class || node.classList.add(...e.class);
        	!e.attrs || Object.entries(e.attrs).forEach(([k, v]) => node.setAttribute(k, v));
		!e.events || Object.entries(e.events).forEach(([k, v]) => node.addEventListener(k, (e) => v(e, node), false));
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

	static event = new Event("utils-loaded");
	static loaded() {
		document.dispatchEvent(Utils.event);
	}
}
