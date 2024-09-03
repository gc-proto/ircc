
let componentID = 0;
let snippets = {
    subwayNavigationIndex: `<nav id="templator-${componentID}" class="provisional gc-subway position-relative-inner gc-subway-index">
	<h2>Sections</h2>
	<dl>
		<dt>
			<a href="gc-subway-en.html">[Step / section page name 1]</a>
		</dt>
		<dd>
			Page description. Lorem ipsum dolor sit amet, consectetur adipiscing elit
		</dd>
		<dt>
			<a href="page2-en.html">[Step / section page name 2]</a>
		</dt>
		<dd>
			Page description. Lorem ipsum dolor sit amet, consectetur adipiscing elit
		</dd>
		<dt>
			<a href="#">[Step / section page name 3]</a>
		</dt>
		<dd>
			Page description. Lorem ipsum dolor sit amet, consectetur adipiscing elit
		</dd>
		<dt>
			<a href="#">[Step / section page name 4]</a>
		</dt>
		<dd>
			Page description. Lorem ipsum dolor sit amet, consectetur adipiscing elit
		</dd>
		<dt>
			<a href="#">[Step / section page name 5]</a>
		</dt>
		<dd>
			Page description. Lorem ipsum dolor sit amet, consectetur adipiscing elit
		</dd>
		<dt>
			<a href="#">[Step / section page name 6]</a>
		</dt>
		<dd>
			Page description. Lorem ipsum dolor sit amet, consectetur adipiscing elit
		</dd>
	</dl>
</nav>`,
subwayNavigationStep: `<nav class="provisional gc-subway no-blink">
	<h1 id="gc-document-nav">[Service name]</h1>
	<ul>
		<li>
			<a href="#" class="active" aria-current="page">[Page 1]</a>
		</li>
		<li>
			<a href="#" class="hidden-xs hidden-sm">[Page 2]</a>
			<a href="#gc-document-nav" class="visible-xs visible-sm">[Page 2]</a>
		</li>
		<li>
			<a href="#" class="hidden-xs hidden-sm">[Page 3]</a>
			<a href="#gc-document-nav" class="visible-xs visible-sm">[Page 3]</a>
		</li>
		<li>
			<a href="#" class="hidden-xs hidden-sm">[Page 4]</a>
			<a href="#gc-document-nav" class="visible-xs visible-sm">[Page 4]</a>
		</li>
		<li>
			<a href="#" class="hidden-xs hidden-sm">[Page 5]</a>
			<a href="#gc-document-nav" class="visible-xs visible-sm">[Page 5]</a>
		</li>
		<li>
			<a href="#" class="hidden-xs hidden-sm">[Page 6]</a>
			<a href="#gc-document-nav" class="visible-xs visible-sm">[Page 6]</a>
		</li>
	</ul>
</nav>

<h1 property="name" id="wb-cont" class="gc-thickline">[Page 1]</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam commodo elementum est, ac ultrices urna convallis vitae. Nulla nec convallis felis. Ut pretium nisl nisi. Nam gravida gravida aliquet. Morbi tincidunt lorem in purus imperdiet, id rutrum mauris sodales. Vivamus nec mattis tellus. Nunc turpis dolor, malesuada non magna nec, scelerisque tristique velit.</p>
<nav class="mrgn-bttm-lg mrgn-tp-lg">
	<h3 class="wb-inv">Document navigation</h3>
	<ul class="pager">
		<li class="next"><a href="#wb-cont" rel="next"><span class="wb-inv">Next: </span>[Page 2]</a></li>
	</ul>
</nav>`,
}