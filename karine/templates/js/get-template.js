function englishTemplate(obj) {
    let classContainer = obj.components.fluidWidth ? "container" : "";
    let str = `<!doctype html>
    <html class="no-js" dir="ltr" lang="en" xmlns="http://www.w3.org/1999/xhtml">


    <head prefix="og: http://ogp.me/ns#">

        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta charset="utf-8">
        <title>`+ obj.head.title + `</title>
        <meta content="width=device-width, initial-scale=1" name="viewport">
        <meta name="description" content="`+ obj.metadata.description + `" />
        <meta name="keywords" content="`+ obj.metadata.keywords + `" />
        <link href="https://wet-boew.github.io/themes-dist/GCWeb/GCWeb/assets/favicon.ico" rel="icon" type="image/x-icon" />
        <link rel="stylesheet" href="https://wet-boew.github.io/themes-dist/GCWeb/GCWeb/css/theme.min.css" />
        <noscript>
            <link rel="stylesheet" href="https://wet-boew.github.io/themes-dist/GCWeb/wet-boew/css/noscript.min.css" />
        </noscript>    
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous" />
        <link rel="stylesheet" href="`+ obj.head.experimentalFeatures + `" />
        `+ obj.head.structuredData + `

    </head>


    <body vocab="http://schema.org/" typeof="WebPage">
        <nav>
            <ul id="wb-tphp">
                <li class="wb-slc"><a class="wb-sl" href="#wb-cont">Skip to main content</a></li>
                <li class="wb-slc visible-sm visible-md visible-lg"><a class="wb-sl" href="#wb-info">Skip to &#34;About government&#34;</a></li>
            </ul>
        </nav>

        <header>
            <div id="wb-bnr" class="container">
                <div class="row">

                    <section id="wb-lng" class="col-xs-3 col-sm-12 pull-right text-right">
                        <h2 class="wb-inv">Language selection</h2>
                        <div class="row">
                            <div class="col-md-12">
                                <ul class="list-inline mrgn-bttm-0">
                                    <li>
                                        <a lang="fr" href="`+ obj.head.alternateLanguageURL + `">

                                            <span class="hidden-xs">Fran&ccedil;ais</span>
                                            <abbr title="Fran&ccedil;ais" class="visible-xs h3 mrgn-tp-sm mrgn-bttm-0 text-uppercase">fr</abbr>

                                        </a>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </section>
                    <div class="brand col-xs-9 col-sm-5 col-md-4" property="publisher" typeof="GovernmentOrganization">

                        <a href="/en.html" property="url">
                            <img src="https://www.canada.ca/etc/designs/canada/wet-boew/assets/sig-blk-en.svg" alt="Government of Canada" property="logo">
                        </a>

                        <meta property="name" content="Government of Canada" />
                        <meta property="areaServed" typeof="Country" content="Canada" />
                        <link property="logo" href="https://www.canada.ca/etc/designs/canada/wet-boew/assets/wmms-blk.svg" />
                    </div>
                    <section id="wb-srch" class="col-lg-offset-4 col-md-offset-4 col-sm-offset-2 col-xs-12 col-sm-5 col-md-4">
                        <h2>Search</h2>

                        <form action="https://www.canada.ca/en/sr/srb.html" method="get" name="cse-search-box" role="search">
                            <div class="form-group wb-srch-qry">
                                <label for="wb-srch-q" class="wb-inv">Search Canada.ca</label>
                                <input name="cdn" value="canada" type="hidden" />
                                <input name="st" value="s" type="hidden" />
                                <input name="num" value="10" type="hidden" />
                                <input name="langs" value="en" type="hidden" />
                                <input name="st1rt" value="1" type="hidden" />
                                <input name="s5bm3ts21rch" value="x" type="hidden" />

                                <input id="wb-srch-q" list="wb-srch-q-ac" class="wb-srch-q form-control" name="q" type="search" value="" size="34" maxlength="170" placeholder="Search Canada.ca" />

                                <input type="hidden" name="_charset_" value="UTF-8" />

                                <datalist id="wb-srch-q-ac">
                                </datalist>
                            </div>
                            <div class="form-group submit">
                                <button type="submit" id="wb-srch-sub" class="btn btn-primary btn-small" name="wb-srch-sub"><span class="glyphicon-search glyphicon"></span><span
                                        class="wb-inv">Search</span></button>
                            </div>
                        </form>

                    </section>
                </div>
            </div>

            <nav class="gcweb-v2 gcweb-menu" typeof="SiteNavigationElement">
                <div class="container">
                    <h2 class="wb-inv">Menu</h2>
                    <button type="button" aria-haspopup="true" aria-expanded="false"><span class="wb-inv">Main
                        </span>Menu <span class="expicon glyphicon glyphicon-chevron-down"></span></button>
                    <ul role="menu" aria-orientation="vertical" data-ajax-replace="/content/dam/canada/sitemenu/sitemenu-v2-en.html">
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/jobs.html">Jobs and the workplace</a></li>
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/immigration-citizenship.html">Immigration
                                and citizenship</a>
                        </li>
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="https://travel.gc.ca/">Travel
                                and
                                tourism</a></li>
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/business.html">Business and industry</a>
                        </li>
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/benefits.html">Benefits</a></li>
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/health.html">Health</a></li>
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/taxes.html">Taxes</a></li>
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/environment.html">Environment and natural
                                resources</a></li>
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/defence.html">National security and
                                defence</a></li>
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/culture.html">Culture, history and sport</a>
                        </li>
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/policing.html">Policing, justice and
                                emergencies</a></li>
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/transport.html">Transport and
                                infrastructure</a></li>
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="http://international.gc.ca/world-monde/index.aspx?lang=eng">Canada and the
                                world </a></li>
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/finance.html">Money and finances</a></li>
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/science.html">Science and innovation</a>
                        </li>
                    </ul>

                </div>
            </nav>

            <!--UPDATE THE BREADCRUMB-->

            <nav id="wb-bc" property="breadcrumb">
                <h2 class="wb-inv">You are here:</h2>
                <div class="container">
                    `+ obj.components.breadcrumb + `
                </div>
            </nav>

        </header>


    
        <main property="mainContentOfPage" resource="#wb-main" typeof="WebPageElement" class="`+ classContainer + `"><!--CONTENT STARTS HERE-->` + obj.contents.toString() + `<!-- CONTENT ENDS HERE --></main>`
    // str += obj.components.pageFeedbackTool ? "<div class=\"row\"><div class=\"col-sm-8 col-md-9 col-lg-9\"><div class=\"wb-disable-allow\" data-ajax-replace=\"/etc/designs/canada/wet-boew/assets/feedback/page-feedback-en.html\"></div></div></div>" : "";
    // str += `<dl id="wb-dtmd">
    //             <dt>Date modified:</dt>
    //             <dd><time property="dateModified">`+obj.metadata.dateModified+`</time></dd>
    //         </dl>
    //         </section>
    //     </div>`
    str += `

            <div class="global-footer">
                <footer id="wb-info">
                    <h2 class="wb-inv">About this site</h2>
                    <div class="gc-contextual">
                        <div class="container">
                            <nav>
                                <h3>Immigration and citizenship</h3>
                                <ul class="list-col-xs-1 list-col-sm-2 list-col-md-3">
                                    <li><a href="https://ircc.canada.ca/english/helpcentre/index-featured-can.asp">Help Centre</a></li>

                                    <li><a href="https://www.canada.ca/en/immigration-refugees-citizenship/corporate/contact-ircc.html">Contact us</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div class="gc-main-footer">
                        <div class="container">
                            <nav>
                                <h3>Government of Canada</h3>
                                <ul class="list-unstyled colcount-sm-2 colcount-md-3">
                                    <li><a href="https://www.canada.ca/en/contact.html">All contacts</a></li>
                                    <li><a href="https://www.canada.ca/en/government/dept.html">Departments and agencies</a></li>
                                    <li><a href="https://www.canada.ca/en/government/system.html">About government</a></li>
                                </ul>
                                <h4><span class="wb-inv">Themes and topics</span></h4>
                                <ul class="list-unstyled colcount-sm-2 colcount-md-3">
                                    <li><a href="https://www.canada.ca/en/services/jobs.html">Jobs</a></li>
                                    <li><a href="https://www.canada.ca/en/services/immigration-citizenship.html">Immigration and citizenship</a></li>
                                    <li><a href="https://travel.gc.ca/">Travel and tourism</a></li>
                                    <li><a href="https://www.canada.ca/en/services/business.html">Business</a></li>
                                    <li><a href="https://www.canada.ca/en/services/benefits.html">Benefits</a></li>
                                    <li><a href="https://www.canada.ca/en/services/health.html">Health</a></li>
                                    <li><a href="https://www.canada.ca/en/services/taxes.html">Taxes</a></li>
                                    <li><a href="https://www.canada.ca/en/services/environment.html">Environment and natural resources</a></li>
                                    <li><a href="https://www.canada.ca/en/services/defence.html">National security and defence</a></li>
                                    <li><a href="https://www.canada.ca/en/services/culture.html">Culture, history and sport</a></li>
                                    <li><a href="https://www.canada.ca/en/services/policing.html">Policing, justice and emergencies</a></li>
                                    <li><a href="https://www.canada.ca/en/services/transport.html">Transport and infrastructure</a></li>
                                    <li><a href="https://international.gc.ca/world-monde/index.aspx?lang=eng">Canada and the world</a></li>
                                    <li><a href="https://www.canada.ca/en/services/finance.html">Money and finance</a></li>
                                    <li><a href="https://www.canada.ca/en/services/science.html">Science and innovation</a></li>
                                    <li><a href="https://www.canada.ca/en/services/indigenous-peoples.html">Indigenous peoples</a></li>
                                    <li><a href="https://www.canada.ca/en/services/veterans.html">Veterans and military</a></li>
                                    <li><a href="https://www.canada.ca/en/services/youth.html">Youth</a></li>
                                </ul>
                            </nav>
                        </div>

                    </div>
                    <div class="gc-sub-footer">
                        <div class="container d-flex align-items-center">
                            <nav>
                                <h3 class="wb-inv">Government of Canada Corporate</h3>
                                <ul>

                                    <li><a href="https://www.canada.ca/en/social.html">Social media</a></li>
                                    <li><a href="https://www.canada.ca/en/mobile.html">Mobile applications</a></li>
                                    <li><a href="https://www.canada.ca/en/government/about.html">About Canada.ca</a></li>

                                    <li><a href="https://www.canada.ca/en/transparency/terms.html">Terms and conditions</a></li>
                                    <li><a href="https://www.canada.ca/en/transparency/privacy.html">Privacy</a></li>
                                </ul>
                            </nav>
                            <div class="wtrmrk align-self-end">
                                <img src="https://www.canada.ca//etc/designs/canada/wet-boew/assets/wmms-blk.svg" alt="Symbol of the Government of Canada" />
                            </div>
                        </div>
                    </div>
                </footer>

        </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js" integrity="sha384-rY/jv8mMhqDabXSo+UCggqKtdmBfd3qC2/KvyTDNQ6PcUJXaxK1tMepoQda4g5vB" crossorigin="anonymous"></script>
    <script src="https://wet-boew.github.io/themes-dist/GCWeb/wet-boew/js/wet-boew.min.js"></script>
    <script src="https://wet-boew.github.io/themes-dist/GCWeb/GCWeb/js/theme.min.js"></script>
    </body>

    </html>`;
    return str;
}


function frenchTemplate(obj) {
    let classContainer = obj.components.fluidWidth ? "container" : "";
    let str = `
<!DOCTYPE html>
<html class="no-js" lang="fr" dir="ltr">

<head>
	<meta charset="utf-8">
	<title>`+ obj.head.title + `</title>
           <meta content="width=device-width, initial-scale=1" name="viewport">
           <meta name="description" content="`+ obj.metadata.description + `" />
           <meta name="keywords" content="`+ obj.metadata.keywords + `" />
           <link href="https://wet-boew.github.io/themes-dist/GCWeb/GCWeb/assets/favicon.ico" rel="icon" type="image/x-icon" />
           <link rel="stylesheet" href="https://wet-boew.github.io/themes-dist/GCWeb/GCWeb/css/theme.min.css" />
           <noscript>
               <link rel="stylesheet" href="https://wet-boew.github.io/themes-dist/GCWeb/wet-boew/css/noscript.min.css" />
           </noscript>    
           <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous" />
           <link rel="stylesheet" href="`+ obj.head.experimentalFeatures + `" />
           `+ obj.head.structuredData + `
   
       </head>
   
   
       <body vocab="http://schema.org/" typeof="WebPage">
           <nav>
		<ul id="wb-tphp">
			<li class="wb-slc"><a class="wb-sl" href="#wb-cont">Passer au contenu principal</a></li>
			<li class="wb-slc visible-sm visible-md visible-lg"><a class="wb-sl" href="#wb-info">Passer à «&#160;À propos de ce site&#160;»</a></li>
		</ul>
	</nav>
   
           <header>
		<div id="wb-bnr" class="container">
			<div class="row">
				<section id="wb-lng" class="col-xs-3 col-sm-12 pull-right text-right">
					<h2 class="wb-inv">Sélection de la langue</h2>
					<ul class="list-inline mrgn-bttm-0">
						<li>
							<a lang="en" hreflang="en" href="`+ obj.head.alternateLanguageURL + `">
								<span class="hidden-xs">English</span>
								<abbr title="English" class="visible-xs h3 mrgn-tp-sm mrgn-bttm-0 text-uppercase">en</abbr>
							</a>
						</li>
					</ul>
				</section>
                       <div class="brand col-xs-9 col-sm-5 col-md-4" property="publisher" typeof="GovernmentOrganization">
					<a href="#" property="url">
						<img src="https://wet-boew.github.io/themes-dist/GCWeb/GCWeb/assets/sig-blk-fr.svg" alt="Gouvernement du Canada" property="logo" /><span class="wb-inv"> / <span lang="en">Government of Canada</span></span>
					</a>
					<meta property="name" content="Gouvernement du Canada">
					<meta property="areaServed" typeof="Country" content="Canada" />
					<link property="logo" href="https://wet-boew.github.io/themes-dist/GCWeb/GCWeb/assets/wmms-blk.svg" />
				</div>


				<section id="wb-srch" class="col-lg-offset-4 col-md-offset-4 col-sm-offset-2 col-xs-12 col-sm-5 col-md-4">
					<h2>Recherche</h2>
					<form action="#" method="post" name="cse-search-box" role="search">
						<div class="form-group wb-srch-qry">
							<label for="wb-srch-q" class="wb-inv">Rechercher dans Canada.ca</label>
							<input id="wb-srch-q" list="wb-srch-q-ac" class="wb-srch-q form-control" name="q" type="search" value="" size="34" maxlength="170" placeholder="Rechercher dans Canada.ca" />
							<datalist id="wb-srch-q-ac"></datalist>
						</div>
						<div class="form-group submit">
							<button type="submit" id="wb-srch-sub" class="btn btn-primary btn-small" name="wb-srch-sub">
								<span class="glyphicon-search glyphicon"></span>
								<span class="wb-inv">Recherche</span>
							</button>
						</div>
					</form>
				</section>

			</div>
		</div>
		<nav class="gcweb-menu" typeof="SiteNavigationElement">
			<div class="container">
				<h2 class="wb-inv">Menu</h2>
				<button type="button" aria-haspopup="true" aria-expanded="false">Menu<span class="wb-inv"> principal</span> <span class="expicon glyphicon glyphicon-chevron-down"></span></button>
				<ul role="menu" aria-orientation="vertical" data-ajax-replace="https://www.canada.ca/content/dam/canada/sitemenu/sitemenu-v2-fr.html">
					<li role="presentation"><a role="menuitem" href="https://www.canada.ca/fr/services/emplois.html">Emplois et milieu de travail</a></li>
					<li role="presentation"><a role="menuitem" href="https://www.canada.ca/fr/services/immigration-citoyennete.html">Immigration et citoyenneté</a></li>
					<li role="presentation"><a role="menuitem" href="https://voyage.gc.ca/">Voyage et tourisme</a></li>
					<li role="presentation"><a role="menuitem" href="https://www.canada.ca/fr/services/entreprises.html">Entreprises et industrie</a></li>
					<li role="presentation"><a role="menuitem" href="https://www.canada.ca/fr/services/prestations.html">Prestations</a></li>
					<li role="presentation"><a role="menuitem" href="https://www.canada.ca/fr/services/sante.html">Santé</a></li>
					<li role="presentation"><a role="menuitem" href="https://www.canada.ca/fr/services/impots.html">Impôts</a></li>
					<li role="presentation"><a role="menuitem" href="https://www.canada.ca/fr/services/environnement.html">Environnement et ressources naturelles</a></li>
					<li role="presentation"><a role="menuitem" href="https://www.canada.ca/fr/services/defense.html">Sécurité nationale et défense</a></li>
					<li role="presentation"><a role="menuitem" href="https://www.canada.ca/fr/services/culture.html">Culture, histoire et sport</a></li>
					<li role="presentation"><a role="menuitem" href="https://www.canada.ca/fr/services/police.html">Services de police, justice et urgences</a></li>
					<li role="presentation"><a role="menuitem" href="https://www.canada.ca/fr/services/transport.html">Transport et infrastructure</a></li>
					<li role="presentation"><a role="menuitem" href="https://international.gc.ca/world-monde/index.aspx?lang=fra">Canada et le monde</a></li>
					<li role="presentation"><a role="menuitem" href="https://www.canada.ca/fr/services/finance.html">Argent et finances</a></li>
					<li role="presentation"><a role="menuitem" href="https://www.canada.ca/fr/services/science.html">Science et innovation</a></li>
				</ul>
			</div>
		</nav>

		<!--UPDATE THE BREADCRUMB-->


		<nav id="wb-bc" property="breadcrumb">
			<h2>Vous êtes ici :</h2>
			<div class="container">
                       `+ obj.components.breadcrumb + `
                   </div>
               </nav>
   
           </header>
   
   
       
           <main property="mainContentOfPage" resource="#wb-main" typeof="WebPageElement" class="`+ classContainer + `"><!--CONTENT STARTS HERE-->` + obj.contents.toString() + `<!-- CONTENT ENDS HERE --></main>`
    // str += obj.components.pageFeedbackTool ? "<div class=\"row\"><div class=\"col-sm-8 col-md-9 col-lg-9\"><div class=\"wb-disable-allow\" data-ajax-replace=\"/etc/designs/canada/wet-boew/assets/feedback/page-feedback-en.html\"></div></div></div>" : "";
    // str += `<dl id="wb-dtmd">
    //             <dt>Date modified:</dt>
    //             <dd><time property="dateModified">`+obj.metadata.dateModified+`</time></dd>
    //         </dl>
    //         </section>
    //     </div>`
    str += `
   
               <div class="global-footer">
		<footer id="wb-info">
			<h2 class="wb-inv">À propos de ce site</h2>
			<div class="gc-contextual">
				<div class="container">
					<nav>
						<h3>Immigration et citoyenneté</h3>
						<ul class="list-col-xs-1 list-col-sm-2 list-col-md-3">
							<li><a href="https://ircc.canada.ca/francais/centre-aide/index-en-vedette-can.asp">Centre d&#39;aide</a></li>

							<li><a href="https://www.canada.ca/fr/immigration-refugies-citoyennete/organisation/contactez-ircc.html">Contactez-nous</a></li>
						</ul>
					</nav>
				</div>
			</div>
			<div class="gc-main-footer">
				<div class="container">
					<nav>
						<h3>Gouvernement du Canada</h3>
						<ul class="list-unstyled colcount-sm-2 colcount-md-3">
							<li><a href="https://www.canada.ca/fr/contact.html">Toutes les coordonnées</a></li>
							<li><a href="https://www.canada.ca/fr/gouvernement/min.html">Ministères et organismes</a></li>
							<li><a href="https://www.canada.ca/fr/gouvernement/systeme.html">À propos du gouvernement</a></li>
						</ul>
						<h4><span class="wb-inv">Thèmes et sujets</span></h4>
						<ul class="list-unstyled colcount-sm-2 colcount-md-3">
							<li><a href="https://www.canada.ca/fr/services/emplois.html">Emplois</a></li>
							<li><a href="https://www.canada.ca/fr/services/immigration-citoyennete.html">Immigration et citoyenneté</a></li>
							<li><a href="https://voyage.gc.ca/">Voyage et tourisme</a></li>
							<li><a href="https://www.canada.ca/fr/services/entreprises.html">Entreprises</a></li>
							<li><a href="https://www.canada.ca/fr/services/prestations.html">Prestations</a></li>
							<li><a href="https://www.canada.ca/fr/services/sante.html">Santé</a></li>
							<li><a href="https://www.canada.ca/fr/services/impots.html">Impôts</a></li>
							<li><a href="https://www.canada.ca/fr/services/environnement.html">Environnement et ressources naturelles</a></li>
							<li><a href="https://www.canada.ca/fr/services/defense.html">Sécurité nationale et défense</a></li>
							<li><a href="https://www.canada.ca/fr/services/culture.html">Culture, histoire et sport</a></li>
							<li><a href="https://www.canada.ca/fr/services/police.html">Services de police, justice et urgences</a></li>
							<li><a href="https://www.canada.ca/fr/services/transport.html">Transport et infrastructure</a></li>
							<li><a href="https://www.international.gc.ca/world-monde/index.aspx?lang=fra">Le Canada et le monde</a></li>
							<li><a href="https://www.canada.ca/fr/services/finance.html">Argent et finance</a></li>
							<li><a href="https://www.canada.ca/fr/services/science.html">Science et innovation</a></li>
							<li><a href="https://www.canada.ca/fr/services/autochtones.html">Autochtones</a></li>
							<li><a href="https://www.canada.ca/fr/services/veterans.html">Vétérans et militaires</a></li>
							<li><a href="https://www.canada.ca/fr/services/jeunesse.html">Jeunesse</a></li>
						</ul>
					</nav>
				</div>
			</div>
			<div class="gc-sub-footer">
				<div class="container d-flex align-items-center">
					<nav>
						<h3 class="wb-inv">Organisation du gouvernement du Canada</h3>
						<ul>

							<li><a href="https://www.canada.ca/fr/sociaux.html">Médias sociaux</a></li>
							<li><a href="https://www.canada.ca/fr/mobile.html">Applications mobiles</a></li>
							<li><a href="https://www.canada.ca/fr/gouvernement/a-propos.html">À propos de Canada.ca</a></li>

							<li><a href="https://www.canada.ca/fr/transparence/avis.html">Avis</a></li>
							<li><a href="https://www.canada.ca/fr/transparence/confidentialite.html">Confidentialité</a></li>
						</ul>
					</nav>
					<div class="wtrmrk align-self-end">
						<img src="https://www.canada.ca/etc/designs/canada/wet-boew/assets/wmms-blk.svg" alt="Symbole du gouvernement du Canada" />
					</div>
				</div>
			</div>
		</footer>
	</div>
   
       <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js" integrity="sha384-rY/jv8mMhqDabXSo+UCggqKtdmBfd3qC2/KvyTDNQ6PcUJXaxK1tMepoQda4g5vB" crossorigin="anonymous"></script>
       <script src="https://wet-boew.github.io/themes-dist/GCWeb/wet-boew/js/wet-boew.min.js"></script>
       <script src="https://wet-boew.github.io/themes-dist/GCWeb/GCWeb/js/theme.min.js"></script>
       </body>
   
       </html>`;
    return str;
}