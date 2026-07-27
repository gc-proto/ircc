
<% if page_columns = 2 then %>

 <div class="container">
 <div class="row">
 <main property="mainContentOfPage" resource="#wb-main" typeof="WebPageElement" class="col-md-9 col-md-push-3">

 
<% elseif hc_banner = "yes" then %> 	
	<!-- remove class="container" to call after HC banner -->	
	<main property="mainContentOfPage" resource="#wb-main" typeof="WebPageElement">
		
<% elseif fullWidth = "yes" then %> 		
	<main property="mainContentOfPage" resource="#wb-main" typeof="WebPageElement">
		
<% else %> 

 	<main property="mainContentOfPage" resource="#wb-main" class="container" typeof="WebPageElement">
    
<% end if %>


 <!-- Details/Summary expand for print -->
 <span class="wb-toggle" data-toggle='{"selector": "main summary", "print": "on"}'></span> 
 
 
