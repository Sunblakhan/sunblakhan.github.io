---
layout: default
title: Blog
permalink: /blog/
---

# ✍️ Blog

Thoughts on Data Science, AI, Software Engineering, and life as a student in Berlin.

{% for post in site.posts %}
### [{{ post.title }}]({{ post.url }})
*{{ post.date | date: "%B %d, %Y" }}*

{{ post.excerpt }}

---
{% endfor %}
