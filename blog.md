---
title: Blog
permalink: /blog/
---

<h1><span data-lang="en">Blog</span><span data-lang="de">Blog</span></h1>

<p><span data-lang="en">Notes, experiments, and insights from my learning and project work.</span><span data-lang="de">Notizen, Experimente und Erfahrungen aus Lernen und Projektarbeit.</span></p>

{% if site.posts.size > 0 %}
  {% for post in site.posts %}
    <article class="card">
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      <p class="meta">{{ post.date | date: "%B %d, %Y" }}</p>
      <p>{{ post.excerpt | strip_html | truncate: 180 }}</p>
      <p><a href="{{ post.url | relative_url }}"><span data-lang="en">Read post</span><span data-lang="de">Weiterlesen</span></a></p>
    </article>
  {% endfor %}
{% else %}
  <p><span data-lang="en">No posts yet. New articles will appear here.</span><span data-lang="de">Noch keine Beiträge. Neue Artikel erscheinen hier.</span></p>
{% endif %}
