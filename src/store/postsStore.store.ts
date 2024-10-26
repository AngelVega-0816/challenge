import { create } from "zustand";
import { countTotalPosts, createPost, getAllPosts, getAllPostsSupabase, getPost, TypePost, updatePostApi, updatePostSupabase } from "../service/posts.service";

interface TypePostsStore {
  post: TypePost | null,
  posts: TypePost[],
  updatedPosts: TypePost[],
  limitPerPage: number,
  uploaded : boolean;
  currentPage: number,
  totalPages: number,
  searchCriteria: string,
  totalPosts: number,
  showModal: boolean;
  largestId: number,
  postsTypeDisplay: "api" | "created";
  typeForm: "create" | "update";
  getPostStore: (id: number) => Promise<TypePost | void>;
  getPostsStore: () => void;
  createPostStore: (post: Omit<TypePost, "id">) => Promise<void>;
  updatePostStore: (update: TypePost) => Promise<void | null>;
  updatePostsFromUpload: () => void;
  countTotalPostsStore: () => void;
  setCurrentPage: (currentPage: number) => void;
  setSearchCriteria: (searchCriteria: string) => void;
  setShowModal: () => void;
  setPostsTypeDisplay: (postsTypeDisplay: "api" | "created") => void;
  setTypeForm: (formValues: "create" | "update") => void;
}

const usePostsStore = create<TypePostsStore>((set, get) => ({
  post: null,
  posts: [],
  updatedPosts: [],
  limitPerPage: 10,
  uploaded: false,
  currentPage: 1,
  totalPages: 0,
  searchCriteria: "",
  totalPosts: 0,
  showModal: false,
  largestId: 0,
  postsTypeDisplay: "api",
  typeForm: "create",

  getPostStore: async (id: number) => {
    const { updatedPosts, postsTypeDisplay } = get();
    const postFromUpdated = updatedPosts.find(post => post.id === id);
  
  if (postFromUpdated) {
    set({ post: postFromUpdated });
    return postFromUpdated;
  } else {
    return await getPost(id, postsTypeDisplay === "api").then((post) => set({post}))
  }
  },
  getPostsStore: async () => {
    const {postsTypeDisplay, currentPage, limitPerPage, updatePostsFromUpload, searchCriteria, countTotalPostsStore} = get();
    set({uploaded : false})
    if (postsTypeDisplay === "api") {
      await getAllPosts(currentPage, limitPerPage, searchCriteria).then(posts => {
        set({posts})
        countTotalPostsStore()
      }).finally(() => set({uploaded : true}))
    } else {
      await getAllPostsSupabase(currentPage, limitPerPage, searchCriteria).then((res) => {
        if (res) set({posts: res.posts, totalPages: res.totalPages})
      }).finally(() => set({uploaded: true}))
    }
    updatePostsFromUpload()
  },
  createPostStore: async (post) => {
    await createPost(post)
  },
  updatePostStore: (update: TypePost) => {
    const {getPostsStore, postsTypeDisplay, updatedPosts, updatePostsFromUpload} = get()
    if (postsTypeDisplay === "api") {
      return updatePostApi(update).then((res) => {
          if (updatedPosts.some(post => post.id === res.id)) {
            const updatedArr = updatedPosts.map(post =>
              post.id === res.id ? res : post
            );
            set({updatedPosts: updatedArr})
            updatePostsFromUpload()
          } else {
            set((prev) => ({updatedPosts: prev.updatedPosts.concat(res)}))
            updatePostsFromUpload()
          }
      })
    } else {
      return updatePostSupabase(update).then(() => {
        getPostsStore()
      })
    }
  },
  updatePostsFromUpload: () => {
    const { posts, updatedPosts } = get();
    
    const updatedPostsAux = posts.map(post => {
      const matchingUploadPost = updatedPosts.find(uploadPost => uploadPost.id === post.id);
      return matchingUploadPost ? matchingUploadPost : post;
    });

    set({ posts: updatedPostsAux });
  },
  countTotalPostsStore: async () => {
    const {searchCriteria, limitPerPage} = get()
      await countTotalPosts(searchCriteria).then(totalPosts => {
        set({totalPosts, totalPages: Math.ceil(totalPosts / limitPerPage)})
      })
  },
  setCurrentPage: (currentPage) => {
    set({currentPage});
    get().getPostsStore();
  } ,
  setSearchCriteria: (searchCriteria) => {
    set({searchCriteria})
    get().getPostsStore();
  },
  setShowModal: () => {
    set((prev) => ({showModal: !prev.showModal}))
  },
  setPostsTypeDisplay: (postsTypeDisplay) => {
    set({postsTypeDisplay})
    get().getPostsStore()
  },
  setTypeForm: (typeForm) => {
    set({typeForm})
  },
}))

export default usePostsStore