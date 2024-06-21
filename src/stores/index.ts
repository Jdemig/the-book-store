import AuthStore from './AuthStore';
import BookStore from './BookStore';

export class RootStore {
    authStore: AuthStore;
    bookStore: BookStore;
    
    constructor() {
        this.authStore = new AuthStore(this);
        this.bookStore = new BookStore(this);
    }
}

const rootStore = new RootStore();

export default rootStore;
