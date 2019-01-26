import React, { Component } from "react";
import { Layout } from "antd";
import NavBar from "../components/NavBar";
const { Content, Footer } = Layout;

const Page = ({ children }) => (
  <Layout>
    <NavBar />
    <Content style={{ marginTop: "60px" }}>{children}</Content>
    <Footer />
  </Layout>
);

export default Page;