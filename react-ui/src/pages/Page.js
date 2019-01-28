import React from "react";
import { Layout } from "antd";
import NavBar from "../components/NavBar";
const { Content, Footer } = Layout;

const Page = ({ children }) => (
  <Layout>
    <NavBar />
    <Content style={{}}>{children}</Content>
    <Footer style={{ backgroundColor: "#7E77FF", height: "200px" }} />
  </Layout>
);

export default Page;
