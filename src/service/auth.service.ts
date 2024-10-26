import { AuthError, createClient, Session, User } from "@supabase/supabase-js";
import { errorMessages } from "../utils/messages";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export type AuthResponse = {
  user: User | null;
  session: Session | null;
};

export type Roles = "user" | "admin"

export type AuthResponseWithRole = AuthResponse & {
  rol: Roles;
};

export type RegisterRolResponse = { rol: Roles; userId: string } | null | undefined

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(errorMessages.supabaseVariables);
}

export const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "");

export const signUp = async (email: string, password: string, rolUser: Roles): Promise<AuthResponseWithRole | undefined> => {
  try {
    const {data, error} = await supabase.auth.signUp({
      email,
      password,
    });
    const rol: Roles = await registerRol(data.user!, rolUser).then(() => {
      if (rolUser !== null && rolUser !== undefined) return rolUser;
      else return "user";
    });

    if (error) {
      console.error(errorMessages.errorSignUp, error);
      throw error;
    }

    return {...data, rol: rol};
  } catch (error) {
    console.error(`${errorMessages.unexpectedErrorSignUp}`, error);
    throw error;
  }
}

export const signIn = async (email: string, password: string): Promise<{ user: User | null; error: AuthError | null }> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(errorMessages.errorSignIn, error);
      throw error;
    }

    return { user: data.user, error: null };
  } catch (err) {
    console.error(`${errorMessages.unexpectedErrorSignIn}: `, err);
    throw err
  }
};

export const signOut = async (): Promise<{ error: AuthError | null }> => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error(`${errorMessages.errorSignOut}: `, error);
      return { error };
    }

    return { error: null };
  } catch (err) {
    console.error(`${errorMessages.unexpectedErrorSignOut}: `, err);
    return { error: new AuthError(errorMessages.unexpectedErrorSignOut) };
  }
};

export const registerRol = async (user: User, rol: Roles): Promise<RegisterRolResponse> => {
  try {
    const {data, error} = await supabase.from("Roles").insert({
      rol,
      userId: user.id
    })
    
    if (error) {
      console.error(`${errorMessages.errorRegisterRol}: `, error);
    }
    return data
  } catch (err) {
    console.error(`${errorMessages.unexpectedErrorRegisterRol}: `, err);
  }
}

export const checkUserSession = async (): Promise<AuthResponseWithRole | null> => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      console.error(`${errorMessages.errorCheckSession}:`, error);
      return null; 
    }

    if (session) {
      const userId = session.user.id;
      const { data: roleData, error: roleError } = await supabase
        .from('Roles')
        .select('rol')
        .eq('userId', userId)
        .single(); 

      if (roleError) {
        console.error(`${errorMessages.errorFetchingUserRole}:`, roleError);
        return null;
      }

      return {
        user: session.user,
        session: session,
        rol: roleData?.rol || "user",
      };
    }

    return null; 
  } catch (err) {
    console.error(`${errorMessages.unexpectedErrorCheckSession}:`, err);
    return null;
  }
};