import { create } from "zustand";
import { AuthResponse, checkUserSession, Roles, signIn, signOut, signUp } from "../service/auth.service";

interface AuthStore extends AuthResponse {
  rol: Roles | null;
  uploaded : boolean;
  signUpStore: (email: string, password: string, rol: Roles) => Promise<void>;
  signInStore: (email: string, password: string, onSuccess: () => void) => Promise<void>;
  signOutStore: () => Promise<void>;
  checkSession: () => Promise<void>;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  session: null,
  rol: null,
  uploaded: false,
  
  signUpStore: async (email, password, rol): Promise<void> => {
    await signUp(email, password, rol).then(res => {
      set(() => ({ ...res }));
    })
  },
  signInStore: async (email, password,  onSuccess: () => void): Promise<void> => {
    await signIn(email, password).then(res => {
      set(() => ({ user: res.user }));
      onSuccess()
    }).catch((err) => {
      throw err;
    })
  },
  signOutStore: async (): Promise<void> => {
    await signOut().then(() => {
      set(() => ({user: null, session: null, rol: null}))
    })
  },
  checkSession: async (): Promise<void> => {
    await checkUserSession().then(res => {
      set(() => ({...res}))
    }).finally(() => set(() => ({uploaded : true})))
  }
  
})
);

export default useAuthStore;
