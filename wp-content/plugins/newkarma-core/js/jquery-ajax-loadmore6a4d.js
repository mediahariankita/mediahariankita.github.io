(function($,window,document){$.fn.infiniteLoad=function(options){var settings=$.extend({navSelector:'',contentSelector:'',nextSelector:'',itemSelector:'',paginationType:'more',loadingImage:'',loadingText:'',loadingButtonLabel:'Load More',loadingButtonClass:'',loadingFinishedText:'No More Posts Available',},options);var loading=false;var loaded=false;var url=false;var infiniteHtml='';var infiniteText='';var moreHtml='';var _init=function(){if($(settings.navSelector).length&&$(settings.contentSelector).length&&$(settings.nextSelector).length&&$(settings.itemSelector).length)
{url=$(settings.nextSelector).attr('href');_setup_element();}
else
{return false;}}
var _setup_element=function(){$(settings.navSelector).hide();infiniteHtml=((settings.loadingImage!='')?''+settings.loadingImage+'':'');infiniteText=((settings.loadingText!='')?'<div class="gmr-ajax-text">'+settings.loadingText+'</div>':'');moreHtml='<input type="button" class="'+settings.loadingButtonClass+'" value="'+settings.loadingButtonLabel+'" />';$(settings.navSelector).before('<div class="gmr-ajax-load-wrapper gmr-load-more">'+moreHtml+'</div>');}
var _load=function(){if(!url)
return false;loading=true;var lastElem=$(settings.contentSelector).find(settings.itemSelector).last();$(document).trigger('gmr_infinite_load_start');$.ajax({url:url,dataType:'html',success:function(response){loading=false;if(settings.paginationType=='infinite')
$('.gmr-loader').hide();var obj=$(response),elem=obj.find(settings.itemSelector),next=obj.find(settings.nextSelector);lastElem.after(elem);$(document).trigger('gmr_infinite_load_success');if(next.length){url=next.attr('href');}
else{loaded=true;$(document).trigger('gmr_infinite_load_complete');}}});};$(document).on('click','.gmr-load-more',function(){$('.gmr-ajax-load-wrapper').html(infiniteHtml+' '+infiniteText);_load();});$(document).on('gmr_infinite_load_start',function(){$('.gmr-ajax-load-wrapper').show();});$(document).on('gmr_infinite_load_success',function(){$('.gmr-ajax-load-wrapper').html(moreHtml);});$(document).on('gmr_infinite_load_complete',function(){$('.gmr-ajax-load-wrapper').html(settings.loadingFinishedText).show();});_init();};}(jQuery,window,document));