---
layout: layouts/base.njk
title: Home
templateEngineOverride: njk
---

<section class="hero reveal">
  <canvas id="hero-canvas" class="hero-canvas" aria-hidden="true"></canvas>
  <div class="hero-content">
    <p class="eyebrow">Personal Archive</p>
    <h1>A Life, Recorded</h1>
    <p class="hero-sub">Words I've written, moments I've captured, and poems I've spoken aloud — kept in one place, built to last.</p>
    <a href="#writing" class="scroll-cue" aria-label="Scroll to content"><span></span></a>
  </div>
</section>

<section id="writing" class="section reveal">
  <div class="section-head">
    <p class="eyebrow">01 — Writing</p>
    <h2>Posts</h2>
  </div>

  <div class="writing-controls">
    <input type="text" id="post-search" class="search-input" placeholder="Search writings...">
    <div class="filter-tabs" id="filter-tabs">
      <button class="filter-tab active" data-filter="All">All</button>
      <button class="filter-tab" data-filter="Stories">Stories</button>
      <button class="filter-tab" data-filter="Poetry">Poetry</button>
      <button class="filter-tab" data-filter="Islamic">Islamic</button>
      <button class="filter-tab" data-filter="Personal">Personal</button>
    </div>
  </div>

  <div class="card-grid" id="posts-grid">
    {% for post in collections.posts | reverse %}
    <a class="card reveal" href="{{ post.url }}" data-category="{{ post.data.category }}" data-title="{{ post.data.title | lower }}">
      <time>{{ post.data.date | readableDate }}</time>
      <h3>{{ post.data.title }}</h3>
     <p class="card-excerpt">{{ post.templateContent | striptags | truncate(140) }}</p>
      <span class="card-link">Read →</span>
    </a>
    {% endfor %}
  </div>
  <p id="no-results" class="no-results" style="display:none;">No writings match your search.</p>
  <nav class="pagination" id="posts-pagination"></nav>
</section>

<section id="photos" class="section reveal">
  <div class="section-head">
    <p class="eyebrow">02 — Photos</p>
    <h2>Gallery</h2>
  </div>
  {% for album in collections.photos | reverse %}
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
  {% for poem in collections.poems | reverse %}
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
<section id="quotes" class="section reveal">
  <div class="section-head">
    <p class="eyebrow">04 — Quotes</p>
    <h2>Quote Wall</h2>
  </div>
  <div class="quote-card">
    <p class="quote-text" id="quote-text"></p>
    <p class="quote-author" id="quote-author"></p>
  </div>
  <button id="new-quote-btn" class="new-quote-btn">New Quote →</button>
</section>

<script type="application/json" id="quotes-data">{{ quotes | jsonify | safe }}</script>

<div id="lightbox-overlay" class="lightbox-overlay">
  <img id="lightbox-img" src="" alt="">
</div>

<button id="back-to-top" class="back-to-top" aria-label="Back to top">↑</button>