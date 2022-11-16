// Create password
function createPassword(length = 16) {
	let password = '';
	const lettersLower = 'abcdefghijklmnopqrstuvwxyz';
	const lettersUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const numbers = '0123456789';
	const symbols = '!@#$%^&*()';
	let chars = lettersLower.concat(numbers, symbols, lettersUpper);
	const input = document.querySelector('.password');
	const inputFormatted = document.querySelector('.password-formatted');
	const passwordLength = document.querySelector('.range-slider').value;
	const array = new Uint32Array(passwordLength);

	inputFormatted.innerHTML = '';
	window.crypto.getRandomValues(array);

	for (let i = 0; i < passwordLength; i++) {
		password += chars[array[i] % chars.length];
	}

	input.value = password;
	formatPassword(password, numbers, symbols);
}

createPassword();


// Format password
function formatPassword(password, arr1, arr2) {
	const passwordArray = Array.from(password);
	const inputFormatted = document.querySelector('.password-formatted');
	
	passwordArray.forEach(char => {
		const el = document.createElement('span');
		
		switch (true) {
			case arr1.includes(char):
				el.textContent = char;
				inputFormatted.append(el);
				break;
			case arr2.includes(char):
				el.textContent = char;
				inputFormatted.append(el);
				break;
			default:
				inputFormatted.append(char);
			break;
		}
	});
}


// Copy password
let timer;

function copyPassword() {
	const input = document.querySelector('.password').value;
	const copyBtn = document.querySelector('.copy');

	window.clearTimeout(timer);
	navigator.clipboard.writeText(input);
	copyBtn.textContent = 'Copied!';

	timer = setTimeout(function() {
		copyBtn.textContent = 'Copy';
	}, 2000);
}


// Range slider
var rangeSlider = document.querySelector('.range-slider');

function rangeValue(){
	var newValue = rangeSlider.value;
	var length = document.querySelector('.length');

	length.value = newValue;
}

rangeSlider.addEventListener('input', rangeValue);