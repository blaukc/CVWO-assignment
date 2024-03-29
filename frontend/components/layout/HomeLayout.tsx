import { Layout } from "antd";
import Head from "next/head";
import React from "react";
import HeaderComponent from "./Header";

const { Header, Footer, Sider, Content } = Layout;

interface IProps {
    body?: React.ReactNode;
}

const ForumLayout: React.FC<IProps> = (props: IProps) => {
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
                <Header style={{ backgroundColor: "var(--forum-white)" }}>
                    <HeaderComponent />
                </Header>
                <Content>{props?.body}</Content>
            </Layout>
        </>
    );
};

export default ForumLayout;
