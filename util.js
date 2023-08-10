class Utils {
	static toX = (i, w) => i % w
	static toY = (i, w) => ~~(i / w)
	static toXY = (i, w) => ({ x: toX(i, w), y: toY(i, w) })
	static toID = (x, y, w) => y * w + x
	static toID_O = (xy, w) => xy.y * w + xy.x
	static toID_A = (xy, w) => xy[1] * w + xy[0]
	static clone = o => JSON.parse(JSON.stringify(o))

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
