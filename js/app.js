var app = angular.module('EWapp', ['ui.router', 'appCtrl']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: '/dist/_main.html',
			pageTitle: 'Команда Evil Wheels',
			controller: 'mainCtrl'
		})
		.state('events', {
			url: '/events',
			templateUrl: '/dist/_events.html',
			pageTitle: 'Мероприятия Evil Wheels',
			controller: 'eventsCtrl'
		})
		.state('event', {
			url: '/events/:eventName',
			templateUrl: '/dist/_event.html',
			pageTitle: 'Мероприятие Evil Wheels',
			controller: 'eventCtrl'
		})
		.state('map', {
			url: '/map',
			templateUrl: '/dist/_map.html',
			pageTitle: 'Трассы Evil Wheels',
			controller: 'mapCtrl'
		})
		.state('video', {
			url: '/video',
			templateUrl: '/dist/_video.html',
			pageTitle: 'Видео Evil Wheels',
			controller: 'videoCtrl'
		})
		.state('crew', {
			url: '/crew',
			templateUrl: '/dist/_crew.html',
			pageTitle: 'Состав Evil Wheels',
			controller: 'crewCtrl'
		})
		.state('contacts', {
			url: '/contacts',
			templateUrl: '/dist/_contacts.html',
			pageTitle: 'Контакты Evil Wheels'
		})
		.state('location', {
			url: '/location',
			templateUrl: '/dist/_location.html',
			pageTitle: 'Как добраться до Мотошколы Evil Wheels',
			controller: 'locationCtrl'
		})
	$locationProvider.html5Mode(true);
});

var appCtrl = angular.module('appCtrl', []);

appCtrl.controller('mainCtrl', ['$scope', '$http', function($scope, $http) {
	angular.element(document).ready(function() {
		var backgrounds = ["/data/eventsCover/funnybunny.jpg", "/data/eventsCover/funnybunnyvol2.jpg", "/data/eventsCover/smoto2015.jpg", "/data/eventsCover/smoto2016.jpg", "/native/landing.jpg"];

		var currentBackground = backgrounds[Math.floor(Math.random()*backgrounds.length)];

		$("#mainBackground").css({"background-image": "url(" + currentBackground + ")"});

		$(".start").css({"height":$(window).height()});

		$("#composition").click(function() {
			$crew = $("#crew");

			if($crew.hasClass("active")) {
				$crew.slideUp(250);
				$crew.removeClass("active");
			}
			else {
				$crew.slideDown(250);
				$crew.addClass("active");
			}
		});
	});
}]);

appCtrl.controller('mapCtrl', ['$scope', function($scope) {
	angular.element(document).ready(function() {
		var map = L.map('trailMap', {scrollWheelZoom:false}).setView([43.20, 43.63], 8); // 43.50 43.63 13 // 43.20 43.63 8

		L.tileLayer('https://api.mapbox.com/styles/v1/tamik/cipl12pqa0008dpm316s85ki9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGFtaWsiLCJhIjoiY2lwajBpYzRyMDA1M3ZibnQybzdhaXUzMSJ9.nGA_WBvVuRNdB4fNde1sBQ', {
			attribution: '© <a href="http://mapbox.com">Mapbox</a>',
			minZoom: 3,
			maxZoom: 18
		}).addTo(map);

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

		var bikeparkArmkhi = new L.marker([42.80664800, 44.70481700], {icon: MTBicon});

		var azauEnduroTrack = new L.marker([43.26601670, 42.48405440], {icon: MOTOicon});
		var nalchikGarden = new L.marker([43.44898040, 43.63901780], {icon: MOTOicon});

		var nalchik2gerpegezh = new L.marker([43.46120250, 43.68147440], {icon: ATVicon});
		var nalchikPaidTrack1 = new L.marker([43.43937530, 43.64105580], {icon: ATVicon});
		var nalchikPaidTrack2 = new L.marker([43.43752180, 43.64441570], {icon: ATVicon});
		var nalchikPaidTrack3 = new L.marker([43.46882870, 43.65973870], {icon: ATVicon});

		bikeparkArmkhi.on('click', function() {
			displayModal("bikeparkarmkhi");
		});

		azauEnduroTrack.on('click', function() {
			displayModal("azauendurotrack");
		});

		nalchik2gerpegezh.on('click', function() {
			displayModal("nalchik2gerpegezh");
		});

		nalchikGarden.on('click', function() {
			displayModal("nalchikgarden");
		});

		nalchikPaidTrack1.on('click', function() {
			displayModal("nalchikpaidtrack1");
		});

		nalchikPaidTrack2.on('click', function() {
			displayModal("nalchikpaidtrack2");
		});

		nalchikPaidTrack3.on('click', function() {
			displayModal("nalchikpaidtrack3");
		});

		var mtb = new L.markerClusterGroup({
			iconCreateFunction: function(cluster) {
				return L.divIcon({html: '<img src="/native/mapControls/MTBtrailLoop.png" width="64px" height="64px">'});
			},
			showCoverageOnHover: false
		});
		var moto = new L.markerClusterGroup({
			iconCreateFunction: function(cluster) {
				return L.divIcon({html: '<img src="/native/mapControls/MOTOtrailLoop.png" width="64px" height="64px">'});
			},
			showCoverageOnHover: false
		});
		var atv = new L.markerClusterGroup({
			iconCreateFunction: function(cluster) {
				return L.divIcon({html: '<img src="/native/mapControls/ATVtrailLoop.png" width="64px" height="64px">'});
			},
			showCoverageOnHover: false
		});

		mtb.addLayer(bikeparkArmkhi);

		moto.addLayer(azauEnduroTrack);
		moto.addLayer(nalchikGarden);

		atv.addLayer(nalchik2gerpegezh);
		atv.addLayer(nalchikPaidTrack1);
		atv.addLayer(nalchikPaidTrack2);
		atv.addLayer(nalchikPaidTrack3);

		map.addLayer(mtb);
		map.addLayer(moto);
		map.addLayer(atv);

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

		$("#bikeTrail").click(function() {
			$("#trailsCat option[value=MTB]").attr('selected', 'true');
			map.addLayer(mtb);
			map.removeLayer(moto);
			map.removeLayer(atv);
		});

		$("#motoTrail").click(function() {
			$("#trailsCat option[value=MOTO]").attr('selected', 'true');
			map.removeLayer(mtb);
			map.addLayer(moto);
			map.removeLayer(atv);
		});

		$("#atvTrail").click(function() {
			$("#trailsCat option[value=ATV]").attr('selected', 'true');
			map.removeLayer(mtb);
			map.removeLayer(moto);
			map.addLayer(atv);
		});

		function displayModal(value) {
			$modal = $(".modalComponent");
			$modalView = $(".viewComponent");

			$.ajax({
				url: '/data/trailsInfo/' + value + ".html",
				type: "GET",
				success: function(data) {
					$modalView.html(data);
				}
			});

			$modal.css({"display":"table"});

			$modal.animate({"opacity": 1}, 250);
			$modalView.animate({"opacity": 1}, 500);

			$modalView.html(value);
		}
	});
}]);

appCtrl.controller('videoCtrl', ['$scope', function($scope) {
	angular.element(document).ready(function() {
		$(".slider").touchSlider({
			roll: true,
			flexible: true,
			page: 2,
			btn_prev: $("#prev"),
			btn_next: $("#next"),
			sidePage: true
		});

		$("#prev").click(function(event) {
			$("#playP1").parent().parent().fadeIn(150);
			$("#playP2").parent().parent().fadeIn(150);
			$("#playP3").parent().parent().fadeIn(150);
			$("#playP4").parent().parent().fadeIn(150);

			if($("#videoP1")[0].src == "https://www.youtube.com/embed/fq6ut-9igBs?rel=0&showinfo=0&autoplay=1") {
				$("#videoP1")[0].src = "https://www.youtube.com/embed/fq6ut-9igBs?rel=0&showinfo=0&autoplay=0";
			}

			if($("#videoP2")[0].src == "https://www.youtube.com/embed/hrSdMXoF9as?rel=0&showinfo=0&autoplay=1") {
				$("#videoP2")[0].src = "https://www.youtube.com/embed/hrSdMXoF9as?rel=0&showinfo=0&autoplay=0";
			}

			if($("#videoP3")[0].src == "https://www.youtube.com/embed/CJEJDbeDqbc?rel=0&showinfo=0&autoplay=1") {
				$("#videoP3")[0].src = "https://www.youtube.com/embed/CJEJDbeDqbc?rel=0&showinfo=0&autoplay=0";
			}

			if($("#videoP4")[0].src == "https://www.youtube.com/embed/gLdcdF7RZms?rel=0&showinfo=0&autoplay=1") {
				$("#videoP4")[0].src = "https://www.youtube.com/embed/gLdcdF7RZms?rel=0&showinfo=0&autoplay=0";
			}

			event.preventDefault();
		});

		$("#next").click(function(event) {
			$("#playP1").parent().parent().fadeIn(150);
			$("#playP2").parent().parent().fadeIn(150);
			$("#playP3").parent().parent().fadeIn(150);
			$("#playP4").parent().parent().fadeIn(150);

			if($("#videoP1")[0].src == "https://www.youtube.com/embed/fq6ut-9igBs?rel=0&showinfo=0&autoplay=1") {
				$("#videoP1")[0].src = "https://www.youtube.com/embed/fq6ut-9igBs?rel=0&showinfo=0&autoplay=0";
			}

			if($("#videoP2")[0].src == "https://www.youtube.com/embed/hrSdMXoF9as?rel=0&showinfo=0&autoplay=1") {
				$("#videoP2")[0].src = "https://www.youtube.com/embed/hrSdMXoF9as?rel=0&showinfo=0&autoplay=0";
			}

			if($("#videoP3")[0].src == "https://www.youtube.com/embed/CJEJDbeDqbc?rel=0&showinfo=0&autoplay=1") {
				$("#videoP3")[0].src = "https://www.youtube.com/embed/CJEJDbeDqbc?rel=0&showinfo=0&autoplay=0";
			}

			if($("#videoP4")[0].src == "https://www.youtube.com/embed/gLdcdF7RZms?rel=0&showinfo=0&autoplay=1") {
				$("#videoP4")[0].src = "https://www.youtube.com/embed/gLdcdF7RZms?rel=0&showinfo=0&autoplay=0";
			}

			event.preventDefault();
		});

		$("#playP1").click(function(event) {
			$(this).parent().parent().fadeOut(150);

			$("#videoP1")[0].src = "https://www.youtube.com/embed/fq6ut-9igBs?rel=0&showinfo=0&autoplay=1";
			event.preventDefault();
		});

		$("#playP2").click(function(event) {
			$(this).parent().parent().fadeOut(150);

			$("#videoP2")[0].src = "https://www.youtube.com/embed/hrSdMXoF9as?rel=0&showinfo=0&autoplay=1";
			event.preventDefault();
		});

		$("#playP3").click(function(event) {
			$(this).parent().parent().fadeOut(150);

			$("#videoP3")[0].src = "https://www.youtube.com/embed/CJEJDbeDqbc?rel=0&showinfo=0&autoplay=1";
			event.preventDefault();
		});

		$("#playP4").click(function(event) {
			$(this).parent().parent().fadeOut(150);

			$("#videoP4")[0].src = "https://www.youtube.com/embed/gLdcdF7RZms?rel=0&showinfo=0&autoplay=1";
			event.preventDefault();
		});
	});
}]);

appCtrl.controller('eventsCtrl', ['$scope', '$http', 'eventsCache', function($scope, $http, eventsCache) {
	$scope.events = eventsCache.get('data');

	if(!$scope.events) {
		$http.get('/data/events.json').success(function(data) {
			eventsCache.put('data', data);
			$scope.events = data;
		});
	}
}]);

appCtrl.controller('eventCtrl', ['$scope', '$http', '$state', '$stateParams', function($scope, $http, $state, $stateParams) {
	$http.get('/data/events/' + $stateParams.eventName + '.json').success(function(data) {
		$scope.event = data;

		if($scope.event.title.length >= 25) {
			$(".title").css({"font-size": "56px"});
		}

		$.ajax({
			url: '/data/eventsInfo/' + $stateParams.eventName + '.html',
			type: 'GET',
			success: function(data) {
				$(".content").html(data);

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
									// rect = "";
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

				initPhotoSwipeFromDOM('.gallery');
			}
		});
	});
}]);

appCtrl.controller('crewCtrl', ['$scope', '$http', 'crewCache', function($scope, $http, crewCache) {
	$scope.crew = crewCache.get('data');

	if(!$scope.crew) {
		$http.get('/data/crew.json').success(function(data) {
			crewCache.put('data', data);
			$scope.crew = data;
		});
	}
}]);

appCtrl.controller('locationCtrl', ['$scope', function($scope) {
	angular.element(document).ready(function() {
		$("#locationMap").css({"width":$(window).width(), "height":$(window).height()});

		var locationMap = new L.map('locationMap', {zoomControl:false}).setView([43.48886, 43.65477], 16);

		L.tileLayer('https://api.mapbox.com/styles/v1/tamik/cipl12pqa0008dpm316s85ki9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGFtaWsiLCJhIjoiY2lwajBpYzRyMDA1M3ZibnQybzdhaXUzMSJ9.nGA_WBvVuRNdB4fNde1sBQ', {
		minZoom: 14, maxZoom: 18 }).addTo(locationMap);

		var TRACKicon = L.icon({
			iconUrl: '/native/mapControls/motoTrack.png',
			iconSize: [64, 64],
			iconAnchor: [32, 36]
		});

		var track = new L.marker([43.48886, 43.65477], {icon: TRACKicon}).bindPopup("Мототрек мотошколы Evil Wheels").addTo(locationMap);

		var locationAuto = omnivore.kml('/data/location/locationAuto.kml').addTo(locationMap);
		var locationPeople = omnivore.kml('/data/location/locationPeople.kml').addTo(locationMap);
		var locationPeopleMarket = omnivore.kml('/data/location/locationPeopleMarket.kml').addTo(locationMap);

		locationAuto.options.color = '#2b2';
		locationAuto.options.weight = 5;

		locationPeople.options.color = '#b00';
		locationPeople.options.weight = 5;

		locationPeopleMarket.options.color = '#22b';
		locationPeopleMarket.options.weight = 5;
	});
}]);

app.directive('title', ['$rootScope', '$timeout', function($rootScope, $timeout) {
	return {
		link: function() {
			var listener = function(event, toState) {
				$timeout(function() {
					$rootScope.title = (toState.pageTitle) ? toState.pageTitle : 'Evil Wheels';
				});
			};
			$rootScope.$on('$stateChangeSuccess', listener);
		}
	};
}]);

app.factory('mainCache', function($cacheFactory) {
	return $cacheFactory('mainCache', {});
});

app.factory('eventsCache', function($cacheFactory) {
	return $cacheFactory('eventsCache', {});
});

app.factory('crewCache', function($cacheFactory) {
	return $cacheFactory('crewCache', {});
});
