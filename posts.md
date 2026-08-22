---
layout: layouts/base.njk
title: Posts
permalink: /posts/
---

# Posts

<ul>
{% for post in collections.posts %}
  <li>
    <a href="{{ post.url }}">{{ post.data.title }}</a>
    — {{ post.data.date | readableDate }}
  </li>
{% endfor %}
</ul>