import { makeAutoObservable } from 'mobx';
import { RootStore } from './index';


type Alert = {
    message?: string,
    status?: 'info' | 'warning' | 'success' | 'error' | 'loading' | undefined,
    timeout?: number,
} | null;

export class DashboardStore {
    rootStore: RootStore;

    alert: Alert = null;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this, { rootStore: false });
        this.rootStore = rootStore;
    }

    getAlert = () => {
        return this.alert
    }

    setAlert = (alert: Alert) => {
        this.alert = alert;
    }
}

export default DashboardStore;
