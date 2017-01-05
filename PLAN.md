## React blog with Jupyter notebooks
Routes

single blog post
/blog/yyyy/mm/dd/name_of_blog_post (no html escape i.e all space turned to _)

all blog posts in yyyy
/blog/yyyy/

all blog posts in yyyy/mm
/blog/yyyy/mm

num number of most recent blog posts
/blog?size=num

A simple about page
/about

A simple resume
/resume


editor
either on subdomain i.e editor.site.com/
(this may be easier, as we can just run a jupyter kernel on the public dir and create
ipython notebooks from the ipython server)

or under another path

takes you to the editor
/editor

drafts (required since we have to store those ipynbs in another directory so that
it is not available to the public)

/drafts



HOW TO INTEGRATE IPYTHON WITH React

look at nbviewer, its a server than allows you to convert .ipynb
to html. You can run your own if you wish.

It looks promising. maybe remove the unneeded parts and create your own React.js
components for it?

1. Rendering ipython notebooks as part of react
2. markdown + math + code cells in react -> ipython preview?


FUTURE:
Static site rendering


