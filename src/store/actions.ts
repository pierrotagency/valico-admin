export * from './layout/actions';

// Authentication module
export * from './auth/register/actions';
export * from './auth/login/actions';
export * from './auth/forgetpwd/actions';

export * from './post/actions';
export * from './tag/actions';

export * from './post/types';

export interface StoreAction {
    type: string,
    payload?: object
}