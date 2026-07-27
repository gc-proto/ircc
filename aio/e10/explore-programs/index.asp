<!-- #include virtual="/dataset/fees-dataset.asp" -->
<%

Session.LCID = 4105 '  Set the language to English Canadian
   ' Metadata elements
   	title = "Explore immigration programs to live, work, or study in Canada" 'leave breadcrumb variable blank when the title should be used as the breadcrumb title
   	breadcrumb = ""
   	date_created = "2023-12-07" 'Date published (YYYY-MM-DD) / Date de publication (AAAA-MM-JJ)
   	date_modified = "2025-12-31" 'Date modified (YYYY-MM-DD) / Date de modification (AAAA-MM-JJ)
   	page_description = "Answer a few questions to see different ways you might be able to come to Canada"
   	keywords = "Explore immigration programs, reunite with family, sponsor family, work temporarily, work permanently, study, visit, tool, wizard"
   	subject = ""
   	language_toggle = "/explorer-programmes/index.asp"

      
   'page feedback tool
    pft_theme = "Immigration"
    pft_section = ""
'  Twittercard: Add title. Important: use absolute path for image (http://) 
     twittercard_title = "Explore immigration programs to live, work, or study in Canada" 
     twittercard_description = "Answer a few questions to see different ways you might be able to come to Canada"
     twittercard_image = "https://ircc.canada.ca/explore-programs/images/twittercard/ProgramFinderEN.png"
   	
   '
   ' flag pages on staging
   	coder = ""
   	task = ""
   'Page columns and navigations
    page_columns = 1 ' number of columns needed in the page 1, 2 or 3
    
    js_page = "yes"
      fullWidth = "yes"
    '
   %>
<!-- #include virtual="/includes/inc/config.asp" -->
<!-- #include virtual="/includes/inc/head-tete.asp" -->
<!-- #include virtual="/includes/inc/twittercard-en.asp" --> 
<% language = "eng" %>
<!-- Custom scripts/CSS begin / Début des scripts/CSS personnalisés -->
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v6.4.0/css/all.css" crossorigin="anonymous">
<link rel="stylesheet" href="css/program-finder.css">
<link rel="stylesheet" href="css/program-finder-print.css">
<link rel="stylesheet" href="css/minified-template.css">
<!-- Custom scripts/CSS end / Fin des scripts/CSS personnalisés --> 
<!-- #include virtual="/explore-programs/inc/header-entete-begin.asp" --> 
<!-- Add the breadcrumb trail using li --> 
<!-- #include virtual="/explore-programs/inc/header-entete-end.asp" --> 
<!-- Content title begins / Début du titre du contenu --> 
<!-- Content Title ends / Fin du titre du contenu -->
<div id="jsonmanagernoncountry" data-wb-jsonmanager='{
   "url": "https://www.canada.ca/content/dam/ircc/documents/json/data-ptime-non-country-en.json",
   "name": "ptime",
   "nocache": "nocache"
   }'></div>
<div id="jsonmanagerdataptime" data-wb-jsonmanager='{
   "url": "https://www.canada.ca/content/dam/ircc/documents/json/flpt-en.json",
   "name": "ptime2",
   "nocache": "nocache"
   }'></div>
<!-- div#temp used for processing times, do not delete -->
<div id="temp"></div>
<div id="toolWrapper" class="mrgn-tp-md">
   <div class="container">
      <h1 id="wb-cont" property="name" class="mrgn-tp-0 mrgn-bttm-xl">Explore immigration programs <br ><span class="sub-text">to live, work, or study in Canada</span></h1>
      <div class="row">
         <div class="col-md-12">
            <div id="program-finder" class="pf-container">
               <div id="intro">
                  <div class="row position-relative">
                     <div class="col-md-6 mrgn-bttm-md">
                     <noscript><p class="lead">In order to maximize the functionality of this page, please turn on Javascript.</p></noscript>
                        <p class="lead mrgn-bttm-xl">Answer a few questions to get a list of programs you may be interested in.</p>
                        <div class="d-flex align-items-center mrgn-bttm-lg">
                           <img src="images/stopwatch1.png" alt="" class="d-flex align-self-center mrgn-rght-sm" />
                           <div class="d-flex align-self-center">
                              <p class="mrgn-lft-sm mrgn-bttm-0">It will take only <strong>1 minute</strong>.</p>
                           </div>
                        </div>
                        <button class="btn btn-call-to-action mrgn-bttm-0" type="button" id="getStarted" data-gc-analytics-customclick="IRCC:Button:Find programs">Find programs</button>
                     </div>
                     <div class="col-md-6"><img src="images/landing_test.png" alt="" class="landing-image pull-right img-responsive"/></div>
                     
                  </div>                  
               </div>
               <div id="tool" class="hidden wb-frmvld">                  
                  <form id="programFinderForm" method="post"  data-gc-analytics-formname="IRCC:Program Finder" data-gc-analytics-collect='[{"value":"select, input", "emptyField": "Any"}]'>                     
                     <!--	start of questions	-->
                     <div id="q1" class="question" data-pf='{"inherit": "flow"}'>
                        <p>What do you want to do in Canada?</p>
                        <ul>
                           <li data-pf='{"next": "reunite", "flow": "familyJoin, familyBring"}'>Reunite with my family</li>
                           <li data-pf='{"next": "work", "flow": "work"}'>Work</li>
                           <li data-pf='{"next": "visit", "flow": "visit"}'>Visit</li>
                           <li data-pf='{"next": "#study-permit", "flow": "study"}'>Study</li>
                        </ul>
                     </div>
                    
                     

                     

                     <!-- START - REUNITE WITH FAMILY -->
                     <div id="reunite" class="question hidden" data-pf='{"inherit": "flow", "flow": "familyJoin, familyBring"}'>
                        <p>Do you want to join your family in Canada, or bring family members to Canada to live?</p>
                        <ul>
                           <li data-pf='{"next": "question3_ReuniteFamilyJoin", "flow": "familyJoin"}'>Join my family in Canada</li>
                           <li data-pf='{"next": "question3_ReuniteFamilyBring", "flow": "familyBring"}'>Bring my family to Canada</li>
                        </ul>
                     </div>
                     <!-- START - REUNITE WITH FAMILY - JOIN -->
                     <div id="question3_ReuniteFamilyJoin" class="question hidden" data-pf='{"flow": "familyJoin"}'>
                        
                        <div class="question-header">
                           <p>Is your family member:</p>
                           <ul>
                              <li>at least 18 years old <strong>and</strong> </li>
                              <li>a citizen or permanent resident of Canada, or a person registered in Canada as an Indian under the Canadian Indian Act</li>
                           </ul>
                        </div>

                        <ul>
                           <li data-pf='{"next": "question4_ReuniteFamilyJoin"}'>Yes</li>
                           <li data-pf='{"next": "pseudoF8_ReuniteFamily"}'>No</li>
                        </ul>
                     </div>
                     <div id="question4_ReuniteFamilyJoin" class="question hidden" data-pf='{"flow": "familyJoin"}'>
                        <p>Which family member is a citizen or permanent resident of Canada, or a person registered in Canada as an Indian under the Canadian Indian Act?</p>
                        <ul>
                           <li data-pf='{"next": "#f9a"}'>Spouse or partner</li>
                           <li data-pf='{"next": "#f9b"}'>Parent (you’re their child)</li>
                           <li data-pf='{"next": "#f10, #sv1"}'>Child or grandchild (you’re their parent or grandparent)</li>
                           <li data-pf='{"next": "#f11"}'>Other relative</li>
                        </ul>
                     </div>
                     <!-- END - REUNITE WITH FAMILY --> 
                     <!-- START - REUNITE WITH FAMILY - BRING -->
                     <div id="question3_ReuniteFamilyBring" class="question hidden" data-pf='{"flow": "familyBring"}'>

                      <div class="question-header">
                           <p>Are you:</p>
                           <ul>
                              <li>at least 18 years old <strong>and</strong> </li>
                              <li>a citizen or permanent resident of Canada, or a person registered in Canada as an Indian under the Canadian Indian Act</li>
                           </ul>
                        </div>

                        <ul>
                           <li data-pf='{"next": "question4_ReuniteFamilyBring"}'>Yes</li>
                           <li data-pf='{"next": "pseudoF8_ReuniteFamily"}'>No</li>
                        </ul>
                     </div>
                     <div id="question4_ReuniteFamilyBring" class="question hidden" data-pf='{"flow": "familyBring"}'>
                        <p>Which family member do you want to bring to Canada?</p>
                        <ul>
                           <li data-pf='{"next": "#f1a"}'>Spouse or partner</li>
                           <li data-pf='{"next": "#f1b"}'>Dependent child (you’re their parent)</li>
                           <li data-pf='{"next": "#f2, #sv1"}'>Parent or grandparent (you’re their child or grandchild)</li>
                           <li data-pf='{"next": "#f3, #citizenship-adopted-child"}'>Adopted child</li>
                           <li data-pf='{"next": "#f4"}'>A different relative</li>
                        </ul>
                     </div>
                     <!-- END - - REUNITE WITH FAMILY - BRING -->
                     <div id="pseudoF8_ReuniteFamily" class="question hidden" data-pf='{"flow": "familyBring", "inherit": "endFlow"}'>
                        <div class="h3 mrgn-tp-0"><p>To sponsor a family member to come to Canada, a person must be:</p>
                           <ul>
                              <li>at least 18 years old and </li>
                              <li>a citizen or permanent resident of Canada, or a person registered in Canada as an Indian under the Canadian Indian Act.</li>
                           </ul>
                        </div>
                        
                        <p class="question-header">Explore our other programs instead:</p>
                        <ul>
                           <li data-pf='{"next": "visit"}'>Visit</li>
                           <li data-pf='{"next": "#study-permit"}'>Study</li>
                           <li data-pf='{"next": "work"}'>Work</li>
                        </ul>
                     </div>
                     <!-- END - - REUNITE WITH FAMILY --> 

                   
                   <div id="work" class="question hidden" data-pf='{"flow": "work"}'>
                        <p>Do you want to work permanently or temporarily in Canada?</p>
                        <ul>
                           <li data-pf='{"next": "work_perm"}'>Permanently</li>
                           <li data-pf='{"next": "work_temp"}'>Temporarily</li>
                        </ul>
                     </div>

                       
                     <!-- START - WORK Permanently -->
                     <div id="work_perm" class="question hidden" data-pf='{"flow": "workTemp"}'>
                        <p>Choose the main kind of work you want to do in Canada:</p>
                        <ul>
                           <li data-pf='{"next": "#express-entry, #r13, #tr-pr-hong-kong, #r3, #r2, #provincial-nominee, #rural-community-immigration-pilot, #francophone-community-immigration-pilot, #home-care-worker-immigration-pilot"}'>skilled work, trade, or other work</li>
                           <li data-pf='{"next": "#r12, #tr-pr-hong-kong"}'>start a business or invest in a business</li>
                           <!--<li data-pf='{"next": "#tr-pr-hong-kong"}'>work as a caregiver</li>-->
                        </ul>
                     </div>
                     <!-- END - WORK Permanently --> 

                     <!-- START - WORK TEMPORARILY -->
                     <div id="work_temp" class="question hidden" data-pf='{"flow": "workTemp"}'>
                        <p>Are you between the ages of 18 and 35?</p>
                        <ul>
                           <li data-pf='{"next": "#w1, #w3, #international-experience-canada, #post-graduation-work-permit"}'>Yes</li>
                           <li data-pf='{"next": "#w1, #w3, #post-graduation-work-permit"}'>No</li>
                        </ul>
                     </div>
                     <!-- END - WORK TEMPORARILY --> 
                     
                     <!-- START - VISIT -->
                     <div id="visit" class="question hidden" data-pf='{"flow": "visit"}'>
                        <p>What is the main reason for your visit?</p>
                        <ul>
                           <li data-pf='{"next": "#v1"}'>Visit Canada as a tourist</li>
                           <li data-pf='{"next": "#sv1, #v1"}'>Visit children or grandchildren</li>
                           <li data-pf='{"next": "#international-experience-canada"}'>Work and travel in Canada as a youth (18 to 35 years old)</li>
                           <li data-pf='{"next": "#v1"}'>Other (such as to transit through Canada or visit on business)</li>
                        </ul>
                     </div>
                     
                     <!-- END - VISIT -->
                     <input type="hidden" class="hidden" data-progress-increase="0" name="resultTracker" id="resultTracker" value="">
                     <!-- END OF THE FORM --> 
                  </form>
                  <div class="cnt-button">
                     <div class="btn-group mrgn-tp-lg wb-eqht-grd btn-nav navigation-buttons">
                        <button id="btnPrev" type="button" class="btn-prev btn hidden" data-gc-analytics-customclick="IRCC:Button:Previous"><span class="glyphicon glyphicon-arrow-left mrgn-rght-sm" aria-hidden="true"></span>Previous</button>
                        <button id="btnNext" type="button" class="btn btn-lg btn-primary" data-gc-analytics-customclick="IRCC:Button:Next">Next <span class="glyphicon glyphicon-arrow-right mrgn-lft-sm" aria-hidden="true"></span></button>
                        <button class="btn-startOver btn btn-link text-left hidden btnStartOver mrgn-rght-md" id="btn-startOver"><span class="fa-solid fa-rotate-right mrgn-rght-sm" aria-hidden="true"> </span>Start over</button> 
                     </div>
                  </div>
                  
                  <img src="images/choose-path2.png" id="sideImage" alt="" class="hidden hidden-xs hidden-sm img-responsive" />
               </div>
            </div>
         </div>
      </div>
      <div id="specialMeasures">
         <div class="pf-container mrgn-tp-lg mrgn-bttm-lg">
            <h2 class="mrgn-bttm-md mrgn-tp-0">This tool will help you explore our regular programs</h2>
            <p>If you’re interested in Quebec, go to <a href="https://www.quebec.ca/en/immigration" rel="external">Quebec's immigration site</a> for more information.</p>
            <details class="mrgn-tp-md bg-light" id="disclaimer">
               <summary class="bg-light">This tool is not an application</summary>
               <p>The Explore immigration programs tool has been designed to provide general information to prospective applicants; however, in some cases, additional information or steps may be required.</p>
               <p>The information in this tool will help you explore our immigration programs. We won’t make any immigration decision based on your answers. If you choose to apply, an officer will review and decide on your application according to the Immigration and Refugee Protection Act. They won’t consider any result you get through this questionnaire in their decision.</p>
            </details>
         </div>
      </div>
      <div class="pf-container hidden allResults">
      <div class="row">

         <div class="col-xs-12 mrgn-bttm-lg">
            <div class="cnt-button-move"></div>
         </div>
         <div class="col-md-4 col-xs-12 pull-right cnt-selection hidden">
            <div class="pf-container bg-info mrgn-bttm-md">
               <div id="resultHeadingContainer">
                  <h2 id="resultHeading" class="mrgn-tp-0">You told us</h2>
                  <div id="selectedAnswers" class="small"></div>
                  
               </div>
            </div>
         </div>
         <div id="allResults" tabindex="-1" class="hidden col-md-8 col-xs-12 pull-left">
            <h2 class="mrgn-tp-md">Your results</h2>
            <p>Based on your answers, here are some programs you may be interested in.</p>
            
         </div>
         
         <div class="col-md-8 col-xs-12 pull-left">
            
            <div class="mrgn-bttm-sm utility-btns">
               <button type="button" class="btn btn-link btn-lg wb-toggle" data-toggle='{"selector": "details", "parent": "#resultsContainer", "print": "on"}' data-gc-analytics-expandall="Expand all">
                  <span class="btn-expand btn-toggle"><span class="fas fa-circle-plus mrgn-rght-md btn-toggle" aria-hidden="true"></span>Expand all</span>
                  <span class="btn-collapse btn-toggle hidden"><span class="fas fa-circle-minus mrgn-rght-md" aria-hidden="true"></span>Collapse all</span>
               </button>
               <span aria-hidden="true">|</span>           
               <button class="btn btn-link btn-lg" id="btnPrint"><span class="fas fa-print mrgn-rght-md" aria-hidden="true"></span>Print</button>               
            </div>
            <div class="clearfix"></div>
            <!-- NVDA: MAY NEED TO ADD HEADING -->
            <div id="resultsContainer" class="position-relative" aria-live="polite">
               <!-- #include file="results/express-entry.html" --> 
               <!-- #include file="results/r2.html" -->
               <!-- #include file="results/provincial-nominee.html" --> 
                
               <!-- #include file="results/r12.html" --> 
               <!-- #include file="results/r13.html" -->                
			      <!-- #include file="results/francophone-community-immigration-pilot.html" --> 
			      <!-- #include file="results/rural-community-immigration-pilot.html" -->  
               <!-- #include file="results/home-care-worker-immigration-pilot.html" --> 
               <!-- #include file="results/tr-pr-hong-kong.html" --> 
               <!-- #include file="results/w1.html" --> 
               <!-- #include file="results/w3.html" --> 
               <!-- #include file="results/study-permit.html" --> 
               <!-- #include file="results/f1a.html" --> 
               <!-- #include file="results/f1b.html" --> 
               <!-- #include file="results/f2.html" --> 
               <!-- #include file="results/f3.html" --> 
               <!-- #include file="results/citizenship-adopted-child.html" --> 
               <!-- #include file="results/f4.html" --> 
               <!-- #include file="results/f9a.html" --> 
               <!-- #include file="results/f9b.html" --> 
               <!-- #include file="results/f10.html" --> 
               <!-- #include file="results/f11.html" --> 
               <!-- #include file="results/sv1.html" --> 
               <!-- #include file="results/international-experience-canada.html" --> 
               <!-- #include file="results/v1.html" -->
               <!-- #include file="results/post-graduation-work-permit.html" -->
               
            </div>
            <div class="btn-group mrgn-tp-lg btn-navigation hidden">
               <button type="button" class="btn-prev btn" id="btnprev2" data-gc-analytics-customclick="IRCC:Button:Previous"><span class="glyphicon glyphicon-arrow-left mrgn-rght-sm"></span>Previous</button>          
               <a class="btn-startOver btn btnStartOver" href="#" id="btnstartOver2"><span class="fa-solid fa-rotate-right mrgn-rght-sm"> </span>Start over</a> 
            </div>

            

            <div class="all-results">



            <h3>Didn't find what you are looking for?</h3>            
            <p>These results are based on your answers.</p>
            <a href="#resultsContainer" data-gc-analytics-customclick="IRCC:Button:View all" role="button" class="btn-link btn-see-all" data-wb-doaction='[{"action":"removeClass", "class": "hidden", "source": ".result, .tailored-results"},{"action":"addClass", "class": "hidden", "source": ".all-results"}]'>View all programs in this tool</a>
         </div>
         <div class="tailored-results hidden">
            <h3>These are all the programs in this tool.</h3>
            <a href="#resultsContainer" data-gc-analytics-customclick="IRCC:Button:View your results" role="button" class="btn-link btn-unsee-all" data-wb-doaction='[{"action":"addClass", "class":"hidden", "source":".result:not(.filtered), .tailored-results"},{"action":"removeClass", "class": "hidden", "source": ".all-results"}]'>Go back to results based on your answers</a>
         </div>
         </div>        
      </div>
   </div>

  
      <div class="clearfix"></div>
      <div class="row">
         <div id="otherPrograms" class="hidden col-xs-12">    
         
            <div class="pf-container mrgn-tp-lg">
               <h2 class="mrgn-tp-sm">Programs not included in this tool</h2>
               <p>This tool includes our regular immigration programs. There are other programs that could apply to your situation, including:</p>
<ul>
   <li><a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/refugees.html">refugee resettlement and asylum claims</a></li>
   <li><a href="https://www.canada.ca/en/immigration-refugees-citizenship.html#alerts">special programs and measures</a></li>
   <li>Canadian employers looking to hire: 
      <ul>
         <li><a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/hire-temporary-foreign.html">temporary foreign workers</a></li>
         <li><a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/hire-permanent-foreign.html">permanent foreign workers</a></li>
         <li><a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/hire-temporary-foreign/intern.html">newcomers as interns</a></li>
      </ul>
   </li>
</ul>
            </div>
         </div> 
      </div>
   </div>
</div>

<div class="hidden">
   <div id="printContainer"></div>
</div>
<!-- Fin du contenue/Content ends --> 
<!-- START PAGE FEEDBACK WIDGET -->


<div class="pagedetails container">
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
 <!-- END PAGE FEEDBACK WIDGET -->


</main> 
<!-- Footer / Pied de la page--> 
<!-- #include virtual="/explore-programs/inc/fn-pn.asp" --> 
<script src="js/program-finder.js"></script> 


<!-- #include virtual="/includes/inc/end-html.asp" -->