---
layout: layouts/base.njk
title: Photos
permalink: /photos/
---

# Photo Albums

<ul>
{% for album in collections.photos %}
  <li>
    <a href="{{ album.url }}">{{ album.data.title }}</a>
    — {{ album.data.date | readableDate }}
  </li>
{% endfor %}
</ul>