/**
  * headerFixed
  * datepicker
  * googleMap
*/

$(function() {

  "use strict";

  var slideqty = $('#featured .item').length;
  var wheight = $(window).height(); //get the height of the window
  var minusNavSpace = 74;
  var hdr_height = $('#header').height(); 
  var wheightF = wheight - minusNavSpace;
  var randSlide = Math.floor(Math.random()*slideqty);
  var topoffset = 70; //variable for menu height

  $('#featured .item').eq(randSlide).addClass('active');


  $('.fullheight').css('height', wheightF); //set to window tallness  


  //replace IMG inside carousels with a background image
  $('#featured .item img').each(function() {
    var imgSrc = $(this).attr('src');
    $(this).parent().css({'background-image': 'url('+imgSrc+')'});
    $(this).remove();
  });

  //adjust height of .fullheight elements on window resize
  $(window).resize(function() {
	var wheight = $(window).height(); //get the height of the window
	var minusNavSpace = 74;
	var wheightF = wheight - minusNavSpace;
    $('.fullheight').css('height', wheightF); //set to window tallness  
  });

  //Automatically generate carousel indicators
  for (var i=0; i < slideqty; i++) {
    var insertText = '<li data-target="#featured" data-slide-to="' + i + '"';
    if (i === randSlide) {
      insertText += ' class="active" ';
    }
    insertText += '></li>';
    $('#featured ol').append(insertText);
  }

  $('.carousel').carousel({
    pause: false
  });

  // start the timers
  $('.numb-count').countTo();


  // Portfolio Script

  var portfolioIsotope = function() {         
    if ( $().isotope ) {           
        var $container = $('.portfolio-wrap');
        $container.imagesLoaded(function(){
            $container.isotope({
                itemSelector: '.item',
                transitionDuration: '1s'
            });
        });

        $('.portfolio-filter li').on('click',function() {                           
            var selector = $(this).find("a").attr('data-filter');
            $('.portfolio-filter li').removeClass('active');
            $(this).addClass('active');
            $container.isotope({ filter: selector });
            return false;
        });

        $('.flat-portfolio .load-more a').on('click', function(e) {
            e.preventDefault();

            var el = $(this),
                url = el.attr('href'),
                page = parseInt(el.attr('data-page'), 10);

            el.addClass('loading').text('Loading...');

            $.ajax({  
                type: "GET",
                url: url,
                dataType: "html",
                async: false,   // wait result
                data : { page : page }
            })
            .done(function (data) {
                if ( data != null ) {                      
                    var newitem = $(data);
                    $container.append(newitem).isotope('appended', newitem);
                    el.removeClass('loading').text('Load more');
                    page = page + 1;
                    el.attr({'data-page': page, 'href': './ajax/p' + page + '.html'});
                }
            })
            .fail(function () {
                el.text('No more portfolio to load.');
            })
        });
    };
  };


  portfolioIsotope();


  //Activate Scrollspy
  $('body').scrollspy({
    target: 'header .navbar',
    offset: topoffset
  });

  // Add an upscrolled,downscrolled class to nav when scroll event fires
  var hd_height = $('#header').height();
  $(window).on('load scroll', function(){
      if ( $(window).scrollTop() > hd_height + 30 ) {
          $('#header').addClass('downscrolled');                      
      } else {                    
          $('#header').removeClass('downscrolled');
      }
      if( $(window).scrollTop() > 300 ) {
          $('#header').addClass('upscrolled');                    
      } else {
          $('#header').removeClass('upscrolled');                    
      }
  })

    //Use smooth scrolling when clicking on navigation
  $('.navbar a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') === 
      this.pathname.replace(/^\//,'') && 
      location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top-topoffset+2
        }, 500);
        return false;
      } //target.length
    } //click function
  }); //smooth scrolling


});

