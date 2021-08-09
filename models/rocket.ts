class Rocket {
	code: string;
	propellers: Propeller[] = new Array();
	currentPower: number = 0;
	accelerationPower: number = 10;
	shownOnScreen: boolean = false;

	constructor(code: string) {
		this.code = code;
	}

	addPropeller(propeller: Propeller): void {
		this.propellers.push(propeller);
	}

	accelerate() {
		// Comparar la currentPower de cada propeller al maximumPower per saber si pot seguir augmentant o no. 
		let newArrayOfPropellersCurrentPowers = this.propellers.map((propeller: Propeller) => {
			if (propeller.currentPower < propeller.maximumPower) {
				propeller.currentPower += this.accelerationPower;
				this.currentPower += this.accelerationPower; 
			};
		});
	}

	break() {
		// Comparar la currentPower de cada propeller al maximumPower per saber si pot seguir disminuint o no. 
		let newArrayOfPropellersCurrentPowers = this.propellers.map((propeller: Propeller) => {
			if (propeller.currentPower >= 10) {
				propeller.currentPower -= this.accelerationPower;
				this.currentPower -= this.accelerationPower;
			} ;
		});
	}
}