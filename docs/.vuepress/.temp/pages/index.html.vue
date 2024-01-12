<template><div><Demo :initial-round="2"/><Links/><p>A lightweight calendar heatmap Vuejs component built on SVG, inspired by github's contribution calendar graph. With vertical mode, tooltip powered by <a href="https://github.com/atomiks/tippyjs" target="_blank" rel="noopener noreferrer">Tippy.js<ExternalLinkIcon/></a>.</p>
<h2 id="installation" tabindex="-1"><a class="header-anchor" href="#installation" aria-hidden="true">#</a> Installation</h2>
<CodeGroup>
  <CodeGroupItem title="YARN" active>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># install in your project</span>
<span class="token function">yarn</span> <span class="token function">add</span> vue3-calendar-heatmap
</code></pre></div>  </CodeGroupItem>
  <CodeGroupItem title="NPM">
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># install in your project</span>
<span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-D</span> vue3-calendar-heatmap
</code></pre></div>  </CodeGroupItem>
</CodeGroup>
<h2 id="import" tabindex="-1"><a class="header-anchor" href="#import" aria-hidden="true">#</a> Import</h2>
<h3 id="global-install" tabindex="-1"><a class="header-anchor" href="#global-install" aria-hidden="true">#</a> Global install</h3>
<div class="language-typescript" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> VueCalendarHeatmap <span class="token keyword">from</span> <span class="token string">'vue3-calendar-heatmap'</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>VueCalendarHeatmap<span class="token punctuation">)</span>
</code></pre></div><h3 id="use-specific-components" tabindex="-1"><a class="header-anchor" href="#use-specific-components" aria-hidden="true">#</a> Use specific components</h3>
<div class="language-typescript" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> CalendarHeatmap <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue3-calendar-heatmap'</span>

app<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token string">'CalendarHeatmap'</span><span class="token punctuation">,</span> CalendarHeatmap<span class="token punctuation">)</span>
</code></pre></div><h3 id="use-directly-in-component" tabindex="-1"><a class="header-anchor" href="#use-directly-in-component" aria-hidden="true">#</a> Use directly in component</h3>
<div class="language-typescript" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> CalendarHeatmap <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue3-calendar-heatmap'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    components<span class="token operator">:</span> <span class="token punctuation">{</span>
        CalendarHeatmap
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>A css file is included when importing the package. You may have to setup your bundler to embed the css in your page.</p>
</div>
<h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage" aria-hidden="true">#</a> Usage</h2>
<h3 id="values" tabindex="-1"><a class="header-anchor" href="#values" aria-hidden="true">#</a> values</h3>
<ul>
<li>
<p>Type: <code v-pre>Array&lt;{ date: Date | string; count: number; }&gt;</code></p>
</li>
<li>
<p>Required: true</p>
</li>
<li>
<p>Details:</p>
<p>Array of objects with <code v-pre>date</code> and <code v-pre>count</code> keys. <code v-pre>date</code> values can be a date parseable string, a millisecond timestamp, or a Date object. <code v-pre>count</code> value should
be a number.</p>
</li>
</ul>
<div class="language-html" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>calendar-heatmap</span> <span class="token attr-name">:values</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>[{ date: '2018-9-22', count: 6 }, ...]<span class="token punctuation">"</span></span> <span class="token attr-name">...</span><span class="token punctuation">/></span></span>
</code></pre></div><h3 id="enddate" tabindex="-1"><a class="header-anchor" href="#enddate" aria-hidden="true">#</a> endDate</h3>
<ul>
<li>
<p>Type: <code v-pre>string</code></p>
</li>
<li>
<p>Required: true</p>
</li>
<li>
<p>Details:</p>
<p>Can be a date parseable string, a millisecond timestamp, or a Date object. The calendar will start automatically one year before this date.</p>
</li>
</ul>
<div class="language-html" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>calendar-heatmap</span> <span class="token attr-name">:end-date</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>2018-9-22<span class="token punctuation">"</span></span> <span class="token attr-name">...</span><span class="token punctuation">/></span></span>
</code></pre></div><h3 id="round" tabindex="-1"><a class="header-anchor" href="#round" aria-hidden="true">#</a> round</h3>
<ul>
<li>
<p>Type: <code v-pre>number</code> between <code v-pre>0</code> and <code v-pre>5</code></p>
</li>
<li>
<p>Details:</p>
<p>Number to create rounded corners or cirlces in heatmap. <code v-pre>0</code> by default.</p>
</li>
</ul>
<div class="language-html" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>calendar-heatmap</span> <span class="token attr-name">:round</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0<span class="token punctuation">"</span></span> <span class="token attr-name">...</span><span class="token punctuation">/></span></span>
</code></pre></div><h4 id="example-round-0" tabindex="-1"><a class="header-anchor" href="#example-round-0" aria-hidden="true">#</a> Example <code v-pre>:round=&quot;0&quot;</code></h4>
<Demo :initialRound="0"/><h4 id="example-round-5" tabindex="-1"><a class="header-anchor" href="#example-round-5" aria-hidden="true">#</a> Example <code v-pre>:round=&quot;5&quot;</code></h4>
<Demo :initialRound="5"/><h3 id="darkmode" tabindex="-1"><a class="header-anchor" href="#darkmode" aria-hidden="true">#</a> darkMode</h3>
<ul>
<li>
<p>Type: <code v-pre>boolean</code></p>
</li>
<li>
<p>Details:</p>
<p>Boolean to toggle default color range between dark and light mode.
Toggle page between light and dark mode to see in action.</p>
</li>
</ul>
<div class="language-html" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>calendar-heatmap</span> <span class="token attr-name">dark-mode</span> <span class="token attr-name">...</span><span class="token punctuation">/></span></span>
</code></pre></div><h4 id="example" tabindex="-1"><a class="header-anchor" href="#example" aria-hidden="true">#</a> Example</h4>
<Demo dark-mode/><h3 id="rangecolor" tabindex="-1"><a class="header-anchor" href="#rangecolor" aria-hidden="true">#</a> rangeColor</h3>
<ul>
<li>
<p>Type: <code v-pre>Array&lt;string&gt;</code></p>
</li>
<li>
<p>Details:</p>
<p>Array of strings which represents the colors of the progression.</p>
<ul>
<li>The color at <code v-pre>rangeColor[0]</code> will always represent the values for a <code v-pre>count: null</code></li>
<li>The color at <code v-pre>rangeColor[1]</code> will always represent the values for a <code v-pre>count: 0</code></li>
<li>The others are automatically distributed over the maximum value of count, unless you specify <code v-pre>max</code> props.</li>
</ul>
</li>
</ul>
<div class="language-html" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>calendar-heatmap</span> <span class="token attr-name">:range-color</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']<span class="token punctuation">"</span></span> <span class="token attr-name">...</span><span class="token punctuation">/></span></span>
</code></pre></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>This overwrites the <code v-pre>darkMode</code>option. If you use this option, you have to handle dark mode yourself by using <code v-pre>rangeColor</code>.</p>
</div>
<h4 id="example-1" tabindex="-1"><a class="header-anchor" href="#example-1" aria-hidden="true">#</a> Example</h4>
<Demo :range-color="[ '#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39' ]"/><h3 id="max" tabindex="-1"><a class="header-anchor" href="#max" aria-hidden="true">#</a> max</h3>
<ul>
<li>
<p>Type: <code v-pre>number</code></p>
</li>
<li>
<p>Details:</p>
<p>Any number which should be the max color.</p>
</li>
</ul>
<div class="language-html" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>calendar-heatmap</span> <span class="token attr-name">:max</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>10<span class="token punctuation">"</span></span> <span class="token attr-name">...</span><span class="token punctuation">/></span></span>
</code></pre></div><h3 id="nodatatext" tabindex="-1"><a class="header-anchor" href="#nodatatext" aria-hidden="true">#</a> noDataText</h3>
<ul>
<li>
<p>Type: <code v-pre>string</code></p>
</li>
<li>
<p>Details:</p>
<p>Tooltip text to display on days without data. null by default (shows no tooltip at all).</p>
</li>
</ul>
<div class="language-html" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>calendar-heatmap</span> <span class="token attr-name">:no-data-text</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>no data for this day<span class="token punctuation">"</span></span> <span class="token attr-name">...</span><span class="token punctuation">/></span></span>
</code></pre></div><h3 id="tooltip" tabindex="-1"><a class="header-anchor" href="#tooltip" aria-hidden="true">#</a> tooltip</h3>
<ul>
<li>
<p>Type: <code v-pre>boolean</code></p>
</li>
<li>
<p>Details:</p>
<p>Boolean for enable/disable tooltip on square hover. true by default.</p>
</li>
</ul>
<div class="language-html" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>calendar-heatmap</span> <span class="token attr-name">:tooltip</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>false<span class="token punctuation">"</span></span> <span class="token attr-name">...</span><span class="token punctuation">/></span></span>
</code></pre></div><h3 id="tooltipunit" tabindex="-1"><a class="header-anchor" href="#tooltipunit" aria-hidden="true">#</a> tooltipUnit</h3>
<ul>
<li>
<p>Type: <code v-pre>string</code></p>
</li>
<li>
<p>Details:</p>
<p>String representing heatmap's unit of measure. Value is &quot;contributions&quot; by default.</p>
</li>
</ul>
<div class="language-html" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>calendar-heatmap</span> <span class="token attr-name">tooltip-unit</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>stars<span class="token punctuation">"</span></span> <span class="token attr-name">...</span><span class="token punctuation">/></span></span>
</code></pre></div><h3 id="tooltipformatter" tabindex="-1"><a class="header-anchor" href="#tooltipformatter" aria-hidden="true">#</a> tooltipFormatter</h3>
<ul>
<li>
<p>Type: <code v-pre>function(value: { date: Date | string; count: number; }): string</code></p>
</li>
<li>
<p>Details:</p>
<p>A method to have full control about tooltip content.</p>
</li>
</ul>
<div class="language-html" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>calendar-heatmap</span> <span class="token attr-name">:tooltip-formatter</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>(v) => v.count<span class="token punctuation">"</span></span> <span class="token attr-name">...</span><span class="token punctuation">/></span></span>
</code></pre></div><h3 id="vertical" tabindex="-1"><a class="header-anchor" href="#vertical" aria-hidden="true">#</a> vertical</h3>
<ul>
<li>
<p>Type: <code v-pre>boolean</code></p>
</li>
<li>
<p>Details:</p>
<p>Boolean to switch to vertical mode. false by default.</p>
</li>
</ul>
<div class="language-html" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>calendar-heatmap</span> <span class="token attr-name">vertical</span> <span class="token attr-name">...</span><span class="token punctuation">/></span></span>
</code></pre></div><h4 id="example-2" tabindex="-1"><a class="header-anchor" href="#example-2" aria-hidden="true">#</a> Example</h4>
<Demo orientation="vertical"/></div></template>


