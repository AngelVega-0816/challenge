import axios from "axios";
import { errorMessages } from "../utils/messages";
import { supabase } from "./auth.service";

const baseApiUrl = import.meta.env.VITE_API_URL;

export interface TypePost {
  id: number;
  title: string
  body: string
  userId: number | string
}

export const getPost = async (id: number, requestApi: boolean = true): Promise<TypePost> => {
  if (requestApi) {
    const response = await axios.get<TypePost>(`${baseApiUrl}posts/${id}`)
    return response.data;
  } else {
    const response = await getPostCreated();
    if (Array.isArray(response)) {
      return response[0];
    } else {
      return response
    }
  }
};

export const getPostCreated = async (allPosts: boolean = false): Promise<TypePost | TypePost[]> => {
  const { data: { session } } = await supabase.auth.getSession();
  const { data } =  allPosts ? 
    await supabase
      .from('Posts')
      .select("*")
      .eq('userId', session?.user?.id)
      .single() : 
    await supabase
      .from('Posts')
      .select("*")
      .eq('userId', session?.user?.id)

  return data || [];
}

export const getAllPostsCreated = async (): Promise<TypePost[]> => {
  const { data: { session } } = await supabase.auth.getSession();
  const { data } = await supabase
        .from('Posts')
        .select("*")
        .eq('userId', session?.user?.id)

  return data ?? [];
}

export const getAllPosts = async (page: number, limitPerPage: number, search: string = ""): Promise<TypePost[]> => {
  const response = await axios.get<TypePost[]>(`${baseApiUrl}posts?_page=${page}&_limit=${limitPerPage}&q=${search}`);
  return response.data;
};

type PaginatedPostsResponse = {
  posts: TypePost[];
  totalPages: number;
};

export const getAllPostsSupabase = async (
  page: number,
  pageSize: number,
  search: string
): Promise<PaginatedPostsResponse> => {
  const { data: { session } } = await supabase.auth.getSession();
  const { data: posts, error, count } = await supabase
      .from("Posts")
      .select('*', { count: "exact" })
      .eq('userId', session?.user?.id)
      .or(`title.ilike.%${search}%,body.ilike.%${search}%`)
      .range((page - 1) * pageSize, page * pageSize - 1)

  if (error) {
    console.error("Error al obtener los posts:", error);
    return { posts: [], totalPages: 0 };
  }

  const totalPages = count ? Math.ceil(count / pageSize) : 0;

  return {
    posts: posts || [],
    totalPages,
  };
};

export const searchPosts = async (limitPerPage: number, searchString: string) => {
  const {data} = await axios.get<TypePost[]>(`${baseApiUrl}posts?q=${searchString}`);
  const totalPosts = data.length;
  const totalPages = Math.ceil(totalPosts / limitPerPage);
  const posts = data.slice(0,10)
  return {posts, totalPages };
}

export const countTotalPosts = async (search: string = ""): Promise<number> => {
  try {
    const { data } = await axios.get(`${baseApiUrl}posts?q=${search}`);
    return data.length;
  } catch (error) {
    console.error(errorMessages.errorGetPosts, error);
    throw error;
  }
};

export const createPost = async (newPost: Omit<TypePost, "id">): Promise<TypePost | void> => {
  try {
    const {data} = await supabase.from("Posts").insert(newPost)
    if (data) return data
  } catch (err) {
    console.error(`${errorMessages.unexpectedErrorRegisterRol}: `, err);
  }
}

export const updatePostApi = async (update: TypePost): Promise<TypePost> => {
  const {data} = await axios.put(`${baseApiUrl}posts/${update.id}`, update)
  return data
}

export const updatePostSupabase = async (update: TypePost) => {
  await supabase
      .from('Posts')
      .update(update)
      .eq('id', update.id)
      .single().then(() => {
        return true
      });
}
