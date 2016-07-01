var app = angular.module('EWapp', ['ui.router', 'appCtrl']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: '/dist/_main.html',
			// templateUrl: '/native/dist/_event.html',
			pageTitle: 'Команда Evil Wheels',
			controller: 'homeCtrl'
			// controller: 'eventCtrl'
		})
		.state('about', {
			url: '/about',
			templateUrl: '/dist/_about.html',
			pageTitle: 'О команде Evil Wheels',
			controller: 'aboutCtrl'
		})
		.state('event', {
			url: '/events/:eventName',
			templateUrl: '/dist/_event.html',
			pageTitle: 'Мероприятие Evil Wheels',
			controller: 'eventCtrl'
		})
		// .state('modal', {
		// 	views: {
		// 		'modal': {
		// 			templateUrl: '/native/dist/_modal.html'
		// 		}
		// 	},
		// 	onEnter: function($state) {
		// 		$(window).on('keyup', function(e) {
		// 			if(e.keyCode == 27) {
		// 				$(document).off('keyup');
		// 				$state.go('portfolio');
		// 			}
		// 		});
		//
		// 		$(document).on('click', '.modal, .modal > .view > .header > .close', function() {
		// 			$state.go('portfolio');
		// 		});
		//
		// 		$(document).on('click', '.modal > .view', function(e) {
		// 			e.stopPropagation();
		// 		});
		// 	},
		// 	abstract: true
		// })
		// .state('modal.view', {
		// 	url: '/app/:appName',
		// 	pageTitle: '',
		// 	views: {
		// 		'modal': {
		// 			templateUrl: '/native/dist/_modalView.html'
		// 		}
		// 	}
		// });
	$locationProvider.html5Mode(true);
});

var appCtrl = angular.module('appCtrl', []);

appCtrl.controller('homeCtrl', ['$scope', function($scope) {
	angular.element(document).ready(function() {
		// $(".bxslider").bxSlider();
		$(".start").css({"height":$(window).height()});

		$(".slider").touchSlider({
			roll: true,
			flexible: true,
			// view: 1,
			page: 2,
			btn_prev: $("#prev"),
			btn_next: $("#next"),
			// transition: true,
			sidePage: true
			// autoplay: {
			// 	enable: false
			// }
		});

		var map = L.map('trailMap', {scrollWheelZoom:false}).setView([43.20, 43.63], 8); // 43.50 43.63 13


		L.tileLayer('https://api.mapbox.com/styles/v1/tamik/cipl12pqa0008dpm316s85ki9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGFtaWsiLCJhIjoiY2lwajBpYzRyMDA1M3ZibnQybzdhaXUzMSJ9.nGA_WBvVuRNdB4fNde1sBQ', {
			attribution: '© <a href="http://mapbox.com">Mapbox</a>',
			maxZoom: 18
		}).addTo(map);

		var markers = new L.FeatureGroup();

		// var atv = omnivore.kml('/data/ATV.kml').addTo(trailMap);
		// var moto = omnivore.kml('/data/Enduro.kml').addTo(trailMap);
		// var mtb = omnivore.kml('/data/Armkhi.kml').addTo(trailMap);

		// atv.on('click', function() {
		// 	alert(atv.getLatLng());
		// });

		var MTBicon = L.icon({
			iconUrl: '/native/mapControls/MTBtrail.png',
			iconSize: [64, 64],
			iconAnchor: [32, 32]
		});

		var MOTOicon = L.icon({
			iconUrl: '/native/mapControls/MOTOtrail.png',
			iconSize: [64, 64],
			iconAnchor: [32, 32]
		});

		var ATVicon = L.icon({
			iconUrl: '/native/mapControls/ATVtrail.png',
			iconSize: [64, 64],
			iconAnchor: [32, 32]
		});

		var armkhi = new L.marker([42.80664800, 44.70481700], {icon: MTBicon});
		var elbrus = new L.marker([43.26601670, 42.48405440], {icon: MOTOicon});
		var nalchik = new L.marker([43.46120250, 43.68147440], {icon: ATVicon});

		armkhi.on('click', function() {
			displayModal("arkmhi");
		});

		var mtb = new L.layerGroup([armkhi]);
		var moto = new L.layerGroup([elbrus]);
		var atv = new L.layerGroup([nalchik]);

		// mtb.addTo(map);
		// moto.addTo(map);
		// atv.addTo(map);
		map.addLayer(mtb);
		map.addLayer(moto);
		map.addLayer(atv);

		// arkmhi.on('click', function() {
		// 	trailMap.setView(this.getLatLng(), 15);
		// });
		//
		// enduro.on('click', function() {
		// 	trailMap.setView(this.getLatLng(), 15);
		// });
		//
		// atvm.on('click', function() {
		// 	trailMap.setView(this.getLatLng(), 13);
		// });

		$("#trailsCat").change(function() {
			var category = $("#trailsCat").val();

			switch(category) {
				case "MTB":
					map.addLayer(mtb);
					map.removeLayer(moto);
					map.removeLayer(atv);
				break;
				case "MOTO":
					map.removeLayer(mtb);
					map.addLayer(moto);
					map.removeLayer(atv);
				break;
				case "ATV":
					map.removeLayer(mtb);
					map.removeLayer(moto);
					map.addLayer(atv);
				break;
				default:
					mtb.addTo(map);
					moto.addTo(map);
					atv.addTo(map);
				break;
			}
		});

		function displayModal(value) {
			$modal = $(".modalComponent");
			$modalView = $(".viewComponent");

			// $.ajax({
			// 	url: '/data/trailsInfo/' + value + ".html",
			// 	type: "GET",
			// 	error: function() {
			// 		$modalView.html("/");
			// 	},
			// 	success: function(data) {
			// 		$modalView.html(data);
			// 	}
			// });

			$modal.css({"display":"table"});

			$modalView.html(value);
		}
	});
}]);

appCtrl.controller('eventCtrl', ['$scope', function($scope) {
	angular.element(document).ready(function() {
		$grid = $(".grid").masonry({
			itemSelector: '.item',
			columnWidth: '.sizer',
			gutter: '.gutter',
			percentPosition: true
		});

		$grid.imagesLoaded().progress(function() {
			$grid.masonry('layout');
		});

		/* --- */

		var initPhotoSwipeFromDOM = function(gallerySelector) {
			var parseThumbnailElements = function(el) {
				var thumbElements = el.childNodes,
					numNodes = thumbElements.length,
					items = [],
					el,
					childElements,
					thumbnailEl,
					size,
					item;
				for(var i = 0; i < numNodes; i++) {
					el = thumbElements[i];
					if(el.nodeType !== 1) {
					  continue;
					}
					childElements = el.children;
					size = el.getAttribute('data-size').split('x');
					item = {
						src: el.getAttribute('href'),
						w: parseInt(size[0], 10),
						h: parseInt(size[1], 10)
					};
					item.el = el;
					if(childElements.length > 0) {
					  item.msrc = childElements[0].getAttribute('src');
					  if(childElements.length > 1) {
						  item.title = childElements[1].innerHTML;
					  }
					}
					item.o = {
						src: item.src,
						w: item.w,
						h: item.h
					};
					items.push(item);
				}
				return items;
			};
			var closest = function closest(el, fn) {
				return el && ( fn(el) ? el : closest(el.parentNode, fn) );
			};
			var onThumbnailsClick = function(e) {
				e = e || window.event;
				e.preventDefault ? e.preventDefault() : e.returnValue = false;
				var eTarget = e.target || e.srcElement;
				var clickedListItem = closest(eTarget, function(el) {
					return el.tagName === 'A';
				});
				if(!clickedListItem) {
					return;
				}
				var clickedGallery = clickedListItem.parentNode;
				var childNodes = clickedListItem.parentNode.childNodes,
					numChildNodes = childNodes.length,
					nodeIndex = 0,
					index;
				for (var i = 0; i < numChildNodes; i++) {
					if(childNodes[i].nodeType !== 1) {
						continue;
					}
					if(childNodes[i] === clickedListItem) {
						index = nodeIndex;
						break;
					}
					nodeIndex++;
				}
				if(index >= 0) {
					openPhotoSwipe( index, clickedGallery );
				}
				return false;
			};
			var photoswipeParseHash = function() {
				var hash = window.location.hash.substring(1),
				params = {};
				if(hash.length < 5) {
					return params;
				}
				var vars = hash.split('&');
				for (var i = 0; i < vars.length; i++) {
					if(!vars[i]) {
						continue;
					}
					var pair = vars[i].split('=');
					if(pair.length < 2) {
						continue;
					}
					params[pair[0]] = pair[1];
				}
				if(params.gid) {
					params.gid = parseInt(params.gid, 10);
				}
				return params;
			};
			var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
				var pswpElement = document.querySelectorAll('.pswp')[0],
					gallery,
					options,
					items;
				items = parseThumbnailElements(galleryElement);
				options = {
					galleryUID: galleryElement.getAttribute('data-pswp-uid'),
					getThumbBoundsFn: function(index) {
						var thumbnail = items[index].el.children[0],
							pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
							rect = thumbnail.getBoundingClientRect();
						return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
					},
					addCaptionHTMLFn: function(item, captionEl, isFake) {
						if(!item.title) {
							captionEl.children[0].innerText = '';
							return false;
						}
						captionEl.children[0].innerHTML = item.title +  '<br/><small>Фото: ' + item.author + '</small>';
						return true;
					},

				};
				if(fromURL) {
					if(options.galleryPIDs) {
						for(var j = 0; j < items.length; j++) {
							if(items[j].pid == index) {
								options.index = j;
								break;
							}
						}
					} else {
						options.index = parseInt(index, 10) - 1;
					}
				} else {
					options.index = parseInt(index, 10);
				}
				if( isNaN(options.index) ) {
					return;
				}
				options.mainClass = 'pswp--minimal--dark';
				options.barsSize = {top:0,bottom:0};
				options.captionEl = false;
				options.fullscreenEl = false;
				options.shareEl = false;
				options.zoomEl = false;
				options.counterEl = false;
				options.bgOpacity = 0.75;
				options.tapToClose = true;
				options.tapToToggleControls = false;
				if(disableAnimation) {
					options.showAnimationDuration = 0;
				}
				gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
				var realViewportWidth,
					useLargeImages = false,
					firstResize = true,
					imageSrcWillChange;
				gallery.listen('beforeResize', function() {
					var dpiRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
					dpiRatio = Math.min(dpiRatio, 2.5);
					realViewportWidth = gallery.viewportSize.x * dpiRatio;
					if(realViewportWidth >= 1200 || (!gallery.likelyTouchDevice && realViewportWidth > 800) || screen.width > 1200 ) {
						if(!useLargeImages) {
							useLargeImages = true;
							imageSrcWillChange = true;
						}
					} else {
						if(useLargeImages) {
							useLargeImages = false;
							imageSrcWillChange = true;
						}
					}
					if(imageSrcWillChange && !firstResize) {
						gallery.invalidateCurrItems();
					}
					if(firstResize) {
						firstResize = false;
					}
					imageSrcWillChange = false;

				});
				gallery.listen('gettingData', function(index, item) {
					if( useLargeImages ) {
						item.src = item.o.src;
						item.w = item.o.w;
						item.h = item.o.h;
					} else {
						item.src = item.m.src;
						item.w = item.m.w;
						item.h = item.m.h;
					}
				});
				gallery.init();
			};
			var galleryElements = document.querySelectorAll( gallerySelector );
			for(var i = 0, l = galleryElements.length; i < l; i++) {
				galleryElements[i].setAttribute('data-pswp-uid', i+1);
				galleryElements[i].onclick = onThumbnailsClick;
			}
			var hashData = photoswipeParseHash();
			if(hashData.pid && hashData.gid) {
				openPhotoSwipe( hashData.pid,  galleryElements[ hashData.gid - 1 ], true, true );
			}
		}

		/* --- */

		initPhotoSwipeFromDOM('.gallery');
	});
}]);
// appCtrl.controller('appCtrl', ['$scope', function($scope) {}]);
// appCtrl.controller('aboutCtrl', ['$scope', '$http', 'aboutCache', function($scope, $http, aboutCache) {
// appCtrl.controller('aboutCtrl', ['$scope', '$http', 'appCache', function($scope, $http, appCache) {
// 	// $scope.about = aboutCache.get('info');
// 	// $scope.skills = aboutCache.get('skills');
// 	// $scope.works = aboutCache.get('works');
//
// 	$scope.about = appCache.get('info');
// 	$scope.skills = appCache.get('skills');
// 	$scope.works = appCache.get('works');
//
// 	if(!$scope.about) {
// 		$http.get('/native/dist/data/about.json').success(function(data) {
// 			// aboutCache.put('info', data);
// 			appCache.put('info', data);
// 			$scope.about = data;
// 		});
// 	}
//
// 	if(!$scope.skills) {
// 		$http.get('/native/dist/data/about_skills.json').success(function(data) {
// 			// aboutCache.put('skills', data);
// 			appCache.put('skills', data);
// 			$scope.skills = data;
// 		});
// 	}
//
// 	if(!$scope.works) {
// 		$http.get('/native/dist/data/about_works.json').success(function(data) {
// 			// aboutCache.put('works', data);
// 			appCache.put('works', data);
// 			$scope.works = data;
// 		});
// 	}
// }]);
// appCtrl.controller('portfolioCtrl', ['$scope', '$http', 'appsCache', function($scope, $http, appsCache) {
// appCtrl.controller('portfolioCtrl', ['$scope', '$http', 'appCache', function($scope, $http, appCache) {
// 	// $http.get('/data/apps.json').success(function(data) {
// 	// 	$scope.apps = data;
// 	//
// 	// 	// alert($scope.apps[0].name);
// 	// 	// for (var i = 0; i < $scope.apps.length; i++) {
// 	// 	// 	// alert($scope.apps[i].title);
// 	// 	// 	// if(localStorage.getItem($scope.apps[i].title) == "_viewed") {
// 	// 	// 	// 	$scope.appViewed(i) = {'display':'none'};
// 	// 	// 	// }
// 	// 	// }
// 	// });
//
// 	// $scope.apps = appsCache.get('data');
//
// 	// $scope.apps = appsCache.get('applications');
//
// 	$scope.apps = appCache.get('applications');
//
// 	if(!$scope.apps) {
// 		$http.get('/native/dist/data/apps.json').success(function(data) {
// 			// appsCache.put('applications', data);
// 			appCache.put('applications', data);
// 			$scope.apps = data;
// 		});
// 	}
// }]);

// appCtrl.controller('appViewCtrl', ['$scope', '$http', '$state', '$stateParams', '$sce', function($scope, $http, $state, $stateParams, $sce) {
// 	$http.get('/native/dist/data/app_' + $stateParams.appName + '.json').success(function(data) {
// 		$scope.project = data;
// 		$scope.project.main = $sce.trustAsHtml($scope.project.content);
// 	});
// }]);

app.directive('title', ['$rootScope', '$timeout', function($rootScope, $timeout) {
	return {
		link: function() {
			var listener = function(event, toState) {
				$timeout(function() {
					$rootScope.title = (toState.pageTitle) ? toState.pageTitle : 'Tamik Android';
				});
			};
			$rootScope.$on('$stateChangeSuccess', listener);
		}
	};
}]);

app.factory('appCache', function($cacheFactory) {
	return $cacheFactory('appCache', {});
});
