document.addEventListener("DOMContentLoaded", function(event) {
    console.log();
});


function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" is-active", "");
  }
    //window.alert(tablinks[0].className)

    //window.alert(evt.currentTarget.parentNode.className)
  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.parentNode.className += " is-active";
}

function expandCard(evt, cardName) {
  var i, cardcontent, spn;
    
  cardcontent = document.getElementById(cardName)
  cardcontent2 = document.getElementById(cardName+"2")
  spn = evt.currentTarget.childNodes[0]
  //window.alert(cardcontent.length)
    
  if (cardcontent.className.includes("is-hidden")) {
    cardcontent.className = cardcontent.className.replace(" is-hidden", "");
    cardcontent2.className = cardcontent2.className.replace(" is-hidden", "");
    spn.className = spn.className.replace("typcn typcn-media-play-reverse", "typcn typcn-arrow-sorted-down");
  } else {
    cardcontent.className = cardcontent.className += " is-hidden";
    cardcontent2.className = cardcontent2.className += " is-hidden";
    spn.className = spn.className.replace("typcn typcn-arrow-sorted-down", "typcn typcn-media-play-reverse");
  }
}

var scrollTop = function() {
	console.log(33);
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
}

var closeMenuCheck = function() {
  var ele1 = document.getElementById("navbarMenu");
  var ele2 = document.getElementById("navbar-burger-lines");
  if (ele1.className.includes("is-active")) {
    ele1.className = ele1.className.replace(" is-active", ""); 
  }
  if (ele2.className.includes("is-active")) {
    ele2.className = ele2.className.replace(" is-active", ""); 
  }
}

var onRouteCheck = function() {
  scrollTop();
  closeMenuCheck();
}



function openModal(evt, cardName) {
  var cardcontent = document.getElementById(cardName);
  cardcontent.className = cardcontent.className += " is-active";
}

function closeModal(evt, cardName) {
  var cardcontent = document.getElementById(cardName);
  if (cardcontent && cardcontent.className.includes("is-active")) {
    cardcontent.className = cardcontent.className.replace(" is-active", "");
  }
  var but = cardcontent.querySelector("#copyButton");
  if (but.className.includes("is-success")) {
    but.textContent = "Copy bibtex";
    but.className = but.className.replace(" is-success", " is-info");
  }
}

function closeAllModals() {
  (document.querySelectorAll('.modal')).forEach(($modal) => {
    if ($modal.className.includes("is-active")) {
      $modal.className = $modal.className.replace(" is-active", "");
    }
  });
}

document.addEventListener('keydown', (event) => {
  const e = event || window.event;
  if (e.keyCode === 27) { // Escape key
    closeAllModals();
  }
});

function copyModal(evt, cardName) {
  var card = document.getElementById(cardName);
  var cardcontent = card.querySelector("#bibtex");
  const copyText = cardcontent.textContent;
  //console.log(copyText);
  const textArea = document.createElement('textarea');
  textArea.textContent = copyText;
  document.body.append(textArea);
  textArea.select();
  document.execCommand("copy");
  //navigator.clipboard.writeText(textArea.value);
  textArea.remove();
  
  var but = card.querySelector("#copyButton");
  but.textContent = "Copied!";
  but.className = but.className.replace(" is-info", " is-success");
}



// https://github.com/nathancahill/skeleton-tabs/blob/master/skeleton-tabs.js
/*
(function() {
  function main() {
    var tabButtons = [].slice.call(document.querySelectorAll('ul.navbar-list li a.navbar-link'));
		tabButtons.map(function(button) {
			button.addEventListener('click', function() {
				document.querySelector('li a.navbar-link.active').classList.remove('active');
				button.classList.add('active');
				document.querySelector('.tab-pane.active').classList.remove('active');
				document.querySelector(button.getAttribute('href')).classList.add('active');
				//scrollTop();
				document.body.scrollTop = document.documentElement.scrollTop = 0;
			})
		})
	}
	if (document.readyState !== 'loading') {
		main();
	} else {
		document.addEventListener('DOMContentLoaded', main);
	}
})();
*/
// https://github.com/nathancahill/skeleton-tabs/blob/master/skeleton-tabs.js



