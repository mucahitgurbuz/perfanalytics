import { Button, Form, Icon, Input, message } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import {
  Link,
  Redirect,
  RouteComponentProps,
  withRouter,
} from "react-router-dom";

import { FormComponentProps } from "antd/lib/form";
import ErrorContainer from "../components/FormErrorContainer";
import { AppStore } from "../store/appStore";
import { AuthStore } from "../store/authStore";

const FormItem = Form.Item;
const buttonStyle = {
  width: 120,
};
const prefixIconStyle = {
  color: "rgba(0,0,0,.25)",
};

type LoginScreenProps = RouteComponentProps &
  FormComponentProps & {
    authStore: AuthStore;
    appStore: AppStore;
  };

@inject("authStore")
@inject("appStore")
@observer
class LoginScreen extends React.Component<LoginScreenProps, {}> {
  public componentWillMount() {
    this.props.authStore.reset();
  }

  public componentDidMount() {
    if (this.props.appStore.self) {
      message.success(
        `Hello ${this.props.appStore.self.appName}, you are now logged in.`,
        0.8
      );
    }
  }

  public handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.authStore.login(values.appCode, values.password).then(() => {
          if (!this.props.authStore.error) {
            this.props.history.push("/");
          }
        });
      }
    });
  };

  public render() {
    const { appStore, authStore } = this.props;

    if (appStore.self) {
      return <Redirect to="/" />;
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="full-page-form__container">
        <Form onSubmit={this.handleSubmit} className="full-page-form__content">
          <div className="centered">
            <span>Put logo here</span>
          </div>
          <FormItem>
            {getFieldDecorator("appCode", {
              rules: [
                { required: true, message: "Please input your appCode!" },
              ],
            })(
              <Input
                prefix={<Icon type="user" style={prefixIconStyle} />}
                placeholder="AppCode"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" },
              ],
            })(
              <Input
                prefix={<Icon type="lock" style={prefixIconStyle} />}
                type="password"
                placeholder="Password"
              />
            )}
          </FormItem>
          <ErrorContainer error={authStore.error} />
          <FormItem>
            <div className="space-evenly">
              <Button
                type="primary"
                icon="login"
                style={buttonStyle}
                htmlType="submit"
                loading={authStore.inProgress}
              >
                Log in
              </Button>
            </div>
          </FormItem>
          <div className="space-between">
            <Link to="/">
              <Button htmlType="button" icon="left">
                Homepage
              </Button>
            </Link>
            <Link to="/register">
              <Button htmlType="button" icon="user">
                Register
              </Button>
            </Link>
          </div>
        </Form>
      </div>
    );
  }
}

export default Form.create()(withRouter(LoginScreen));
