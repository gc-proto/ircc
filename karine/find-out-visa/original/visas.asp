<%
' Metadata elements
	title = "Find out if you need a visa to travel to Canada" 'leave breadcrumb variable blank when the title should be used as the breadcrumb title
	breadcrumb = ""
	date_created = "2017-05-01" 'Date published (YYYY-MM-DD) / Date de publication (AAAA-MM-JJ)
	date_modified = "2024-09-13" 'Date modified (YYYY-MM-DD) / Date de modification (AAAA-MM-JJ)
	page_description = "Find out if you need an Electronic Travel Authorization (eTA) or a visitor visa"
	keywords = "Foreign visitors; Temporary resident visas; Country of origin; Directories"
	subject = "Foreign visitors; Temporary resident visas; Country of origin; Directories"
	language_toggle = "/francais/visiter/visas.asp"


'
' flag pages on staging
   coder = ""
   task = ""
	
	ally = true
'	
' '
   'page feedback tool
    pft_theme = "Visa"
    pft_section = "Visa"
    

'Page columns and navigations
	page_columns = 1   ' number of columns needed in the page 1, 2 or 3
	js_page = "yes"

<!-- #include virtual="/includes/inc/twittercard-en2.asp" -->

%>

<!-- #include virtual="/includes/inc/config.asp" --> 
<!-- #include virtual="/includes/inc/head-tete.asp" --> 
<!-- #include virtual="/includes/inc/twittercard-en.asp" --> 
<!-- Custom scripts/CSS begin / Début des scripts/CSS personnalisés -->
<link rel="stylesheet" href="/css/visas.css">
<link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">

<!-- Global site tag (gtag.js) - Google Analytics --> 
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-29097977-1"></script> 
<!-- <script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-29097977-1');
</script> --> 

<!-- Google Tag Manager --> 
<script>
    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != 'dataLayer' ? '&l=' + l : '';
      j.async = true;
      j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-MJ5K7GH');
	
  
	ga('create', 'UA-29097977-1', 'auto', 'comms');
  </script> 
<!-- End Google Tag Manager --> 

<!-- Custom scripts/CSS end / Fin des scripts/CSS personnalisés --> 
<!-- #include virtual="/includes/inc/header-entete-begin.asp" --> 
<!-- Add the breadcrumb trail using li -->
<li><a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html">Visit</a></li>
</ol>
</div>
</nav>
</header>
<main property="mainContentOfPage" class="" role="main">
<div class="container">

<!-- Content title begins / D&eacute;but du titre du contenu -->

<h1 id="wb-cont" property="name" tabindex="-1" aria-live="polite"><%=title%></h1>

<!-- Content Title ends / Fin du titre du contenu -->

<div id="bodyWrapper" class="">
  <p id="introText">Most people need a visa or an Electronic Travel Authorization (eTA) to travel to Canada - not both. Some people may only need their valid passport. Answer a few questions to see what's right for you.</p>
  <div id="pe">
    <p><a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/entry-requirements-country.html">See all entry requirements by country/territory</a></p>
  </div>
  <div id="toolWrapper" class="hidden">
    <div id="program-finder" class="pf-container">
      <div id="tool">
        <div class="progressWrapper mrgn-bttm-lg" tabindex="-1">
          <div id="progressBarSR" class="sr-only">Current progress is at <span class="currentProg">10%</span></div>
          <progress id="progressBar" value="10" max="100" aria-hidden="true"><span class="wb-inv currentProg">10%</span></progress>
        </div>
        <button id="btnPrev" type="button" class="btn-prev btn-link hidden"><span class="glyphicon glyphicon-arrow-left mrgn-rght-sm mrgn-bttm-lg"></span>Previous question</button>
        <form id="programFinderForm" tabindex="-1" class="">
          
          <!-- START - Starting flow -->
          <div id="q1" class="question">
            <fieldset>
              <legend class="field-name">What travel document do you plan to use to travel to Canada?</legend>
              <div class="radio-group"> 
                <!-- progress bar values increase by X - 10 to account for default value -->
                <label class="radio" for="q1-1">
                  <input type="radio" value="q2" data-progress-increase="20" name="q1-question" id="q1-1">
                  Passport</label>
                <label class="radio skip" for="q1-2">
                  <input type="radio" value="q4" data-progress-increase="40" name="q1-question" id="q1-2">
                  Alien’s passport for stateless persons</label>
                <label class="radio skip" for="q1-3">
                  <input type="radio" value="q4" data-progress-increase="40" name="q1-question" id="q1-3">
                  Permit to re-enter the US (I-327)</label>
                <label class="radio skip" for="q1-4">
                  <input type="radio" value="q4" data-progress-increase="40" name="q1-question" id="q1-4">
                  US Refugee Travel Document (I-571)</label>
                <label class="radio skip" for="q1-5">
                  <input type="radio" value="q4" data-progress-increase="40" name="q1-question" id="q1-5">
                  Other refugee travel document for non-citizens</label>
              </div>
            </fieldset>
          </div>
          <div id="q2" class="question hidden">
            <label for="q2-question" class="field-name">Select the country code that matches the one on your passport</label>
            <div class="datalist-wrapper nowrap" aria-live="polite">
              <input class="datalist" list="countryCodes" name="q2-question" id="q2-question" data-progress-increase="20" placeholder="Type and select" autocomplete="country-name" spellcheck="true" required="required">
              <span class="glyphicon glyphicon-search"></span> </div>
            <datalist id="countryCodes"> 
              <!--[if lte IE 9]><select><![endif]-->
              <option data-value="q3" data-cgroup="visa_required" value="AFG (Afghanistan)">
              
              <option data-value="q3" data-cgroup="visa_required" value="AGO (Angola)">
              
              <option data-value="q3" data-cgroup="visa_required" value="ALB (Albania)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="AND (Andorra)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="ANG/AIA (Anguilla)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="ARE (United Arab Emirates)">
              
              <option data-value="q3" data-cgroup="eTA-X" value="ARG (Argentina)">
              
              <option data-value="q3" data-cgroup="visa_required" value="ARM (Armenia)">
              
              <option data-value="q3" data-cgroup="eTA-X" value="ATG (Antigua and Barbuda)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="AUS (Australia)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="AUT (Austria)">
              
              <option data-value="q3" data-cgroup="visa_required" value="AZE (Azerbaijan)">
              
              <option data-value="q3" data-cgroup="visa_required" value="BDI (Burundi)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="BEL (Belgium)">
              
              <option data-value="q3" data-cgroup="visa_required" value="BEN (Benin)">
              
              <option data-value="q3" data-cgroup="visa_required" value="BFA (Burkina Faso)">
              
              <option data-value="q3" data-cgroup="visa_required" value="BGD (Bangladesh)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="BGR (Bulgaria)">
              
              <option data-value="q3" data-cgroup="visa_required" value="BHR (Bahrain)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="BHS (Bahamas)">
              
              <option data-value="q3" data-cgroup="visa_required" value="BIH (Bosnia and Herzegovina)">
              
              <option data-value="q3" data-cgroup="visa_required" value="BLR (Belarus)">
              
              <option data-value="q3" data-cgroup="visa_required" value="BLZ (Belize)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="BMU (Bermuda)">
              
              <option data-value="q3" data-cgroup="visa_required" value="BOL (Bolivia)">
              
              <option data-value="q3" data-cgroup="eTA-X" value="BRA (Brazil)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="BRB (Barbados)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="BRN (Brunei Darussalam)">
              
              <option data-value="q3" data-cgroup="visa_required" value="BTN (Bhutan)">
              
              <option data-value="q3" data-cgroup="visa_required" value="BWA (Botswana)">
              
              <option data-value="q3" data-cgroup="visa_required" value="CAF (Central African Republic)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="CHE (Switzerland)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="CHL (Chile)">
              
              <option data-value="q3" data-cgroup="visa_required" value="CHN (China)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="CHN (Hong Kong SAR)">
              
              <option data-value="q3" data-cgroup="visa_required" value="CHN (MACAO SAR)">
              
              <option data-value="q3" data-cgroup="visa_required" value="CIV (Ivory Coast)">
              
              <option data-value="q3" data-cgroup="visa_required" value="CMR (Cameroon)">
              
              <option data-value="q3" data-cgroup="visa_required" value="COD (Democratic Rep. of Congo)">
              
              <option data-value="q3" data-cgroup="visa_required" value="COG (Republic of Congo)">
              
              <option data-value="q3" data-cgroup="visa_required" value="COL (Colombia)">
              
              <option data-value="q3" data-cgroup="visa_required" value="COM (Comoros)">
              
              <option data-value="q3" data-cgroup="visa_required" value="CPV (Cabo Verde)">
              
              <option data-value="q3" data-cgroup="eTA-X" value="CRI (Costa Rica)">
              
              <option data-value="q3" data-cgroup="visa_required" value="CUB (Cuba)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="CYM (Cayman Islands)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="CYP (Cyprus)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="CZE (Czech Republic)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="D (Germany)">
              
              <option data-value="q3" data-cgroup="visa_required" value="DJI (Djibouti)">
              
              <option data-value="q3" data-cgroup="visa_required" value="DMA (Dominica)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="DNK (Denmark)">
              
              <option data-value="q3" data-cgroup="visa_required" value="DOM (Dominican Republic)">
              
              <option data-value="q3" data-cgroup="visa_required" value="DZA (Algeria)">
              
              <option data-value="q3" data-cgroup="visa_required" value="ECU (Ecuador)">
              
              <option data-value="q3" data-cgroup="visa_required" value="EGY (Egypt)">
              
              <option data-value="q3" data-cgroup="visa_required" value="ERI (Eritrea)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="ESP (Spain)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="EST (Estonia)">
              
              <option data-value="q3" data-cgroup="visa_required" value="ETH (Ethiopia)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="FIN (Finland)">
              
              <option data-value="q3" data-cgroup="visa_required" value="FJI (Fiji)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="FRA (France)">
              
              <option data-value="q3" data-cgroup="visa_required" value="FSM (Micronesia)">
              
              <option data-value="q3" data-cgroup="visa_required" value="GAB (Gabon)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="GBD (UK - Brit. overseas terr.)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="GBN (UK - Brit. Ntl. overseas)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="GBO (UK - British overseas citizen)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="GBR (UK - British citizen)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="GBS (UK - British subject)">
              
              <option data-value="q3" data-cgroup="visa_required" value="GBS (UK - Brit. subject, subject to control)">
              
              <option data-value="q3" data-cgroup="visa_required" value="GEO (Georgia)">
              
              <option data-value="q3" data-cgroup="visa_required" value="GHA (Ghana)">
              
              <option data-value="q3" data-cgroup="visa_required" value="GIN (Guinea)">
              
              <option data-value="q3" data-cgroup="visa_required" value="GMB (Gambia)">
              
              <option data-value="q3" data-cgroup="visa_required" value="GNB (Guinea-Bissau)">
              
              <option data-value="q3" data-cgroup="visa_required" value="GNQ (Equatorial Guinea)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="GRC (Greece)">
              
              <option data-value="q3" data-cgroup="visa_required" value="GRD (Grenada)">
              
              <option data-value="q3" data-cgroup="visa_required" value="GTM (Guatemala)">
              
              <option data-value="q3" data-cgroup="visa_required" value="GUY(Guyana)">
              
              <option data-value="q3" data-cgroup="visa_required" value="HND (Honduras)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="HRV (Croatia)">
              
              <option data-value="q3" data-cgroup="visa_required" value="HTI (Haiti)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="HUN (Hungary)">
              
              <option data-value="q3" data-cgroup="visa_required" value="IDN (Indonesia)">
              
              <option data-value="q3" data-cgroup="visa_required" value="IND (India)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="IRL (Ireland)">
              
              <option data-value="q3" data-cgroup="visa_required" value="IRN (Iran)">
              
              <option data-value="q3" data-cgroup="visa_required" value="IRQ (Iraq)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="ISL (Iceland)">
              
              <option data-value="q3" data-cgroup="israel" value="ISR (Israel)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="ITA (Italy)">
              
              <option data-value="q3" data-cgroup="visa_required" value="JAM (Jamaica)">
              
              <option data-value="q3" data-cgroup="visa_required" value="JOR (Jordan)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="JPN (Japan)">
              
              <option data-value="q3" data-cgroup="visa_required" value="KAZ (Kazakhstan)">
              
              <option data-value="q3" data-cgroup="visa_required" value="KEN (Kenya)">
              
              <option data-value="q3" data-cgroup="visa_required" value="KGZ (Kyrgyzstan)">
              
              <option data-value="q3" data-cgroup="visa_required" value="KHM (Cambodia)">
              
              <option data-value="q3" data-cgroup="visa_required" value="KIR (Kiribati)">
              
              <option data-value="q3" data-cgroup="eTA-X" value="KNA (Saint Kitts and Nevis)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="KOR (Korea, South)">
              
              <option data-value="q3" data-cgroup="visa_required" value="KWT (Kuwait)">
              
              <option data-value="q3" data-cgroup="visa_required" value="LAO (Laos)">
              
              <option data-value="q3" data-cgroup="visa_required" value="LBN (Lebanon)">
              
              <option data-value="q3" data-cgroup="visa_required" value="LBR (Liberia)">
              
              <option data-value="q3" data-cgroup="visa_required" value="LBY (Libya)">
              
              <option data-value="q3" data-cgroup="eTA-X" value="LCA (Saint Lucia)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="LIE (Liechtenstein)">
              
              <option data-value="q3" data-cgroup="visa_required" value="LKA (Sri Lanka)">
              
              <option data-value="q3" data-cgroup="visa_required" value="LSO (Lesotho)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="LTU (Lithuania)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="LUX (Luxembourg)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="LVA (Latvia)">
              
              <option data-value="q3" data-cgroup="eTA-X" value="MAR (Morocco)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="MCO (Monaco)">
              
              <option data-value="q3" data-cgroup="visa_required" value="MDA (Moldova)">
              
              <option data-value="q3" data-cgroup="visa_required" value="MDG (Madagascar)">
              
              <option data-value="q3" data-cgroup="eTA-X-Mexico" value="MEX (Mexico)">
              
              <option data-value="q3" data-cgroup="visa_required" value="MHL (Marshall Islands)">
              
              <option data-value="q3" data-cgroup="visa_required" value="MKD (Macedonia)">
              
              <option data-value="q3" data-cgroup="visa_required" value="MLI (Mali)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="MLT (Malta)">
              
              <option data-value="q3" data-cgroup="visa_required" value="MMR (Burma - Myanmar)">
              
              <option data-value="q3" data-cgroup="visa_required" value="MNE (Montenegro)">
              
              <option data-value="q3" data-cgroup="visa_required" value="MNG (Mongolia)">
              
              <option data-value="q3" data-cgroup="visa_required" value="MOZ (Mozambique)">
              
              <option data-value="q3" data-cgroup="visa_required" value="MRT (Mauritania)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="MSR (Montserrat)">
              
              <option data-value="q3" data-cgroup="visa_required" value="MUS (Mauritius)">
              
              <option data-value="q3" data-cgroup="visa_required" value="MWI (Malawi)">
              
              <option data-value="q3" data-cgroup="visa_required" value="MYS (Malaysia)">
              
              <option data-value="q3" data-cgroup="visa_required" value="NAM (Namibia)">
              
              <option data-value="q3" data-cgroup="visa_required" value="NER (Niger)">
              
              <option data-value="q3" data-cgroup="visa_required" value="NGA (Nigeria)">
              
              <option data-value="q3" data-cgroup="visa_required" value="NIC (Nicaragua)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="NLD (Netherlands)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="NOR (Norway)">
              
              <option data-value="q3" data-cgroup="visa_required" value="NPL (Nepal)">
              
              <option data-value="q3" data-cgroup="visa_required" value="NRU (Nauru)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="NZL (New Zealand)">
              
              <option data-value="q3" data-cgroup="visa_required" value="OMN (Oman)">
              
              <option data-value="q3" data-cgroup="visa_required" value="PAK (Pakistan)">
              
              <option data-value="q3" data-cgroup="eTA-X" value="PAN (Panama)">
              
              <option data-value="q3" data-cgroup="visa_required" value="PER (Peru)">
              
              <option data-value="q3" data-cgroup="eTA-X-TWOV" value="PHL (Philippines)">
              
              <option data-value="q3" data-cgroup="visa_required" value="PLW (Palau)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="PNG (Papua New Guinea)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="POL (Poland)">
              
              <option data-value="q3" data-cgroup="visa_required" value="PRK (Korea, North - DPRK)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="PRT (Portugal)">
              
              <option data-value="q3" data-cgroup="visa_required" value="PRY (Paraguay)">
              
              <option data-value="q3" data-cgroup="visa_required" value="PSE (Palestinian Authority)">
              
              <option data-value="q3" data-cgroup="visa_required" value="QAT (Qatar)">
              
              <option data-value="q3" data-cgroup="visa_required" value="RKS (Kosovo)">
              
              <option data-value="q3" data-cgroup="romania" value="ROU (Romania)">
              
              <option data-value="q3" data-cgroup="visa_required" value="RUS (Russia)">
              
              <option data-value="q3" data-cgroup="visa_required" value="RWA (Rwanda)">
              
              <option data-value="q3" data-cgroup="visa_required" value="SAU (Saudi Arabia)">
              
              <option data-value="q3" data-cgroup="visa_required" value="SDN (Sudan)">
              
              <option data-value="q3" data-cgroup="visa_required" value="SEN (Senegal)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="SGP (Singapore)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="SHN (Saint Helena)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="SLB (Solomon Islands)">
              
              <option data-value="q3" data-cgroup="visa_required" value="SLE (Sierra Leone)">
              
              <option data-value="q3" data-cgroup="visa_required" value="SLV (El Salvador)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="SMR (San Marino)">
              
              <option data-value="q3" data-cgroup="visa_required" value="SOM (Somalia)">
              
              <option data-value="q3" data-cgroup="visa_required" value="SRB (Serbia)">
              
              <option data-value="q3" data-cgroup="visa_required" value="SSD (South Sudan)">
              
              <option data-value="q3" data-cgroup="visa_required" value="STP (Sao Tome e Principe)">
              
              <option data-value="q3" data-cgroup="visa_required" value="SUR (Suriname)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="SVK (Slovakia)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="SVN (Slovenia)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="SWE (Sweden)">
              
              <option data-value="q3" data-cgroup="visa_required" value="SWZ (Swaziland)">
              
              <option data-value="q3" data-cgroup="eTA-X" value="SYC (Seychelles)">
              
              <option data-value="q3" data-cgroup="visa_required" value="SYR (Syria)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="TCA (Turks and Caicos Islands)">
              
              <option data-value="q3" data-cgroup="visa_required" value="TCD (Chad)">
              
              <option data-value="q3" data-cgroup="visa_required" value="TGO (Togo)">
              
              <option data-value="q3" data-cgroup="eTA-X-TWOV" value="THA (Thailand)">
              
              <option data-value="q3" data-cgroup="visa_required" value="TJK (Tajikistan)">
              
              <option data-value="q3" data-cgroup="visa_required" value="TKM (Turkmenistan)">
              
              <option data-value="q3" data-cgroup="visa_required" value="TLS (East Timor)">
              
              <option data-value="q3" data-cgroup="visa_required" value="TON (Tonga)">
              
              <option data-value="q3" data-cgroup="eTA-X" value="TTO (Trinidad and Tobago)">
              
              <option data-value="q3" data-cgroup="visa_required" value="TUN (Tunisia)">
              
              <option data-value="q3" data-cgroup="visa_required" value="TUR (Turkey)">
              
              <option data-value="q3" data-cgroup="visa_required" value="TUV (Tuvalu)">
              
              <option data-value="q3" data-cgroup="taiwan" value="TWN (Taiwan)">
              
              <option data-value="q3" data-cgroup="visa_required" value="TZA (Tanzania)">
              
              <option data-value="q3" data-cgroup="visa_required" value="UGA (Uganda)">
              
              <option data-value="q3" data-cgroup="visa_required" value="UKR (Ukraine)">
              
              <option data-value="q3" data-cgroup="eTA-X" value="URY (Uruguay)">
              
              <option data-value="q5_usa" data-cgroup="usa" value="USA (United States of America)">
              
              <option data-value="q3" data-cgroup="visa_required" value="UZB (Uzbekistan)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="VAT (Vatican City State)">
              
              <option data-value="q3" data-cgroup="eTA-X" value="VCT (St. Vincent and the Grenadines)">
              
              <option data-value="q3" data-cgroup="visa_required" value="VEN (Venezuela)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="VGB (British Virgin Islands)">
              
              <option data-value="q3" data-cgroup="visa_required" value="VNM (Vietnam)">
              
              <option data-value="q3" data-cgroup="visa_required" value="VUT (Vanuatu)">
              
              <option data-value="q3" data-cgroup="eta_eligible" value="WSM (Samoa)">
              
              <option data-value="q3" data-cgroup="visa_required" value="YEM (Yemen)">
              
              <option data-value="q3" data-cgroup="visa_required" value="ZAF (South Africa)">
              
              <option data-value="q3" data-cgroup="visa_required" value="ZMB (Zambia)">
              
              <option data-value="q3" data-cgroup="visa_required" value="ZWE (Zimbabwe)"> 
              <!--[if lte IE 9]></select><![endif]--> 
            </datalist>
            <div class="row mrgn-tp-lg">
              <div class="col-md-3"><img src="https://www.cic.gc.ca/english/visit/images/passport-country-gbr-large.jpg" alt="Sample passport information page highlighting three letter country code" class="img-responsive mrgn-bttm-md"></div>
              <div class="col-md-7">
                <p>You can find the country code on your passport. Be careful when you select your country. Some countries have multiple options and codes are quite similar.</p>
              </div>
            </div>
          </div>
          <div id="q3" class="question hidden">
            <fieldset>
              <legend class="field-name">Are you a dual Canadian citizen?</legend>
              <p>Answer yes if you’re a citizen of Canada and another country.</p>
              <div class="radio-group">
                <label class="radio text-center" for="q3-1">
                  <input type="radio" value="#result_dualCadCit" data-progress-increase="50" name="q3-question" id="q3-1">
                  Yes</label>
                <!-- If user selected eTA eligible country, value below will change to q5_eta_eligible -->
                <label class="radio text-center" for="q3-2">
                  <input type="radio" value="q4" data-progress-increase="0" name="q3-question" id="q3-2">
                  No</label>
              </div>
            </fieldset>
          </div>
          <div id="q4" class="question hidden">
            <fieldset>
              <legend class="field-name">Are you a lawful permanent resident of the US and do you have official proof of this status, such as a green card?</legend>
              <div class="radio-group">
                <label class="radio text-center" for="q4-1">
                  <input type="radio" value="q5_USPR" data-progress-increase="20" name="q4-question" id="q4-1">
                  Yes</label>
                <!-- See JS, this answer is country specific line 694 -->
                <label class="radio text-center" for="q4-2">
                  <input type="radio" value="q5_visa_required" data-progress-increase="20" name="q4-question" id="q4-2">
                  No</label>
              </div>
            </fieldset>
          </div>
          
          <!-- END - Starting flow --> 
          
          <!-- START - eTA eligible required flow -->
          <div id="q5_eta_eligible" class="question hidden">
            <fieldset>
              <legend class="field-name">What do you plan to do in Canada?</legend>
              <div class="radio-group">
                <label class="radio" for="q5_eta_eligible-1">
                  <input type="radio" value="q7_eta_eligible" data-progress-increase="25" name="q5_eta_eligible-question" id="q5_eta_eligible-1">
                  Visit as a tourist</label>
                <label class="radio" for="q5_eta_eligible-2">
                  <input type="radio" value="q6_eta_eligible" data-progress-increase="25" name="q5_eta_eligible-question" id="q5_eta_eligible-2">
                  Visit family</label>
                <label class="radio" for="q5_eta_eligible-3">
                  <input type="radio" value="q8_eta_eligible" data-progress-increase="25" name="q5_eta_eligible-question" id="q5_eta_eligible-3">
                  Transit through Canada</label>
                <label class="radio" for="q5_eta_eligible-4">
                  <input type="radio" value="q7_eta_eligible" data-progress-increase="25" name="q5_eta_eligible-question" id="q5_eta_eligible-4">
                  Attend a meeting, conference, or trade show</label>
                <label class="radio" for="q5_eta_eligible-5">
                  <input type="radio" value="q15_studyE" data-progress-increase="25" name="q5_eta_eligible-question" id="q5_eta_eligible-5">
                  Study</label>
                <label class="radio" for="q5_eta_eligible-6">
                  <input type="radio" value="q15_workE" data-progress-increase="25" name="q5_eta_eligible-question" id="q5_eta_eligible-6">
                  Work</label>
              </div>
            </fieldset>
          </div>
          <div id="q6_eta_eligible" class="question hidden">
            <fieldset>
              <legend class="field-name">Do you plan to visit your children or grandchildren who are Canadian citizens or permanent residents of Canada for more than 6 months?</legend>
              <div class="radio-group">
                <label class="radio text-center" for="q6_eta_eligible-1">
                  <input type="radio" value="#result_superVisa2" data-progress-increase="25" name="q6_eta_eligible-question" id="q6_eta_eligible-1">
                  Yes</label>
                <label class="radio text-center" for="q6_eta_eligible-2">
                  <input type="radio" value="q7_eta_eligible" data-progress-increase="25" name="q6_eta_eligible-question" id="q6_eta_eligible-2">
                  No</label>
              </div>
            </fieldset>
          </div>
          <div id="q7_eta_eligible" class="question hidden">
            <fieldset>
              <legend class="field-name">How do you plan to travel to Canada?</legend>
              <div class="radio-group">
                <label class="radio" for="q7_eta_eligible-1">
                  <input type="radio" value="#result_eta" data-progress-increase="25" name="q7_eta_eligible-question" id="q7_eta_eligible-1">
                  By air, via a Canadian airport</label>
                <label class="radio" for="q7_eta_eligible-2">
                  <input type="radio" value="#result_IDDoc" data-progress-increase="25" name="q7_eta_eligible-question" id="q7_eta_eligible-2">
                  By car, train, bus or boat (including cruise ship)</label>
              </div>
            </fieldset>
          </div>
          <div id="q8_eta_eligible" class="question hidden">
            <fieldset>
              <legend class="field-name">How do you plan to transit through Canada?</legend>
              <div class="radio-group">
                <label class="radio" for="q8_eta_eligible-1">
                  <input type="radio" value="#result_eta" data-progress-increase="25" name="q8_eta_eligible-question" id="q8_eta_eligible-1">
                  By air, via a Canadian airport, between 2 international flights</label>
                <label class="radio" for="q8_eta_eligible-2">
                  <input type="radio" value="#result_IDDoc" data-progress-increase="25" name="q8_eta_eligible-question" id="q8_eta_eligible-2">
                  By car, train, bus or boat (including cruise ship)</label>
              </div>
            </fieldset>
          </div>
          <!-- End - eTA eligible required flow --> 
          
          <!-- START - USPR flow -->
          <div id="q5_USPR" class="question hidden">
            <fieldset>
              <legend class="field-name">What do you plan to do in Canada?</legend>
              <div class="radio-group">
                <label class="radio" for="q5_USPR-1">
                  <input type="radio" value="#result_USPR" data-progress-increase="25" name="q5_USPR-question" id="q5_USPR-1">
                  Visit as a tourist</label>
                <label class="radio" for="q5_USPR-2">
                  <input type="radio" value="q6_USPR" data-progress-increase="25" name="q5_USPR-question" id="q5_USPR-2">
                  Visit family</label>
                <label class="radio" for="q5_USPR-3">
                  <input type="radio" value="#result_USPR" data-progress-increase="25" name="q5_USPR-question" id="q5_USPR-3">
                  Transit through Canada</label>
                <label class="radio" for="q5_USPR-4">
                  <input type="radio" value="#result_USPR" data-progress-increase="25" name="q5_USPR-question" id="q5_USPR-4">
                  Attend a meeting, conference, or trade show</label>
                <label class="radio" for="q5_USPR-5">
                  <input type="radio" value="q15_studyUSPR" data-progress-increase="25" name="q5_USPR-question" id="q5_USPR-5">
                  Study</label>
                <label class="radio" for="q5_USPR-6">
                  <input type="radio" value="q15_workUSPR" data-progress-increase="25" name="q5_USPR-question" id="q5_USPR-6">
                  Work</label>
              </div>
            </fieldset>
          </div>
          <div id="q6_USPR" class="question hidden">
            <fieldset>
              <legend class="field-name">Do you plan to visit your children or grandchildren who are Canadian citizens or permanent residents of Canada for more than 6 months? </legend>
              <div class="radio-group">
                <label class="radio text-center" for="q6_USPR-1">
                  <input type="radio" value="#result_superVisa4" data-progress-increase="25" name="q6_USPR-question" id="q6_USPR-1">
                  Yes</label>
                <label class="radio text-center" for="q6_USPR-2">
                  <input type="radio" value="#result_USPR" data-progress-increase="25" name="q6_USPR-question" id="q6_USPR-2">
                  No</label>
              </div>
            </fieldset>
          </div>
          <div id="q15_studyUSPR" class="question hidden">
            <fieldset>
              <legend class="field-name">Select the option that best suits your situation:</legend>
              <div class="radio-group">
                <label class="radio" for="q15_studyUSPR-1">
                  <input type="radio" value="#result_studyFirstUSPR" data-progress-increase="25" name="q15_studyUSPR-question" id="q15_studyUSPR-1">
                  I’m applying for my first study permit</label>
                <label class="radio" for="q15_studyUSPR-2">
                  <input type="radio" value="#result_studyHavePermitUSPR" data-progress-increase="25" name="q15_studyUSPR-question" id="q15_studyUSPR-2">
                  I already have my first study permit</label>
                <label class="radio" for="q15_studyUSPR-3">
                  <input type="radio" value="#result_studyExtendUSPR" data-progress-increase="25" name="q15_studyUSPR-question" id="q15_studyUSPR-3">
                  I’ve extended or plan to extend my study permit</label>
                <label class="radio" for="q15_studyUSPR-4">
                  <input type="radio" value="#result_studyEligibleWithoutUSPR" data-progress-increase="25" name="q15_studyUSPR-question" id="q15_studyUSPR-4">
                  I’m eligible to study without a permit</label>
                <label class="radio" for="q15_studyUSPR-5">
                  <input type="radio" value="#result_studyNotSureUSPR" data-progress-increase="25" name="q15_studyUSPR-question" id="q15_studyUSPR-5">
                  I’m not sure what I need to study</label>
              </div>
            </fieldset>
          </div>
          <div id="q15_workUSPR" class="question hidden">
            <fieldset>
              <legend class="field-name">Select the option that best suits your situation:</legend>
              <div class="radio-group">
                <label class="radio" for="q15_workUSPR-1">
                  <input type="radio" value="#result_workFirstUSPR" data-progress-increase="25" name="q15_workUSPR-question" id="q15_workUSPR-1">
                  I’m applying for my first work permit</label>
                <label class="radio" for="q15_workUSPR-2">
                  <input type="radio" value="#result_workHavePermitUSPR" data-progress-increase="25" name="q15_workUSPR-question" id="q15_workUSPR-2">
                  I already have my first work permit</label>
                <label class="radio" for="q15_workUSPR-3">
                  <input type="radio" value="#result_workExtendUSPR" data-progress-increase="25" name="q15_workUSPR-question" id="q15_workUSPR-3">
                  I’ve extended or plan to extend my work permit</label>
                <label class="radio" for="q15_workUSPR-4">
                  <input type="radio" value="#result_workEligibleWithoutUSPR" data-progress-increase="25" name="q15_workUSPR-question" id="q15_workUSPR-4">
                  I’m eligible to work without a permit</label>
                <label class="radio" for="q15_workUSPR-5">
                  <input type="radio" value="#result_workNotSureUSPR" data-progress-increase="25" name="q15_workUSPR-question" id="q15_workUSPR-5">
                  I’m not sure what I need to work</label>
              </div>
            </fieldset>
          </div>
          
          <!-- End - USPR flow --> 
          
          <!-- START - USA flow -->
          <div id="q5_usa" class="question hidden">
            <fieldset>
              <legend class="field-name">What do you plan to do in Canada?</legend>
              <div class="radio-group">
                <label class="radio" for="q5_usa-1">
                  <input type="radio" value="#result_usa" data-progress-increase="25" name="q5_usa-question" id="q5_usa-1">
                  Visit as a tourist</label>
                <label class="radio" for="q5_usa-2">
                  <input type="radio" value="q6_usa" data-progress-increase="25" name="q5_usa-question" id="q5_usa-2">
                  Visit family</label>
                <label class="radio" for="q5_usa-3">
                  <input type="radio" value="#result_usa" data-progress-increase="25" name="q5_usa-question" id="q5_usa-3">
                  Transit through Canada</label>
                <label class="radio" for="q5_usa-4">
                  <input type="radio" value="#result_usa" data-progress-increase="25" name="q5_usa-question" id="q5_usa-4">
                  Attend a meeting, conference, or trade show</label>
                <label class="radio" for="q5_usa-5">
                  <input type="radio" value="q15_studyUSA" data-progress-increase="25" name="q5_usa-question" id="q5_usa-5">
                  Study</label>
                <label class="radio" for="q5_usa-6">
                  <input type="radio" value="q15_workUSA" data-progress-increase="25" name="q5_usa-question" id="q5_usa-6">
                  Work</label>
              </div>
            </fieldset>
          </div>
          <div id="q6_usa" class="question hidden">
            <fieldset>
              <legend class="field-name">Do you plan to visit your children or grandchildren who are Canadian citizens or permanent residents of Canada for more than 6 months? </legend>
              <div class="radio-group">
                <label class="radio text-center" for="q6_usa-1">
                  <input type="radio" value="#result_superVisa3" data-progress-increase="20" name="q6_usa-question" id="q6_usa-1">
                  Yes</label>
                <label class="radio text-center" for="q6_usa-2">
                  <input type="radio" value="#result_usa" data-progress-increase="20" name="q6_usa-question" id="q6_usa-2">
                  No</label>
              </div>
            </fieldset>
          </div>
          <!-- End - USA flow --> 
          
          <!-- START - Visa required flow -->
          <div id="q5_visa_required" class="question hidden">
            <fieldset>
              <legend class="field-name">What do you plan to do in Canada?</legend>
              <div class="radio-group">
                <label class="radio" for="q5_visa_required-1">
                  <input type="radio" value="#result_visitorVisa" data-progress-increase="30" name="q5_visa_required-question" id="q5_visa_required-1">
                  Visit as a tourist</label>
                <label class="radio" for="q5_visa_required-2">
                  <input type="radio" value="q6_visa_required" data-progress-increase="10" name="q5_visa_required-question" id="q5_visa_required-2">
                  Visit family</label>
                <label class="radio" for="q5_visa_required-3">
                  <input type="radio" value="q8_visa_required" data-progress-increase="10" name="q5_visa_required-question" id="q5_visa_required-3">
                  Transit through Canada</label>
                <label class="radio" for="q5_visa_required-4">
                  <input type="radio" value="#result_visitorVisa" data-progress-increase="30" name="q5_visa_required-question" id="q5_visa_required-4">
                  Attend a meeting, conference, or trade show</label>
                <label class="radio" for="q5_visa_required-5">
                  <input type="radio" value="q15_studyV" data-progress-increase="10" name="q5_visa_required-question" id="q5_visa_required-5">
                  Study</label>
                <label class="radio" for="q5_visa_required-6">
                  <input type="radio" value="q15_workV" data-progress-increase="10" name="q5_visa_required-question" id="q5_visa_required-6">
                  Work</label>
              </div>
            </fieldset>
          </div>
          <div id="q6_visa_required" class="question hidden">
            <fieldset>
              <legend class="field-name">Do you plan to visit your children or grandchildren who are Canadian citizens or permanent residents of Canada for more than 6 months? </legend>
              <div class="radio-group">
                <label class="radio text-center" for="q6_visa_required-1">
                  <input type="radio" value="#result_superVisa1" data-progress-increase="25" name="q6_visa_required-question" id="q6_visa_required-1">
                  Yes</label>
                <label class="radio text-center" for="q6_visa_required-2">
                  <input type="radio" value="#result_visitorVisa" data-progress-increase="25" name="q6_visa_required-question" id="q6_visa_required-2">
                  No</label>
              </div>
            </fieldset>
          </div>
          <div id="q8_visa_required" class="question hidden">
            <fieldset>
              <legend class="field-name">How do you plan to transit through Canada?</legend>
              <div class="radio-group">
                <label class="radio" for="q8_visa_required-1">
                  <input type="radio" value="q9_visa_required" data-progress-increase="0" name="q8_visa_required-question" id="q8_visa_required-1">
                  By air, via a Canadian airport, between 2 international flights</label>
                <label class="radio" for="q8_visa_required-2">
                  <input type="radio" value="#result_visitorVisa" data-progress-increase="20" name="q8_visa_required-question" id="q8_visa_required-2">
                  By car, train, bus or boat (including cruise ship)</label>
              </div>
            </fieldset>
          </div>
          <div id="q9_visa_required" class="question hidden">
            <fieldset>
              <legend class="field-name">Will you transit through Canada in 48 hours or less?</legend>
              <div class="radio-group">
                <label class="radio text-center" for="q9_visa_required-1">
                  <input type="radio" value="q13_visa_required" data-progress-increase="0" name="q9_visa_required-question" id="q9_visa_required-1">
                  Yes</label>
                <label class="radio text-center" for="q9_visa_required-2">
                  <input type="radio" value="#result_visitorVisa" data-progress-increase="20" name="q9_visa_required-question" id="q9_visa_required-2">
                  No</label>
              </div>
            </fieldset>
          </div>
          <div id="q13_visa_required" class="question hidden">
            <fieldset>
              <legend class="field-name">Do you plan to visit Canada while you transit?</legend>
              <div class="radio-group">
                <label class="radio text-center" for="q13_visa_required-1">
                  <input type="radio" value="#result_visitorVisa" data-progress-increase="20" name="q13_visa_required-question" id="q13_visa_required-1">
                  Yes</label>
                <label class="radio text-center" for="q13_visa_required-2">
                  <input type="radio" value="#result_transit" data-progress-increase="20" name="q13_visa_required-question" id="q13_visa_required-2">
                  No</label>
              </div>
            </fieldset>
          </div>
          <!-- End - Visa required flow --> 
          
          <!-- START - eTA-X flow -->
          <div id="q9_eTA-X" class="question hidden">
            <fieldset>
              <legend class="field-name">Have you held a Canadian visitor visa in the past 10 years, or do you currently hold a valid US nonimmigrant visa?</legend>
              <div class="radio-group">
                <label class="radio text-center" for="q9_eTA-X-1">
                  <input type="radio" value="q7_eTA-X" data-progress-increase="25" name="q9_eTA-X-question" id="q9_eTA-X-1">
                  Yes</label>
                <label class="radio text-center" for="q9_eTA-X-2">
                  <input type="radio" value="q5_visa_eTA-X_required" data-progress-increase="25" name="q9_eTA-X-question" id="q9_eTA-X-2">
                  No</label>
              </div>
            </fieldset>
          </div>
          <div id="q7_eTA-X" class="question hidden">
            <fieldset>
              <legend class="field-name">How do you plan to travel to Canada?</legend>
              <div class="radio-group">
                <label class="radio" for="q7_eTA-X-1">
                  <input type="radio" value="q5_eTA-X" data-progress-increase="25" name="q7_eTA-X-question" id="q7_eTA-X-1">
                  By air, via a Canadian airport</label>
                <label class="radio" for="q7_eTA-X-2">
                  <input type="radio" value="q5_visa_eTA-X_required" data-progress-increase="25" name="q7_eTA-X-question" id="q7_eTA-X-2">
                  By car, train, bus or boat (including cruise ship)</label>
              </div>
            </fieldset>
          </div>
          <div id="q5_eTA-X" class="question hidden">
            <fieldset>
              <legend class="field-name">What do you plan to do in Canada?</legend>
              <div class="radio-group">
                <label class="radio" for="q5_eTA-X-1">
                  <input type="radio" value="#result_eTA_eTAX" data-progress-increase="25" name="q5_eTA-X-question" id="q5_eTA-X-1">
                  Visit as a tourist</label>
                <label class="radio" for="q5_eTA-X-2">
                  <input type="radio" value="q6_eTA-X" data-progress-increase="25" name="q5_eTA-X-question" id="q5_eTA-X-2">
                  Visit family</label>
                <label class="radio" for="q5_eTA-X-3">
                  <input type="radio" value="q8a_eTA-X" data-progress-increase="25" name="q5_eTA-X-question" id="q5_eTA-X-3">
                  Transit through Canada</label>
                <label class="radio" for="q5_eTA-X-4">
                  <input type="radio" value="#result_eTA_eTAX" data-progress-increase="25" name="q5_eTA-X-question" id="q5_eTA-X-4">
                  Attend a meeting, conference, or trade show</label>
                <label class="radio" for="q5_eTA-X-5">
                  <input type="radio" value="q15_studyETA_X_E" data-progress-increase="25" name="q5_eTA-X-question" id="q5_eTA-X-5">
                  Study</label>
                <label class="radio" for="q5_eTA-X-6">
                  <input type="radio" value="q15_workETA_X_E" data-progress-increase="25" name="q5_eTA-X-question" id="q5_eTA-X-6">
                  Work</label>
              </div>
            </fieldset>
          </div>
          <div id="q6_eTA-X" class="question hidden">
            <fieldset>
              <legend class="field-name">Do you plan to visit your children or grandchildren who are Canadian citizens or permanent residents of Canada for more than 6 months? </legend>
              <div class="radio-group">
                <label class="radio text-center" for="q6_eTA-X-1">
                  <input type="radio" value="#result_superVisa2" data-progress-increase="25" name="q6_eTA-X-question" id="q6_eTA-X-1">
                  Yes</label>
                <label class="radio text-center" for="q6_eTA-X-2">
                  <input type="radio" value="#result_eTA_eTAX" data-progress-increase="25" name="q6_eTA-X-question" id="q6_eTA-X-2">
                  No</label>
              </div>
            </fieldset>
          </div>
          <div id="q8a_eTA-X" class="question hidden">
            <fieldset>
              <legend class="field-name">How do you plan to transit through Canada?</legend>
              <div class="radio-group">
                <label class="radio" for="q8a_eTA-X-1">
                  <input type="radio" value="#result_eTA_eTAX" data-progress-increase="0" name="q8a_eTA-X-question" id="q8a_eTA-X-1">
                  By air, via a Canadian airport, between 2 international flights</label>
                <label class="radio" for="q8a_eTA-X-2">
                  <input type="radio" value="#result_visitorVisa" data-progress-increase="0" name="q8a_eTA-X-question" id="q8a_eTA-X-2">
                  By car, train, bus or boat (including cruise ship)</label>
              </div>
            </fieldset>
          </div>
          <!-- End - eTA-X flow --> 
          
          <!-- START - eTA-X-Mexico flow -->
          <div id="q9_eTA-X-Mexico" class="question hidden">
            <fieldset>
              <legend class="field-name">Have you held a Canadian visitor visa in the past 10 years, or do you currently hold a valid US nonimmigrant visa?</legend>
              <div class="radio-group">
                <label class="radio text-center" for="q9_eTA-X-Mexico-1">
                  <input type="radio" value="q7_eTA-X-Mexico" data-progress-increase="25" name="q9_eTA-X-Mexico-question" id="q9_eTA-X-Mexico-1">
                  Yes</label>
                <label class="radio text-center" for="q9_eTA-X-Mexico-2">
                  <input type="radio" value="q5_visa_eTA-X_required_mexico" data-progress-increase="25" name="q9_eTA-X-Mexico-question" id="q9_eTA-X-Mexico-2">
                  No</label>
              </div>
            </fieldset>
          </div>
          <div id="q7_eTA-X-Mexico" class="question hidden">
            <fieldset>
              <legend class="field-name">How do you plan to travel to Canada?</legend>
              <div class="radio-group">
                <label class="radio" for="q7_eTA-X-Mexico-1">
                  <input type="radio" value="q5_eTA-X-Mexico" data-progress-increase="25" name="q7_eTA-X-Mexico-question" id="q7_eTA-X-Mexico-1">
                  By air, via a Canadian airport</label>
                <label class="radio" for="q7_eTA-X-Mexico-2">
                  <input type="radio" value="q5_visa_eTA-X_required_mexico" data-progress-increase="25" name="q7_eTA-X-Mexico-question" id="q7_eTA-X-Mexico-2">
                  By car, train, bus or boat (including cruise ship)</label>
              </div>
            </fieldset>
          </div>
          <div id="q5_eTA-X-Mexico" class="question hidden">
            <fieldset>
              <legend class="field-name">What do you plan to do in Canada?</legend>
              <div class="radio-group">
                <label class="radio" for="q5_eTA-X-Mexico-1">
                  <input type="radio" value="#result_eTA_eTAX" data-progress-increase="25" name="q5_eTA-X-Mexico-question" id="q5_eTA-X-Mexico-1">
                  Visit as a tourist</label>
                <label class="radio" for="q5_eTA-X-Mexico-2">
                  <input type="radio" value="q6_eTA-X-Mexico" data-progress-increase="25" name="q5_eTA-X-Mexico-question" id="q5_eTA-X-Mexico-2">
                  Visit family</label>
                <label class="radio" for="q5_eTA-X-Mexico-3">
                  <input type="radio" value="q8a_eTA-X-Mexico" data-progress-increase="25" name="q5_eTA-X-Mexico-question" id="q5_eTA-X-Mexico-3">
                  Transit through Canada</label>
                <label class="radio" for="q5_eTA-X-Mexico-4">
                  <input type="radio" value="#result_eTA_eTAX" data-progress-increase="25" name="q5_eTA-X-Mexico-question" id="q5_eTA-X-Mexico-4">
                  Attend a meeting, conference, or trade show</label>
                <label class="radio" for="q5_eTA-X-Mexico-5">
                  <input type="radio" value="q15_studyETA_X_Mexico" data-progress-increase="25" name="q5_eTA-X-Mexico-question" id="q5_eTA-X-Mexico-5">
                  Study</label>
                <label class="radio" for="q5_eTA-X-Mexico-6">
                  <input type="radio" value="q15_workETA_X_mexico" data-progress-increase="25" name="q5_eTA-X-Mexico-question" id="q5_eTA-X-Mexico-6">
                  Work</label>
              </div>
            </fieldset>
          </div>
          <div id="q6_eTA-X-Mexico" class="question hidden">
            <fieldset>
              <legend class="field-name">Do you plan to visit your children or grandchildren who are Canadian citizens or permanent residents of Canada for more than 6 months? </legend>
              <div class="radio-group">
                <label class="radio text-center" for="q6_eTA-X-Mexico-1">
                  <input type="radio" value="#result_superVisa2" data-progress-increase="25" name="q6_eTA-X-Mexico-question" id="q6_eTA-X-Mexico-1">
                  Yes</label>
                <label class="radio text-center" for="q6_eTA-X-Mexico-2">
                  <input type="radio" value="#result_eTA_eTAX" data-progress-increase="25" name="q6_eTA-X-Mexico-question" id="q6_eTA-X-Mexico-2">
                  No</label>
              </div>
            </fieldset>
          </div>
          <div id="q8a_eTA-X-Mexico" class="question hidden">
            <fieldset>
              <legend class="field-name">How do you plan to transit through Canada?</legend>
              <div class="radio-group">
                <label class="radio" for="q8a_eTA-X-Mexico-1">
                  <input type="radio" value="#result_eTA_eTAX" data-progress-increase="0" name="q8a_eTA-X-Mexico-question" id="q8a_eTA-X-Mexico-1">
                  By air, via a Canadian airport, between 2 international flights</label>
                <label class="radio" for="q8a_eTA-X-Mexico-2">
                  <input type="radio" value="#result_visitorVisa" data-progress-increase="0" name="q8a_eTA-X-Mexico-question" id="q8a_eTA-X-Mexico-2">
                  By car, train, bus or boat (including cruise ship)</label>
              </div>
            </fieldset>
          </div>
          <div id="q15_studyETA_X_Mexico" class="question hidden">
            <fieldset>
              <legend class="field-name">Select the option that best matches your situation:</legend>
              <div class="radio-group">
                <label class="radio" for="q15_studyETA_X_Mexico-1">
                  <input type="radio" value="#result_studyVFirst" data-progress-increase="25" name="q15_studyETA_X_Mexico-question" id="q15_studyETA_X_Mexico-1">
                  I’m applying for my first study permit</label>
                <label class="radio" for="q15_studyETA_X_Mexico-2">
                  <input type="radio" value="study_permit_approval_date" data-progress-increase="25" name="q15_studyETA_X_Mexico-question" id="q15_studyETA_X_Mexico-2">
                  I already have my first study permit</label>
                <label class="radio" for="q15_studyETA_X_Mexico-3">
                  <input type="radio" value="#result_studyETA_X_EExtend" data-progress-increase="25" name="q15_studyETA_X_Mexico-question" id="q15_studyETA_X_Mexico-3">
                  I’ve extended or plan to extend my study permit</label>
                <label class="radio" for="q15_studyETA_X_Mexico-4">
                  <input type="radio" value="#result_studyETA_X_EEligibleWithout" data-progress-increase="25" name="q15_studyETA_X_Mexico-question" id="q15_studyETA_X_Mexico-4">
                  I’m eligible to study without a permit</label>
                <label class="radio" for="q15_studyETA_X_Mexico-5">
                  <input type="radio" value="#result_studyENotSure" data-progress-increase="25" name="q15_studyETA_X_Mexico-question" id="q15_studyETA_X_Mexico-5">
                  I’m not sure what I need to study</label>
              </div>
            </fieldset>
          </div>
          <div id="q15_workETA_X_mexico" class="question hidden">
            <fieldset>
              <legend class="field-name">Select the option that best matches your situation:</legend>
              <div class="radio-group">
                <label class="radio" for="q15_workETA_X_mexico-1">
                  <input type="radio" value="#result_workVFirst" data-progress-increase="25" name="q15_workETA_X_mexico-question" id="q15_workETA_X_mexico-1">
                  I’m applying for my first work permit</label>
                <label class="radio" for="q15_workETA_X_mexico-2">
                  <input type="radio" value="q15_workETA_X_E_have_permit" data-progress-increase="25" name="q15_workETA_X_mexico-question" id="q15_workETA_X_mexico-2">
                  I already have my first work permit</label>
                <label class="radio" for="q15_workETA_X_mexico-3">
                  <input type="radio" value="#result_workETA_X_EExtend" data-progress-increase="25" name="q15_workETA_X_mexico-question" id="q15_workETA_X_mexico-3">
                  I’ve extended or plan to extend my work permit</label>
                <label class="radio" for="q15_workETA_X_mexico-4">
                  <input type="radio" value="#result_workETA_X_EEligibleWithout" data-progress-increase="25" name="qq15_workETA_X_mexico-question" id="q15_workETA_X_mexico-4">
                  I’m eligible to work without a permit</label>
                <label class="radio" for="q15_workETA_X_mexico-5">
                  <input type="radio" value="#result_workENotSure" data-progress-increase="25" name="q15_workETA_X_mexico-question" id="q15_workETA_X_mexico-5">
                  I’m not sure what I need to work</label>
              </div>
            </fieldset>
          </div>
          <div id="q15_workETA_X_required_mexico" class="question hidden">
            <fieldset>
              <legend class="field-name">Select the option that best matches your situation:</legend>
              <div class="radio-group">
                <label class="radio" for="q15_workETA_X_required_mexico-1">
                  <input type="radio" value="#result_workVFirst" data-progress-increase="25" name="q15_workETA_X_required_mexico-question" id="q15_workETA_X_required_mexico-1">
                  I’m applying for my first work permit</label>
                <label class="radio" for="q15_workETA_X_required_mexico-2">
                  <input type="radio" value="q15_workPermitApprovalDate" data-progress-increase="25" name="q15_workETA_X_required_mexico-question" id="q15_workETA_X_required_mexico-2">
                  I already have my first work permit</label>
                <label class="radio" for="q15_workETA_X_required_mexico-3">
                  <input type="radio" value="#result_workVExtend" data-progress-increase="25" name="q15_workETA_X_required_mexico-question" id="q15_workETA_X_required_mexico-3">
                  I’ve extended or plan to extend my work permit</label>
                <label class="radio" for="q15_workETA_X_required_mexico-4">
                  <input type="radio" value="#result_workVEligibleWithout" data-progress-increase="25" name="q15_workETA_X_required_mexico-question" id="q15_workETA_X_required_mexico-4">
                  I’m eligible to work without a permit</label>
                <label class="radio" for="q15_workETA_X_required_mexico-5">
                  <input type="radio" value="#result_workVNotSure" data-progress-increase="25" name="q15_workETA_X_required_mexico-question" id="q15_workETA_X_required_mexico-5">
                  I’m not sure what I need to work</label>
              </div>
            </fieldset>
          </div>
          <div id="q5_visa_eTA-X_required_mexico" class="question hidden">
            <fieldset>
              <legend class="field-name">What do you plan to do in Canada?</legend>
              <div class="radio-group">
                <label class="radio" for="q5_visa_eTA-X_required_mexico-1">
                  <input type="radio" value="#result_visitorVisa" data-progress-increase="25" name="q5_visa_eTA-X_required_mexico-question" id="q5_visa_eTA-X_required_mexico-1">
                  Visit as a tourist</label>
                <label class="radio" for="q5_visa_eTA-X_required_mexico-2">
                  <input type="radio" value="q6_visa_eTA-X_required" data-progress-increase="25" name="q5_visa_eTA-X_required_mexico-question" id="q5_visa_eTA-X_required_mexico-2">
                  Visit family</label>
                <!--       <label class="radio" for="q5_visa_eTA-X_required-3">
                      <input type="radio" value="q8_visa_eTA-X_required" data-progress-increase="25" name="q5_visa_eTA-X_required_mexico-question" id="q5_visa_eTA-X_required-3">
                      Transit through Canada</label>-->
                <label class="radio" for="q5_visa_eTA-X_required_mexico-3">
                  <input type="radio" value="#result_visitorVisa" data-progress-increase="25" name="q5_visa_eTA-X_required_mexico-question" id="q5_visa_eTA-X_required_mexico-3">
                  Attend a meeting, conference, or trade show</label>
                <label class="radio" for="q5_visa_eTA-X_required_mexico-4">
                  <input type="radio" value="q15_studyETA_X_V_mexico_mexico" data-progress-increase="25" name="q5_visa_eTA-X_required_mexico-question" id="q5_visa_eTA-X_required_mexico-4">
                  Study</label>
                <label class="radio" for="q5_visa_eTA-X_required_mexico-5">
                  <input type="radio" value="q15_workETA_X_required_mexico" data-progress-increase="25" name="q5_visa_eTA-X_required_mexico-question" id="q5_visa_eTA-X_required_mexico-5">
                  Work</label>
              </div>
            </fieldset>
          </div>
          <div id="study_permit_approval_date" class="question hidden">
            <fieldset>
              <legend class="field-name">When was your study permit approved?</legend>
              <div class="radio-group">
                <label class="radio" for="study_permit_approval_date_before">
                  <input type="radio" value="#result_mex_work_study_Have_eTA" name="study_permit_approval_date" id="study_permit_approval_date_before">
                  My study permit was approved before March 1, 2024 </label>
                <label class="radio" for="study_permit_approval_date_after">
                  <input type="radio" value="#result_firststudywork_mexico_etax_eligible_postvisaimplementation" name="study_permit_approval_date" id="study_permit_approval_date_after">
                  My study permit was approved on or after March 1, 2024 </label>
              </div>
            </fieldset>
          </div>
          <div id="studyPermitApprovalDateQuestion" class="question hidden">
            <fieldset>
              <legend class="field-name">When was your study permit approved?</legend>
              <div class="radio-group">
                <label class="radio" for="studyPermitApprovalDate-1">
                  <input type="radio" value="#result_mex_work_study_Have_eTA_visarequired" data-progress-increase="25" name="studyPermitApprovalDate-question" id="studyPermitApprovalDate-1">
                  My study permit was approved before March 1, 2024</label>
                <label class="radio" for="studyPermitApprovalDate-2">
                  <input type="radio" value="#result_studyVHavePermit" data-progress-increase="25" name="studyPermitApprovalDate-question" id="studyPermitApprovalDate-2">
                  My study permit was approved on or after March 1, 2024</label>
              </div>
            </fieldset>
          </div>
          <div id="q15_workPermitApprovalDate" class="question hidden">
            <fieldset>
              <legend class="field-name">When was your work permit approved?</legend>
              <div class="radio-group">
                <label class="radio" for="q15_workPermitApprovalDate-1">
                  <input type="radio" value="#result_mex_work_study_Have_eTA_visarequired" data-progress-increase="25" name="q15_workPermitApprovalDate-question" id="q15_workPermitApprovalDate-1">
                  My work permit was approved before March 1, 2024 </label>
                <label class="radio" for="q15_workPermitApprovalDate-2">
                  <input type="radio" value="#result_workVHavePermit" data-progress-increase="25" name="q15_workPermitApprovalDate-question" id="q15_workPermitApprovalDate-2">
                  My work permit was approved on or after March 1, 2024 </label>
              </div>
            </fieldset>
          </div>
          <div id="q15_workETA_X_E_have_permit" class="question hidden">
            <fieldset>
              <legend class="field-name">When was your work permit approved?</legend>
              <div class="radio-group">
                <label class="radio" for="q15_workETA_X_E_have_permit-1">
                  <input type="radio" value="#result_mex_work_study_Have_eTA" data-progress-increase="25" name="q15_workETA_X_E_have_permit-question" id="q15_workETA_X_E_have_permit-1">
                  My work permit was approved before March 1, 2024 </label>
                <label class="radio" for="q15_workETA_X_E_have_permit-2">
                  <input type="radio" value="#result_firststudywork_mexico_etax_eligible_postvisaimplementation" data-progress-increase="25" name="q15_workETA_X_E_have_permit-question" id="q15_workETA_X_E_have_permit-2">
                  My work permit was approved on or after March 1, 2024 </label>
              </div>
            </fieldset>
          </div>
          <div id="q15_studyETA_X_V_mexico_mexico" class="question hidden">
            <fieldset>
              <legend class="field-name">Select the option that best matches your situation:</legend>
              <div class="radio-group">
                <label class="radio" for="q15_studyETA_X_V_mexico-1">
                  <input type="radio" value="#result_studyVFirst" data-progress-increase="25" name="q15_studyETA_X_V_mexico-question" id="q15_studyETA_X_V_mexico-1">
                  I’m applying for my first study permit</label>
                <label class="radio" for="q15_studyETA_X_V_mexico-2">
                  <input type="radio" value="studyPermitApprovalDateQuestion" data-progress-increase="25" name="q15_studyETA_X_V_mexico-question" id="q15_studyETA_X_V_mexico-2">
                  I already have my first study permit</label>
                <label class="radio" for="q15_studyETA_X_V_mexico-3">
                  <input type="radio" value="#result_studyVExtend" data-progress-increase="25" name="q15_studyETA_X_V_mexico-question" id="q15_studyETA_X_V_mexico-3">
                  I’ve extended or plan to extend my study permit</label>
                <label class="radio" for="q15_studyETA_X_V_mexico-4">
                  <input type="radio" value="#result_studyVEligibleWithout" data-progress-increase="25" name="q15_studyETA_X_V_mexico-question" id="q15_studyETA_X_V_mexico-4">
                  I’m eligible to study without a permit</label>
                <label class="radio" for="q15_studyETA_X_V_mexico-5">
                  <input type="radio" value="#result_studyVNotSure" data-progress-increase="25" name="q15_studyETA_X_V_mexico-question" id="q15_studyETA_X_V_mexico-5">
                  I’m not sure what I need to study</label>
              </div>
            </fieldset>
          </div>
          <div id="q15_workPermitApprovalDate" class="question hidden">
            <fieldset>
              <legend class="field-name">When was your work permit approved?</legend>
              <div class="radio-group">
                <label class="radio" for="q15_workPermitApprovalDate-1">
                  <input type="radio" value="#result_mex_work_study_Have_eTA_visarequired" data-progress-increase="25" name="q15_workPermitApprovalDate-question" id="q15_workPermitApprovalDate-1">
                  My work permit was approved before March 1, 2024 </label>
                <label class="radio" for="q15_workPermitApprovalDate-2">
                  <input type="radio" value="#result_workVHavePermit" data-progress-increase="25" name="q15_workPermitApprovalDate-question" id="q15_workPermitApprovalDate-2">
                  My work permit was approved on or after March 1, 2024 </label>
              </div>
            </fieldset>
          </div>
          <!-- End - eTA-X-Mexico flow --> 
          
          <!-- START - Visa required (eTA-X) flow -->
          <div id="q5_visa_eTA-X_required" class="question hidden">
            <fieldset>
              <legend class="field-name">What do you plan to do in Canada?</legend>
              <div class="radio-group">
                <label class="radio" for="q5_visa_eTA-X_required-1">
                  <input type="radio" value="#result_visitorVisa" data-progress-increase="25" name="q5_visa_eTA-X_required-question" id="q5_visa_eTA-X_required-1">
                  Visit as a tourist</label>
                <label class="radio" for="q5_visa_eTA-X_required-2">
                  <input type="radio" value="q6_visa_eTA-X_required" data-progress-increase="25" name="q5_visa_eTA-X_required-question" id="q5_visa_eTA-X_required-2">
                  Visit family</label>
                <!--       <label class="radio" for="q5_visa_eTA-X_required-3">
                      <input type="radio" value="q8_visa_eTA-X_required" data-progress-increase="25" name="q5_visa_eTA-X_required-question" id="q5_visa_eTA-X_required-3">
                      Transit through Canada</label>-->
                <label class="radio" for="q5_visa_eTA-X_required-4">
                  <input type="radio" value="#result_visitorVisa" data-progress-increase="25" name="q5_visa_eTA-X_required-question" id="q5_visa_eTA-X_required-4">
                  Attend a meeting, conference, or trade show</label>
                <label class="radio" for="q5_visa_eTA-X_required-5">
                  <input type="radio" value="q15_studyETA_X_V" data-progress-increase="25" name="q5_visa_eTA-X_required-question" id="q5_visa_eTA-X_required-5">
                  Study</label>
                <label class="radio" for="q5_visa_eTA-X_required-6">
                  <input type="radio" value="q15_workETA_X_V" data-progress-increase="25" name="q5_visa_eTA-X_required-question" id="q5_visa_eTA-X_required-6">
                  Work</label>
              </div>
            </fieldset>
          </div>
          <div id="q6_visa_eTA-X_required" class="question hidden">
            <fieldset>
              <legend class="field-name">Do you plan to visit your children or grandchildren?</legend>
              <div class="radio-group">
                <label class="radio" for="q6_visa_eTA-X_required-1">
                  <input type="radio" value="#result_superVisa1" data-progress-increase="25" name="q6_visa_eTA-X_required-question" id="q6_visa_eTA-X_required-1">
                  Yes</label>
                <label class="radio" for="q6_visa_eTA-X_required-2">
                  <input type="radio" value="#result_visitorVisa" data-progress-increase="25" name="q6_visa_eTA-X_required-question" id="q6_visa_eTA-X_required-2">
                  No</label>
              </div>
            </fieldset>
          </div>
          <div id="q8_visa_eTA-X_required" class="question hidden">
            <fieldset>
              <legend class="field-name">How do you plan to transit Canada?</legend>
              <div class="radio-group">
                <label class="radio" for="q8_visa_eTA-X_required-1">
                  <input type="radio" value="q9_visa_eTA-X_required" data-progress-increase="25" name="q8_visa_eTA-X_required-question" id="q8_visa_eTA-X_required-1">
                  By air, via a Canadian airport, between 2 international flights</label>
                <label class="radio" for="q8_visa_eTA-X_required-2">
                  <input type="radio" value="#result_visitorVisa" data-progress-increase="25" name="q8_visa_eTA-X_required-question" id="q8_visa_eTA-X_required-2">
                  By car, bus, boat (including cruise ship)</label>
              </div>
            </fieldset>
          </div>
          <div id="q9_visa_eTA-X_required" class="question hidden">
            <fieldset>
              <legend class="field-name">Will you transit Canada in less than 48 hours?</legend>
              <div class="radio-group">
                <label class="radio" for="q9_visa_eTA-X_required-1">
                  <input type="radio" value="q13_visa_eTA-X_required" data-progress-increase="25" name="q9_visa_eTA-X_required-question" id="q9_visa_eTA-X_required-1">
                  Yes</label>
                <label class="radio" for="q9_visa_eTA-X_required-2">
                  <input type="radio" value="#result_visitorVisa" data-progress-increase="25" name="q9_visa_eTA-X_required-question" id="q9_visa_eTA-X_required-2">
                  No</label>
              </div>
            </fieldset>
          </div>
          <div id="q13_visa_eTA-X_required" class="question hidden">
            <fieldset>
              <legend class="field-name">Do you plan to visit Canada?</legend>
              <div class="radio-group">
                <label class="radio" for="q13_visa_eTA-X_required-1">
                  <input type="radio" value="#result_visitorVisa" data-progress-increase="25" name="q13_visa_eTA-X_required-question" id="q13_visa_eTA-X_required-1">
                  Yes</label>
                <label class="radio" for="q13_visa_eTA-X_required-2">
                  <input type="radio" value="#result_transit" data-progress-increase="25" name="q13_visa_eTA-X_required-question" id="q13_visa_eTA-X_required-2">
                  No</label>
              </div>
            </fieldset>
          </div>
          
          <!-- END - Visa required (eTA-X) flow --> 
          
          <!-- START - eTA-XT-TWOV flow -->
          <div id="q9_eTA-X-TWOV" class="question hidden">
            <fieldset>
              <legend class="field-name">Have you held a Canadian visitor visa in the past 10 years, or do you currently hold a valid U.S. nonimmigrant visa?</legend>
              <div class="radio-group">
                <label class="radio text-center" for="q9_eTA-X-TWOV-1">
                  <input type="radio" value="q7_eTA-X-TWOV" data-progress-increase="25" name="q9_eTA-X-TWOV-question" id="q9_eTA-X-TWOV-1">
                  Yes</label>
                <label class="radio text-center" for="q9_eTA-X-TWOV-2">
                  <input type="radio" value="q5_visa_eTA-X-TWOV_required" data-progress-increase="25" name="q9_eTA-X-TWOV-question" id="q9_eTA-X-TWOV-2">
                  No</label>
              </div>
            </fieldset>
          </div>
          <div id="q7_eTA-X-TWOV" class="question hidden">
            <fieldset>
              <legend class="field-name">How do you plan to travel to Canada?</legend>
              <div class="radio-group">
                <label class="radio" for="q7_eTA-X-TWOV-1">
                  <input type="radio" value="q5_eTA-X-TWOV" data-progress-increase="25" name="q7_eTA-X-TWOV-question" id="q7_eTA-X-TWOV-1">
                  By air, via a Canadian airport</label>
                <label class="radio" for="q7_eTA-X-TWOV-2">
                  <input type="radio" value="q5_visa_eTA-X-TWOV_required" data-progress-increase="25" name="q7_eTA-X-TWOV-question" id="q7_eTA-X-TWOV-2">
                  By car, train, bus or boat (including cruise ship)</label>
              </div>
            </fieldset>
          </div>
          <div id="q5_eTA-X-TWOV" class="question hidden">
            <fieldset>
              <legend class="field-name">What do you plan to do in Canada?</legend>
              <div class="radio-group">
                <label class="radio" for="q5_eTA-X-TWOV-1">
                  <input type="radio" value="#result_eTA_eTAX" data-progress-increase="25" name="q5_eTA-X-TWOV-question" id="q5_eTA-X-TWOV-1">
                  Visit as a tourist</label>
                <label class="radio" for="q5_eTA-X-TWOV-2">
                  <input type="radio" value="q6_eTA-X-TWOV" data-progress-increase="25" name="q5_eTA-X-TWOV-question" id="q5_eTA-X-TWOV-2">
                  Visit family</label>
                <label class="radio" for="q5_eTA-X-TWOV-3">
                  <input type="radio" value="q8a_eTA-X-TWOV" data-progress-increase="25" name="q5_eTA-X-TWOV-question" id="q5_eTA-X-TWOV-3">
                  Transit through Canada</label>
                <label class="radio" for="q5_eTA-X-TWOV-4">
                  <input type="radio" value="#result_eTA_eTAX" data-progress-increase="25" name="q5_eTA-X-TWOV-question" id="q5_eTA-X-TWOV-4">
                  Attend a meeting, conference, or trade show</label>
                <label class="radio" for="q5_eTA-X-TWOV-5">
                  <input type="radio" value="q15_studyETA_X_E" data-progress-increase="25" name="q5_eTA-X-TWOV-question" id="q5_eTA-X-TWOV-5">
                  Study</label>
                <label class="radio" for="q5_eTA-X-TWOV-6">
                  <input type="radio" value="q15_workETA_X_E" data-progress-increase="25" name="q5_eTA-X-TWOV-question" id="q5_eTA-X-TWOV-6">
                  Work</label>
              </div>
            </fieldset>
          </div>
          <div id="q6_eTA-X-TWOV" class="question hidden">
            <fieldset>
              <legend class="field-name">Do you plan to visit your children or grandchildren who are Canadian citizens or permanent residents of Canada for more than 6 months? </legend>
              <div class="radio-group">
                <label class="radio text-center" for="q6_eTA-X-TWOV-1">
                  <input type="radio" value="#result_superVisa2" data-progress-increase="25" name="q6_eTA-X-TWOV-question" id="q6_eTA-X-TWOV-1">
                  Yes</label>
                <label class="radio text-center" for="q6_eTA-X-TWOV-2">
                  <input type="radio" value="#result_eTA_eTAX" data-progress-increase="25" name="q6_eTA-X-TWOV-question" id="q6_eTA-X-TWOV-2">
                  No</label>
              </div>
            </fieldset>
          </div>
          <div id="q8a_eTA-X-TWOV" class="question hidden">
            <fieldset>
              <legend class="field-name">How do you plan to transit through Canada?</legend>
              <div class="radio-group">
                <label class="radio" for="q8a_eTA-X-TWOV-1">
                  <input type="radio" value="#result_eTA_eTAX_TWOV" data-progress-increase="0" name="q8a_eTA-X-TWOV-question" id="q8a_eTA-X-TWOV-1">
                  By air, via a Canadian airport, between 2 international flights</label>
                <label class="radio" for="q8a_eTA-X-TWOV-2">
                  <input type="radio" value="#result_visitorVisa" data-progress-increase="0" name="q8a_eTA-X-TWOV-question" id="q8a_eTA-X-TWOV-2">
                  By car, train, bus or boat (including cruise ship)</label>
              </div>
            </fieldset>
          </div>
          <!-- End - eTA-XT-TWOV --> 
          
          <!-- START - Visa required (eTA-XT-TWOV) flow -->
          <div id="q5_visa_eTA-X-TWOV_required" class="question hidden">
            <fieldset>
              <legend class="field-name">What do you plan to do in Canada?</legend>
              <div class="radio-group">
                <label class="radio" for="q5_visa_eTA-X-TWOV_required-1">
                  <input type="radio" value="#result_visitorVisa" data-progress-increase="25" name="q5_visa_eTA-X-TWOV_required-question" id="q5_visa_eTA-X-TWOV_required-1">
                  Visit as a tourist</label>
                <label class="radio" for="q5_visa_eTA-X-TWOV_required-2">
                  <input type="radio" value="q6_visa_eTA-X-TWOV_required" data-progress-increase="25" name="q5_visa_eTA-X-TWOV_required-question" id="q5_visa_eTA-X-TWOV_required-2">
                  Visit family</label>
                <!--       <label class="radio" for="q5_visa_eTA-X-TWOV_required-3">
                      <input type="radio" value="q8_visa_eTA-X-TWOV_required" data-progress-increase="25" name="q5_visa_eTA-X-TWOV_required-question" id="q5_visa_eTA-X-TWOV_required-3">
                      Transit through Canada</label>-->
                <label class="radio" for="q5_visa_eTA-X-TWOV_required-4">
                  <input type="radio" value="#result_visitorVisa" data-progress-increase="25" name="q5_visa_eTA-X-TWOV_required-question" id="q5_visa_eTA-X-TWOV_required-4">
                  Attend a meeting, conference, or trade show</label>
                <label class="radio" for="q5_visa_eTA-X-TWOV_required-5">
                  <input type="radio" value="q15_studyETA_X_V" data-progress-increase="25" name="q5_visa_eTA-X-TWOV_required-question" id="q5_visa_eTA-X-TWOV_required-5">
                  Study</label>
                <label class="radio" for="q5_visa_eTA-X-TWOV_required-6">
                  <input type="radio" value="q15_workETA_X_V" data-progress-increase="25" name="q5_visa_eTA-X-TWOV_required-question" id="q5_visa_eTA-X-TWOV_required-6">
                  Work</label>
              </div>
            </fieldset>
          </div>
          <div id="q6_visa_eTA-X-TWOV_required" class="question hidden">
            <fieldset>
              <legend class="field-name">Do you plan to visit your children or grandchildren?</legend>
              <div class="radio-group">
                <label class="radio" for="q6_visa_eTA-X-TWOV_required-1">
                  <input type="radio" value="#result_superVisa1" data-progress-increase="25" name="q6_visa_eTA-X-TWOV_required-question" id="q6_visa_eTA-X-TWOV_required-1">
                  Yes</label>
                <label class="radio" for="q6_visa_eTA-X-TWOV_required-2">
                  <input type="radio" value="#result_visitorVisa" data-progress-increase="25" name="q6_visa_eTA-X-TWOV_required-question" id="q6_visa_eTA-X-TWOV_required-2">
                  No</label>
              </div>
            </fieldset>
          </div>
          <div id="q8_visa_eTA-X-TWOV_required" class="question hidden">
            <fieldset>
              <legend class="field-name">How do you plan to transit Canada?</legend>
              <div class="radio-group">
                <label class="radio" for="q8_visa_eTA-X-TWOV_required-1">
                  <input type="radio" value="q9_visa_eTA-X-TWOV_required" data-progress-increase="25" name="q8_visa_eTA-X-TWOV_required-question" id="q8_visa_eTA-X-TWOV_required-1">
                  By air, via a Canadian airport, between 2 international flights</label>
                <label class="radio" for="q8_visa_eTA-X-TWOV_required-2">
                  <input type="radio" value="#result_visitorVisa" data-progress-increase="25" name="q8_visa_eTA-X-TWOV_required-question" id="q8_visa_eTA-X-TWOV_required-2">
                  By car, bus, boat (including cruise ship)</label>
              </div>
            </fieldset>
          </div>
          <div id="q9_visa_eTA-X-TWOV_required" class="question hidden">
            <fieldset>
              <legend class="field-name">Will you transit Canada in less than 48 hours?</legend>
              <div class="radio-group">
                <label class="radio" for="q9_visa_eTA-X-TWOV_required-1">
                  <input type="radio" value="q13_visa_eTA-X-TWOV_required" data-progress-increase="25" name="q9_visa_eTA-X-TWOV_required-question" id="q9_visa_eTA-X-TWOV_required-1">
                  Yes</label>
                <label class="radio" for="q9_visa_eTA-X-TWOV_required-2">
                  <input type="radio" value="#result_visitorVisa" data-progress-increase="25" name="q9_visa_eTA-X-TWOV_required-question" id="q9_visa_eTA-X-TWOV_required-2">
                  No</label>
              </div>
            </fieldset>
          </div>
          <div id="q13_visa_eTA-X-TWOV_required" class="question hidden">
            <fieldset>
              <legend class="field-name">Do you plan to visit Canada?</legend>
              <div class="radio-group">
                <label class="radio" for="q13_visa_eTA-X-TWOV_required-1">
                  <input type="radio" value="#result_visitorVisa" data-progress-increase="25" name="q13_visa_eTA-X-TWOV_required-question" id="q13_visa_eTA-X-TWOV_required-1">
                  Yes</label>
                <label class="radio" for="q13_visa_eTA-X-TWOV_required-2">
                  <input type="radio" value="#result_transit" data-progress-increase="25" name="q13_visa_eTA-X-TWOV_required-question" id="q13_visa_eTA-X-TWOV_required-2">
                  No</label>
              </div>
            </fieldset>
          </div>
          
          <!-- END - Visa required (eTA-XT-TWOV) flow --> 
          
          <!-- START - Taiwan flow -->
          <div id="q10_taiwan" class="question hidden">
            <fieldset>
              <legend class="field-name">For this trip, will you use a passport issued by the Ministry of Foreign Affairs in Taiwan that includes your personal identification number?</legend>
              <div class="radio-group">
                <label class="radio text-center" for="q10_taiwan-1">
                  <input type="radio" value="q5_eta_eligible" data-progress-increase="-20" name="q10_taiwan-question" id="q10_taiwan-1">
                  Yes</label>
                <label class="radio text-center" for="q10_taiwan-2">
                  <input type="radio" value="q5_visa_required" data-progress-increase="-20" name="q10_taiwan-question" id="q10_taiwan-2">
                  No</label>
              </div>
            </fieldset>
          </div>
          <!-- End - Taiwan flow --> 
          <!-- START - Israel flow -->
          <div id="q11_israel" class="question hidden">
            <fieldset>
              <legend class="field-name">For this trip, will you use a national Israeli passport?</legend>
              <div class="radio-group">
                <label class="radio text-center" for="q11_israel-1">
                  <input type="radio" value="q5_eta_eligible" data-progress-increase="0" name="q11_israel-question" id="q11_israel-1">
                  Yes</label>
                <label class="radio text-center" for="q11_israel-2">
                  <input type="radio" value="q5_visa_required" data-progress-increase="0" name="q11_israel-question" id="q11_israel-2">
                  No</label>
              </div>
            </fieldset>
          </div>
          <!-- End - Israel flow --> 
          <!-- START - Romania flow -->
          <div id="q12_romania" class="question hidden">
            <fieldset>
              <legend class="field-name">For this trip, will you use an electronic passport?</legend>
              <div class="radio-group">
                <label class="radio text-center" for="q12_romania-1">
                  <input type="radio" value="q5_eta_eligible" data-progress-increase="0" name="q12_romania-question" id="q12_romania-1">
                  Yes</label>
                <label class="radio text-center" for="q12_romania-2">
                  <input type="radio" value="q5_visa_required" data-progress-increase="0" name="q12_romania-question" id="q12_romania-2">
                  No</label>
              </div>
            </fieldset>
            <div class="row">
              <div class="col-md-2"><img src="https://www.cic.gc.ca/english/visit/images/epassport.jpg" alt="" class="img-responsive" /></div>
              <div class="col-md-7">
                <p class="mrgn-tp-md">Look on the front cover of your passport for the symbol of a rectangle with a circle in the middle. If you see this symbol, you have an electronic passport.</p>
              </div>
            </div>
          </div>
          <!-- End - Romania flow --> 
          
          <!-- START - Étudier flow -->
          <div id="q15_studyV" class="question hidden">
            <fieldset>
              <legend class="field-name">Select the option that best matches your situation:</legend>
              <div class="radio-group">
                <label class="radio" for="q15_studyV-1">
                  <input type="radio" value="#result_studyVFirst" data-progress-increase="25" name="q15_studyV-question" id="q15_studyV-1">
                  I’m applying for my first study permit</label>
                <label class="radio" for="q15_studyV-2">
                  <input type="radio" value="#result_studyVHavePermit" data-progress-increase="25" name="q15_studyV-question" id="q15_studyV-2">
                  I already have my first study permit</label>
                <label class="radio" for="q15_studyV-3">
                  <input type="radio" value="#result_studyVExtend" data-progress-increase="25" name="q15_studyV-question" id="q15_studyV-3">
                  I’ve extended or plan to extend my study permit</label>
                <label class="radio" for="q15_studyV-4">
                  <input type="radio" value="#result_studyVEligibleWithout" data-progress-increase="25" name="q15_studyV-question" id="q15_studyV-4">
                  I’m eligible to study without a permit</label>
                <label class="radio" for="q15_studyV-5">
                  <input type="radio" value="#result_studyVNotSure" data-progress-increase="25" name="q15_studyV-question" id="q15_studyV-5">
                  I’m not sure what I need to study</label>
              </div>
            </fieldset>
          </div>
          <div id="q15_studyE" class="question hidden">
            <fieldset>
              <legend class="field-name">Select the option that best matches your situation:</legend>
              <div class="radio-group">
                <label class="radio" for="q15_studyE-1">
                  <input type="radio" value="#result_studyEFirst" data-progress-increase="25" name="q15_studyE-question" id="q15_studyE-1">
                  I’m applying for my first study permit</label>
                <label class="radio" for="q15_studyE-2">
                  <input type="radio" value="#result_studyEHavePermit" data-progress-increase="25" name="q15_studyE-question" id="q15_studyE-2">
                  I already have my first study permit</label>
                <label class="radio" for="q15_studyE-3">
                  <input type="radio" value="#result_studyEExtend" data-progress-increase="25" name="q15_studyE-question" id="q15_studyE-3">
                  I’ve extended or plan to extend my study permit</label>
                <label class="radio" for="q15_studyE-4">
                  <input type="radio" value="#result_studyEEligibleWithout" data-progress-increase="25" name="q15_studyE-question" id="q15_studyE-4">
                  I’m eligible to study without a permit</label>
                <label class="radio" for="q15_studyE-5">
                  <input type="radio" value="#result_studyENotSure" data-progress-increase="25" name="q15_studyE-question" id="q15_studyE-5">
                  I’m not sure what I need to study</label>
              </div>
            </fieldset>
          </div>
          <div id="q15_studyUSA" class="question hidden">
            <fieldset>
              <legend class="field-name">Select the option that best matches your situation:</legend>
              <div class="radio-group">
                <label class="radio" for="q15_studyUSA-1">
                  <input type="radio" value="#result_studyUSAFirst" data-progress-increase="25" name="q15_studyUSA-question" id="q15_studyUSA-1">
                  I’m applying for my first study permit</label>
                <label class="radio" for="q15_studyUSA-2">
                  <input type="radio" value="#result_studyUSAHavePermit" data-progress-increase="25" name="q15_studyUSA-question" id="q15_studyUSA-2">
                  I already have my first study permit</label>
                <!-- <label class="radio" for="q15_studyUSA-3"><input type="radio" value="#result_studyUSAExtend" data-progress-increase="25" name="q15_studyUSA-question" id="q15_studyUSA-3">  I’ve extended or plan to extend my study permit</label> -->
                <label class="radio" for="q15_studyUSA-4">
                  <input type="radio" value="#result_studyUSAEligibleWithout" data-progress-increase="25" name="q15_studyUSA-question" id="q15_studyUSA-4">
                  I’m eligible to study without a permit</label>
                <label class="radio" for="q15_studyUSA-5">
                  <input type="radio" value="#result_studyUSANotSure" data-progress-increase="25" name="q15_studyUSA-question" id="q15_studyUSA-5">
                  I’m not sure what I need to study</label>
              </div>
            </fieldset>
          </div>
          <div id="q15_studyETA_X_V" class="question hidden">
            <fieldset>
              <legend class="field-name">Select the option that best matches your situation:</legend>
              <div class="radio-group">
                <label class="radio" for="q15_studyETA_X_V-1">
                  <input type="radio" value="#result_studyVFirst" data-progress-increase="25" name="q15_studyETA_X_V-question" id="q15_studyETA_X_V-1">
                  I’m applying for my first study permit</label>
                <label class="radio" for="q15_studyETA_X_V-2">
                  <input type="radio" value="#result_studyVHavePermit" data-progress-increase="25" name="q15_studyETA_X_V-question" id="q15_studyETA_X_V-2">
                  I already have my first study permit</label>
                <label class="radio" for="q15_studyETA_X_V-3">
                  <input type="radio" value="#result_studyVExtend" data-progress-increase="25" name="q15_studyETA_X_V-question" id="q15_studyETA_X_V-3">
                  I’ve extended or plan to extend my study permit</label>
                <label class="radio" for="q15_studyETA_X_V-4">
                  <input type="radio" value="#result_studyVEligibleWithout" data-progress-increase="25" name="q15_studyETA_X_V-question" id="q15_studyETA_X_V-4">
                  I’m eligible to study without a permit</label>
                <label class="radio" for="q15_studyETA_X_V-5">
                  <input type="radio" value="#result_studyVNotSure" data-progress-increase="25" name="q15_studyETA_X_V-question" id="q15_studyETA_X_V-5">
                  I’m not sure what I need to study</label>
              </div>
            </fieldset>
          </div>
          <div id="q15_studyETA_X_E" class="question hidden">
            <fieldset>
              <legend class="field-name">Select the option that best matches your situation:</legend>
              <div class="radio-group">
                <label class="radio" for="q15_studyETA_X_E-1">
                  <input type="radio" value="#result_studyVFirst" data-progress-increase="25" name="q15_studyETA_X_E-question" id="q15_studyETA_X_E-1">
                  I’m applying for my first study permit</label>
                <label class="radio" for="q15_studyETA_X_E-2">
                  <input type="radio" value="#result_studyEHavePermit" data-progress-increase="25" name="q15_studyETA_X_E-question" id="q15_studyETA_X_E-2">
                  I already have my first study permit</label>
                <label class="radio" for="q15_studyETA_X_E-3">
                  <input type="radio" value="#result_studyETA_X_EExtend" data-progress-increase="25" name="q15_studyETA_X_E-question" id="q15_studyETA_X_E-3">
                  I’ve extended or plan to extend my study permit</label>
                <label class="radio" for="q15_studyETA_X_E-4">
                  <input type="radio" value="#result_studyETA_X_EEligibleWithout" data-progress-increase="25" name="q15_studyETA_X_E-question" id="q15_studyETA_X_E-4">
                  I’m eligible to study without a permit</label>
                <label class="radio" for="q15_studyETA_X_E-5">
                  <input type="radio" value="#result_studyENotSure" data-progress-increase="25" name="q15_studyETA_X_E-question" id="q15_studyETA_X_E-5">
                  I’m not sure what I need to study</label>
              </div>
            </fieldset>
          </div>
          <!-- End - Étudier flow --> 
          
          <!-- START - Travailler flow -->
          <div id="q15_workV" class="question hidden">
            <fieldset>
              <legend class="field-name">Select the option that best matches your situation:</legend>
              <div class="radio-group">
                <label class="radio" for="q15_workV-1">
                  <input type="radio" value="#result_workVFirst" data-progress-increase="25" name="q15_workV-question" id="q15_workV-1">
                  I’m applying for my first work permit</label>
                <label class="radio" for="q15_workV-2">
                  <input type="radio" value="#result_workVHavePermit" data-progress-increase="25" name="q15_workV-question" id="q15_workV-2">
                  I already have my first work permit</label>
                <label class="radio" for="q15_workV-3">
                  <input type="radio" value="#result_workVExtend" data-progress-increase="25" name="q15_workV-question" id="q15_workV-3">
                  I’ve extended or plan to extend my work permit</label>
                <label class="radio" for="q15_workV-4">
                  <input type="radio" value="#result_workVEligibleWithout" data-progress-increase="25" name="q15_workV-question" id="q15_workV-4">
                  I’m eligible to work without a permit</label>
                <label class="radio" for="q15_workV-5">
                  <input type="radio" value="#result_workVNotSure" data-progress-increase="25" name="q15_workV-question" id="q15_workV-5">
                  I’m not sure what I need to work</label>
              </div>
            </fieldset>
          </div>
          <div id="q15_workE" class="question hidden">
            <fieldset>
              <legend class="field-name">Select the option that best matches your situation:</legend>
              <div class="radio-group">
                <label class="radio" for="q15_workE-1">
                  <input type="radio" value="#result_workEFirst" data-progress-increase="25" name="q15_workE-question" id="q15_workE-1">
                  I’m applying for my first work permit</label>
                <label class="radio" for="q15_workE-2">
                  <input type="radio" value="#result_workEHavePermit" data-progress-increase="25" name="q15_workE-question" id="q15_workE-2">
                  I already have my first work permit</label>
                <label class="radio" for="q15_workE-3">
                  <input type="radio" value="#result_workEExtend" data-progress-increase="25" name="q15_workE-question" id="q15_workE-3">
                  I’ve extended or plan to extend my work permit</label>
                <label class="radio" for="q15_workE-4">
                  <input type="radio" value="#result_workEEligibleWithout" data-progress-increase="25" name="q15_workE-question" id="q15_workE-4">
                  I’m eligible to work without a permit</label>
                <label class="radio" for="q15_workE-5">
                  <input type="radio" value="#result_workENotSure" data-progress-increase="25" name="q15_workE-question" id="q15_workE-5">
                  I’m not sure what I need to work</label>
              </div>
            </fieldset>
          </div>
          <div id="q15_workUSA" class="question hidden">
            <fieldset>
              <legend class="field-name">Select the option that best matches your situation:</legend>
              <div class="radio-group">
                <label class="radio" for="q15_workUSA-1">
                  <input type="radio" value="#result_workUSAFirst" data-progress-increase="25" name="q15_workUSA-question" id="q15_workUSA-1">
                  I’m applying for my first work permit</label>
                <label class="radio" for="q15_workUSA-2">
                  <input type="radio" value="#result_workUSAHavePermit" data-progress-increase="25" name="q15_workUSA-question" id="q15_workUSA-2">
                  I already have my first work permit</label>
                <!-- <label class="radio" for="q15_workUSA-3"><input type="radio" value="#result_workUSAExtend" data-progress-increase="25" name="q15_workUSA-question" id="q15_workUSA-3">
                    I’ve extended or plan to extend my work permit</label> -->
                <label class="radio" for="q15_workUSA-4">
                  <input type="radio" value="#result_workUSAEligibleWithout" data-progress-increase="25" name="q15_workUSA-question" id="q15_workUSA-4">
                  I’m eligible to work without a permit</label>
                <label class="radio" for="q15_workUSA-5">
                  <input type="radio" value="#result_workUSANotSure" data-progress-increase="25" name="q15_workUSA-question" id="q15_workUSA-5">
                  I’m not sure what I need to work</label>
              </div>
            </fieldset>
          </div>
          <div id="q15_workETA_X_V" class="question hidden">
            <fieldset>
              <legend class="field-name">Select the option that best matches your situation:</legend>
              <div class="radio-group">
                <label class="radio" for="q15_workETA_X_V-1">
                  <input type="radio" value="#result_workVFirst" data-progress-increase="25" name="q15_workETA_X_V-question" id="q15_workETA_X_V-1">
                  I’m applying for my first work permit</label>
                <label class="radio" for="q15_workETA_X_V-2">
                  <input type="radio" value="#result_workVHavePermit" data-progress-increase="25" name="q15_workETA_X_V-question" id="q15_workETA_X_V-2">
                  I already have my first work permit</label>
                <label class="radio" for="q15_workETA_X_V-3">
                  <input type="radio" value="#result_workVExtend" data-progress-increase="25" name="q15_workETA_X_V-question" id="q15_workETA_X_V-3">
                  I’ve extended or plan to extend my work permit</label>
                <label class="radio" for="q15_workETA_X_V-4">
                  <input type="radio" value="#result_workVEligibleWithout" data-progress-increase="25" name="q15_workETA_X_V-question" id="q15_workETA_X_V-4">
                  I’m eligible to work without a permit</label>
                <label class="radio" for="q15_workETA_X_V-5">
                  <input type="radio" value="#result_workVNotSure" data-progress-increase="25" name="q15_workETA_X_V-question" id="q15_workETA_X_V-5">
                  I’m not sure what I need to work</label>
              </div>
            </fieldset>
          </div>
          <div id="q15_workETA_X_E" class="question hidden">
            <fieldset>
              <legend class="field-name">Select the option that best matches your situation:</legend>
              <div class="radio-group">
                <label class="radio" for="q15_workETA_X_E-1">
                  <input type="radio" value="#result_workVFirst" data-progress-increase="25" name="q15_workETA_X_E-question" id="q15_workETA_X_E-1">
                  I’m applying for my first work permit</label>
                <label class="radio" for="q15_workETA_X_E-2">
                  <input type="radio" value="#result_workEHavePermit" data-progress-increase="25" name="q15_workETA_X_E-question" id="q15_workETA_X_E-2">
                  I already have my first work permit</label>
                <label class="radio" for="q15_workETA_X_E-3">
                  <input type="radio" value="#result_workETA_X_EExtend" data-progress-increase="25" name="q15_workETA_X_E-question" id="q15_workETA_X_E-3">
                  I’ve extended or plan to extend my work permit</label>
                <label class="radio" for="q15_workETA_X_E-4">
                  <input type="radio" value="#result_workETA_X_EEligibleWithout" data-progress-increase="25" name="q15_workETA_X_E-question" id="q15_workETA_X_E-4">
                  I’m eligible to work without a permit</label>
                <label class="radio" for="q15_workETA_X_E-5">
                  <input type="radio" value="#result_workENotSure" data-progress-increase="25" name="q15_workETA_X_E-question" id="q15_workETA_X_E-5">
                  I’m not sure what I need to work</label>
              </div>
            </fieldset>
          </div>
          <!-- End - Travailler flow --> 
          
          <!-- END OF THE FORM -->
        </form>
        
        <!-- #include virtual="/english/visit/results.html" -->
        
        <button id="btnNext" type="button" class="btn-next disabled" disabled>Next question</button>
        <p id="btnStartOver" class="hidden"><a class="btn-startOver btn btn-link text-left" href="#" onclick="location.reload()"><span class="glyphicon glyphicon-repeat mrgn-rght-sm"></span>Start over</a></p>
      </div>
    </div>
  </div>
  <div id="disclaimerText" class="alert alert-warning mrgn-tp-lg">
    <h2 class="h4">Important note:</h2>
    <p>This tool provides information only. It was created to assist you as you decide what travel document you may need to travel to Canada. This tool may not provide information on all travel documents or your particular situation. If you choose to apply, we will assess your application in accordance with the Immigration and Refugee Protection Act and its related Regulations. <a href="https://www.canada.ca/en/immigration-refugees-citizenship/corporate/terms-conditions.html" target="_blank">Read our complete terms and conditions (opens in a new tab)</a>.</p>
  </div>
  
  <!--	end of questions	--> 
</div>

<!-- Fin du contenue/Content ends  -->

<% if fullWidth = "yes" then %>
<div class="pagedetails container">
  <% else %>
  <div class="pagedetails">
    <h2 class="wb-inv">Page details</h2>
    <div class="row">
      <div class="col-sm-8 col-md-9 col-lg-9">
        <div class="wb-disable-allow" 
data-ajax-replace="https://www.canada.ca/etc/designs/canada/wet-boew/assets/feedback/page-feedback-en.html" 
data-feedback-section="<%=pft_section%>" 
data-feedback-theme="<%=pft_theme%>"></div>
      </div>
      <div class="wb-share col-sm-4 col-md-3" data-wb-share='{"lnkClass": "btn btn-default btn-block"}'></div>
      <div class="col-xs-12">
        <% end if %>
        <dl id="wb-dtmd">
          <dt> <%=date_modified_text%>
            <% if language = "eng" then %>
            &#32;
            <%else%>
            &#32;
            <%end if%>
          </dt>
          <dd>
            <time property="dateModified"><%=date_modified%></time>
          </dd>
        </dl> 
      </div>
    </div>
  </div>
</div>
</main>
<!-- footer --> 
<!-- footer --> 
<!-- #include virtual="/includes/inc/fn-pn.asp" --> 

<script src="/js/tools/visas/visas.js?202401023"></script> 
<script src="/js/tools/visas/visas-gatracking.js"></script> 

<!-- #include virtual="/includes/inc/end-html.asp" -->