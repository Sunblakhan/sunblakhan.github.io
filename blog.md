---
title: Blog
permalink: /blog/
---

# Blog

Notes, experiments, and insights from my learning and project work.

{% if site.posts.size > 0 %}
  {% for post in site.posts %}
    <article class="card">
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      <p class="meta">{{ post.date | date: "%B %d, %Y" }}</p>
      <p>{{ post.excerpt | strip_html | truncate: 180 }}</p>
      <a href="{{ post.url | relative_url }}">Read post</a>
    </article>
  {% endfor %}
{% else %}
  <p>No posts yet. New articles will appear here.</p>
{% endif %}
