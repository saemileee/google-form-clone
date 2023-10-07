export class LocalStorage<T> {
  key: string;
  constructor(key: string) {
    this.key = key;
  }

  getItem() {
    try {
      return JSON.parse(localStorage.getItem(this.key)!);
    } catch (e) {
      console.error('파싱될 수 없는 value 값입니다. 스토리지를 리셋합니다.');
      this.setItem('');
    }
  }

  setItem(value: T | string) {
    try {
      return localStorage.setItem(this.key, JSON.stringify(value));
    } catch (e) {
      console.error('용량을 초과했습니다. 스토리지를 리셋합니다.');
      this.setItem('');
    }
  }
}
