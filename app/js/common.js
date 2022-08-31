$(function() {

	$(document).on('click', function (e) {
		if (!$(e.target).closest(".catalog-menu-item").length) {
			$('.catalog-menu-item').removeClass('active');
		}
	});

	$('.catalog-menu-item').each(function(i) {
		let ths = $(this),
				arrow = ths.find('.catalog-menu-item-arrow');
		arrow.on('click', function(e) {
			e.preventDefault();
			ths.toggleClass('active');
			$('.catalog-menu-item').each(function(e) {
				if ( e !== i ) {
					$(this).removeClass('active')
				}
			})
		});
	});

	$('.our-projects').owlCarousel({
		items: 3,
		loop: false,
		nav: true,
		dots: false,
		margin: 22,
		responsive: {
			0: {
				items: 1,
				margin: 10
			},
			576: {
				items: 2,
				margin: 10
			},
			768: {
				items: 3,
				margin: 22
			}
		}
	});

	let testimonials = $('.testimonials');

	testimonials.owlCarousel({
		items: 2,
		loop: false,
		nav: false,
		dots: true,
		margin: 66,
		responsive: {
			0: {
				margin: 10,
				items: 1
			},
			576: {
				items: 2,
				margin: 10
			},
			992: {
				margin: 66
			}
		}
	});

	function eqSliderWidth(slider_item) {
		let slider = slider_item;
		if ( slider_item.length > 0 ) {
			let item_width = parseFloat(slider_item.find('.owl-stage .owl-item')[0].style.width);
			slider_item.find('.owl-item').css('min-width', item_width);
		}
	};

	testimonials.on('changed.owl.carousel', function(event) {
		setTimeout(function() {eqSliderWidth(testimonials)}, 10)
	});

	eqSliderWidth(testimonials);

	let $productImages = $('.product-images-gallery').fotorama({
		nav: 'thumbs',
		thumbmargin: 8,
		thumbwidth: 208,
		thumbheight: 195
	});

	function checkGallery() {
		if ( $(window).width() > 576 ) {
			$('.product-images-gallery').fotorama({
				nav: 'thumbs',
				thumbmargin: 8,
				thumbwidth: 208,
				thumbheight: 195
			});
		}
		else {
			$('.product-images-gallery').fotorama({
				nav: 'dots'
			});
		}
	}checkGallery();

	$(window).resize(function() {
		checkGallery()
	});

  let productImagesFotorama = $productImages.data('fotorama');

  $('.gallery-thumbs-prev-btn').on('click', function(e) {
  	e.preventDefault();
  	productImagesFotorama.show('<');
  });
  $('.gallery-thumbs-next-btn').on('click', function(e) {
  	e.preventDefault();
  	productImagesFotorama.show('>');
  });

  function checkNavGallery() {
  	let activeIndex = $(this).find('.fotorama__nav__frame--thumb.fotorama__active').index();
  	if ( activeIndex == 1 ) {
  		$('.gallery-thumbs-prev-btn').addClass('disabled')
  	}
  	else if ( activeIndex == $(this).find('.fotorama__nav__frame--thumb').length ) {
  		$('.gallery-thumbs-next-btn').addClass('disabled')
  	}
  	else if ( activeIndex !== 1 && activeIndex !== $(this).find('.fotorama__nav__frame--thumb').length ) {
  		$('.gallery-thumbs-prev-btn').removeClass('disabled')
  		$('.gallery-thumbs-next-btn').removeClass('disabled')
  	}
  };

  $('.product-images-gallery').on('fotorama:ready', checkNavGallery);
  $('.product-images-gallery').on('fotorama:showend', checkNavGallery);

  $('.select-style').select2({
    minimumResultsForSearch: -1
  });

  $('.menu-toggle').on('click', function() {
  	$('.header-nav').addClass('opened')
  });

  $('.header-nav-close').on('click', function() {
  	$('.header-nav').removeClass('opened')
  });

  $('.open-popup').on('click', function(e) {
  	e.preventDefault();
  	let id = $(this).attr('href');
  	$(id).show();
  	setTimeout(() => {
  		$(id).addClass('opened')
  	}, 50);
  });

  function closePopup() {
  	$('.popup-wrapper').removeClass('opened');
  	setTimeout(() => {
  		$('.popup-wrapper').hide()
  	}, 400)
  }

  $('.popup-bg').on('click', closePopup);
  $('.popup-close').on('click', closePopup);

  $('.send-app-slider').owlCarousel({
  	items: 1,
  	nav: false,
  	dots: false,
  	margin: 10,
  	loop: true
  });

  $('.send-site-next-slide').on('click', function() {
  	$('.send-app-slider').trigger('next.owl.carousel')
  });

  $('.scroll-to').on('click', function(e) {
  	e.preventDefault();
  	let id = $(this).attr('href');
  	$('html, body').animate({
  		scrollTop: $(id).offset().top
  	}, 1000)
  });

  let projectSlider = $('.project-images-popup-slider');

  projectSlider.owlCarousel({
  	items: 1,
  	dots: true,
  	nav: true,
  	margin: 10
  })

  $('.category-item-link').on('click', function() {
  	let parent = $(this).parents('.category-item'),
  			slides = parent.find('.category-item-popup-images img');
  	projectSlider.find('.owl-item').each(function(i) {
			projectSlider.trigger('remove.owl.carousel', i)
		});
  	slides.each(function() {
			projectSlider.trigger('add.owl.carousel', $(this).clone())
		});
  });

  $('.phone-mask').inputmask({
		mask: "+7 999 999-99-99",
		showMaskOnHover: false
	});

});