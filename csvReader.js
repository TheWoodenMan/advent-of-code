const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");

function csvToArray(str, delimiter = ",") {
	const food = str.split("\r\n");
	const groupObj = {};

	let elfArray = [];
	let elfCount = 1;
	food.map((food) => {
		if (food) {
			elfArray.push(food);
		} else {
			groupObj[elfCount] = elfArray;
			elfArray = [];
			elfCount++;
		}
	});

	let highestVal = 0;

	Object.entries(groupObj).forEach((el, i) => {
		console.log(el[1]);
		let currentVal = el[1].reduce((a, b) => Number(a) + Number(b), 0);
		// let currentVal = el.reduce((a, b) => a + b, 0);
		if (currentVal > highestVal) {
			highestVal = currentVal;
		}
	});
	console.log(highestVal);

	return { "highestVal": highestVal };
}

myForm.addEventListener("submit", function (e) {
	e.preventDefault();
	const input = csvFile.files[0];
	const reader = new FileReader();

	reader.onload = function (e) {
		const text = e.target.result;
		const data = csvToArray(text);
		document.write(JSON.stringify(data));
	};

	reader.readAsText(input);
});
