(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{EDuE:function(e,t,a){},HDCr:function(e,t,a){},LTxp:function(e,t){e.exports={getPostUrl:function(e){return"/blog"+e},getPageUrl:function(e){return 1===e?"/blog":"/blog-"+e}}},"Omq/":function(e,t,a){"use strict";a.d(t,"a",(function(){return f}));var n=a("vOnD"),r=a("q1tI"),l=a.n(r),i=a("Wbzz"),o=a("snpq"),c=a.n(o),s=n.e.div.withConfig({displayName:"Bio__BioHolder",componentId:"sc-1poes9v-0"})(["display:flex;flex-direction:column;margin:0 auto 0 0;.author-bio{margin-bottom:0;}.custom-switch{margin-left:1rem;display:inline-block;}"]),m=n.e.div.withConfig({displayName:"Bio__FirstRow",componentId:"sc-1poes9v-1"})(["display:flex;flex-direction:row;flex:1;align-self:center;"]),d=n.e.div.withConfig({displayName:"Bio__BioMain",componentId:"sc-1poes9v-2"})(["margin:0.5rem 1rem 0.5rem 0.5rem;"]),p=function(){return l.a.createElement(s,null,l.a.createElement(m,null,l.a.createElement(d,null,l.a.createElement("img",{src:c.a,style:{maxWidth:"150px"},className:"profile-img",alt:""}))))},u=(a("HDCr"),a("xcH4")),g=a("u4tM"),f=(n.e.div.withConfig({displayName:"Sidebar__PageLinks",componentId:"sc-3734d-0"})(["display:flex;flex-direction:column;margin-bottom:1rem;a{height:2rem;width:100%;padding:8px;padding-left:0;white-space:nowrap;:hover{text-decoration:underline;text-decoration-color:",";}}"],(function(){return Object(g.f)("black","white")})),function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"sidebar-main border-right"},l.a.createElement(p,null),l.a.createElement("div",{className:"tech-tags mt-4"},l.a.createElement(u.a,{title:"Tags-Overview"})),l.a.createElement("br",null),l.a.createElement(i.Link,{to:"/archive"},l.a.createElement("span",{className:"text-dark d-block py-1"},"All posts"))))})},he5r:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));var n=["angular","javascript","typescript","web development"]},udnJ:function(e,t,a){"use strict";a.r(t),a.d(t,"listQuery",(function(){return u}));var n=a("Wbzz"),r=a("q1tI"),l=a.n(r),i=a("soUV"),o=a("H8eV"),c=a("Omq/"),s=(a("EDuE"),a("wgJT")),m=a("LTxp"),d=a("he5r"),p=a("vOnD").e.div.withConfig({displayName:"post-list__PageNavToolbar",componentId:"sc-16qp3o1-0"})(["display:flex;justify-content:space-evenly;"]),u="65071333";t.default=function(e){var t=e.data.allMarkdownRemark.edges,a=(e.data.site.siteMetadata.labels,e.pageContext),r=a.currentPage,u=1===r,g=r===a.numPages,f=Object(m.getPageUrl)(r-1),E=Object(m.getPageUrl)(r+1),v=t.map((function(e){return l.a.createElement(s.a,{post:e.node,key:e.node.id})}));return l.a.createElement(i.a,{leftSidebar:l.a.createElement(c.a,null)},l.a.createElement(o.a,{title:"Home",keywords:d.a}),l.a.createElement("div",{className:"post-list-main"},v,l.a.createElement(p,{className:"text-center mt-4"},!u&&l.a.createElement(n.Link,{to:f,rel:"prev",style:{textDecoration:"none"}},l.a.createElement("span",{className:"text-dark"},"← Previous Page")),!g&&l.a.createElement(n.Link,{to:E,rel:"next",style:{textDecoration:"none"}},l.a.createElement("span",{className:"text-dark ml-5"},"Next Page →")))))}},wgJT:function(e,t,a){"use strict";a.d(t,"a",(function(){return p}));var n=a("LTxp"),r=a("Wbzz"),l=a("q1tI"),i=a.n(l),o=a("b+Eu"),c=a("vOnD"),s=c.e.div.withConfig({displayName:"PostPreview__OuterPostPreview",componentId:"sc-2321op-0"})(["margin-bottom:1rem;.tech-tags{margin-top:0.5rem;margin-bottom:2.5rem;}h2{margin-bottom:0.5rem;}"]),m=c.e.div.withConfig({displayName:"PostPreview__PostExcerp",componentId:"sc-2321op-1"})(["display:inline;"]),d=c.e.div.withConfig({displayName:"PostPreview__TextInfo",componentId:"sc-2321op-2"})(["display:block;"]);function p(e){var t=e.post,a=t.frontmatter.tags,l=Object(n.getPostUrl)(t.fields.slug);return i.a.createElement(s,{key:t.id,className:"container mt-5"},i.a.createElement(r.Link,{to:l,className:"text-dark"},i.a.createElement("h2",{className:"title"},t.frontmatter.title)),i.a.createElement(d,null,i.a.createElement("small",{className:"d-block text-info"},i.a.createElement("i",null,"Posted on ",t.frontmatter.date))),i.a.createElement(m,null,t.excerpt),i.a.createElement(r.Link,{to:l,className:"text-primary"},i.a.createElement("small",{className:"d-inline-block ml-3"}," Read full post")),i.a.createElement("div",{className:"tech-tags"},i.a.createElement(o.a,{tags:a})))}}}]);
//# sourceMappingURL=component---src-templates-post-list-tsx-6a78dd79cc8a758b8357.js.map