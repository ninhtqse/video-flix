;(function ($) {
	//'use strict';
    $( function () {

    	$('#video-back').on('click',function(e){
            window.history.back();
            return false;
        });
        
		/*-ajax comment-*/

		var itv;

		$(document).on('submit','#commentform',function(e){
			e.preventDefault();

			var locationHashComment = window.location.hash;
			var showElementstag = jQuery('.main-content-col.single-channel .combo-change, .main-content-col.single-channel .cactus-sub-wrap, .main-content-col.single-channel .category-tools, .cactus-listing-wrap .style-channel .page-navigation');
			if(locationHashComment!='' && locationHashComment!=null && typeof(locationHashComment)!='undefined' && locationHashComment.toString().split("-").length == 2){
				showElementstag.css({'display':'none'});
				jQuery('.main-content-col.single-channel .discus-none').show();
				jQuery('.main-content-col.single-channel .channel-menu-item').removeClass('active');
				jQuery('.main-content-col.single-channel .channel-menu-item').eq(2).addClass('active');
			};

			if($('.live-comment').length==0){
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

			if(jQuery(this).find('.logged-in-as').length > 0) {
					if(!testSpaceBar(document.getElementById('comment'))) {
						return false;
					}else{
						jQuery(this).find('#submit').css({'opacity':'0.5', 'pointer-events':'none'});
					};
				}else{
					if(!testSpaceBar(document.getElementById('email')) || !testSpaceBar(document.getElementById('comment')) || !testSpaceBar(document.getElementById('author')) ) {
						return false;
					}else{
						jQuery(this).find('#submit').css({'opacity':'0.5', 'pointer-events':'none'});
				};
			};

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

			function formatNumber (num) {return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");};
			function isNumber(n) {return !isNaN(parseFloat(n)) && isFinite(n);};
			function replaceAll(find, replace, str) {return str.replace(new RegExp(find, 'g'), replace);}

			var id_comment = "#load-comment-"+$videoflix_livecm_post_id;
			function checkNumberCommentPlus(data){
				var defaultNumber = replaceAll(',','',jQuery(id_comment).parents('#comments').find('#tdt-f-number-calc').text());
				if(isNumber(defaultNumber)) {
					jQuery(id_comment).parents('#comments').find('#tdt-f-number-calc').text(formatNumber(parseFloat(defaultNumber)+(data.split('<!-- #comment-## -->').length-1)));
				};
			};

			function setIDDateComments(){
				var strListID = '';
				var lengthComments = jQuery('#comments .comment').length;
				jQuery('#comments .comment').each(function(index, element) {
					var commentID = $(this).attr('id');
					if(index == lengthComments-1){
						strListID+=(commentID.split('-')[1]);
					}else{
						strListID+=(commentID.split('-')[1])+',';
					}
				});

				jQuery('#list_cm').val(strListID);
			}
			var intDate=0;
			var nowDate =
				intDate = new Date().getTime();


			var refreshId;
			function createAutoRefresh(){
				return;
				$dateim = $videoflix_livecm_crtime;
				$i =0;
				refreshId = setInterval(function(){
					$i ++;
					if($i>1){
						$dateim = Math.round((parseFloat($dateim) + 10));
					}
					$idliscm = jQuery('#list_cm').val();
					var $url = $videoflix_livecm_nuurl+"&idlist="+($idliscm)+'&dateim='+($dateim);
					$url = ($url.split("amp;").join(""));
					jQuery.get($url, function( data ) {
						jQuery(".comment-list").prepend(data);
						setIDDateComments();
						checkNumberCommentPlus(data);
					});
				}, 10000);
			};
			createAutoRefresh();
			function clearInterValAutoRefresh(){
				if(refreshId!=null) {
					clearInterval(refreshId);
				};
			};

			jQuery(id_comment).click(function(){
				$idliscm = jQuery('#list_cm').val();
				$page_cm = jQuery('#page_cm').val();
				var $url = $videoflix_livecm_url_more+"&idlist="+($idliscm)+"&page="+($page_cm);
				$url = ($url.split("amp;").join(""));
				clearInterValAutoRefresh();
				jQuery(id_comment).css({'pointer-events':'none'});
				jQuery(id_comment).find('.load-title').hide();
				jQuery(id_comment).find('.fa-sync').removeClass('hide').addClass('fa-spin');

				jQuery.get($url, function( data ) {
					jQuery(".comment-list").append(data);
					setIDDateComments();
					jQuery(id_comment).css({'pointer-events':'auto'});
					jQuery(id_comment).find('.load-title').show();
					jQuery(id_comment).find('.fa-sync').addClass('hide').removeClass('fa-spin');
					createAutoRefresh();
					if(data=='') {
						jQuery(id_comment).remove();
					};
				});
			});


			var commentform=$('#commentform'); /*-find the comment form-*/
			var statusdiv=$('#comment-status'); /*-define the infopanel-*/
			/*-serialize and store form data in a variable-*/
			var formdata = commentform.serialize();
			if($('textarea[name=comment]').val() == ''){
				statusdiv.html('<p class="ajax-error" >' + $videoflix_text_plst + '</p>');
				statusdiv.addClass('active')
				$('#commentform #submit').removeAttr("style");
				setTimeout(function(){statusdiv.removeClass('active')}, 2000);
				return false;
			}

			// check required before submit

			/*-Add a status message-*/
			statusdiv.html('<p>Processing...</p>');
			statusdiv.addClass('active');
			status_show();
			/*-Extract action URL from commentform-*/
			var formurl=commentform.attr('action');
			/*-Post Form with data-*/

			$.ajax({
				type: 'post',
				url: formurl,
				data: formdata,
				error: function(XMLHttpRequest, textStatus, errorThrown)
				{
					statusdiv.html('<p class="ajax-error" >'+$videoflix_text_dlc+'</p>');
					$('#commentform #submit').removeAttr("style");
					$('#cancel-comment-reply-link').trigger('click');
					status_show();
				},
				success: function(data, textStatus){
					if(data == "success" || textStatus == "success"){
						commentform.find('input[name=comment]').val('');
						
						statusdiv.html('<p class="ajax-success" >'+$videoflix_text_tfy+'</p>');
						status_show();
						
						$('#cancel-comment-reply-link').trigger('click');
					}else{
						statusdiv.html('<p class="ajax-error" >'+$videoflix_text_plwa+'</p>');
						commentform.find('input[name=comment]').val('');
						$('#cancel-comment-reply-link').trigger('click');
						status_show();
					}
					$('#commentform #submit').removeAttr("style");
					$("#comment").val('');
				}
			});
			return false;
		});
    }); // end documentReady

	function validateEmail(email) {
	    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(String(email).toLowerCase());
	}
}(jQuery));