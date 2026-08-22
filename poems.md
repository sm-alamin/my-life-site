---
layout: layouts/base.njk
title: Poems
permalink: /poems/
---

# Poem Recitations

<ul>
{% for poem in collections.poems %}
  <li>
    <a href="{{ poem.url }}">{{ poem.data.title }}</a>
    — {{ poem.data.date | readableDate }}
  </li>
{% endfor %}
</ul>