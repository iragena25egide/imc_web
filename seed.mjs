import fs from 'fs';
import path from 'path';

const API_URL = 'http://localhost:3005';

// Mock Data Source (from src/dictionaries/en.json and src/components/sections/Gallery.tsx)
const newsArticles = [
  {
    title: "Muhanga District Appreciates IMC for Supporting Residents",
    content: `In the 2025–2026 fiscal year, the Mayor of Muhanga District expressed gratitude to the company IMC for supporting residents of Kabacuzi Sector by providing improved sweet potato vines that were planted on 15 hectares.

This support came at a time when the district had set a target for residents to cultivate high-quality sweet potato varieties—used to produce flour and doughnuts—on 150 hectares during the 2025–2026 fiscal year.
The achievement of this goal was made possible through contributions from partners, including IMC, a mining company that donated over 7 million Rwandan francs. The funds were used to purchase 9.5 tons of vines, which were planted on 15 hectares.

Mayor Jacqueline Kayitare of Muhanga District, speaking in March 2026 as residents planted the vines, said: “We greatly appreciate the contribution of IMC.”
Beyond the Mayor’s remarks, residents also expressed joy at receiving improved sweet potato seeds thanks to IMC’s involvement.

IMC, which operates mining activities in Kabacuzi Sector, has not only provided sweet potato vines but has also supported vulnerable families by building houses, contributing to community health insurance, and engaging in other initiatives that promote the welfare and development of local communities.`
  },
  {
    title: "IMC Ltd Finds Lithium in Kabacuzi",
    content: `IMC Ltd, a Rwandan mining company headquartered in Gatenga, Kigali, has announced the discovery of lithium-bearing pegmatite in Kabacuzi Sector, Muhanga District.

This breakthrough adds to the company’s established production of tin (cassiterite) and tantalum (coltan), strengthening its position in Rwanda’s mining industry.

Lithium is a critical mineral used in rechargeable batteries, electric vehicles, and renewable energy storage systems. With global demand rising, the identification of lithium deposits significantly enhances the strategic importance of IMC Ltd’s concession. The discovery is expected to increase the value of the concession, making it more attractive for investment and future development.

Operating under a 10-year mining license (2023–2033), IMC Ltd remains committed to sustainable mining practices. By integrating lithium into its long-term strategy, the company aims to diversify Rwanda’s mineral portfolio and establish itself as a leading producer of tin, tantalum, and lithium for global technological industries.`
  },
  {
    title: "One Year of Zero-Incident Operations",
    content: `IMC is incredibly proud to announce that we have achieved a major milestone: one full year of zero lost-time incidents (LTIs) across all our mining and processing sites.

This achievement is a testament to our rigorous safety protocols, regular training programs, and the dedication of every single employee to prioritize safety above all else. We will continue to invest in advanced safety equipment and continuous training to ensure every team member returns home safely at the end of their shift.`
  }
];

const videos = [
  {
    title: "RWANDA: DO MINES ENRICH THEIR NEIGHBORS?",
    youtubeLink: "https://www.youtube.com/watch?v=5otZfK3zv54"
  },
  {
    title: "MUHANGA: APPRECIATING SWEET POTATO VINES",
    youtubeLink: "https://www.youtube.com/watch?v=_UKMhL8eBXM"
  },
  {
    title: "IGISUBIZO INTERIOR",
    youtubeLink: "https://www.youtube.com/watch?v=syCiyBPRS0Y"
  }
];

const galleryImages = [
  { title: "Cassiterite Production", filePath: "public/images/gallery/casetelite.jpg" },
  { title: "Underground Tunnel", filePath: "public/images/gallery/tunnel.jpg" },
  { title: "Our Mining Team", filePath: "public/images/gallery/workers.jpg" },
  { title: "Igisubizo Tunnel", filePath: "public/images/gallery/igisubizo tunnel.jpg" },
  { title: "Active Operations", filePath: "public/images/gallery/work imc.jpg" },
  { title: "Mining Equipment", filePath: "public/images/gallery/tools.jpg" },
  { title: "Mineral Market", filePath: "public/images/gallery/market.jpg" },
  { title: "Precision Tools", filePath: "public/images/gallery/tool.jpg" },
  { title: "Company Events", filePath: "public/images/gallery/umubatizo_2.JPG.jpeg" },
  { title: "Company Certificate", filePath: "public/certificate.jpeg" }
];

const publications = [
  { title: "Law Governing Forests in Rwanda", filePath: "public/file/ITEGEKO RIGENGA AMASHYAMBA MU RWANDA.pdf" },
  { title: "Law on Mining and Quarry Operations", filePath: "public/file/ITEGEKO RIGENGA UBUCUKUZI BW'AMABUYE Y'AGACIRO NA KARIYERI.pdf" },
  { title: "Penal Code - Crimes and Penalties", filePath: "public/file/ITEGEKO RItegeka  IBYAHA N'IBIHANO MURI RUSANGE.pdf" }
];

async function seedNews() {
  console.log("Seeding News...");
  for (const article of newsArticles) {
    try {
      const res = await fetch(`${API_URL}/news`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(article)
      });
      if (res.ok) console.log(`✅ Created news: ${article.title}`);
      else console.error(`❌ Failed news: ${article.title}`, await res.text());
    } catch (err) {
      console.error(`❌ Error news: ${article.title}`, err.message);
    }
  }
}

async function seedVideos() {
  console.log("Seeding Videos...");
  for (const video of videos) {
    try {
      const res = await fetch(`${API_URL}/video`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(video)
      });
      if (res.ok) console.log(`✅ Created video: ${video.title}`);
      else console.error(`❌ Failed video: ${video.title}`, await res.text());
    } catch (err) {
      console.error(`❌ Error video: ${video.title}`, err.message);
    }
  }
}

async function seedGallery() {
  console.log("Seeding Gallery...");
  for (const item of galleryImages) {
    try {
      const form = new FormData();
      form.append("title", item.title);
      form.append("type", "image");
      
      const fileBuffer = fs.readFileSync(path.resolve(item.filePath));
      const blob = new Blob([fileBuffer]);
      form.append("file", blob, path.basename(item.filePath));

      const res = await fetch(`${API_URL}/gallery/upload`, {
        method: "POST",
        body: form
      });
      if (res.ok) console.log(`✅ Uploaded gallery image: ${item.title}`);
      else console.error(`❌ Failed gallery image: ${item.title}`, await res.text());
    } catch (err) {
      console.error(`❌ Error gallery image: ${item.title}`, err.message);
    }
  }
}

async function seedPublications() {
  console.log("Seeding Publications...");
  for (const item of publications) {
    try {
      const form = new FormData();
      form.append("title", item.title);
      
      const fileBuffer = fs.readFileSync(path.resolve(item.filePath));
      const blob = new Blob([fileBuffer], { type: 'application/pdf' });
      form.append("file", blob, path.basename(item.filePath));

      const res = await fetch(`${API_URL}/publication/upload`, {
        method: "POST",
        body: form
      });
      if (res.ok) console.log(`✅ Uploaded publication: ${item.title}`);
      else console.error(`❌ Failed publication: ${item.title}`, await res.text());
    } catch (err) {
      console.error(`❌ Error publication: ${item.title}`, err.message);
    }
  }
}

async function run() {
  // await seedNews();
  // await seedVideos();
  await seedGallery();
  // await seedPublications();
  console.log("Done!");
}

run();
