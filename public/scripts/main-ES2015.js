'use strict';

(() => {
	// Variables
	const BP_VIEWPORT_MOBILE = 820;
	const NAV_JSON = './api/nav.json';
	let navigationSection = document.querySelector('.js-nav-linkbar');

	// Class
	class NavigationMenu {
		// Constructor
		constructor(url, id) {
			this.url = url;
			this.id = id;
		}

		// Methods to create nodes
		createNode(el) {
			return document.createElement(el);
		}
		createTextNode(label) {
			return document.createTextNode(label);
		}
		appendNode(parent, el) {
			return parent.appendChild(el);
		}

		// Methods to remove open classes
		removeActiveClass() {
			let children = this.id.childNodes;
			
			children.forEach(function(item) {
				item.classList.remove('nav__list-item--active');
			});
		}
		removeAllOpenClasses() {
			this.removeActiveClass();

			document.querySelector('.js-body-mask').classList.remove('body__mask--fade');
			document.querySelector('.js-nav-copyright').classList.remove('slide-left');
			document.querySelector('.js-nav-linkbar').classList.remove('nav__linkbar--opened');
			document.querySelector('.js-nav-hamburger').classList.remove('nav__hamburger--opened');
			document.querySelector('.js-nav-logo').classList.remove('slide-left');
			document.querySelector('.js-body-container').classList.remove('h-overflow-hidden');
		}

		// Use Fetch API to get JSON via promise and builds primary/secondary navigation
		init() {
			fetch(this.url)
				.then(response => response.json())
				.then(data => {
					let itemObject = data.items;

					/* Populate nodes */
					return itemObject.map(itemObject => {
						let li = this.createNode('li'),
							a = this.createNode('a'),
							span = this.createNode('span'),
							innerHTML = this.createTextNode(itemObject.label);

						this.appendNode(this.id, li).setAttribute('class', 'nav__list-item');

						if (itemObject.items.length === 0) {
							a.setAttribute('href', itemObject.url);
							this.appendNode(li, a).setAttribute('class', 'nav__list-link');
							this.appendNode(a, innerHTML);
						} else {
							this.appendNode(li, span).setAttribute('class', 'nav__list-label nav__chevron-arrow');
							this.appendNode(span, innerHTML);

							let subItemObject = itemObject.items;
							let ol = this.createNode('ol');
							ol.setAttribute('class', 'nav__sub-menu');
							this.appendNode(li, ol);

							let buildSubOL = (secondary, ol) => {
								/* Populate secondary navigation */
								return secondary.map(secondary => {
									let li = this.createNode('li'),
										a = this.createNode('a'),
										span = this.createNode('span'),
										innerHTML = this.createTextNode(secondary.label);

									this.appendNode(ol, li).setAttribute('class', 'nav__sublist-item');
									a.setAttribute('href', secondary.url);
									this.appendNode(li, a).setAttribute('class', 'nav__sublist-link');
									this.appendNode(a, innerHTML);
								});
							};

							buildSubOL(subItemObject, ol);
						}
					});
				})
				.catch(function(error) {
					console.log(error);
				});  
		}

		listenForEvents() {
			// Event listeners
			window.addEventListener('resize', () => {
				if (window.innerWidth < BP_VIEWPORT_MOBILE) {
					this.removeAllOpenClasses();
				} else {
					document.querySelector('.js-nav-linkbar').classList.remove('h-mobile-only');
					document.querySelector('.js-nav-linkbar').classList.add('h-desktop-only');
				}
			});

			document.querySelector('.js-body-mask').addEventListener('click', () => {
				this.removeAllOpenClasses();
			});

			document.querySelector('.js-nav-hamburger').addEventListener('click', () => {
				if (document.querySelector('.js-nav-hamburger').classList.contains('nav__hamburger--opened')) {
					this.removeAllOpenClasses();
				} else {
					document.querySelector('.js-body-container').classList.add('h-overflow-hidden');
					document.querySelector('.js-nav-logo').classList.add('slide-left');
					document.querySelector('.js-nav-hamburger').classList.add('nav__hamburger--opened');
					document.querySelector('.js-nav-copyright').classList.add('slide-left');
					document.querySelector('.js-nav-linkbar').classList.remove('h-desktop-only');
					document.querySelector('.js-nav-linkbar').classList.add('nav__linkbar--opened');
					document.querySelector('.js-nav-linkbar').classList.add('h-mobile-only');
					document.querySelector('.js-body-mask').classList.add('body__mask--fade');
				}
			});

			this.id.addEventListener('click', e => {
				let parentLI = e.target.parentElement;

				if (parentLI.classList.contains('nav__list-item--active')) {
					this.removeActiveClass();
				} else {
					this.removeActiveClass();
					if (parentLI.childElementCount > 1) {
						document.querySelector('.js-body-mask').classList.add('body__mask--fade');

						parentLI.classList.add('nav__list-item--active');
					} else {
						this.removeAllOpenClasses();
					}
				}
			});
		}
	}

	// Initiate navigation build
	let navigation = new NavigationMenu(NAV_JSON, navigationSection);
	navigation.init();
	navigation.listenForEvents();
})();