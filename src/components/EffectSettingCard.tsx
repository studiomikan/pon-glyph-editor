import React, { useState } from "react";
import AlphaSetting from "./EffectSettingCard/AlphaSetting";
import { Card } from "antd";

const EffectSettingCard = function() {
  const [activeTabKey, setActiveTabKey] = useState<string>("alpha");
  const tabList = [
    { key: "alpha", tab: "Alphaフェード" }
    // { key: "move", tab: "座標移動" },
  ];
  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };
  const contentList: any = {
    alpha: <AlphaSetting />
    // move: <MoveSetting />,
  };

  return (
    <Card
      title={"エフェクト設定"}
      tabList={tabList}
      activeTabKey={activeTabKey}
      onTabChange={onTabChange}
    >
      {contentList[activeTabKey]}
    </Card>
  );
};

export default EffectSettingCard;
