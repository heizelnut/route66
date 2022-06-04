window.R = {
	_routes: {},
	_views: [],
	_initialized: false,
	_selected: "",
	_defaultHash: null,
	init: function(_defaultHash = "start") {
		this._defaultHash = _defaultHash;
		this._selected = this._sanitizeHash(document.location.hash);
		this._updateDOM();
		window.addEventListener("hashchange", e => {
			e.preventDefault();
			R.go(document.location.hash);
		});
		this._initialized = true;
	},
	_sanitizeHash: function(h) {
		if (h == "" || h == "#") { h = this._defaultHash; }
		if (h[0] === '#') { h = h.substring(1) }
		return h;
	},
	_updateDOM: function() {
		let _views = Array.from(document.querySelectorAll("[id][route]"));
		_views.forEach(v => { v.style.display = "none"; v.classList.remove("selected"); })
		document.location.hash = this._selected;
		let e = document.getElementById(this._selected);
		if (e !== null) {
			e.classList.add("selected");
			e.style.display = "block";
			document.title = e.getAttribute("title") || document.title;
		}
		return e;
	},
	on: function(hash, cb) {
		this._routes[this._sanitizeHash(hash)] = cb;
	},
	go: function(hash) {
		if (!this._initialized) { return }
		this._selected = this._sanitizeHash(hash);
		let view = this._updateDOM();
		if (this._routes.hasOwnProperty(this._selected)) {
			this._routes[this._selected](view);
		}
	},
	re: function(hash) {
		history.replaceState({}, "", "#" + this._sanitizeHash(hash));
		this.go(hash);
	}
};
