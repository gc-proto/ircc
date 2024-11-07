let placeholder = "_PLACEHOLDER_";
let snippets = {
    subwayNavigationIndex: `
    <nav id="templator-0" class="provisional gc-subway position-relative-inner gc-subway-index">
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
	subwayNavigationStep: {
		start: `<nav class="provisional gc-subway no-blink" id="templator-0">
			<h1 id="gc-document-nav">${placeholder}</h1>
			<ul>
				<li>
					<a href="#" class="active" aria-current="page">${placeholder}</a>
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

		<h1 property="name" id="wb-cont" class="gc-thickline">${placeholder}</h1>`,
		end:
		`<nav class="mrgn-bttm-lg mrgn-tp-lg">
			<h3 class="wb-inv">Document navigation</h3>
			<ul class="pager">
				<li class="next"><a href="#wb-cont" rel="next"><span class="wb-inv">Next: </span>[Page 2]</a></li>
			</ul>
		</nav>`,
	},
	alerts: `<div class="alert alert-_PLACEHOLDER_"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></div>`,
	panels: `<div class="panel panel-_PLACEHOLDER_">
			<header class="panel-heading">
			<h2 class="panel-title">Alert title</h2>
			</header>
			<div class="panel-body">
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
			</div>
		</div>`,
	panelsNoTitle:  `<div class="panel panel-_PLACEHOLDER_">
			<div class="panel-body">
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
			</div>
		</div>`,
	well: `<div class="well_PLACEHOLDER_"></div>`,

}