<% ' variable declaration
	'Dim strURL3, tmparray3
	'strURL3 = Request.ServerVariables("URL") ' get the page reference url address
	'tmparray3 = Split(strURL3, "/") ' Splits the URL address by folders 
%>
</head>
<body vocab="http://schema.org/" resource="#wb-webpage" typeof="WebPage">
<!-- Google Tag Manager DO NOT REMOVE OR MODIFY - NE PAS SUPPRIMER OU MODIFIER -->
<noscript>
	<iframe title="Google Tag Manager" src="//www.googletagmanager.com/ns.html?id=GTM-TLGQ9K" height="0" width="0" style="display:none;visibility:hidden"></iframe>
</noscript>
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer1'?'&l='+l:'';j.async=true;j.src='//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer1','GTM-TLGQ9K');</script> 
<!-- End Google Tag Manager -->
	
<nav>
  <ul id="wb-tphp">
<!-- NOTE: CN-CONT NEEDS TO BE UPDATED TO WB-CONT -->
	<li class="wb-slc"> <a class="wb-sl" href="#wb-cont">Skip to main content</a> </li>
	<li class="wb-slc"> <a class="wb-sl" href="#wb-info">Skip to "About government"</a> </li>
  </ul>
</nav>
	
<header>
	<div id="wb-bnr" class="container">
	<div class="row">
      <section id="wb-lng" class="col-xs-3 col-sm-12 pull-right text-right">
        <h2 class="wb-inv">Language selection</h2>
		<% if site = "cicinternet-stage.ci.gc.ca" and ally = true then %>
			<div class="text-success pull-left"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></div>
		<% end if %>
        <ul class="list-inline mrgn-bttm-0">
          <li> <a lang="fr" hreflang="fr" href="<%=language_toggle%>" onClick="javascript:urchinTracker('/linktracker/english/language-toggle/internal/francais');"> <span class="hidden-xs">Français</span> <abbr title="Français" class="visible-xs h3 mrgn-tp-sm mrgn-bttm-0 text-uppercase">fr</abbr> </a> </li>
        </ul>
      </section>
      <div class="brand col-xs-9 col-sm-5 col-md-4" property="publisher" resource="#wb-publisher" typeof="GovernmentOrganization"> <a href="https://www.canada.ca/en.html" property="url"><img src="/wet-v4/dist/GCWeb/assets/sig-blk-en.svg" alt="Government of Canada" property="logo"><span class="wb-inv"> / <span lang="fr">Gouvernement du Canada</span></span></a>
        <meta property="name" content="Government of Canada">
        <meta property="areaServed" typeof="Country" content="Canada">
        <link property="logo" href="/wet-v4/dist/GCWeb/assets/wmms-blk.svg">
      </div>
      
    </div>
  </div>
	
	
	<hr/>
		</header>
	  
<!-- Check in code  -->
<% if site = "cicinternet-stage.ci.gc.ca" and coder <> "" then %>
<div class="container">
  <div class="row">
    <div class="col-xs-12 alert alert-danger mrgn-bttm-0" role="alert">
      <p><strong>NOTE:</strong> Web Ops is currently updating this page. Some content might not be final and might not be available on the live site.</p>
      <% if request.querystring("admin") <> "" then %>
      <p><strong>Task:</strong> <%=task%><br>
        <strong>Coder:</strong> <%=coder%></p>
      <% end if%>
    </div>
  </div>
</div>
<% end if %>
<!-- End of check in code -->
	
  
