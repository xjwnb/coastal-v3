/**
 * localStorage
 */
export const Local = {
  set(key: string, val: any) {
    window.localStorage.setItem(key, JSON.stringify(val));
  },
  get(key: string) {
    let json: any = window.localStorage.getItem(key);
    return JSON.parse(json);
  },
  remove(key: string) {
    window.localStorage.removeItem(key);
  },
  clear() {
    window.localStorage.clear();
  },
};



/**
 * sessionStorage
 */
export const Session = {
	set(key: string, val: any) {
		window.sessionStorage.setItem(key, JSON.stringify(val));
	},
	get(key: string) {
		let json: any = window.sessionStorage.getItem(key);
		return JSON.parse(json);
	},
	remove(key: string) {
		window.sessionStorage.removeItem(key);
	},
	clear() {
		window.sessionStorage.clear();
	},
	getCorporationId() {
		let json: any = window.sessionStorage.getItem('userInfo');
		const data = JSON.parse(json);
		if (!data || !data.user || !data.user.corporation) {
			return '';
		}
		return data.user.corporation.corporation_id;
	},
};
