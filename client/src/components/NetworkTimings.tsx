import { Button, Icon, List, Radio } from "antd";
import { inject, observer } from "mobx-react";
import moment from "moment";
import React, { useState } from "react";
import { AppStore } from "src/store/appStore";

const NetworkTimings = inject("appStore")(
  observer(({ appStore }: { appStore?: AppStore }) => {
    if (!appStore) {
      return null;
    }

    const dateList = [
      ...new Set(
        appStore.analytics?.files.map((file) => file.createdAt).reverse()
      ),
    ];

    const typeList = [
      ...new Set(appStore.analytics?.files.map((file) => file.type)),
    ];

    console.log(typeList);

    const [activeDateIndex, setActiveDateIndex] = useState(0);
    const [activeType, setActiveType] = useState("all");

    const listData = appStore.analytics?.files
      .filter((file) => file.createdAt === dateList[activeDateIndex])
      .filter((file) => file.type === activeType || activeType === "all")
      .map((file) => ({
        name: file.name,
        type: file.type,
        value: `${file.value} s`,
      }));

    const handleTypeChange = (e: any) => {
      setActiveType(e.target.value);
    };

    return (
      <div className="network-timings__container">
        <div className="space-between">
          <div className="network-timings__date-picker">
            <Button
              onClick={() => setActiveDateIndex(activeDateIndex + 1)}
              type="primary"
              shape="circle"
              icon="left"
              disabled={activeDateIndex === dateList.length - 1}
            />
            {moment(dateList[activeDateIndex]).format("HH:mm:ss")}
            <Button
              onClick={() => setActiveDateIndex(activeDateIndex - 1)}
              type="primary"
              shape="circle"
              icon="right"
              disabled={activeDateIndex === 0}
            />
          </div>
          <div className="network-timings__type-picker">
            <Radio.Group value={activeType} onChange={handleTypeChange}>
              <Radio.Button value="all">All</Radio.Button>
              {typeList.map((type) => (
                <Radio.Button key={type} value={type}>
                  {type}
                </Radio.Button>
              ))}
            </Radio.Group>
          </div>
        </div>

        <div className="network-timings__list">
          <List
            itemLayout="horizontal"
            dataSource={listData}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Icon
                      type="folder"
                      style={{ fontSize: "32px", color: "#08c" }}
                      theme="outlined"
                    />
                  }
                  title={item.name}
                  description={item.value}
                />
                <div>{item.type}</div>
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  })
);

export default NetworkTimings;
