import Firebase from 'firebase';
import Config from '../config/app';

class FirebaseApi {
	constructor() {
		this.fb = new Firebase(Config.fireBase);
	}

	push(ref,data) {
		this.fb.child(ref).push(data);
	}
}

export default new FirebaseApi();