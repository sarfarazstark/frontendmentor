'strict mode';

const search = async function (event) {
	const searchInput = event.previousElementSibling;
	if (searchInput.value === '') return alert('Input Field Empty');
	try {
		const response = await fetch(
			`https://api.github.com/users/${searchInput.value}`
		);
		if (!response.ok) throw new Error('User not found!');

		const responseJSON = await response.json();
		console.log(responseJSON);
	} catch (error) {
		alert(error);
	}
};
