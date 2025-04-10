import { execSync } from 'child_process';
import fs from 'fs';

const url = 'https://jsonplaceholder.typicode.com/posts';

try {
    const res = await fetch(url);
    const data = await res.json();
    git(data + '' + Math.random());
    console.log('✅ Data written to data.json');
} catch (err) {
    console.error('❌ Failed to fetch:', err);
    process.exit(1);
}











function git(data) {
    const repo = 'https://github.com/Kattoor/github-actions-test.git';
    const branch = 'main';
    const token = process.env.GITHUB_PAT;
    // Clone the repo into a temp folder
    execSync(`git clone --depth=1 --branch=${branch} https://${token}@github.com/Kattoor/github-actions-test.git repo`);

    // Write the data into the cloned repo
    fs.writeFileSync('repo/data.json', JSON.stringify(data, null, 2));

    // Commit and push
    process.chdir('repo');
    execSync('git config user.name "Kattoor-RailwayBot"');
    execSync('git config user.email "jasper.catthoor@gmail.com"');
    execSync('git add data.json');
    execSync(`git commit -m "Update scrape data: ${new Date().toISOString()}" || echo "No changes"`);
    execSync(`git push https://${token}@github.com/Kattoor/github-actions-test.git`);
}
