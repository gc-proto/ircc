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
    <li class="wb-slc"> 
      <!-- NOTE: CN-CONT NEEDS TO BE UPDATED TO WB-CONT --> 
      <a class="wb-sl" href="#wb-cont">Passer au contenu principal</a> </li>
    <li class="wb-slc"> <a class="wb-sl" href="#wb-info">Passer à «&#160;Au sujet du gouvernement&#160;»</a> </li>
    <% if page_columns = 2 then %>
    <li class="wb-slc visible-md visible-lg"> <a class="wb-sl" href="#wb-sec">Passer au menu de la section</a> </li>
    <% end if %>
  </ul>
</nav>
<header>
	

<div id="wb-bnr" class="container">
    <div class="row">
      <section id="wb-lng" class="col-xs-3 col-sm-12 pull-right text-right">
        <h2 class="wb-inv">Sélection de la langue</h2>
		  <% if site = "cicinternet-stage.ci.gc.ca" and ally = true then %>
    <div class="text-success pull-left"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></div>
    <% end if %>
        <ul class="list-inline mrgn-bttm-0">
          <li> <a lang="en" href="<%=language_toggle%>" onClick="javascript:urchinTracker('/linktracker/francais/language-toggle/internal/english');"> <span class="hidden-xs">English</span> <abbr title="English" class="visible-xs h3 mrgn-tp-sm mrgn-bttm-0 text-uppercase">en</abbr> </a> </li>
        </ul>
      </section>
      <div class="brand col-xs-9 col-sm-5 col-md-4" property="publisher" resource="#wb-publisher" typeof="GovernmentOrganization"> <a href="https://www.canada.ca/fr.html" property="url"><img src="/wet-v4/dist/GCWeb/assets/sig-blk-fr.svg" alt="Gouvernement du Canada" property="logo"><span class="wb-inv"> / <span lang="en">Government of Canada</span></span></a>
        <meta property="name" content="Gouvernement du Canada">
        <meta property="areaServed" typeof="Country" content="Canada">
        <link property="logo" href="/wet-v4/dist/GCWeb/assets/wmms-blk.svg">
      </div>
      
    </div>
  </div>	
	
	
	<hr/>
		</header>
	
      

<!-- STAGING NOTES BEGIN -->
<% if site = "cicinternet-stage.ci.gc.ca" and coder <> "" then %>
<div class="container">
  <div class="row">
    <div class="col-md-12 alert alert-danger mrgn-bttm-0" role="alert">
      <p><strong>NOTE&nbsp;:</strong> L&rsquo;équipe des opération web est en processus de réviser cette page. Le contenu peut être incomplet et non disponible sur le site en ligne.</p>
      <% if request.querystring("admin") <> "" then %>
      <p><strong>Task</strong>: <%=task%><br>
        <strong>Coder</strong>: <%=coder%></p>
      <% end if%>
    </div>
  </div>
</div>
<% end if %>
<!-- STAGING NOTES END -->