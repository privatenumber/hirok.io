---
title: CV
heading: ''
link:
  - rel: stylesheet
    media: print
    href: src/print.css

---

<script setup lang="ts">
import { getUnit, numberUnits, shortNumberUnits } from '@/utils/get-unit';
import npmPackages from '@/data/npm-packages.json';
const [downloads, unit] = getUnit(npmPackages.totalDownloads, numberUnits, 1);
const npmDownloads = `${downloads} ${unit}`;
const downloadsPerSecond = Math.round(npmPackages.totalDownloads / 30 / 24 / 60 / 60);
const downloadsMonth = new Date(npmPackages.totalDownloadsMonth).toLocaleDateString(undefined, {
	month: 'short',
	year: 'numeric',
});

const downloadsMonthPretty = npmPackages.totalDownloadsMonth
const todayPretty = new Date().toLocaleDateString(
	'en-US',
	{ month: 'long', day: 'numeric', year: 'numeric' },
);

const getDownloads = (packageName: string) => {
	const packageData = npmPackages.packages.find((pkg) => pkg.name === packageName);

	if (!packageData) {
		throw new Error(`Package not found: ${packageName}`);
	}
	const [downloads, unit] = getUnit(packageData.downloads, shortNumberUnits, 1);

	return `${downloads}${unit} DL/month`;
};
</script>

<div class="
	print:hidden
	rounded-md
	bg-blue/20
	px-4
	py-4
">
This page is printer and PDF friendly and designed for one black & white A4 paper.
</div>

<div class="
	absolute
	bottom-2
	right-4
	text-xs
">

_Printed on _{{ todayPretty }}_. Latest version available at [hirok.io/cv](https://hirok.io/cv)_
</div>

# Hiroki Osame

<div>


<AppLink href="https://github.com/privatenumber">GitHub</AppLink>

<AppLink href="https://www.linkedin.com/in/hirokiosame/">LinkedIn</AppLink>

- Email hiroki.osame@gmail.com

</div>

I'm a software engineer (SWE) specializing in JavaScript & TypeScript.

I'm currently living in Tokyo, Japan, and work at <AppLink href="https://squareup.com/">Square</AppLink> as an L6 SWE.

## Open Source

I'm a passionate <AppLink href="https://github.com/privatenumber">Open Source dev</AppLink>. On my personal time, I maintain ~70 projects.

Last month ({{ downloadsMonth }}), they were downloaded <span class="whitespace-nowrap">**{{ npmDownloads }} times**</span> ({{ downloadsPerSecond.toLocaleString() }}/sec). Here are some of my favorites:

<div class="
	grid
	grid-cols-2
	gap-2
">
<div>

### [tsx](https://github.com/esbuild-kit/tsx)

<span>

<icon-material-symbols-cloud-download />



<!-- {{ getDownloads('tsx') }} -->
</span>


An enhanced Node.js to "just run" TypeScript & ESM code. It's powered by _esbuild_, zero-config, and is a beginner-friendly alternative to _ts-node_ .

<!--

A TypeScript runtime powered by [esbuild].

I like the simplicity of it and how easy it makes it for beginners to jump right into TypeScript.

Proud because I built it from the ground up.

It's also one of the first runtimes that supports ESM. Everyone else was only doing require hooks.

Modular so it can be used by both CommonJS and ESM.

It's used by a lot of engineers and projects I respect.

-->
</div>

<div>


### esbuild-loader

<span>
{{ getDownloads('esbuild-loader') }}
</span>

A _Webpack_ loader for transforming code with _esbuild_. It's a blazing fast alternative for popular loaders such as Babel, TypeScript, and Terser.

<!-- 
My first open source project.

I started by contributing and eventually was handed over to maintan.

Webpack loader that leverages esbuild to transform the code to replace JavaScript transformers like Babel or TypeScript, or minifiers like Terser.

The idea is simple but it was a lot of work to get it right.

Also proud to have been able to contribute back to esbuild by surfacing issues and feature requests.
 -->

</div>

<div>

### pkgroll

A zero-config bundler for Node.js that infers how to bundle the package based on `package.json` defined entry-points. It's powered by _Rollup_ & _esbuild_.

</div>

<div>

### minification-benchmarks

A repository that benchmarks JavaScript minifiers by performance and speed.

Popular and often referenced as a  picking a minifier.

</div>

<div>

### tasuku

A TypeScript & ESM runtime. Alternative to ts-node, powered by esbuild designed to lower the friction and barrier to running TypeScript code in Node.js.
</div>

<div>

### webpack-localize-assets-plugin

A TypeScript & ESM runtime. Alternative to ts-node, powered by esbuild designed to lower the friction and barrier to running TypeScript code in Node.js.
</div>

</div>

See a list of my packages [here](/npm-packages).

<!-- 
### Scripts

#### git-publish


### GitHub stats
To give a quick overview, here are some of my GitHub stats:

Followers

Commits this year

PRs this year

Issues this year -->


## Work

### <icon-mdi-square-inc class="inline align-middle m-r-1" /> <span class="align-middle">Square</span> <span class="opacity-50 font-light">2018 - Present</span>
<!-- 
#### 2024

#### 2023

#### 2022

#### 2019

#### 2018 -->

### <icon-fa6-brands-weebly class="inline align-middle m-r-1" /> <span class="align-middle">Weebly</span> <span class="opacity-50 font-light">2015 - 2018</span>

<!-- 
#### 2018

#### 2017

#### 2016

#### 2015 -->

## Education

### Boston University <span class="opacity-50 font-light">2011 - 2015</span>

Bachelor of Arts in Computer Science

<div class="print:hidden">
#### Web security vulnerability reports

As a student, I reported several web vulnerabilities that I discovered in their systems.

Here are my favorites:

##### 1. Viewing any student's transcript

On January 26, 2013, I reported a vulnerability on the BU Link website—a portal for students to manage their enrollment, view their own transcript, etc. The vulnerability was disclosed to to Quinn Shamblin (_Executive Director of Information Security_) and patched on January 29, 2013.

Given a student ID (enumerable number), the vulnerability allowed me to view any student's transcript which contained information such as grades, GPA, GPI, credit honors, honor points, college of registration, class year, and semester schedules.


##### 2. Downloading any student's submitted homework

On February 23, 2014, I reported a vulnerability on the BU Websubmit website—a portal for students to submit their Computer Science homework. The vulnerability was disclosed to Paul Stauffer (_Manager of Systems Administration_) and patched on February 24, 2014.

Given a course ID, project name, and a student's username (all public information), the vulnerability allowed me to download their submitted homework files. Accessing the homework of my peers was very easy.

##### 3. Stealing BU login credentials

On May 12, 2014, I reported an XSS vulnerability on the BU Web Login website—the authentication system used by all BU members and systems. The vulnerability was disclosed to 
Quinn Shamblin (_Executive Director of Information Security_).

The vulnerability allowed me to steal a BU member's (student or faculty) credentials by intercepting an authentic login page. Because the XSS injection happened in a server-side configuration file, I didn't need to construct a malicious login URL for the attack.

</div>


[esbuild]: https://esbuild.github.io/
