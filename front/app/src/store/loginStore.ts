import create from 'zustand';

interface LoginState {
  loginInfo: LoginInfo;
  isLoggedIn: boolean;
  setLogin: () => void;
  setLoginState: (value: LoginInfo) => void;
}

interface LoginInfo {
  loginId: string;
  loginName: string;
}

const loginInfo: LoginInfo = {
  loginId: "",
  loginName: "",
}

const _getLSInfo = () => {
  const _value = localStorage.getItem('loginInfo');
  const parsed = JSON.parse(_value ?? '{}');
  return Object.keys(parsed).length === 0 ? null : parsed;
}

const _setLSInfo = (_value: LoginInfo) => {
  const value = JSON.stringify(_value);
  localStorage.setItem('loginInfo', value);
}

export const useLoginStore = create<LoginState>((set, get) => ({
  loginInfo: _getLSInfo() || loginInfo,
  isLoggedIn: false,
  setLogin: () => set((state) => {
    const isLoggedIn = get().loginInfo.loginName.length > 0
    return { isLoggedIn }
  }),
  setLoginState: (loginInfo) => set((state) => {
    _setLSInfo(loginInfo)
    return { loginInfo }
  }),
}));

