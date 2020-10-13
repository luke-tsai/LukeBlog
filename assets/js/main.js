(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		settings = {

			// Parallax background effect?
				parallax: true,

			// Parallax factor (lower = more intense, higher = less intense).
				parallaxFactor: 20

		};

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1800px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ],
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile) {

			// Turn on touch mode.
				$body.addClass('is-touch');

			// Height fix (mostly for iOS).
				window.setTimeout(function() {
					$window.scrollTop($window.scrollTop() + 1);
				}, 0);

		}

	// Footer.
		breakpoints.on('<=medium', function() {
			$footer.insertAfter($main);
		});

		breakpoints.on('>medium', function() {
			$footer.appendTo($header);
		});

	// Header.

		// Parallax background.

			// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
				if (browser.name == 'ie'
				||	browser.mobile)
					settings.parallax = false;

			if (settings.parallax) {

				breakpoints.on('<=medium', function() {

					$window.off('scroll.strata_parallax');
					$header.css('background-position', '');

				});

				breakpoints.on('>medium', function() {

					$header.css('background-position', 'left 0px');

					$window.on('scroll.strata_parallax', function() {
						$header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
					});

				});

				$window.on('load', function() {
					$window.triggerHandler('scroll');
				});

			}

	// Main Sections: Two.
	// Hashchange
			$window.on('hashchange', function(event) {

				switch(location.hash){
            	case '#': case '':
            	 	// Prevent default.
						event.preventDefault();
						event.stopPropagation();
					// Hide.
						$main._hide();
            	 	$(".theology").show();
            	 	$(".philosophy").show();
            	 	$(".faith").show();
            	 	$(".art").show();
            	 	$(".writing").show();
            	 	break;
            	case "#theology":
            	 	$(".theology").hide();
            	 	$(".philosophy").hide();
            	 	$(".faith").hide();
            	 	$(".art").hide();
            	 	$(".writing").hide();
            	 	
            	 	$(".theology").show();
            	 	break;
            	case "#philosophy":
            	 	$(".theology").hide();
            	 	$(".philosophy").hide();
            	 	$(".faith").hide();
            	 	$(".art").hide();
            	 	$(".writing").hide();
            	 	
            	 	$(".philosophy").show();
            	 	break;
            	case "#faith":
            	 	$(".theology").hide();
            	 	$(".philosophy").hide();
            	 	$(".faith").hide();
            	 	$(".art").hide();
            	 	$(".writing").hide();
            	 	
            	 	$(".faith").show();
            	 	break;
            	case "#art":
            	 	$(".theology").hide();
            	 	$(".philosophy").hide();
            	 	$(".faith").hide();
            	 	$(".art").hide();
            	 	$(".writing").hide();
            	 	
            	 	$(".art").show();
            	 	break;
            	case "#writing":
            	 	$(".theology").hide();
            	 	$(".philosophy").hide();
            	 	$(".faith").hide();
            	 	$(".art").hide();
            	 	$(".writing").hide();
            	 	
            	 	$(".writing").show();
            	 	break;
            	default:
            	 	// Prevent default.
						event.preventDefault();
						event.stopPropagation();

					// Show article.
						$main._show(location.hash.substr(1));
            }

			});
		// Lightbox gallery.
			$window.on('load', function() {

				$('#two').poptrox({
					caption: function($a) { return $a.next('h3').text(); },
					overlayColor: '#2c2c2c',
					overlayOpacity: 0.85,
					popupCloserText: '',
					popupLoaderText: '',
					selector: '.work-item a.image',
					usePopupCaption: true,
					usePopupDefaultStyling: false,
					usePopupEasyClose: false,
					usePopupNav: true,
					windowMargin: (breakpoints.active('<=small') ? 0 : 50)
				});

			});

})(jQuery);