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
    const [dummyUpdateSidebar, setDummyUpdateSidebar] = useState<number>(0);

    const hydrateSidebar = () => {
        setDummyUpdateSidebar(dummyUpdateSidebar + 1);
    };

    return (
        <>
            <Head>
                <title>CVWO Forum</title>
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
                <Header
                    style={{
                        backgroundColor: "var(--forum-white)",
                        height: 70,
                    }}
                >
                    <HeaderComponent />
                </Header>
                <Layout style={{ height: "100vh", minHeight: 800 }}>
                    <Sider
                        width={"300"}
                        style={{
                            backgroundColor: "var(--forum-white)",
                        }}
                    >
                        <CategorySidebar
                            category={category}
                            setCategory={setCategory}
                        />
                    </Sider>
                    <Layout>
                        <Sider width={"25%"} style={{ overflowY: "scroll" }}>
                            <PostsSidebar
                                category={category}
                                setCategory={setCategory}
                                currentPost={currentPost}
                                setCurrentPost={setCurrentPost}
                                dummyUpdateSidebar={dummyUpdateSidebar}
                                hydrateSidebar={hydrateSidebar}
                            />
                        </Sider>
                        <Content style={{ overflowY: "scroll" }}>
                            <ForumPost
                                currentPost={currentPost}
                                hydrateSidebar={hydrateSidebar}
                            />
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </>
    );
};

export default ForumLayout;
