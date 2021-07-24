(function ($) {
    // js for welcome page
    /*search*/

    var check_rtl = false;
    if ($('html').attr('dir')) {
        check_rtl = true;
    }

    if (typeof IsJsonString == 'undefined') {
        function IsJsonString(str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        }
    }

    $(document).ready(function () {
        $('#video-back').on('click', function (e) {
            window.history.back();
            return false;
        });

        $('.slide-channels').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            speed: 300,
            dots: false,
            rtl: check_rtl,
            responsive: [{
                breakpoint: 1441,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            }, {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });


        $('.main-menu-search .open-search-main-menu').on('click', function () {
            $this = jQuery(this);
            if ($this.hasClass('search-open')) {
                $this.parents('.main-menu-search').find('.search-main-menu').removeClass('active');
                setTimeout(function () {
                    $this.parents('.navbar-default').find('.search-main-menu').find('input[type="text"]').blur();
                }, 200);
                $this.removeClass('search-open');
            } else {
                $this.parents('.main-menu-search').find('.search-main-menu').addClass('active');
                setTimeout(function () {
                    $this.parents('.main-menu-search').find('.search-main-menu').find('input[type="text"]').focus();
                }, 200);
                $this.addClass('search-open');
            }
        });
    });

    /**/
    $(".account-dropdown").click(function () {
        $(this).toggleClass("arrow");
        $(".account-menu").toggle();
    });
    $('.main-menu .dropdown .vf-dropdown-toggle').on('click', function () {
        $(this).toggleClass('active');
        if ($this.hasClass('active')) {
            $(this).next().slideDown();
        } else {
            $(this).next().slideUp();
        }
    });
    $(document).click(function (e) {
        if (!$(".account-dropdown").is(e.target) && $(".account-dropdown").has(e.target).length === 0 && !$(".account-menu").is(e.target) && $(".account-menu").has(e.target).length === 0 && $(".account-menu").css("display") === "block") {
            $(".account-dropdown").toggleClass("arrow");
            $(".account-menu").toggle();
        }
    });
    $(".menu-icon").click(function () {
        $(".main-menu").toggle();
    });
    $(document).click(function (e) {
        if (!$(".main-menu").is(e.target) && $(".main-menu").has(e.target).length === 0 && !$(".menu-icon").is(e.target) && $(".menu-icon").has(e.target).length === 0 && $(".main-menu").css("display") === "block") {
            $(".main-menu").toggle();
        }
    });
    var $slide = $('.slide')
        .on('init', function (slick) {
            $('.slide').fadeIn(1500);
            $('.title').fadeIn(1500);
            $('.wp-pagenavi').fadeIn(1500);
        })
        .slick({
            slidesToShow: 6,
            slidesToScroll: 1,
            speed: 300,
            variableWidth: true,
            dots: false,
            infinite: true,
            rtl: check_rtl,
            responsive: [{
                breakpoint: 1555,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                }
            }, {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    centerMode: true,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 360,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });

    /*
     *  hover to slide
     */

    var timeOut;
    var delay = 500;
    var videoIdArr = [];
    var videoIdLoadedArr = [];
    var videoInfoLoadedArr = [];
    $(document).on({
        mouseenter: function () {
            var $this = $(this);
            var $thisRow = $(this).parents('.row');
            $this.parents(".slide").find("button").toggleClass("btn-netflix-hidden");
            if ($thisRow.find('.video-info').css("display") === "block") {
                var dataId = $this.attr('data-id');
                var posIdInArr = videoIdLoadedArr.indexOf(dataId);
                if ($(document).width() === 320) {
                    delay = 0;
                }
                timeOut = setTimeout(function () {
                    videoIdArr.push($this.attr("data-id"));
                    if (videoIdArr.length === 3) {
                        videoIdArr.splice(0, 1);
                    }
                    if (videoIdArr[1] !== videoIdArr[0]) { //check when hover to other slide

                        if (typeof _current_page == 'undefined') var _current_page = 0;

                        // ajax call for post info
                        var item_id = videoIdArr[1].substr(videoIdArr[1].indexOf("-") + 1);
                        var row_number = videoIdArr[1].substr(0, videoIdArr[1].indexOf('-'));
                        jQuery('.video-info .tab-content').html('');
                        $('.video-info').each(function () {
                            if ($(this).hasClass('active')) {
                                $(this).removeClass('active');
                            }
                        });
                        $thisRow.find(".pre-loader").show();

                        $('.item-thumb').removeClass('arrow');
                        $this.find('.item-thumb').toggleClass('arrow');
                        $this.parents(".slide").find('.slide-item').css("opacity", 0.5);
                        $this.css('opacity', 1);
                        $thisRow.find("li").removeClass("active");
                        $thisRow.find("li:first-child").addClass("active");
                        $thisRow.find(".tab-pane").removeClass("active in");
                        $thisRow.find(".details-tab").addClass("active in");
                        $('.video-pro-nf .btn-play-nf').css('transform', '');
                        $this.find(".btn-play-nf").css('transform', 'translateY(60%)');
                        $('.background').css('opacity', 1);
                        data = {
                            action: 'load_post_info',
                            item_id: item_id,
                            row_number: row_number,
                            page: _current_page,
                            vars: cactus.query_vars
                        };

                        if (posIdInArr == -1) {
                            jQuery.ajax({
                                type: 'POST',
                                url: cactus.ajaxurl,
                                cache: false,
                                data: data,
                                success: function (data, textStatus, XMLHttpRequest) {
                                    if (data != '') {
                                        videoIdLoadedArr.push(dataId);
                                        videoInfoLoadedArr.push(data);
                                        jQuery('.video-info .row-number-' + row_number).html(data);
                                        $thisRow.find(".video-info").addClass('active');
                                        $(".pre-loader").hide();
                                    } else {
                                    }

                                    videoLikeThisSlick();
                                    _ajax_loading = false;
                                },
                                error: function (MLHttpRequest, textStatus, errorThrown) {
                                    var data = '';
                                    if (typeof MLHttpRequest.responseText != 'undefined') {
                                        data = MLHttpRequest.responseText;
                                    }
                                    if (data != '') {
                                        videoIdLoadedArr.push(dataId);
                                        videoInfoLoadedArr.push(data);
                                        jQuery('.video-info .row-number-' + row_number).html(data);
                                        $thisRow.find(".video-info").addClass('active');
                                        $(".pre-loader").hide();
                                    } else {
                                    }

                                    videoLikeThisSlick();
                                    _ajax_loading = false;
                                }
                            });
                        } else {
                            setTimeout(function () {
                                jQuery('.video-info .row-number-' + row_number).html(videoInfoLoadedArr[posIdInArr]);
                                $thisRow.find(".video-info").addClass('active');
                                $(".pre-loader").hide();
                                videoLikeThisSlick();
                            }, 400);
                        }
                        /*if ($thisRow.find(".details-tab ").find(".video-title").text() === "In Time") {
                         $thisRow.find(".video-title").html("Agatha Christie's 1926 Disappearance");
                         $thisRow.find(".cover").css("background", "");
                         } else {
                         $thisRow.find(".video-title").html("In Time");
                         $thisRow.find(".cover").css("background", "url(image/back-for-movie-1.png) center no-repeat");
                         }*/
                    }
                }, delay)

            } else {
                $this.addClass("active");
            }
            $('.check').tooltip();
        },
        mouseleave: function () {
            var $this = $(this);
            $this.parents(".slide").find("button").toggleClass("btn-netflix-hidden");
            $this.removeClass("active");
            clearTimeout(timeOut);
        }
    }, '.slide-item');

    /*
     *  end hover to slide
     */

    $('.tool-tip li').mouseover(function () {
        $(this).parents(".slide").css("z-index", 30);
    }).mouseout(function () {
        $(this).parents(".slide").css("z-index", "");
    });

    var videoLikeThisSlick = function () {
        $('.video-like-this').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            speed: 300,
            dots: false,
            variableWidth: true,
            rtl: check_rtl,
            responsive: [{
                breakpoint: 1555,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                }
            }, {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 360,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });
        if ($('html').attr('dir')) {
            $('.video-info li').one('click', function () {
                console.log($(this).children().attr('href').indexOf('#more-tab-row-4'))
                if ($(this).children().attr('href').indexOf('#episodes-tab') >= 0) {
                    $('.episodes-tab .video-like-this').slick('slickNext');
                } else if ($(this).children().attr('href').indexOf('#more-tab') >= 0) {
                    $('.more-tab .video-like-this').slick('slickNext');
                }
            })
        }
    };

    $(document).click(function (e) {
        setTimeout(function () {
            if ($(e.target).parents().hasClass("video-info")) {
                if ($(e.target).parents(".video-info").find('.details-tab').hasClass("active")) {
                    $('.background').css('opacity', 1);
                } else {
                    $('.background').css('opacity', 0.2);
                }
            }
        }, 300);
    });


    // close video-info
    $(document).on('click', '.btn-close-video-info', function (e) {
        $(this).parents('.video-info').slideToggle(300, "linear");
        $('.item-thumb').removeClass('arrow');
        $(".slide-item").css("opacity", 1);
        $('.video-pro-nf .btn-play-nf').css('transform', '');
        $(this).parents('.video-info').removeClass('active');
    });

    // click on show-detail
    $(document).on('click', '.show-detail', function (e) {
        var item_id = $(this).attr("data-item-id");
        var row_number = $(this).attr("data-row-number");
        jQuery('.video-info .tab-content').html('');
        var $this = $(this);
        var $thisRow = $(this).parents('.row');
        videoIdArr = [];
        var dataId = $this.parents(".slide-item").attr('data-id');
        var posIdInArr = videoIdLoadedArr.indexOf(dataId);
        if (typeof _current_page == 'undefined') var _current_page = 0;

        videoIdArr.push($this.parents(".slide-item").attr("data-id"));
        $('.video-info').each(function () {
            if (!$(this).is($thisRow.find(".video-info"))) {
                $(this).slideUp(150, "linear");
                $(this).removeClass('active');
            }
        });
        $(".row").each(function () {
            if (!$(this).is($thisRow)) {
                $(this).find('.slide-item').css('opacity', 1);
            }
        });
        $this.parents(".slide").find('.slide-item').css("opacity", 0.5);
        $this.parents(".slide-item").removeClass("active");
        $this.parents(".slide-item").css("opacity", 1);
        $thisRow.find(".pre-loader").show();
        $thisRow.find("li").removeClass("active");
        $thisRow.find("li:first-child").addClass("active");
        $thisRow.find(".tab-pane").removeClass("active in");
        $thisRow.find(".details-tab").addClass("active in");
        $('.video-pro-nf .btn-play-nf').css('transform', '');
        $this.parents(".slide-item").find(".btn-play-nf").css('transform', 'translateY(60%)');
        $('.background').css('opacity', 1);
        $('.item-thumb').removeClass('arrow');
        $this.parents(".slide-item").find('.item-thumb').toggleClass('arrow');
        $thisRow.find(".video-info").slideToggle(250, "linear");

        data = {
            action: 'load_post_info',
            item_id: item_id,
            row_number: row_number,
            page: _current_page,
            vars: cactus.query_vars
        };

        if (posIdInArr == -1) {
            jQuery.ajax({
                type: 'POST',
                url: cactus.ajaxurl,
                cache: false,
                data: data,
                success: function (data, textStatus, XMLHttpRequest) {
                    if (data != '') {
                        videoIdLoadedArr.push(dataId);
                        videoInfoLoadedArr.push(data);
                        jQuery('.video-info .row-number-' + row_number).html(data);
                        $thisRow.find(".video-info").addClass('active');
                        $(".pre-loader").hide();
                    } else {
                        _current_page = -1;
                        // do something else when there is no more results
                        // alert('No more results. You should do something, like hiding this link button. Edit me in /js/ajax.js');
                        jQuery(".navigation-ajax").hide();
                    }
                    videoLikeThisSlick();
                    _ajax_loading = false;
                },
                error: function (MLHttpRequest, textStatus, errorThrown) {
                    var data = '';
                    if (typeof MLHttpRequest.responseText != 'undefined') {
                        data = MLHttpRequest.responseText;
                    }
                    if (data != '') {
                        videoIdLoadedArr.push(dataId);
                        videoInfoLoadedArr.push(data);
                        jQuery('.video-info .row-number-' + row_number).html(data);
                        $thisRow.find(".video-info").addClass('active');
                        $(".pre-loader").hide();
                    } else {
                        _current_page = -1;
                        // do something else when there is no more results
                        // alert('No more results. You should do something, like hiding this link button. Edit me in /js/ajax.js');
                        jQuery(".navigation-ajax").hide();
                    }
                    videoLikeThisSlick();
                    _ajax_loading = false;
                    // alert(errorThrown);
                    // _ajax_loading = false;
                    // icon_loading.addClass('hidden-loading');
                    // ajax_button.removeClass('hidden1-loading');
                }
            });
        } else {
            setTimeout(function () {
                jQuery('.video-info .row-number-' + row_number).html(videoInfoLoadedArr[posIdInArr]);
                $thisRow.find(".video-info").addClass('active');
                $(".pre-loader").hide();
                videoLikeThisSlick();
            }, 400);
        }
    });

    $('.wpmui-field-input', '.register').on('keyup', function () {
        if ($(this).val().length === 0) {
            $(this).prev().show();
        } else {
            $(this).prev().hide();
        }
    });

    $('.wpmui-field-input', '.ms-edit-profile').each(function () {
        if ($(this).val().length > 0) {
            $(this).prev().hide();
        }
    });


    $('.wpmui-field-input', '.ms-edit-profile').on('keyup', function () {
        if ($(this).val().length === 0) {
            $(this).prev().show();
        } else {
            $(this).prev().hide();
        }
    });

    $(".btn-add-list-bb").on('click', function (evt) {
        thebtn = $(this);
        var video_id = thebtn.attr('data-id');
        if (video_id != '') {
            if (!thebtn.hasClass("added") && !thebtn.hasClass("check")) {
                thebtn.children('i').addClass('fa-spin');
            }
            if (thebtn.hasClass("added")) {
                window.location = thebtn.attr('href');
                return;
            }
            action = thebtn.attr('data-action');
            $.post({
                data: {action: 'add_watch_later', id: video_id, url: location.href, do: action},
                url: cactus.ajaxurl,
                success: function (result) {
                    res = JSON.parse(result);
                    if (res.status == 1) {
                        thebtn.addClass('added');
                        thebtn.children('i').removeClass('fa-plus');
                        thebtn.children('i').addClass('fa-check');
                        var watch_later = thebtn.attr('data-title');
                        thebtn.find('span').text(watch_later);
                        $("li").find("[data-id='" + video_id + "']").children('i').addClass('fa-check').removeClass('fa-spin');
                        $("li").find("[data-id='" + video_id + "']").next().find('span').show().text('Remove from Watch Later');
                        thebtn.children('i').removeClass('fa-spin');
                    }
                },
                error: function () {
                    alert('fail');
                    thebtn.children('i').removeClass('fa-spin');
                }
            });
        }
        evt.stopPropagation();
        return false;
    });

    $('video').on('ended', function () {
        $(this).hide();
        $(this).parents(".billboard").find('img').show();
        $(".volume").hide();
    });

    $(".volume").on('click', function () {
        $(".fa-volume-up").toggle();
        $(".fa-volume-off").toggle();
        if ($(".fa-volume-up").css("display") === "none") {
            $("video").prop('muted', true);
        } else {
            $("video").prop('muted', false);
        }
    });

    jQuery('#categories-ajax').click(function () {
        jQuery('.fa-sync').addClass("fa-spin");
        jQuery('.fa-sync').removeClass("hide");
        jQuery('.load-title').addClass("hidden");
        jQuery('#categories-ajax').addClass("disabled");

        if (typeof _current_page == 'undefined') var _current_page = 0;

        data = {
            action: 'load_categories',
            category_offset: category_offset,
            last_row_number: last_row_number,
            hidden_categories: hidden_categories,
            page: _current_page,
            vars: cactus.query_vars
        };
        jQuery.ajax({
            type: 'POST',
            url: cactus.ajaxurl,
            cache: false,
            data: data,
            success: function (data, textStatus, XMLHttpRequest) {
                if (data != '' && IsJsonString(data)) {
                    var myData = JSON.parse(data);
                    category_offset = myData.category_offset;
                    last_row_number = myData.last_row_number;
                    if (myData.check_categories == '0') {
                        jQuery(".categories-ajax").hide();
                    }
                    $('.slide').slick('unslick');
                    jQuery('.categories-ajax').before(myData.data);
                    //  jQuery('.categories-ajax').prev().after(myData.data);
                    $('.slide').slick({
                        slidesToShow: 6,
                        slidesToScroll: 1,
                        speed: 300,
                        variableWidth: true,
                        dots: false,
                        responsive: [{
                            breakpoint: 1555,
                            settings: {
                                slidesToShow: 5,
                                slidesToScroll: 1,
                            }
                        }, {
                            breakpoint: 1300,
                            settings: {
                                slidesToShow: 4,
                                slidesToScroll: 1
                            }
                        }, {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 4,
                                slidesToScroll: 1
                            }
                        }, {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 3,
                                centerMode: true,
                                slidesToScroll: 1
                            }
                        }, {
                            breakpoint: 500,
                            settings: {
                                slidesToShow: 1,
                                centerMode: true,
                                slidesToScroll: 1
                            }
                        }, {
                            breakpoint: 360,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }]
                    });

                    jQuery('.fa-sync').removeClass("fa-spin");
                    jQuery('.fa-sync').addClass("hide");
                    jQuery('.load-title').removeClass("hidden");
                    jQuery('#categories-ajax').removeClass("disabled");
                } else {
                    jQuery(".categories-ajax").hide();
                }
                _ajax_loading = false;
            },
            error: function (MLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
                _ajax_loading = false;
                icon_loading.addClass('hidden-loading');
                ajax_button.removeClass('hidden1-loading');
            }
        });
    });

    // js for search page
    var get_row = function () {
        var i = 1;
        var window_width = $(window).width();
        var item_width = $('.item').outerWidth(false);

        if ($('html').attr('dir')) {
            var row_padding_left = parseInt($('.row').css("padding-left").replace("px", ""));
            $('.item').each(function () {
                var $this = $(this);
                var item_left = $this.offset().left;
                $this.attr("data-row", "row-" + i);
                if ((item_left - row_padding_left) < item_width) {
                    i += 1;
                }
            })
        } else {
            var row_padding_right = parseInt($('.row').css("padding-right").replace("px", ""));
            $('.item').each(function () {
                var $this = $(this);
                var item_left = $this.offset().left;
                $this.attr("data-row", "row-" + i);
                if (window_width - (item_left + item_width + row_padding_right) < item_width) {
                    i += 1;
                }
            })
        }
    };
    get_row();
    $("p:nth-child(3)", ".description").each(function () {
        if ($(this).text().length > 50) {
            var str = $(this).text().slice(0, 50) + "...";
        }
        $(this).html(str);

    });
    $(".add", ".tool-tip").on("click", function () {
        $(this).hide();
        $(this).parents(".tool-tip").find(".remove").show();
    });
    $(".remove", ".tool-tip").on("click", function () {
        $(this).hide();
        $(this).parents(".tool-tip").find(".add").show();
    });

    var video_info_area = $("<div class='video-info-area'><div class='up'></div></div>");
    var clone_video_info_area = $("<div class='clone-video-info-area'></div>");

    var show_video_info = function (element) {
        var $element = $(element);
        var old_data_row = $('.video-info-area').attr('data-row');
        if ($('body').has('.video-info-area').length) {
            var $old_element = $('.video-info-area').prev();
            $($old_element).after(clone_video_info_area);
        }
        $element.after(video_info_area);
        $(clone_video_info_area).css('height', '0vh');
        $('.video-info-area').css('height', '60vh');
        $('html, body').animate({
            scrollTop: $element.offset().top - 40
        }, 300);
        var video_info_area_top = $('.video-info-area').offset().top;
        var video_info_title_author_top = $('.row .title', '.author').height() || 0;
        var video_info_top = video_info_area_top - $('[data-row="row-1"]').offset().top + 40 + 5 + video_info_title_author_top;
        $('.video-info').css('top', video_info_top);
        $('.video-info').show();

        $('.video-info-area').attr('data-row', $element.data('row'));

    };

    $(document).on('click', '.show-detail-search', function (e) {
        var item_id = $(this).attr("data-item-id");
        jQuery('.video-info .tab-content').html('');
        var window_width = $(window).width();
        var $this = $(this).parents('.item');
        var dataId = $this.attr('data-id');
        var posIdInArr = videoIdLoadedArr.indexOf(dataId);
        var $video_info = $('.video-info');
        var row_padding_right = parseInt($('.row').css("padding-right").replace("px", ""));
        var item_left = $this.offset().left;
        var item_width = $this.outerWidth(false);
        if (typeof _current_page == 'undefined') var _current_page = 0;
        $('.item').css('opacity', 1);
        $('.clone-video-info-area').css('height', '60vh');
        $('.video-info-area').css('height', '0vh');
        $('.pre-loader').show();
        $video_info.removeClass('active');
        $video_info.css('display', '');
        $video_info.find("li").removeClass("active");
        $video_info.find("li:first-child").addClass("active");
        $video_info.find(".tab-pane").removeClass("active in");
        $video_info.find(".details-tab").addClass("active in");
        $('.background').css('opacity', 1);

        var data_row = $this.attr('data-row');
        var data_id = $this.attr('data-id');
        var row_length = $('[data-row=' + data_row + ']').length;

        $('[data-row=' + data_row + ']:not([data-id=' + data_id + '])').not('.video-info-area').css('opacity', 0.5);

        $('[data-row=' + data_row + ']').each(function (i, e) {
            if (i == row_length - 1) {
                show_video_info($(this));
                return false;
            }
        });

        $(".up").css("left", item_left + item_width / 2 - row_padding_right - 10);
        $('.up', '.video-info-area').show();
        data = {
            action: 'load_search_post_info',
            item_id: item_id,
            page: _current_page,
            vars: cactus.query_vars
        };
        if (posIdInArr == -1) {
            jQuery.ajax({
                type: 'POST',
                url: cactus.ajaxurl,
                cache: false,
                data: data,
                success: function (data, textStatus, XMLHttpRequest) {
                    if (data != '') {
                        videoIdLoadedArr.push(dataId);
                        videoInfoLoadedArr.push(data);
                        jQuery('.video-info .tab-content').html(data);
                        $video_info.addClass('active');
                        $('.pre-loader').hide();
                        $('.video-info-area').css('height', $('.video-info').height());
                    } else {
                        _current_page = -1;
                        // do something else when there is no more results
                        // alert('No more results. You should do something, like hiding this link button. Edit me in /js/ajax.js');
                        jQuery(".navigation-ajax").hide();
                    }
                    videoLikeThisSlick();
                    _ajax_loading = false;
                },
                error: function (MLHttpRequest, textStatus, errorThrown) {
                    var data;
                    if (typeof MLHttpRequest.responseText != 'undefined') {
                        data = MLHttpRequest.responseText;
                    }
                    if (data != '') {
                        videoIdLoadedArr.push(dataId);
                        videoInfoLoadedArr.push(data);
                        jQuery('.video-info .tab-content').html(data);
                        $video_info.addClass('active');
                        $('.pre-loader').hide();
                        $('.video-info-area').css('height', $('.video-info').height());
                    } else {
                        _current_page = -1;
                        // do something else when there is no more results
                        // alert('No more results. You should do something, like hiding this link button. Edit me in /js/ajax.js');
                        jQuery(".navigation-ajax").hide();

                        videoLikeThisSlick();
                        _ajax_loading = false;
                        alert(errorThrown);
                        _ajax_loading = false;
                        icon_loading.addClass('hidden-loading');
                        ajax_button.removeClass('hidden1-loading');
                    }
                }
            });
        } else {
            setTimeout(function () {
                jQuery('.video-info .tab-content').html(videoInfoLoadedArr[posIdInArr]);
                videoLikeThisSlick();
                $video_info.addClass('active');
                $('.pre-loader').hide();
                $('.video-info-area').css('height', $('.video-info').height());
            }, 400);
        }
    });

    // close video-info
    $('.btn-close-video-info-search-page').on('click', function () {
        $('.up', '.video-info-area').hide();
        $(this).parents('.video-info').removeClass('active');
        $('.video-info').slideUp(300, "linear");
        $('.video-info-area').css('height', '0vh');
        $('.item').css('opacity', 1);
    });


// hover item
    var time_out;
    var video_id_arr = [];

    $(document).on({
        mouseenter: function () {
            if ($('body').has('.video-info-area').length) {
                var item_id = $(this).attr("data-id");
                var $this = $(this);
                var dataId = $this.attr('data-id');
                var posIdInArr = videoIdLoadedArr.indexOf(dataId);
                if ($('.video-info-area').attr('data-row') == $this.attr('data-row') && $('.video-info-area').css('height') != '0px') {
                    $this.addClass("animation");
                }
                time_out = setTimeout(function () {
                    video_id_arr.push($this.attr("data-id"));
                    if (video_id_arr.length === 3) {
                        video_id_arr.splice(0, 1);
                    }
                    if (video_id_arr[0] !== video_id_arr[1]) {
                        if ($this.css('opacity') == 0.5) {                   //change content of video-info
                            $('.video-info').removeClass('active');
                            var data_row = $this.attr('data-row');
                            var data_id = $this.attr('data-id');
                            $this.css('opacity', 1);
                            $('.video-info').find("li").removeClass("active");
                            $('.video-info').find("li:first-child").addClass("active");
                            $('.pre-loader').show();
                            $('[data-row=' + data_row + ']:not([data-id=' + data_id + '])').not('.video-info-area').css('opacity', 0.5);

                            var row_padding_right = parseInt($('.row').css("padding-right").replace("px", ""));
                            var item_left = $this.offset().left;
                            var item_width = $this.outerWidth(false);

                            $(".up").css("left", item_left + item_width / 2 - row_padding_right - 10);
                            if (typeof _current_page == 'undefined') {
                                _current_page = 1;
                            }
                            data = {
                                action: 'load_search_post_info',
                                item_id: item_id,
                                page: _current_page,
                                vars: cactus.query_vars
                            };
                            if (posIdInArr == -1) {
                                jQuery.ajax({
                                    type: 'POST',
                                    url: cactus.ajaxurl,
                                    cache: false,
                                    data: data,
                                    success: function (data, textStatus, XMLHttpRequest) {
                                        if (data != '') {
                                            videoIdLoadedArr.push(dataId);
                                            videoInfoLoadedArr.push(data);
                                            jQuery('.video-info .tab-content').html(data);
                                            $('.video-info').addClass('active');
                                            $('.pre-loader').hide();
                                        } else {
                                        }
                                        videoLikeThisSlick();
                                        _ajax_loading = false;
                                    },
                                    error: function (MLHttpRequest, textStatus, errorThrown) {
                                        var data;
                                        if (typeof MLHttpRequest.responseText != 'undefined') {
                                            data = MLHttpRequest.responseText;
                                        }
                                        if (data != '') {
                                            videoIdLoadedArr.push(dataId);
                                            videoInfoLoadedArr.push(data);
                                            jQuery('.video-info .tab-content').html(data);
                                            $('.video-info').addClass('active');
                                            $('.pre-loader').hide();
                                        } else {
                                        }
                                        videoLikeThisSlick();
                                        // _ajax_loading = false;
                                        // alert(errorThrown);
                                        // _ajax_loading = false;
                                        // icon_loading.addClass('hidden-loading');
                                        // ajax_button.removeClass('hidden1-loading');
                                    }
                                });
                            } else {
                                setTimeout(function () {
                                    jQuery('.video-info .tab-content').html(videoInfoLoadedArr[posIdInArr]);
                                    videoLikeThisSlick();
                                    $('.video-info').addClass('active');
                                    $('.pre-loader').hide();
                                }, 400);
                            }
                        }
                    }
                }, 500);
            }
        }, mouseleave: function () {
            $(this).removeClass("animation");
            clearTimeout(time_out);
        }
    }, '.search .item');

    var doit;
    $(window).resize(function () {
        $('.item').css('opacity', 1);
        $('.video-info-area').remove();
        $('.clone-video-info-area').remove();
        $('.video-info', '.search').css('display', 'none');
        clearTimeout(doit);
        doit = setTimeout(get_row, 600);
    });

    /*-ajax comment-*/

    var itv;

    $(document).on('submit', '#commentform', function (e) {
        e.preventDefault();

        var locationHashComment = window.location.hash;
        var showElementstag = jQuery('.main-content-col.single-channel .combo-change, .main-content-col.single-channel .cactus-sub-wrap, .main-content-col.single-channel .category-tools, .cactus-listing-wrap .style-channel .page-navigation');
        if (locationHashComment != '' && locationHashComment != null && typeof(locationHashComment) != 'undefined' && locationHashComment.toString().split("-").length == 2) {
            showElementstag.css({'display': 'none'});
            jQuery('.main-content-col.single-channel .discus-none').show();
            jQuery('.main-content-col.single-channel .channel-menu-item').removeClass('active');
            jQuery('.main-content-col.single-channel .channel-menu-item').eq(2).addClass('active');
        }

        if ($('.live-comment').length == 0) {
            // return;
        }
        var $videoflix_livecm_post_id = jQuery('#comments input[name="videoflix_livecm_post_id"]').val();
        var $videoflix_livecm_crtime = jQuery('#comments input[name="videoflix_livecm_crtime"]').val();
        var $videoflix_livecm_refre = jQuery('#comments input[name="videoflix_livecm_refre"]').val();
        var $videoflix_livecm_nuurl = jQuery('#comments input[name="videoflix_livecm_nuurl"]').val();
        var $videoflix_livecm_url_more = jQuery('#comments input[name="videoflix_livecm_url_more"]').val();

        var $videoflix_text_plst = jQuery('#comments input[name="videoflix_text_plst"]').val();
        var $videoflix_text_dlc = jQuery('#comments input[name="videoflix_text_dlc"]').val();
        var $videoflix_text_tfy = jQuery('#comments input[name="videoflix_text_tfy"]').val();
        var $videoflix_text_plwa = jQuery('#comments input[name="videoflix_text_plwa"]').val();

        function testSpaceBar(obj){
            if(obj.value == "") {
                show_error( obj.getAttribute('name') + ' is required.' );
                obj.classList.add('error');
                return false;
            } else {
                var s = obj.value;
                var temp = s.split(" ");
                var str = "";
                for(var i=0; i<temp.length; i++)str=str + temp[i];
                if(str==""){
                    obj.value = str.substring(0,str.length);
                    return false;
                }

                if( obj.getAttribute('name') == 'email' && ! validateEmail( obj.value.trim() ) ) {
                    show_error( obj.getAttribute('name') + ' is not valid.' );
                    obj.classList.add('error');
                    return false;
                }
            }
            obj.classList.remove('error');
            return true;
        };

    
        if (jQuery(this).find('.logged-in-as').length > 0) {
            if (!testSpaceBar(document.getElementById('comment'))) {
                return false;
            } else {
                jQuery(this).find('#submit').css({'opacity': '0.5', 'pointer-events': 'none'});
            }
        } else {
            if (!testSpaceBar(document.getElementById('email')) || !testSpaceBar(document.getElementById('comment')) || !testSpaceBar(document.getElementById('author'))) {
                return false;
            } else {
                jQuery(this).find('#submit').css({'opacity': '0.5', 'pointer-events': 'none'});
            }
        }

        function show_error( msg ) {
            $('#comment-status').html('<p class="ajax-error" >' + msg + '</p>')
            $('#comment-status').addClass('active');
            status_show();
        }

        function status_show() {
            $('#comment-status').addClass('active').removeClass('hide');
            if( itv ) {
                clearInterval( itv );
                itv = setInterval(function(){$('#comment-status').removeClass('active').addClass('hide');clearInterval(itv);}, 2000);
            } else {
                itv = setInterval(function(){$('#comment-status').removeClass('active').addClass('hide');clearInterval(itv);}, 2000);
            }
        }

        function validateEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

        function formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        }

        function isNumber(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }

        function replaceAll(find, replace, str) {
            return str.replace(new RegExp(find, 'g'), replace);
        }

        var id_comment = "#load-comment-" + $videoflix_livecm_post_id;

        function checkNumberCommentPlus(data) {
            var defaultNumber = replaceAll(',', '', jQuery(id_comment).parents('#comments').find('#tdt-f-number-calc').text());
            if (isNumber(defaultNumber)) {
                jQuery(id_comment).parents('#comments').find('#tdt-f-number-calc').text(formatNumber(parseFloat(defaultNumber) + (data.split('<!-- #comment-## -->').length - 1)));
            }
        }

        function setIDDateComments() {
            var strListID = '';
            var lengthComments = jQuery('#comments .comment').length;
            jQuery('#comments .comment').each(function (index, element) {
                var commentID = $(this).attr('id');
                if (index == lengthComments - 1) {
                    strListID += (commentID.split('-')[1]);
                } else {
                    strListID += (commentID.split('-')[1]) + ',';
                }
            });

            jQuery('#list_cm').val(strListID);
        }

        var intDate = 0;
        var nowDate =
            intDate = new Date().getTime();


        var refreshId;

        function createAutoRefresh() {
            $dateim = $videoflix_livecm_crtime;
            $i = 0;
            refreshId = setInterval(function () {
                $i++;
                if ($i > 1) {
                    $dateim = Math.round((parseFloat($dateim) + 10));
                }
                $idliscm = jQuery('#list_cm').val();
                var $url = $videoflix_livecm_nuurl + "&idlist=" + ($idliscm) + '&dateim=' + ($dateim);
                $url = ($url.split("amp;").join(""));
                jQuery.get($url, function (data) {
                    jQuery(".comment-list").prepend(data);
                    setIDDateComments();
                    checkNumberCommentPlus(data);
                });
            }, 10000);
        }
        createAutoRefresh();

        function clearInterValAutoRefresh() {
            if (refreshId != null) {
                clearInterval(refreshId);
            }
        }

        jQuery(id_comment).click(function () {
            $idliscm = jQuery('#list_cm').val();
            $page_cm = jQuery('#page_cm').val();
            var $url = $videoflix_livecm_url_more + "&idlist=" + ($idliscm) + "&page=" + ($page_cm);
            $url = ($url.split("amp;").join(""));
            clearInterValAutoRefresh();
            jQuery(id_comment).css({'pointer-events': 'none'});
            jQuery(id_comment).find('.load-title').hide();
            jQuery(id_comment).find('.fa-sync').removeClass('hide').addClass('fa-spin');

            jQuery.get($url, function (data) {
                jQuery(".comment-list").append(data);
                setIDDateComments();
                jQuery(id_comment).css({'pointer-events': 'auto'});
                jQuery(id_comment).find('.load-title').show();
                jQuery(id_comment).find('.fa-sync').addClass('hide').removeClass('fa-spin');
                createAutoRefresh();
                if (data == '') {
                    jQuery(id_comment).remove();
                }
            });
        });


        var commentform = $('#commentform');
        /*-find the comment form-*/
        var statusdiv = $('#comment-status');
        /*-define the infopanel-*/
        /*-serialize and store form data in a variable-*/
        var formdata = commentform.serialize();
        if ($('input[name=comment]').val() == '') {
            statusdiv.html('<p class="ajax-error" >' + $videoflix_text_plst + '</p>');
            $('#commentform #submit').removeAttr("style");
            return false;
        }
        /*-Add a status message-*/
        statusdiv.html('<p>Processing...</p>');
        status_show();
        /*-Extract action URL from commentform-*/
        var formurl = commentform.attr('action');
        /*-Post Form with data-*/
        $.ajax({
            type: 'post',
            url: formurl,
            data: formdata,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                statusdiv.html('<p class="ajax-error" >' + $videoflix_text_dlc + '</p>');
                $('#commentform #submit').removeAttr("style");
                $('#cancel-comment-reply-link').trigger('click');
                status_show();
            },
            success: function (data, textStatus) {
                if (data == "success" || textStatus == "success") {
                    statusdiv.html('<p class="ajax-success" >' + $videoflix_text_tfy + '</p>');
                    commentform.find('input[name=comment]').val('');
                    status_show();
                    $('#cancel-comment-reply-link').trigger('click');
                } else {
                    statusdiv.html('<p class="ajax-error" >' + $videoflix_text_plwa + '</p>');
                    commentform.find('input[name=comment]').val('');
                    status_show();
                    $('#cancel-comment-reply-link').trigger('click');
                }
                $('#commentform #submit').removeAttr("style");
                $("#comment").val('');
            }
        });
        return false;
    });

    $('#myScrollspy a', '.user-profile').on("click", function (e) {
        e.preventDefault();
        var $this = $(this);
        var areaId = "#" + $this.attr('href').slice(1);
        $('html, body').animate({
            scrollTop: $(areaId).offset().top - 40
        }, 500);
        $("#your-profile > div").removeClass('active');
        $this.parents("#myScrollspy").find('li').removeClass('active');
        $this.parent().addClass('active');
        $(areaId).addClass("active");
    });

    $(document).on('click', '.btn-watch-later-nf', function (evt) {
        thebtn = $(this);
        var video_id = thebtn.attr('data-id');
        if (video_id != '') {
            if (!thebtn.hasClass("added") && !thebtn.hasClass("check")) {
                thebtn.children('i').addClass('fa-spin');
                thebtn.find('.icon i').addClass('fa-spin');
            }
            action = thebtn.attr('data-action');
            $.post({
                data: {action: 'add_watch_later', id: video_id, url: location.href, do: action},
                url: cactus.ajaxurl,
                success: function (result) {
                    res = JSON.parse(result);
                    if (res.status == 1) {
                        thebtn.addClass('added');
                        thebtn.find('.icon i').addClass('fa-check');
                        thebtn.find('.icon i').removeClass('fa-plus');
                        var watch_later = thebtn.attr('data-title');
                        thebtn.find('.text').text(watch_later);
                        // $("li").find("[data-id='" + video_id + "']").children('i').addClass('fa-check').removeClass('fa-spin');
                        // $("li").find("[data-id='" + video_id + "']").next().find('span').show().text('Remove from Watch Later');
                    } else if (res.status == 0) {
                        // show message
                        div = $('<div class="mouse-message font-size-1">' + res.message + '</div>');
                        position = thebtn.offset();
                        div.css({
                            top: position.top + 34,
                            left: position.left
                        });
                        div.appendTo('body');

                        $(document).mouseup(function (e) {
                            if (!div.is(e.target)
                                && div.has(e.target).length === 0) {
                                div.hide();
                            }
                        });
                    } else if (res.status == -1) {
                        // remove from list
                        thebtn.children('i').removeClass('fa-check');
                        thebtn.next().find('span').hide();
                        thebtn.closest('.watch-later-item').remove();
                    }
                    thebtn.find('.icon i').removeClass('fa-spin');
                },
                error: function () {
                    alert('fail');
                    thebtn.children('i').removeClass('fa-spin');
                }
            });
        }

        evt.stopPropagation();
        return false;
    });

    var timer;

    $(window).on('scroll', function () {
        if ($(window).outerWidth() > 768) {
            if ($('body').hasClass('user-profile')) {
                var menu_top = $('#myScrollspy .nav-stacked').offset().top;
                var menu_height = $('#myScrollspy .nav-stacked').outerHeight(true);
                var right_content_height = $('.user-profile .right-side').outerHeight(true);
                var right_content_top = $('.user-profile .right-side').offset().top;
                if ($(window).scrollTop() > $('.author-avatar').offset().top + $('.author-avatar').height()) {
                    if (menu_top + menu_height >= right_content_height + right_content_top) {
                        $('#myScrollspy .nav').css('position', 'absolute');
                        $('#myScrollspy .nav').css('top', right_content_height + right_content_top - menu_height - 100);
                        $('#myScrollspy .nav').addClass('active');
                    } else if ($(window).scrollTop() < right_content_height + right_content_top - menu_height - 100) {
                        $('#myScrollspy .nav').addClass('active');
                        $('#myScrollspy .nav').css('top', '25px');
                        $('#myScrollspy .nav').css('position', 'fixed');
                    }
                } else {
                    $('#myScrollspy .nav').removeClass('active');
                    $('#myScrollspy .nav').css('position', 'initial');
                }
            }
        }
    });

    $(window).on('resize', function () {
        if ($(window).outerWidth() < 768) {
            if ($('body').hasClass('user-profile')) {
                $('#myScrollspy .nav').removeClass('active');
                $('#myScrollspy .nav').css('position', 'initial');
            }
        }
    });
    var canBeLoaded = true;

    // load more post when scrolling in category page
    if ($(".post-category")[0] && !$('body').hasClass('single-ct_actor')) {
        var bottomOffset = 2000;
        $(window).scroll(function () {
            var data = {
                'action': 'loadmore_post_by_cat',
                'query': loadmore_params.posts,
                'page': loadmore_params.current_page
            };
            if ($(document).scrollTop() > ($(document).height() - bottomOffset) && canBeLoaded == true) {
                $.ajax({
                    url: loadmore_params.ajaxurl,
                    data: data,
                    type: 'POST',
                    beforeSend: function (xhr) {
                        canBeLoaded = false;
                    },
                    success: function (data) {
                        if (data) {
//                                $('#main').find('article:last-of-type').after( data );
                            $('.video-info').before(data);
                            canBeLoaded = true;
                            loadmore_params.current_page++;
                        } else {
                            canBeLoaded = false;
                        }
                        get_row();
                    }
                });
            }
        });
    }

    if( $('.row-channel').length ) {
        var bottomOffset = 2000;
        $(window).scroll(function () {
            var data = {
                'action': 'loadmore_post_by_channel',
                'query': loadmore_params.posts,
                'page': loadmore_params.current_page,
                'id': $('.row-channel').attr('data-id'),
            };
            if ($(document).scrollTop() > ($(document).height() - bottomOffset) && canBeLoaded == true) {
                $.ajax({
                    url: loadmore_params.ajaxurl,
                    data: data,
                    type: 'POST',
                    beforeSend: function (xhr) {
                        canBeLoaded = false;
                    },
                    success: function (data) {
                        if (data) {
                            $('.video-info').before(data);
                            canBeLoaded = true;
                            loadmore_params.current_page++;
                        } else {
                            canBeLoaded = false;
                        }
                        get_row();
                    }
                });
            }
        });
    }

    // load video single actor

    if ($('body').hasClass('single-ct_actor')) {
        var bottomOffset = 2000;
        var $container = $('.main .post-category');
        $(window).scroll(function () {
            if ($container.hasClass('loaded')) return;
            var data = {
                'action': 'loadmore_post_by_actor',
                'page': loadmore_params.current_page,
                'actor_id': loadmore_params.post_id,
            };
            if ($(document).scrollTop() > ($(document).height() - bottomOffset) && canBeLoaded == true) {
                $.ajax({
                    url: loadmore_params.ajaxurl,
                    data: data,
                    type: 'POST',
                    beforeSend: function (xhr) {
                        canBeLoaded = false;
                    },
                    success: function (data) {
                        if (data != 'videoflix-No-Video') {
                            $container.append(data);
                            loadmore_params.current_page++;
                            canBeLoaded = true;
                        } else {
                            $container.addClass('loaded');
                        }
                        get_row();
                    }
                });
            }
        });
    }

    // load more channels when scrolling in channel page
    if ($(".all-channels")[0]) {
        $(document).on('scroll', function () {
            var data = {
                'action': 'loadmore_channel',
                'query': loadmore_channel_params.query_vars,
                'page': loadmore_channel_params.current_page
            };
            if ($(this).scrollTop() >= $('.all-channels div.channel:last').position().top && canBeLoaded == true) {
                $.ajax({
                    url: loadmore_channel_params.ajaxurl,
                    data: data,
                    type: 'POST',
                    beforeSend: function (xhr) {
                        canBeLoaded = false;
                    },
                    success: function (data) {
                        if (data) {
                            $('.all-channels').append(data);
                            canBeLoaded = true;
                            loadmore_channel_params.current_page++;
                        } else {
                            canBeLoaded = false;
                        }
                    }
                });
            }
        });

    }

    // video detail

    $(document).ajaxStop(function () {
        if ($('.trailer-tab').length) {
            var $trailer = $('.tab-content .trailer-tab');
            if (!$trailer.length) return;

            $('.video-info li a').on('click', function () {
                if (!$(this).attr('href').match(/trailer\-tab/i)) {
                    if ($('.wp-video video').length) {
                        $('.wp-video video')[0].pause();
                    }
                }
            });
        }
    });

})(jQuery);
