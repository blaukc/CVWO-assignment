import { Layout } from "antd";
import Head from "next/head";
import React, { useState } from "react";
import { ICategories } from "../../interfaces/api";
import ForumPost from "../ForumPost";
import CategorySidebar from "./CategorySidebar";
import HeaderComponent from "./Header";
import PostsSidebar from "./PostsSidebar";

const { Header, Footer, Sider, Content } = Layout;

interface IProps {
    body?: React.ReactNode;
}

const ForumLayout: React.FC<IProps> = (props: IProps) => {
    const [category, setCategory] = useState("");
    const [currentPost, setCurrentPost] = useState("");

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                {/* <link rel="icon" href="/favicon.ico" /> */}
            </Head>
            <Layout>
                <Header style={{ backgroundColor: "var(--forum-white)" }}>
                    <HeaderComponent />
                </Header>
                <Layout>
                    <Sider width={"15%"}>
                        <CategorySidebar
                            category={category}
                            setCategory={setCategory}
                        />
                    </Sider>
                    <Layout>
                        <Sider width={"25%"}>
                            <PostsSidebar
                                category={category}
                                setCategory={setCategory}
                                setCurrentPost={setCurrentPost}
                            />
                        </Sider>
                        <Content>
                            <ForumPost currentPost={currentPost} />
                        </Content>
                    </Layout>
                </Layout>
                <Footer>Footer</Footer>
            </Layout>
        </>
    );
};

export default ForumLayout;
