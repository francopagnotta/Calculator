// class and methods
class Calculator {
	constructor(previousOperandTextElement,currentOperandTextElement) {
		this.previousOperandTextElement = previousOperandTextElement;
		this.currentOperandTextElement = currentOperandTextElement;
		this.clear();
	}

	clear() {
		this.currentOperand = '';
		this.previousOperand = '';
		this.operation = undefined;
	}

	delete() {
		this.currentOperand = this.currentOperand.toString().slice(0,-1);
	}

	appendNumber(number) {
		if (number == '.' && this.currentOperand.includes('.')) return;
		this.currentOperand = this.currentOperand.toString() + number.toString();
	}

	chooseOperation(operation) {
		if (this.currentOperand === '') return;
		if (this.previousOperand !== '') {
			this.compute();
		}

		this.operation = operation;
		this.previousOperand = this.currentOperand;
		this.currentOperand = '';
	}
	
	compute() {
		let computation;
		const prev = parseFloat(this.previousOperand);
		const current = parseFloat(this.currentOperand);

		if(isNaN(prev) || isNaN(current)) return;
		switch (this.operation) {
			case '+':
				computation = prev + current;
				break;

			case '-':
				computation = prev - current;
				break;

			case 'x':
				computation = prev * current;
				break;

			case '/':
				computation = prev / current;
				break;

			case '%':
				computation = prev % current;
				break;
		
			default:
				break;
		}
		
		this.currentOperand = computation;
		this.operation = undefined;
		this.previousOperand = '';
	}
	
	getDisplayNumber(number) {
		return number;
	}

	updateDisplay() {
		this.currentOperandTextElement.innerHTML = this.getDisplayNumber(this.currentOperand);

		if (this.operation != null) this.previousOperandTextElement.innerHTML = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
		else this.previousOperandTextElement.innerHTML = '';
	}
}



// capturing the html elements
// numbers
const numberBtn = document.querySelectorAll('.btn__number');
// operators
const operatorBtn = document.querySelectorAll('.btn__operator');
// display top
const previousOperandTextElement = document.querySelector('.calculator__display--top');
// display bottom
const currentOperandTextElement = document.querySelector('.calculator__display--bottom');
// clear
const clearBtn = document.querySelector('.btn__clear');
// delete
const deleteBtn = document.querySelector('.btn__delete');
// equal
const equalBtn = document.querySelector('.btn__equal');



// creating the object 
const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);



// event listeners!
numberBtn.forEach(button => {
	button.addEventListener('click', ()=> {
		calculator.appendNumber(button.innerHTML);
		calculator.updateDisplay();
	});
});

operatorBtn.forEach(button => {
	button.addEventListener('click', ()=> {
		calculator.chooseOperation(button.innerHTML);
		calculator.updateDisplay();
	});
});

equalBtn.addEventListener('click', ()=> {
	calculator.compute();
	calculator.updateDisplay();
});

clearBtn.addEventListener('click', ()=> {
	calculator.clear();
	calculator.updateDisplay();
});

deleteBtn.addEventListener('click', ()=> {
	calculator.delete();
	calculator.updateDisplay();
});