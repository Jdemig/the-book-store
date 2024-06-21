import AuthStore from './AuthStore';
import BookStore from './BookStore';
import GlobalStore from "./GlobalStore";

export class RootStore {
    globalStore: GlobalStore;
    authStore: AuthStore;
    bookStore: BookStore;
    
    constructor() {
        this.globalStore = new GlobalStore(this);
        this.authStore = new AuthStore(this);
        this.bookStore = new BookStore(this);
    }
}

const rootStore = new RootStore();

export default rootStore;
