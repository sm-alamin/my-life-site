---
layout: layouts/base.njk
title: Home
---

<section class="hero reveal">
  <p class="eyebrow">Personal Archive</p>
  <h1>A Life, Recorded</h1>
  <p class="hero-sub">Words I've written, moments I've captured, and poems I've spoken aloud — kept in one place, built to last.</p>
  <a href="#writing" class="scroll-cue" aria-label="Scroll to content"><span></span></a>
</section>

<section id="writing" class="section reveal">
  <div class="section-head">
    <p class="eyebrow">01 — Writing</p>
    <h2>Posts</h2>
  </div>
  <div class="card-grid" id="posts-grid">
  {% for post in collections.posts %}
  <a class="card reveal" href="{{ post.url }}">
    <time>{{ post.data.date | readableDate }}</time>
    <h3>{{ post.data.title }}</h3>
    <p class="card-excerpt">{{ post.templateContent | strip_html | truncate: 140 }}</p>
    <span class="card-link">Read →</span>
  </a>
  {% endfor %}
</div>
<nav class="pagination" id="posts-pagination"></nav>
</section>

<section id="photos" class="section reveal">
  <div class="section-head">
    <p class="eyebrow">02 — Photos</p>
    <h2>Gallery</h2>
  </div>
  {% for album in collections.photos %}
  <div class="album-block reveal">
    <div class="section-head small">
      <h3>{{ album.data.title }}</h3>
      <time>{{ album.data.date | readableDate }}</time>
    </div>
    <div class="photo-grid">
      {% for img in album.data.images %}
      <img src="{{ img }}" alt="{{ album.data.title }}" loading="lazy" class="lightbox-trigger">
      {% endfor %}
    </div>
  </div>
  {% endfor %}
</section>

<section id="poems" class="section reveal">
  <div class="section-head">
    <p class="eyebrow">03 — Poems</p>
    <h2>Recitations</h2>
  </div>
  {% for poem in collections.poems %}
  <div class="poem-block reveal">
    <div class="section-head small">
      <h3>{{ poem.data.title }}</h3>
      <time>{{ poem.data.date | readableDate }}</time>
    </div>
   <div class="audio-player" data-src="{{ poem.data.audio }}">
      <button class="play-btn" aria-label="Play">▶</button>
      <div class="progress-container"><div class="progress-bar"></div></div>
      <span class="time-display">0:00</span>
    </div>
  </div>
  {% endfor %}
</section>

<div id="lightbox-overlay" class="lightbox-overlay">
  <img id="lightbox-img" src="" alt="">
</div>

<button id="back-to-top" class="back-to-top" aria-label="Back to top">↑</button>