import { execSync } from 'child_process';
import fs from 'fs';

const url = 'https://jsonplaceholder.typicode.com/posts';

try {
    const res = await fetch(url);
    const data = await res.json();
    git(data);
    console.log('✅ Data written to data.json');
} catch (err) {
    console.error('❌ Failed to fetch:', err);
    process.exit(1);
}











function git(test) {

    fs.writeFileSync('data.json', JSON.stringify(test, null, 2));

    execSync('git config --global user.name "Kattoor-RailwayBot"');
    execSync('git config --global user.email "jasper.catthoor@gmail.com"');

    execSync('git add data.json');
    execSync(`git commit -m "Update scrape data: ${new Date().toISOString()}" || echo "No changes"`);
    execSync('git push https://$GITHUB_PAT@github.com/Kattoor/github-actions-test.git HEAD:main');
}
