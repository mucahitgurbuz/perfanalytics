import { Alert } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { AppStore } from "src/store/appStore";

const Notification = inject("appStore")(
  observer(({ appStore }: { appStore?: AppStore }) => {
    if (!appStore) {
      return null;
    }

    return (
      <Alert
        message="Installation"
        description={
          <span>
            Add following scripts between the `head` tag of your app to start
            measuring.
            <br />
            <SyntaxHighlighter language="html" style={docco}>
              {`<script src="https://cdn.jsdelivr.net/npm/@mucahitgurbuz/perfanalytics.js@1.0.3/dist/index.js"></script>
<script>perfAnalytic("${appStore.self?.appCode}","http://perfanalytic-api.herokuapp.com");</script>`}
            </SyntaxHighlighter>
          </span>
        }
        type="success"
      />
    );
  })
);

export default Notification;
