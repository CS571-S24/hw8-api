import jsdom from 'jsdom'
import fs from 'fs'

const URLS = [
    {
        url: "https://news.wisc.edu/new-federal-spending-bills-to-boost-uw-madison-research-initiatives/",
        img: "funding.jpg",
        tags: ["science", "finance"]
    },
    {
        url: "https://news.wisc.edu/shes-golden-and-a-badger-olympian-meghan-duggan-to-keynote-spring-commencement/",
        img: "golden.jpeg",
        tags: ["social", "alumni", "career"]
    },
    {
        url: "https://news.wisc.edu/bold-uw-grad-helped-open-college-workplace-to-women/",
        img: "bold.jpg",
        tags: ["social", "alumni"]
    },
    {
        url: "https://news.wisc.edu/meet-the-2024-distinguished-teaching-award-winners/",
        img: "teach.png",
        tags: ["social"]
    },
    {
        url: "https://news.wisc.edu/some-lymphomas-become-resistant-to-treatment-gene-discovery-may-offer-path-to-overcome-it/",
        img: "lymph.jpg",
        tags: ["science"]
    },
    {
        url: "https://news.wisc.edu/qa-with-prof-steffi-diem-a-uw-madison-fusion-scientist-and-2024-u-s-science-envoy/",
        img: "diem.jpg",
        tags: ["science", "social"]
    },
    {
        url: "https://news.wisc.edu/all-creatures-great-and-small-sequencing-the-blue-whale-and-etruscan-shrew-genomes/",
        img: "genomes.png",
        tags: ["science"]
    },
    {
        url: "https://news.wisc.edu/uw-madison-launches-sustainability-research-hub/",
        img: "sustain.jpg",
        tags: ["science"]
    },
    {
        url: "https://news.wisc.edu/uw-madison-remains-8th-in-research-ranking-surpasses-1-5-billion-in-research-expenditures/",
        img: "spending.jpg",
        tags: ["science", "finance"]
    },
    {
        url: "https://news.wisc.edu/how-to-approach-the-campus-career-fair/",
        img: "career.jpeg",
        tags: ["career"]
    },
    {
        url: "https://news.wisc.edu/golden-to-step-down-as-dean-of-school-of-medicine-and-public-health/",
        img: "dean.jpg",
        tags: ["career"]
    },
    {
        url: "https://news.wisc.edu/study-identifies-promising-target-for-treating-inflammatory-bowel-disease-and-colitis-induced-colorectal-cancers/",
        img: "study.jpg",
        tags: ["science"]
    }
]

const articles = [];

for(const url of URLS) {
    console.log("Processing " + url.url);
    const resp = await fetch(url.url);
    const data = await resp.text();
    // https://stackoverflow.com/questions/11398419/trying-to-use-the-domparser-with-node-js
    const dom = new jsdom.JSDOM(data);
    const story = dom.window.document.getElementsByClassName("story-body")[0].textContent
        .replace(/(\r?\n)+/g, "\n")
        .replace(/Share via .*/g, "")
        .replace(/Photo by .*/g, "")
        .split("\n")
        .map(cleanStr)
        .filter(t => t)
    const title = dom.window.document.getElementsByClassName("story-head")[0].getElementsByTagName("h1")[0].textContent
    const author = dom.window.document.getElementsByClassName("writer")[0]?.textContent.replace(/By /g, "")
    const dt = dom.window.document.getElementsByClassName("date")[0]?.textContent
    await sleep(500 + Math.ceil(500 * Math.random()))
    articles.push({
        title: cleanStr(title),
        body: story,
        posted: dt ?? "unknown",
        url: url.url,
        author: author ?? "unknown",
        img: url.img,
        tags: url.tags
    })
}

fs.writeFileSync("_articles.json", JSON.stringify(articles, null, 2))

// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function cleanStr(s) {
    return s.trim()
        .replace(/“/g, '"')
        .replace(/”/g, '"')
        .replace(/’/g, '\'')
        .replace(/–/g, "-")
        .replace(/ /g, " ")
}