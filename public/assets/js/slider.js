function simpleCarousel(n,i=5e3){var e=$(n).find("ul li.slide").length,l=0;function t(){$(n).find("ul li.slide").each((function(n){n==l?$(this).fadeIn():$(this).fadeOut()}))}function c(){(l+=1)>=e&&(l=0),t()}setInterval((function(){c()}),i),$(n).find("a.control_prev").click((function(){(l-=1)<0&&(l=e-1),t()})),$(n).find("a.control_next").click((function(){c()}))}$(document).ready((function(){simpleCarousel($(".simple-carousel"),5e3)}));