const fs = require("fs");
const path = require("path");

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith(".ts") || file.endsWith(".tsx")) {
      results.push(file);
    }
  });
  return results;
}

const files = walk("./src");
for (const file of files) {
  let content = fs.readFileSync(file, "utf8");
  
  // Replace string like: "${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005"}/video"
  content = content.replace(/"\$\{process\.env\.NEXT_PUBLIC_API_URL \|\| "http:\/\/localhost:3005"\}\/([^"]*)"/g, "`\${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005'}/$1`");
  
  // Replace string like: "${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005"}"
  content = content.replace(/"\$\{process\.env\.NEXT_PUBLIC_API_URL \|\| "http:\/\/localhost:3005"\}"/g, "`\${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005'}`");
  
  fs.writeFileSync(file, content);
}
console.log("Fixed again.");
