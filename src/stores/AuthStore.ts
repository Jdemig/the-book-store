'use client';

import { makeAutoObservable } from 'mobx';
import { RootStore } from './index';
import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_AUTH_API_URL;

export type AuthSignUpData = {
    email: string,
    password: string,
    confirmPassword: string,
};

export type AuthSignInData = {
    email: string,
    password: string,
};

export class AuthStore {
    rootStore: RootStore;

    isLoggedIn = false;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this, { rootStore: false });
        this.rootStore = rootStore;
    }

    setIsLoggedIn = (isLoggedIn: boolean) => {
        this.isLoggedIn = isLoggedIn;
    }

    getIsLoggedIn = () => {
        return this.isLoggedIn;
    }

    authSignUp = async (data: AuthSignUpData) => {
        const res = await axios.post(`${API_URL}/register`, data)

        const token = res.data.token;

        Cookies.set('token', token, { expires: 7 });

        this.isLoggedIn = true;
    }

    authSignIn = async (data: AuthSignInData) => {
        const res = await axios.post(`${API_URL}/login`, data)

        const token = res.data.token;

        Cookies.set('token', token, { expires: 7 });

        this.isLoggedIn = true;
    }

    authSignOut = () => {
        Cookies.remove('token');

        this.isLoggedIn = false;
    }
}

export default AuthStore;
