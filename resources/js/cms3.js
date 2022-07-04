function loadMarkDown(file, isHome) {
	
	let filepath = file;
	let xhr = new XMLHttpRequest();
	var md = new remarkable.Remarkable({
		html:         true,        // Enable HTML tags in source
		xhtmlOut:     false,        // Use '/' to close single tags (<br />)
		breaks:       false,        // Convert '\n' in paragraphs into <br>
		langPrefix:   'language-',  // CSS language prefix for fenced blocks
		typographer:  false,
		quotes: '“”‘’',
		highlight: function (/*str, lang*/) { return ''; }
	});
	
	xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
			let mdText = xhr.responseText;
			let htmlText = md.render(mdText);
      htmlText = htmlText.replaceAll("<table>", '<table class="u-full-width">');
			$("#tab-location").html(htmlText);
			
			$( "h1" ).each(function( index ) {
				let name = $( this ).text();
				$( this ).attr("id", name.replaceAll(" ","_"));
				let alink = $('<a>',{
					class: "navbar-link",
					id: "#sub"+name.replaceAll(" ","_"),
					text: name, //href: "#"+name.replaceAll(" ","_"),
					onclick: "moveto(this)"  
				});
				$("#navbar-ul").append($('<li class="navbar-item"></li>').attr("id", name.replaceAll(" ","_")+"_navitem").append(alink));
			});
			
			$('.tab-content').children('h2').each(function( index ) {
				var name = $( this ).text();
				var parSec = $(this).prevAll( 'h1' ).first().attr('id');
				var name2 = parSec+"-"+name;
				$( this ).attr("id", name2.replaceAll(" ","_"));
				
				var alink = $('<a>', {class: "popover-link", id: "#"+name2.replaceAll(" ","_"), text: name, onclick: "moveto(this)"  });
				var litem = $("<li>", {class: "popover-item", id: name2.replaceAll(" ","_")}).append(alink);
				
				if ($("#sub_"+parSec).length !== 0) {
					$("#sub_"+parSec).append(litem);  // sub_parSec is ul
				} else {
					$("#"+parSec+"_navitem > a").attr("href", "#").attr('onclick', "openingPopover(this)");
					$("#"+parSec+"_navitem > a").removeAttr("href");//.removeAttr("onclick");
          $("#"+parSec+"_navitem > a").html($("#"+parSec+"_navitem > a").text()+'&nbsp;<span class="mu mu-down"></span>');
					let subdiv = $("<div>", {id: "sub"+parSec.replaceAll(" ","_"), class: "popover", });
					let ulist = $("<ul>", {class: "popover-list", id: "sub_"+parSec.replaceAll(" ","_")});
					let parlink = $('<a>', {class: "popover-link", id: "#"+parSec.replaceAll(" ","_"), text: parSec, onclick: "moveto(this)"});
					let paritem = $("<li>", {class: "popover-item", id: parSec.replaceAll(" ","_")}).append(parlink);
					ulist.append(paritem);
					ulist.append(litem);
					subdiv.append(ulist);
					$("#"+parSec+"_navitem").append(subdiv);
				}
			})
			$("h1, h2").each(function( index ) {
				let name = $( this ).attr("id");
				$( this ).wrap($("<div></div>").attr("class", "secs").attr("id", name));
			})
		}
	}
	xhr.open('GET', filepath);
  xhr.send();
	//return text
}

function closePopover() {
	if($('.popover.open').length > 0) {
		$('.popover').removeClass('open')
	}
}

function openingPopover(e) {
	if ($('div'+e.id).hasClass('open')) {
		closePopover();	
	} else {
		closePopover();	
		$('div'+e.id).addClass('open');
	}
}

function moveto(e) {
	let id1 = e.id;
	if (id1[0]!="#") {
		id1 = "#"+e.id
	}
	target = $(".secs"+id1);
	console.log(target);
	if (target.length==0) {
		if (id1.includes("sub")) {
			id1 = id1.replace("sub", "");
		} else {
			id1 = id1.replace("#", "#sub");
		}
		target = $(".secs"+id1);
	}
	console.log(target.length);
	//window.scroll(500, target.position().top,); // behavior: 'smooth'
	window.scrollTo({
		top: target.position().top,
		behavior: 'smooth'
	});
	closePopover();
}

function changeTitle(config, callback, callback2) {
	window.top.document.title = config["site_title"];
	$("meta[name='title']").attr('content', config["site_title"]);
	$("meta[name='keywords']").attr('content', config["keywords"]);
	$("meta[name='author']").attr('content', config["author"]);
	$("meta[name='description']").attr('content', config["description"]);
	$("#siteName").text(config["site_title"]);
	$('#siteNameNav').text(config["nav_title"]);
	$('#siteDesc').text(config["description"]);
	if (config.hasOwnProperty("bibtex")) {
		let bibEle = $('<bibtex id="bibFilePath"></bibtex>').attr("src", config["bibtex"]);
		$("body").prepend(bibEle); 
		let scriptEle = $("<script></script>").attr("src", "resources/js/bibtex_js.js");
		$("body").append(scriptEle); 
	};
  //let scriptEle = $("<script></script>").attr("src", "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js");
  //$("body").append(scriptEle); 
  
	callback(config, callback2);
}

function loadingFiles(config, callback2) {
	let file = config["markdown_file"];
	loaded = loadMarkDown(file);
  
	callback2();
}
/*
function init_site() {
	function resize() {
		$body.removeClass('has-docked-nav')
		navOffsetTop = $nav.offset().top
		onScroll()
	}
	
	function onScroll() {
		if($('.navbar').offset().top < $(window).scrollTop() && !$('body').hasClass('has-docked-nav')) {
			$('body').addClass('has-docked-nav')
			$("#siteNameNav").css( "display", "block" );
		}
		if($('.navbar').offset().top > $(window).scrollTop() && $('body').hasClass('has-docked-nav')) {
			$('body').removeClass('has-docked-nav')
			$("#siteNameNav").css( "display", "none" );
		}
	}
	$(window).on('scroll', onScroll);
	$(window).on('resize', resize);
}*/

function draw_Fig1(canvas) {
  const data = {
    labels: publicationByYear["year"],
    datasets: [{
      label: 'Article',
      backgroundColor: publicationByYear["color"]["article"],
      borderColor: publicationByYear["color"]["article"],
      data: publicationByYear["article"],
    }, {
      label: 'Book Chapter',
      backgroundColor: publicationByYear["color"]["bookchapter"],
      borderColor: publicationByYear["color"]["bookchapter"],
      data: publicationByYear["bookchapter"],
    }, {
      label: 'Other',
      backgroundColor: publicationByYear["color"]["other"],
      borderColor: publicationByYear["color"]["other"],
      data: publicationByYear["other"],
    }, 
    ]
  };

  const thisconfig = {
    type: 'bar',
    data: data,
    options: {
      plugins: {
        title: {
          display: true,
          text: "Publications by year",
          font: {
              family: 'Quicksand',
              size: 20,
              weight: 'bold',
              lineHeight: 1.2
          },
        }
      }, 
      scales: {
        x: {
          stacked: true,
          title: {
            display: true,
            text: 'Year',
            font: {
              family: 'Quicksand',
              size: 16,
              weight: 'bold',
              lineHeight: 1.2,
            },
            padding: {top: 10, left: 0, right: 0, bottom: 0}
          }
        },
        y: {
          beginAtZero: true,
          stacked: true,
          min: 0,
          max: 5,
          ticks: {stepSize: 1},
          title: {
            display: true,
            text: 'Count',
            font: {
              family: 'Quicksand',
              size: 16,
              weight: 'bold',
              lineHeight: 1.2
            },
            padding: {top: 30, left: 0, right: 0, bottom: 0}
          }
        }
      },
    }
  };
  
  const myChart = new Chart(
    canvas,
    thisconfig
  );
}

function draw_Fig2(canvas) {
  const data = {
    labels: citationByYear["year"],
    datasets: [{
      //label: 'Article',
      backgroundColor: citationByYear["color"],
      borderColor: citationByYear["color"],
      data: citationByYear["cite"],
    }
    ]
  };

  const thisconfig = {
    type: 'bar',
    data: data,
    options: {
      plugins: {
        title: {
          display: true,
          text: "Citation by year",
          font: {
              family: 'Quicksand',
              size: 20,
              weight: 'bold',
              lineHeight: 1.2
          },
        }, 
        legend: {display: false}
      }, 
      scales: {
        x: {
          stacked: true,
          title: {
            display: true,
            text: 'Year',
            font: {
              family: 'Quicksand',
              size: 16,
              weight: 'bold',
              lineHeight: 1.2,
            },
            padding: {top: 20, left: 0, right: 0, bottom: 0}
          }
        },
        y: {
          beginAtZero: true,
          stacked: true,
          min: 0,
          max: 40,
          ticks: {stepSize: 10},
          title: {
            display: true,
            text: 'Count',
            font: {
              family: 'Quicksand',
              size: 16,
              weight: 'bold',
              lineHeight: 1.2
            },
            padding: {top: 30, left: 0, right: 0, bottom: 0}
          }
        }
      },
    }
  };
  
  const myChart = new Chart(
    canvas,
    thisconfig
  );
}

function waitForElm(selector) {
  return new Promise(resolve => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }
    const observer = new MutationObserver(mutations => {
    if (document.querySelector(selector)) {
      resolve(document.querySelector(selector));
      observer.disconnect();
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}

// when the document has loaded, start polling
$(window).load(function () {
  waitForElm('#publicationByYear').then((canvas) => {
    draw_Fig1(canvas);
  });
  waitForElm('#citationByYear').then((canvas) => {
    draw_Fig2(canvas);
  });
});


function postProcessing() {
  console.log(2);
}

//document.addEventListener('DOMContentLoaded', function(event) {
$(document).ready(function() {
  //the event occurred
	changeTitle(config, loadingFiles, postProcessing);
	//init_site();
})
