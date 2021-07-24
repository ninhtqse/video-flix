<!DOCTYPE html>
<html lang="en-US">
<meta http-equiv="content-type" content="text/html;charset=UTF-8" />
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>VideoFlix &#8211; Premium Video Content WordPress Theme</title>
    <link rel='stylesheet' id='slick-css' href='/client/themes/videoflix/libs/slick/slick101e.css?ver=4.8.15'
        type='text/css' media='all' />
        
    <link rel='stylesheet' id='slick-theme-css'
        href='/client/themes/videoflix/libs/slick/slick-theme101e.css?ver=4.8.15' type='text/css' media='all' />
   
    <link rel='stylesheet' id='bootstrap-css' href='/client/themes/videoflix/css/bootstrap-3.3.77433.css?ver=3.3.7'
        type='text/css' media='all' />
    <link rel='stylesheet' id='ionicons-css'
        href='/client/themes/videoflix/libs/ionicons-2.0.1/css/ionicons.min101e.css?ver=4.8.15' type='text/css'
        media='all' />
    <link rel='stylesheet' id='homepage-css' href='/client/themes/videoflix/css/homepage101e.css?ver=4.8.15'
        type='text/css' media='all' />
    <link rel='stylesheet' id='billboard-css' href='/client/themes/videoflix/css/billboard101e.css?ver=4.8.15'
        type='text/css' media='all' />
   
    <!-- view -->
    <script type='text/javascript' src='/client/js/jquery/jqueryb8ff.js?ver=1.12.4'></script>
</head>

<body
    class="home page-template-default page page-id-23 auto-play wpb-js-composer js-comp-ver-5.4.2 vc_responsive video-pro-nf has-billboard">
    <div class="body-wrap">
        <header>
            <div class="header clearfix">
                <div class="nav-left video-pro-logo">
                    <span class="menu-icon"><i class="fa fa-bars" aria-hidden="true"></i><span>MENU</span></span>
                    <div class="logo">
                        <a href="index.html"><img src="/client/themes/videoflix/images/logo.png"
                                class="img-responsive"></a>
                    </div>
                </div>
                <div class="nav-right clearfix">
                    <!--header search-->
                    <div class="search">
                        <ul class="main-menu-search nav-menu">
                            <li class="menu-search">
                                <a href="javascript:;" class="open-search-main-menu">
                                    <i class="fa fa-search"></i>
                                    <i class="fa fa-times"></i>
                                </a>
                                <ul class="search-main-menu">
                                    <li>
                                        <form action="/" method="get">
                                            <input type="text" placeholder="Search for videos..." name="s" value="">
                                            <i class="fa fa-search" aria-hidden="true"></i>
                                            <input type="submit" value="SEARCH" id="searchsubmit" class="padding-small">
                                        </form>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <!--header search-->
                    <div class="account">
                        <a href="login/index7674.html?redirect_to=http%3A%2F%2Fvideoflix.cactusthemes.com"><i
                                class="fa fa-user"></i>&nbsp;Login</a>
                    </div>
                </div>
                <div class="nav-left menu">
                    <div class="main-menu">
                        <ul class="nav navbar-nav main-navbar">
                            <li id="nav-menu-item-374"
                                class="main-menu-item menu-item-depth-0 menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children parent dropdown">
                                <a href="http://#" class="menu-link  vf-dropdown-toggle disabled main-menu-link"
                                    data-toggle="dropdown">CATEGORIES </a>
                                <ul class="dropdown-menu menu-depth-1">
                                    @foreach ($categories as $item)
                                    <li id="nav-menu-item-49"
                                        class="sub-menu-item menu-item-depth-1 menu-item menu-item-type-taxonomy menu-item-object-category">
                                        <a href="/category/{{ $item->id }}" class="menu-link  sub-menu-link">{{ $item->name }}
                                        </a></li>
                                    @endforeach
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
        <div class="main container-fluid">
            <div class="row ">
                <div class="billboard">
                    <img src="/client/themes/videoflix/images/background-homepage.png"
                        alt="Premium Video Content WordPress Theme">
                    <div class="video">
                        <img width="1903" height="1070" src="/client/uploads/2017/09/pexels-photo-326055.jpg"
                            class="attachment-1903x1080 size-1903x1080 wp-post-image" alt=""
                            srcset="/client/uploads/2017/09/pexels-photo-326055.jpg 1920w, /client/uploads/2017/09/pexels-photo-326055.jpg 300w, /client/uploads/2017/09/pexels-photo-326055.jpg 768w, /client/uploads/2017/09/pexels-photo-326055.jpg 1024w, /client/uploads/2017/09/pexels-photo-326055.jpg 565w, /client/uploads/2017/09/pexels-photo-326055.jpg 1280w"
                            sizes="(max-width: 1903px) 100vw, 1903px" /> </div>
                    <div class="info">
                        <h1><a href="alf-deep-daze-original-mix/index.html">Alf Deep - Daze (Original Mix)</a></h1>
                        <h4>The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the …
                        </h4>
                        <a class="btn btn-play-bb" href="alf-deep-daze-original-mix/index.html"><i class="fa fa-play"
                                aria-hidden="true"></i>Play</a>
                        <a href="watch-later/index.html" class="btn btn-add-list-bb" data-id="1"
                            data-title="Watch later">
                            <i class="fa fa-plus" aria-hidden="true"></i>
                            <span>Add to watch later</span>
                        </a>
                    </div>
                </div>
            </div>
            @foreach ($categories as $item)
            <?php 
                $count = \DB::table('videos')->where('category_id',$item->id)->count();
            ?>
            @if($count > 0)
            <div class="row">
                <div class="title">
                    <h3>
                        <a href="category/edm/index.html">{{ $item->name }}</a>
                    </h3>
                </div>
                <div class="slide">
                    @foreach (\DB::table('videos')->where('category_id',$item->id)->orderBy('created_at','desc')->get() as $video)
                    <div class="slide-item slide-item-146" data-id="1-146">
                        <div class="item-thumb"
                            style="background-image: url(/uploads/{{ $video->avata }})">
                            <div class="top-slide">
                                <a class="btn-play-nf btn-play-nf-sm"
                                    href="video/{{ $video->id }}"></a>
                            </div>
                            <div class="bottom-slide">
                                <span class="like"><i class="ion-heart" aria-hidden="true"></i><span>{{ $video->favourite }}</span></span>
                                <span class="time">{{ $video->time }}</span>
                            </div>
                        </div>
                        <div class="video-short-intro">
                            <div class="main-slide">
                                <div>
                                    <p><a
                                            href="video/{{ $video->id }}">{{$video->name}}</a></p>
                                    <p>
                                        <a href="uploader/netflix/index.html"
                                            class="author cactus-info font-size-1"><span>videoflix</span></a>
                                        / <a href="video/{{ $video->id }}"
                                            target="_self" class="cactus-info" rel="bookmark"><time
                                                datetime="2017-10-02T08:11:31+00:00" class="entry-date updated">{{ $item->created_at }}</time></a> </p>
                                    <p>
                                        ► {{ $video->description }}
                                    </p>
                                    <div class="main-bottom-slide clearfix">
                                        <div class="show-video-info">
                                            <i class="fas fa-sort-down show-detail" data-item-id="146"
                                                data-row-number="1" aria-hidden="true"></i>
                                        </div>
                                        <div class="main-bottom-left-slide">
                                            <ul class="tool-tip">
                                                <li></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    @endforeach
                </div>
            </div>
            @endif
            @endforeach
           
            <nav class="categories-ajax">
                <div class="wp-pagenavi">
                    <a href="javascript:void(0)" data-target=".cactus-listing-config .cactus-sub-wrap"
                        data-template="html/loop/content" id="categories-ajax" class="load-more btn btn-default font-1">
                        <span class="load-title">Load More</span>
                        <i class="fas fa-sync hide" id="load-spin"></i>
                    </a>
                </div>
            </nav>
            <div id="top-channel-2" class="   row widget_top_channels">
                <div class="title">
                    <h3><a href="all-channels/index.html">Channels</a></h3>
                </div>
                <div class="channels-wrap">
                    <div class="channels">
                        <div class="channel clearfix">
                            <div class="channel-content clearfix">
                                <div class="channel-avatar">
                                    <a href="channel/news-politics/index.html" title="NEWS &#038; POLITICS">
                                        <img width="100" height="100"
                                            src="/client/uploads/2017/10/if_msn_2308058.png"
                                            class="attachment-100x100 size-100x100" alt=""
                                            srcset="/client/uploads/2017/10/if_msn_2308058.png 128w, /client/uploads/2017/10/if_msn_2308058-50x50.png 50w"
                                            sizes="(max-width: 100px) 100vw, 100px" />
                                    </a>
                                </div>
                                <div class="channel-info">
                                    <p class="channel-name">
                                        <a href="channel/news-politics/index.html" title="NEWS &#038; POLITICS">
                                            NEWS &#038; POLITICS
                                        </a>
                                    </p>
                                    <p class="channel-interaction"><i class="ion-ios-videocam"></i>
                                        <a href="javascript:void(0)"> 6 videos</a><i class="ion-eye"></i> <a
                                            href="javascript:void(0)">125</a>
                                    </p>

                                    <div class="channel-button " id="">
                                        <a href="login/index2422.html?redirect_to=http%3A%2F%2Fvideoflix.cactusthemes.com%2Fchannel%2Fnews-politics%2F"
                                            class="btn btn-default subscribe font-size-1 metadata-font">
                                            <i class="far fa-circle"></i><i class="fas fa-check"></i>
                                            <span class="first-title">Subscribe</span>
                                            <span class="last-title">Subscribed</span>
                                        </a>
                                        <input type="hidden" name="url_ajax" value="wp-admin/admin-ajax.html">

                                        <span class="font-size-1 metadata-font sub-count">
                                            <span class="subscribe-counter">5</span>
                                        </span>

                                        <span class="info-dot"></span>


                                        <span class="font-size-1 metadata-font sub-count meta-2">
                                            6 videos </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="channel clearfix">
                            <div class="channel-content clearfix">
                                <div class="channel-avatar">
                                    <a href="channel/young-directors/index.html" title="YOUNG DIRECTORS">
                                        <img width="100" height="100"
                                            src="/client/uploads/2017/09/if_share_2308050.png"
                                            class="attachment-100x100 size-100x100" alt=""
                                            srcset="/client/uploads/2017/09/if_share_2308050.png 128w, /client/uploads/2017/09/if_share_2308050-50x50.png 50w"
                                            sizes="(max-width: 100px) 100vw, 100px" />
                                    </a>
                                </div>
                                <div class="channel-info">
                                    <p class="channel-name">
                                        <a href="channel/young-directors/index.html" title="YOUNG DIRECTORS">
                                            YOUNG DIRECTORS
                                        </a>
                                    </p>
                                    <p class="channel-interaction"><i class="ion-ios-videocam"></i>
                                        <a href="javascript:void(0)"> 1 videos</a><i class="ion-eye"></i> <a
                                            href="javascript:void(0)">48</a>
                                    </p>

                                    <div class="channel-button " id="">
                                        <a href="login/index14a2.html?redirect_to=http%3A%2F%2Fvideoflix.cactusthemes.com%2Fchannel%2Fyoung-directors%2F"
                                            class="btn btn-default subscribe font-size-1 metadata-font">
                                            <i class="far fa-circle"></i><i class="fas fa-check"></i>
                                            <span class="first-title">Subscribe</span>
                                            <span class="last-title">Subscribed</span>
                                        </a>
                                        <input type="hidden" name="url_ajax" value="wp-admin/admin-ajax.html">

                                        <span class="font-size-1 metadata-font sub-count">
                                            <span class="subscribe-counter">3</span>
                                        </span>

                                        <span class="info-dot"></span>


                                        <span class="font-size-1 metadata-font sub-count meta-2">
                                            1 videos </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="channel clearfix">
                            <div class="channel-content clearfix">
                                <div class="channel-avatar">
                                    <a href="channel/firm-entertainment/index.html" title="ENTERTAINMENT">
                                        <img width="100" height="100"
                                            src="/client/uploads/2017/10/if_youtube_2308143.png"
                                            class="attachment-100x100 size-100x100" alt=""
                                            srcset="/client/uploads/2017/10/if_youtube_2308143.png 128w, /client/uploads/2017/10/if_youtube_2308143-50x50.png 50w"
                                            sizes="(max-width: 100px) 100vw, 100px" />
                                    </a>
                                </div>
                                <div class="channel-info">
                                    <p class="channel-name">
                                        <a href="channel/firm-entertainment/index.html" title="ENTERTAINMENT">
                                            ENTERTAINMENT
                                        </a>
                                    </p>
                                    <p class="channel-interaction"><i class="ion-ios-videocam"></i>
                                        <a href="javascript:void(0)"> 7 videos</a><i class="ion-eye"></i> <a
                                            href="javascript:void(0)">186</a>
                                    </p>

                                    <div class="channel-button " id="">
                                        <a href="login/index235a.html?redirect_to=http%3A%2F%2Fvideoflix.cactusthemes.com%2Fchannel%2Ffirm-entertainment%2F"
                                            class="btn btn-default subscribe font-size-1 metadata-font">
                                            <i class="far fa-circle"></i><i class="fas fa-check"></i>
                                            <span class="first-title">Subscribe</span>
                                            <span class="last-title">Subscribed</span>
                                        </a>
                                        <input type="hidden" name="url_ajax" value="wp-admin/admin-ajax.html">

                                        <span class="font-size-1 metadata-font sub-count">
                                            <span class="subscribe-counter">7</span>
                                        </span>

                                        <span class="info-dot"></span>


                                        <span class="font-size-1 metadata-font sub-count meta-2">
                                            7 videos </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="channel clearfix">
                            <div class="channel-content clearfix">
                                <div class="channel-avatar">
                                    <a href="channel/videoflix/index.html" title="VideoFlix">
                                        <img width="100" height="100"
                                            src="/client/uploads/2018/06/if_envato_2308069.png"
                                            class="attachment-100x100 size-100x100" alt=""
                                            srcset="/client/uploads/2018/06/if_envato_2308069.png 128w, /client/uploads/2018/06/if_envato_2308069-50x50.png 50w"
                                            sizes="(max-width: 100px) 100vw, 100px" />
                                    </a>
                                </div>
                                <div class="channel-info">
                                    <p class="channel-name">
                                        <a href="channel/videoflix/index.html" title="VideoFlix">
                                            VideoFlix
                                        </a>
                                    </p>
                                    <p class="channel-interaction"><i class="ion-ios-videocam"></i>
                                        <a href="javascript:void(0)"> 0 videos</a><i class="ion-eye"></i> <a
                                            href="javascript:void(0)">61</a>
                                    </p>

                                    <div class="channel-button " id="">
                                        <a href="login/index7e51.html?redirect_to=http%3A%2F%2Fvideoflix.cactusthemes.com%2Fchannel%2Fvideoflix%2F"
                                            class="btn btn-default subscribe font-size-1 metadata-font">
                                            <i class="far fa-circle"></i><i class="fas fa-check"></i>
                                            <span class="first-title">Subscribe</span>
                                            <span class="last-title">Subscribed</span>
                                        </a>
                                        <input type="hidden" name="url_ajax" value="wp-admin/admin-ajax.html">

                                        <span class="font-size-1 metadata-font sub-count">
                                            <span class="subscribe-counter">1</span>
                                        </span>

                                        <span class="info-dot"></span>


                                        <span class="font-size-1 metadata-font sub-count meta-2">
                                            0 videos </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="footer container-fluid">
        <div class="container-fluid footer-top">
            <div id="text-2" class="   col-sm-3 col-md-3 widget_text">
                <h4>Buy Membership</h4>
                <div class="textwidget">
                    <div class="img-area"><img class="avatar avatar-96 photo"
                            src="../localhost/vf//client/uploads/2017/09/home-register.png" alt="" width="96"
                            height="96" /></div>
                    <div class="text-area">Sed ut perspiciatis unde omnis iste natus error sit voluptatem. Sed ut
                        perspiciatis unde omnis iste natus error sit voluptatem.Sed ut perspiciatis unde omnis iste
                        natus error sit voluptatem. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.
                    </div>
                </div>
            </div>
            <div id="nav_menu-2" class="   col-sm-3 col-md-3 widget_nav_menu">
                <h4><i class="fas fa-info"></i> <span>Information<i class="ct-sub-w-title">HOT</i></span></h4>
                <div class="menu-information-container">
                    <ul id="menu-information" class="menu">
                        <li id="menu-item-644"
                            class="menu-item menu-item-type-post_type menu-item-object-page menu-item-644"><a
                                href="all-channels/index.html">All Channels</a></li>
                        <li id="menu-item-645"
                            class="menu-item menu-item-type-post_type menu-item-object-page menu-item-645"><a
                                href="sample-page/index.html">Single Page</a></li>
                        <li id="menu-item-578"
                            class="menu-item menu-item-type-post_type menu-item-object-page menu-item-578"><a
                                href="account/index.html">Account</a></li>
                        <li id="menu-item-583"
                            class="menu-item menu-item-type-post_type menu-item-object-page menu-item-583"><a
                                href="memberships/index.html">Membership List</a></li>
                        <li id="menu-item-588"
                            class="menu-item menu-item-type-post_type menu-item-object-page menu-item-588"><a
                                href="register-2/index.html">Registration</a></li>
                        <li id="menu-item-652"
                            class="menu-item menu-item-type-custom menu-item-object-custom menu-item-652"><a
                                href="https://www.cactusthemes.com/wp/videoflix/">Buy Child Theme</a></li>
                    </ul>
                </div>
            </div>
            <div id="nav_menu-3" class="   col-sm-3 col-md-3 widget_nav_menu">
                <h4>FAQs</h4>
                <div class="menu-faqs-container">
                    <ul id="menu-faqs" class="menu">
                        <li id="menu-item-295"
                            class="menu-item menu-item-type-custom menu-item-object-custom menu-item-295"><a
                                href="#">What is the public domain?</a></li>
                        <li id="menu-item-296"
                            class="menu-item menu-item-type-custom menu-item-object-custom menu-item-296"><a
                                href="#">What is a derivative work?</a></li>
                        <li id="menu-item-297"
                            class="menu-item menu-item-type-custom menu-item-object-custom menu-item-297"><a
                                href="#">What is fair use?</a></li>
                        <li id="menu-item-298"
                            class="menu-item menu-item-type-custom menu-item-object-custom menu-item-298"><a
                                href="#">Where can I find more information on copyright outside the U.S?</a></li>
                    </ul>
                </div>
            </div>
            <div id="custom_html-2" class="widget_text    col-sm-3 col-md-3 widget_custom_html">
                <h4>Connect Us</h4>
                <div class="textwidget custom-html-widget">
                    <p class="email"><a href="cdn-cgi/l/email-protection.html" class="__cf_email__"
                            data-cfemail="9af2fff6f6f5daeae8fff7f3f5b4f9f5f7">[email&#160;protected]</a></p>
                    <p class="address">Washington DC Metro, Durham, NC</p>
                    <ul class="nav navbar-nav navbar-right social-listing list-inline social-accounts">
                        <li class="facebook"><a target="_blank" href="https://www.facebook.com/cactustheme/"
                                title="Facebook"><i class="fab fa-facebook"></i></a></li>
                        <li class="youtube"><a target="_blank" href="https://www.youtube.com/c/CactusThemes"
                                title="YouTube"><i class="fab fa-youtube"></i></a></li>
                        <li class="twitter"><a target="_blank" href="https://twitter.com/cactusthemes"
                                title="Twitter"><i class="fab fa-twitter"></i></a></li>
                        <li class="google-plus"><a target="_blank" href="https://google.com/+CactusThemes"
                                title="Google Plus"><i class="fab fa-google-plus"></i></a></li>

                        <li class="twitch"><a target="_blank" href="#" title="Twitch"><i class="fab fa-twitch"></i></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="container-fluid footer-bottom">
            <div class="footer-info row">
                <span class="copy-right">WordPress Theme by CactusThemes</span>
                <ul class="footer-menu">
                    <li id="menu-item-502"
                        class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-23 current_page_item menu-item-502">
                        <a href="index.html">Home</a></li>
                    <li id="menu-item-503"
                        class="menu-item menu-item-type-custom menu-item-object-custom menu-item-503"><a href="#">About
                            Us</a></li>
                    <li id="menu-item-504"
                        class="menu-item menu-item-type-custom menu-item-object-custom menu-item-504"><a
                            href="#">Contact Us</a></li>
                    <li><a href="#"><span class="arrow-up"><i class="fa fa-angle-up" aria-hidden="true"></i></span></a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="submitModal modal-nf fade" id="videoflix_submit_form">
        <div class="modal-dialog-nf">
            <div class="modal-content-nf">
                <div class="modal-header-nf">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i
                            class="fa fa-times"></i></button>
                    <h4 class="modal-title" id="videoflix_frontend_submit_heading">Submit Video</h4>
                </div>
                <div class="modal-body-nf">
                    <aside id="text-3" class="   user-submit">
                        <style>
                            #text-3 .ct-sub-w-title {
                                color: #FFFFFF !important;
                                background: #FF0000 !important
                            }
                        </style>
                        <div class="widget-inner">
                            <div class="textwidget">
                                <div role="form" class="wpcf7" id="wpcf7-f5-o1" lang="en-US" dir="ltr">
                                    <div class="screen-reader-response"></div>
                                    <form action="/#wpcf7-f5-o1" method="post"
                                        class="wpcf7-form demo" novalidate="novalidate">
                                        <div style="display: none;">
                                            <input type="hidden" name="_wpcf7" value="5" /><br />
                                            <input type="hidden" name="_wpcf7_version" value="5.0.2" /><br />
                                            <input type="hidden" name="_wpcf7_locale" value="en_US" /><br />
                                            <input type="hidden" name="_wpcf7_unit_tag" value="wpcf7-f5-o1" /><br />
                                            <input type="hidden" name="_wpcf7_container_post" value="0" />
                                        </div>
                                        <p>Your Email (required)<br />
                                            <span class="wpcf7-form-control-wrap your-email"><input type="email"
                                                    name="your-email" value="" size="40"
                                                    class="wpcf7-form-control wpcf7-text wpcf7-email wpcf7-validates-as-required wpcf7-validates-as-email"
                                                    aria-required="true" aria-invalid="false" /></span></p>
                                        <p>Video Title<br />
                                            <span class="wpcf7-form-control-wrap post-title"><input type="text"
                                                    name="post-title" value="" size="40"
                                                    class="wpcf7-form-control wpcf7-text" aria-invalid="false" /></span>
                                        </p>
                                        <p>Video Description<br />
                                            <span class="wpcf7-form-control-wrap post-content"><textarea
                                                    name="post-content" cols="40" rows="10"
                                                    class="wpcf7-form-control wpcf7-textarea"
                                                    aria-invalid="false"></textarea></span></p>
                                        <p>Video URL<br />
                                            <span class="wpcf7-form-control-wrap video-url"><input type="text"
                                                    name="video-url" value="" size="40"
                                                    class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required"
                                                    aria-required="true" aria-invalid="false" /></span></p>
                                        <p><input type="submit" value="Submit"
                                                class="wpcf7-form-control wpcf7-submit" /></p>
                                        <div class="wpcf7-response-output wpcf7-display-none"></div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    </div>
    <div class="submitModal modal fade" id="submitReport">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i
                            class="fas fa-times"></i></button>
                    <h4 class="modal-title h4" id="myModalLabel">Report This</h4>
                </div>
                <div class="modal-body">
                    <div role="form" class="wpcf7" id="wpcf7-f512-o2" lang="en-US" dir="ltr">
                        <div class="screen-reader-response"></div>
                        <form action="/#wpcf7-f512-o2" method="post" class="wpcf7-form"
                            novalidate="novalidate">
                            <div style="display: none;">
                                <input type="hidden" name="_wpcf7" value="512" />
                                <input type="hidden" name="_wpcf7_version" value="5.0.2" />
                                <input type="hidden" name="_wpcf7_locale" value="en_US" />
                                <input type="hidden" name="_wpcf7_unit_tag" value="wpcf7-f512-o2" />
                                <input type="hidden" name="_wpcf7_container_post" value="0" />
                            </div>
                            <p>Please fill in all information below to report video.<br />
                                <div class="hidden wpcf7-form-control-wrap report_url">
                                    <div class="wpcf7-form-control wpcf7-validates-as-required"><input name="report-url"
                                            class="hidden wpcf7-form-control wpcf7-text wpcf7-validates-as-required"
                                            type="hidden" value="index.html" /></div>
                                </div>
                            </p>
                            <p>Your Email<br />
                                <span class="wpcf7-form-control-wrap your-email"><input type="email" name="your-email"
                                        value="" size="40"
                                        class="wpcf7-form-control wpcf7-text wpcf7-email wpcf7-validates-as-required wpcf7-validates-as-email"
                                        aria-required="true" aria-invalid="false" /></span></p>
                            <p>Please tell us why do you think this video is inappropriate<br />
                                <span class="wpcf7-form-control-wrap your-message"><textarea name="your-message"
                                        cols="40" rows="10"
                                        class="wpcf7-form-control wpcf7-textarea wpcf7-validates-as-required"
                                        aria-required="true" aria-invalid="false"></textarea></span></p>
                            <p><input type="submit" value="Send" class="wpcf7-form-control wpcf7-submit" /></p>
                            <div class="wpcf7-response-output wpcf7-display-none"></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- view -->
    <script type='text/javascript' src='/client/themes/videoflix/libs/slick/slick.minaff7.js?ver=1.6.0'></script>
    <script type='text/javascript' src='/client/themes/videoflix/js/script101e.js?ver=4.8.15'></script>
</body>
</html>