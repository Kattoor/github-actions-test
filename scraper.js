import { writeFile } from 'fs/promises';

const url = 'https://jsonplaceholder.typicode.com/posts';

try {
    const res = await fetch(url);
    const data = await res.json();
    await writeFile('./data.json', JSON.stringify(data, null, 2));
    console.log('✅ Data written to data.json');
} catch (err) {
    console.error('❌ Failed to fetch:', err);
    process.exit(1);
}
