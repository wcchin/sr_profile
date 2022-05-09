var allPages = [];

function loadMarkDown(file, isHome) {
	let name = file["name"];
	
	let alink = $('<a>',{
		class: "navbar-link",
		text: name,
		href: "#"+name.toLowerCase()
	});//.appendTo($("#navbar-ul"));
	if (isHome) {
		alink.addClass("active");
	}
	$("#navbar-ul").append($('<li class="navbar-item"></li>').append(alink));
	
	let tab = $('<div>', {
		class: "tab-pane",
		id: name.toLowerCase()
	});
	if (isHome) {
		tab.addClass("active");
	}
	$("#tab-location").append(tab);
	
	let filepath = file["path"];
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
	//var text = "";
	xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
			let mdText = xhr.responseText;
			let htmlText = md.render(mdText);
			$("#"+name.toLowerCase()).html(htmlText);
			var aPage = {title: name, key: name.toLowerCase(), url: "#"+name.toLowerCase(), content: mdText, htmltext: htmlText};
			allPages.push(aPage);
		}
	}
	xhr.open('GET', filepath);
  xhr.send();
	//return text
}


function changeTitle(config, callback) {
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
	callback(config);
	
}

function loadingFiles(config) {
	let files = config["pages"];
	for (f in files) {
		let file = files[f];
		let isHome = false;
		if (file["name"]==config["indexPage"]) {
			isHome = true;
		}
		let loaded = loadMarkDown(file, isHome);
	}
}

document.addEventListener('DOMContentLoaded', function(event) {
  //the event occurred
	changeTitle(config, loadingFiles);
	
})