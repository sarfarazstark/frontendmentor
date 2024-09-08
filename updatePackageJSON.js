const fs = require('fs');
const path = require('path');

// Paths to the files
const dataFilePath = path.join(__dirname, 'data.json');
const packageFilePath = path.join(__dirname, 'package.json');

// Function to create a key from the name
function createScriptKey(name) {
	// Split the name by hyphens or spaces and take the first two words
	const words = name.split(/[-\s]+/);
	const key = (words[0] + (words[1] || '')).toLowerCase();
	return key;
}

// Function to parse and compare dates
function parseDate(dateString) {
	return new Date(dateString);
}

// Read and parse the data.json file
fs.readFile(dataFilePath, 'utf8', (err, data) => {
	if (err) {
		console.error('Could not read data.json:', err);
		return;
	}

	const dataJson = JSON.parse(data);

	// Sort the data by submitDate in ascending order (oldest first)
	dataJson.sort((a, b) => parseDate(a.submitDate) - parseDate(b.submitDate));

	// Read and parse the package.json file
	fs.readFile(packageFilePath, 'utf8', (err, packageData) => {
		if (err) {
			console.error('Could not read package.json:', err);
			return;
		}

		const packageJson = JSON.parse(packageData);

		// Ensure the scripts section exists
		if (!packageJson.scripts) {
			packageJson.scripts = {};
		}

		// Add scripts from data.json to package.json
		dataJson.forEach((item) => {
			const scriptKey = createScriptKey(item.name);
			packageJson.scripts[
				scriptKey
			] = `cd ./${item.name} & npx tailwindcss -i ./global.css -o ./style.css --watch`;
		});

		// Write the updated package.json back to the file
		fs.writeFile(
			packageFilePath,
			JSON.stringify(packageJson, null, 2),
			'utf8',
			(err) => {
				if (err) {
					console.error('Could not write to package.json:', err);
				} else {
					console.log('Successfully updated package.json with new scripts.');
				}
			}
		);
	});
});
