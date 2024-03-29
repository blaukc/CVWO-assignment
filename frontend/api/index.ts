// import { host } from "./ip";
// const host = process.env.NEXT_PUBLIC_HOST_IP;
const host = "https://cvwo-backend2.onrender.com";
// const host = "http://localhost:54321";
const axios = require("axios");

export const Get = async (path: string) => {
    try {
        const res = await axios.get(`${host}${path}`);
        // error handling somewhere
        return res.data;
    } catch (error) {}
};

export const Post = async (path: string, body: any, useToken: boolean) => {
    try {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: token,
            },
        };
        const res = await axios.post(
            `${host}${path}`,
            JSON.stringify(body),
            useToken ? config : null
        );
        // error handling somewhere
        return res;
    } catch (error) {
        // Need some better error handling but i have no time
        return false;
    }
};

export const Patch = async (path: string, body: any, useToken: boolean) => {
    try {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: token,
            },
        };
        const res = await axios.patch(
            `${host}${path}`,
            JSON.stringify(body),
            useToken ? config : null
        );
        return res;
    } catch (error) {
        // Need some better error handling but i have no time
        return false;
    }
};

export const Delete = async (path: string, useToken: boolean) => {
    try {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: token,
            },
        };
        const res = await axios.delete(
            `${host}${path}`,
            useToken ? config : null
        );
        // error handling somewhere
        return res;
    } catch (error) {
        // Need some better error handling but i have no time
        return false;
    }
};

export const getCategories = async () => {
    const categories = await Get("/category/");
    return categories;
};

export const getPost = async (postId: string) => {
    const post = await Get(`/post/${postId}`);
    return post;
};

export const getCategoryPosts = async (categoryName: string) => {
    const posts = await Get(`/post/category/${categoryName}`);
    return posts;
};

export const createPost = async (values: any) => {
    const res = await Post(`/post/`, values, true);
    return res;
};

export const deletePost = async (commentId: string) => {
    const res = await Delete(`/post/${commentId}`, true);
    return res;
};

export const patchPost = async (commentId: string, values: any) => {
    const res = await Patch(`/post/${commentId}`, values, true);
    return res;
};

export const getPostComments = async (postId: string) => {
    const comments = await Get(`/comment/post/${postId}`);
    return comments;
};

export const createComment = async (values: any) => {
    const res = await Post(`/comment/`, values, true);
    return res;
};

export const deleteComment = async (commentId: string) => {
    const res = await Delete(`/comment/${commentId}`, true);
    return res;
};

export const patchComment = async (commentId: string, values: any) => {
    const res = await Patch(`/comment/${commentId}`, values, true);
    return res;
};

export const login = async (username: string, password: string) => {
    const res = await Post(
        `/login/`,
        {
            username: username,
            password: password,
        },
        false
    );
    return res;
};

export const register = async (username: string, password: string) => {
    const res = await Post(
        `/register/`,
        {
            username: username,
            password: password,
        },
        false
    );
    return res;
};
