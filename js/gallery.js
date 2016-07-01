// (function() {
// 	var initPhotoSwipeFromDOM = function(gallerySelector) {
// 		var parseThumbnailElements = function(el) {
// 			var thumbElements = el.childNodes,
// 				numNodes = thumbElements.length,
// 				items = [],
// 				el,
// 				childElements,
// 				thumbnailEl,
// 				size,
// 				item;
// 			for(var i = 0; i < numNodes; i++) {
// 				el = thumbElements[i];
// 				if(el.nodeType !== 1) {
// 				  continue;
// 				}
// 				childElements = el.children;
// 				size = el.getAttribute('data-size').split('x');
// 				item = {
// 					src: el.getAttribute('href'),
// 					w: parseInt(size[0], 10),
// 					h: parseInt(size[1], 10),
// 					author: el.getAttribute('data-author')
// 				};
// 				item.el = el;
// 				if(childElements.length > 0) {
// 				  item.msrc = childElements[0].getAttribute('src');
// 				  if(childElements.length > 1) {
// 					  item.title = childElements[1].innerHTML;
// 				  }
// 				}
// 				item.o = {
// 					src: item.src,
// 					w: item.w,
// 					h: item.h
// 				};
// 				items.push(item);
// 			}
// 			return items;
// 		};
// 		var closest = function closest(el, fn) {
// 			return el && ( fn(el) ? el : closest(el.parentNode, fn) );
// 		};
// 		var onThumbnailsClick = function(e) {
// 			e = e || window.event;
// 			e.preventDefault ? e.preventDefault() : e.returnValue = false;
// 			var eTarget = e.target || e.srcElement;
// 			var clickedListItem = closest(eTarget, function(el) {
// 				return el.tagName === 'A';
// 			});
// 			if(!clickedListItem) {
// 				return;
// 			}
// 			var clickedGallery = clickedListItem.parentNode;
// 			var childNodes = clickedListItem.parentNode.childNodes,
// 				numChildNodes = childNodes.length,
// 				nodeIndex = 0,
// 				index;
// 			for (var i = 0; i < numChildNodes; i++) {
// 				if(childNodes[i].nodeType !== 1) {
// 					continue;
// 				}
// 				if(childNodes[i] === clickedListItem) {
// 					index = nodeIndex;
// 					break;
// 				}
// 				nodeIndex++;
// 			}
// 			if(index >= 0) {
// 				openPhotoSwipe( index, clickedGallery );
// 			}
// 			return false;
// 		};
// 		var photoswipeParseHash = function() {
// 			var hash = window.location.hash.substring(1),
// 			params = {};
// 			if(hash.length < 5) {
// 				return params;
// 			}
// 			var vars = hash.split('&');
// 			for (var i = 0; i < vars.length; i++) {
// 				if(!vars[i]) {
// 					continue;
// 				}
// 				var pair = vars[i].split('=');
// 				if(pair.length < 2) {
// 					continue;
// 				}
// 				params[pair[0]] = pair[1];
// 			}
// 			if(params.gid) {
// 				params.gid = parseInt(params.gid, 10);
// 			}
// 			return params;
// 		};
// 		var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
// 			var pswpElement = document.querySelectorAll('.pswp')[0],
// 				gallery,
// 				options,
// 				items;
// 			items = parseThumbnailElements(galleryElement);
// 			options = {
// 				galleryUID: galleryElement.getAttribute('data-pswp-uid'),
// 				getThumbBoundsFn: function(index) {
// 					var thumbnail = items[index].el.children[0],
// 						pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
// 						rect = thumbnail.getBoundingClientRect();
// 					return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
// 				},
// 				addCaptionHTMLFn: function(item, captionEl, isFake) {
// 					if(!item.title) {
// 						captionEl.children[0].innerText = '';
// 						return false;
// 					}
// 					captionEl.children[0].innerHTML = item.title +  '<br/><small>Р¤РѕС‚Рѕ: ' + item.author + '</small>';
// 					return true;
// 				},
//
// 			};
// 			if(fromURL) {
// 				if(options.galleryPIDs) {
// 					for(var j = 0; j < items.length; j++) {
// 						if(items[j].pid == index) {
// 							options.index = j;
// 							break;
// 						}
// 					}
// 				} else {
// 					options.index = parseInt(index, 10) - 1;
// 				}
// 			} else {
// 				options.index = parseInt(index, 10);
// 			}
// 			if( isNaN(options.index) ) {
// 				return;
// 			}
// 			options.mainClass = 'pswp--minimal--dark';
// 			options.barsSize = {top:0,bottom:0};
// 			options.captionEl = false;
// 			options.fullscreenEl = false;
// 			options.shareEl = false;
// 			options.zoomEl = false;
// 			options.counterEl = false;
// 			options.bgOpacity = 0.75;
// 			options.tapToClose = true;
// 			options.tapToToggleControls = false;
// 			if(disableAnimation) {
// 				options.showAnimationDuration = 0;
// 			}
// 			gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
// 			var realViewportWidth,
// 				useLargeImages = false,
// 				firstResize = true,
// 				imageSrcWillChange;
// 			gallery.listen('beforeResize', function() {
// 				var dpiRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
// 				dpiRatio = Math.min(dpiRatio, 2.5);
// 				realViewportWidth = gallery.viewportSize.x * dpiRatio;
// 				if(realViewportWidth >= 1200 || (!gallery.likelyTouchDevice && realViewportWidth > 800) || screen.width > 1200 ) {
// 					if(!useLargeImages) {
// 						useLargeImages = true;
// 						imageSrcWillChange = true;
// 					}
// 				} else {
// 					if(useLargeImages) {
// 						useLargeImages = false;
// 						imageSrcWillChange = true;
// 					}
// 				}
// 				if(imageSrcWillChange && !firstResize) {
// 					gallery.invalidateCurrItems();
// 				}
// 				if(firstResize) {
// 					firstResize = false;
// 				}
// 				imageSrcWillChange = false;
//
// 			});
// 			gallery.listen('gettingData', function(index, item) {
// 				if( useLargeImages ) {
// 					item.src = item.o.src;
// 					item.w = item.o.w;
// 					item.h = item.o.h;
// 				} else {
// 					item.src = item.m.src;
// 					item.w = item.m.w;
// 					item.h = item.m.h;
// 				}
// 			});
// 			gallery.init();
// 		};
// 		var galleryElements = document.querySelectorAll( gallerySelector );
// 		for(var i = 0, l = galleryElements.length; i < l; i++) {
// 			galleryElements[i].setAttribute('data-pswp-uid', i+1);
// 			galleryElements[i].onclick = onThumbnailsClick;
// 		}
// 		var hashData = photoswipeParseHash();
// 		if(hashData.pid && hashData.gid) {
// 			openPhotoSwipe( hashData.pid,  galleryElements[ hashData.gid - 1 ], true, true );
// 		}
// 	};
// })();
