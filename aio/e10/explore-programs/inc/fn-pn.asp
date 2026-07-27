
	
<% if language = "eng" then %>
<footer id="wb-info">
	<h2 class="wb-inv">About this site</h2>

	<div class="gc-sub-footer">
		<div class="container d-flex align-items-center">
			<nav>
				<h3 class="wb-inv">Government of Canada Corporate</h3>
				<ul>
					<li><a href="https://www.canada.ca/en/social.html">Social media</a></li>
					<li><a href="https://www.canada.ca/en/mobile.html">Mobile applications</a></li>
					<li><a href="https://design.canada.ca/about/">About Canada.ca</a></li>
                    <li><a href="https://www.canada.ca/en/transparency/terms.html">Terms and conditions</a></li>
					<li><a href="https://www.canada.ca/en/transparency/privacy.html">Privacy</a></li></ul>
			</nav>
			<div class="wtrmrk align-self-end">
				<img src="/wet-v4/dist/GCWeb/assets/wmms-blk.svg" alt="Symbol of the Government of Canada">
			</div>
		</div>
	</div>
</footer>
<% else %>
<footer id="wb-info">
	<h2 class="wb-inv">À propos de ce site</h2>
	

	<div class="gc-sub-footer">
		<div class="container d-flex align-items-center">
			<nav>
				<h3 class="wb-inv">Organisation du gouvernement du Canada</h3>
				<ul>
					<li><a href="https://www.canada.ca/fr/sociaux.html">Médias sociaux</a></li>
					<li><a href="https://www.canada.ca/fr/mobile.html">Applications mobiles</a></li>
					<li><a href="https://conception.canada.ca/a-propos/">À propos de Canada.ca</a></li>
                    <li><a href="https://www.canada.ca/fr/transparence/avis.html">Avis</a></li>
					<li><a href="https://www.canada.ca/fr/transparence/confidentialite.html">Confidentialité</a></li></ul>
			</nav>
			<div class="wtrmrk align-self-end">
				<img src="/wet-v4/dist/GCWeb/assets/wmms-blk.svg" alt="Symbole du gouvernement du Canada">
			</div>
		</div>
	</div>
</footer>
<% end if %>
	 
	 
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.js"></script> 
<script src="/wet-v4/dist/wet-boew/js/wet-boew.min.js?20210421"></script> 
<script src="/wet-v4/dist/GCWeb/js/theme.min.js?20210421"></script>
		  		  		  			
<% if formsFolderEN <> 1 or formsFolderFR <> 1 then %>
	<!-- Do nothing -->
<% else %>
	<!-- Do something -->
	<script src="/js/file-size.js"></script>
<% end if %>
		  
<script type="text/javascript">

/* Function that check the first select box */
function check1()
 {
 var x=document.getElementById("id_RvWlA6onTh");
 var el = document.getElementById("br1");
 var el1 = document.getElementById("id_4p7C0S8k0K2");
 var el2 = document.getElementById("id_4p7C0S8k0K");
 if (x.value == 1){
	 el.style.display = 'block';
	 el1.style.display = 'block';
	 el2.style.display = 'block';
	 }
 else {
	 el.style.display = 'none';
	 el1.style.display = 'none';
	 el2.style.display = 'none';}	 
 }
 
 /* Function that check the secound select box */
 
 function check2()
 {
 var x=document.getElementById("id_4p7C0S8k0K");
 var el = document.getElementById("id_IzFPTSLXlf2");
 var el2 = document.getElementById("id_IzFPTSLXlf");
 if (x.value == 4){
	 el.style.display = 'block';
	 el2.style.display = 'block';
	 }
 else {
	 el.style.display = 'none';
	 el2.style.display = 'none';}	 
 }
</script> 

<!-- This script is for tracking Page Prints & Print Method in Google Analytics using jQuery --> 
<script type="text/javascript">
(function () 
{
	var runOnce;
	var afterPrint = function() {
	/* Because of Chrome we can only allow the code to run once. */
	if (!runOnce) { 
		runOnce = true;
		var printData = $('html').attr('printType');
		var mouseButton = $('html').attr('mouseBtn');
		
		if (printData === undefined && mouseButton === 'Right') { 
		/* Print activated using Right Mouse Button */
		printData = 'Right Mouse Button';
		} 
		else if (printData === undefined) { 
		/* Print (probably) activated using Browser Menu */
		printData = 'Browser Menu';
		}
		/* Send Print Data to Google Analytics */
		ga('send','event','Page Printed', printData, window.location.href);
		/* Clear the attribute, if not printing from the menu can be tracked incorrectly. */
		$('html').removeAttr('printType'); 
		$('html').removeAttr('mouseBtn'); 
	};
};

/* Track printing from browsers using the Webkit engine */
if (window.matchMedia) { 
	var mediaQueryList = window.matchMedia('print');
	mediaQueryList.addListener(function(mql) {
		if (!mql.matches) {
		afterPrint();
		}
	});
}

/* Needed for IE */
window.onafterprint = afterPrint; 

/* Track printing using Ctrl/Cmd+P. */
$(document).keydown(function(allBrowsers) { 
if (allBrowsers.keyCode==80 && (allBrowsers.ctrlKey || allBrowsers.metaKey)) {
$('html').attr('printType', 'Ctrl/Cmd+P');
/* Opera is a little different so we must send the afterPrint() function to get the tracking to work. */
if ($.browser.opera) { 
afterPrint();
}
}
});

/* Detect Right Mouse Button Click */
$('html').mousedown(function(e) {
if( e.which == 3 ) {
$('html').attr('mouseBtn', 'Right');
}
});
}());


/* TRACKING CODE FOR ADOBE ANALYTICS */

$( document ).on( "wb-ready.wb", function( event ) {
	//Table pagination button
	function trackTablePaginationButton() {

					ga('send', 'event', 'Table', this.innerText, "Pagination button");
	}
	
	$("div.dataTables_paginate a.paginate_button").on("click", trackTablePaginationButton)

	$( document ).on( "wb-updated.wb-tables", ".wb-tables", function( event, settings ) {
					$("div.dataTables_paginate a.paginate_button").off("click", trackTablePaginationButton);
					$("div.dataTables_paginate a.paginate_button").on("click", trackTablePaginationButton);
	});
	
	//Table Show # entries button
	$("div.dataTables_length select").on("change", function(){
					ga('send', 'event', 'Table', this.value, "Show # entries");
	})

	//Table sort buttons
	$("table.wb-tables thead tr th").on("click", function(){
					if (this.getAttribute("class") == "sorting_asc")
									ga('send', 'event', 'Table', this.innerText + " (ascending)", "Sort");
					else if (this.getAttribute("class") == "sorting_desc")
									ga('send', 'event', 'Table', this.innerText + " (descending)", "Sort");
					else
									ga('send', 'event', 'Table', this.innerText + " (unknown)", "Sort");
	})

	//Table text filter
	$("div.dataTables_filter input[type=search]").on("change", function(){
					ga('send', 'event', 'Table', this.value==""?"(blank input)":this.value, "Text filter");
	})
	
	//Left nav tracking
	$("nav#wb-sec ul.list-group.menu.list-unstyled a").on("click", function(){
					ga('send', 'event', 'Left nav', this.href, this.innerText);
	})
                
});

/* END TRACKING CODE */



</script> 

<!-- adobe analytics -->
<script type="text/javascript">_satellite.pageBottom();</script>



<script>
// TEMPORARY FIX FOR LEFT NAVIGATION
// WET release v4.0.30 does not add the wb-navcurr class on the current page in the left navigation, until a patch is release keep script in footer

//gets the URL path
var getURL = window.location.pathname;
//gets all left nav items with the class "list-group-item"
var getLNitems = document.getElementsByClassName("list-group-item");
//cycles through all left nav items until it matches the URL
//when it matches, add the class "wb-navcurr"
for (var x=0;  x<getLNitems.length; x++){
	if ($(getLNitems[x]).attr("href") == getURL) {
		$(getLNitems[x]).addClass("wb-navcurr");
	}
}
</script>

<% if js_page = "" then %>
<!-- #include virtual="/includes/inc/end-html.asp" -->
<% end if %>
