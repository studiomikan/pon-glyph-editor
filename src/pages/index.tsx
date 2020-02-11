import React, { CSSProperties } from "react";
import { connect } from "react-redux";
import { AppState } from "../store/reducer";
import {
  Layout,
  Row,
  Col
} from "antd";
import Copyright from "../components/Copyright";
import BasicSettingCard from "../components/BasicSettingCard";
import EffectSettingCard from "../components/EffectSettingCard";
import GlyphCacnvasCard from "../components/GlyphCanvasCard";

const { Header, Footer, Content } = Layout;

const logoStyle: CSSProperties = {
  color: "#FFFFFF",
  fontSize: "24px",
  float: "left",
  margin: "0 20px 0 0"
};

const Index = function(props: AppState) {
  return (
    <div>
      <Layout style={{ width: 1024 }}>
        <Header>
          <h1 style={logoStyle}>Ponkan グリフ画像エディター</h1>
        </Header>
        <Content style={{ padding: 20 }}>
          <Layout style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <Row gutter={24}>
              <Col span={8}>
                <BasicSettingCard />
              </Col>
              <Col span={16}>
                <Row style={{marginBottom:"24px"}}>
                  <GlyphCacnvasCard />
                </Row>
                <Row>
                  <EffectSettingCard />
                </Row>
              </Col>
            </Row>
          </Layout>
        </Content>
        <Footer>
          <Copyright />
        </Footer>
      </Layout>
    </div>
  );
};

export default connect((state: AppState) => state)(Index);
