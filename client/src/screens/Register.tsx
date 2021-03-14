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

type RegisterScreenProps = RouteComponentProps &
  FormComponentProps & {
    authStore: AuthStore;
    appStore: AppStore;
  };

@inject("authStore")
@inject("appStore")
@observer
class RegisterScreen extends React.Component<RegisterScreenProps> {
  public componentWillMount() {
    this.props.authStore.reset();
  }

  public handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      this.setState(() => {
        if (!err) {
          this.props.authStore.register({ ...values }).then(() => {
            if (!this.props.authStore.error) {
              message.success(
                "Register successful, redirecting to login...",
                1.5
              );
              setTimeout(() => this.props.history.push("/login"), 1500);
            }
          });
        }
      });
    });
  };

  public compareToFirstPassword = (
    rule: any,
    value: string,
    callback: (reason?: string) => void
  ) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback(
        `inconsistent password, ${value} vs ${form.getFieldValue("password")}`
      );
    } else {
      callback();
    }
  };

  public render() {
    const { appStore, authStore } = this.props;

    if (appStore.self) {
      message.info(
        `Hello ${appStore.self.appName}, you are already logged in.`,
        0.8
      );
      return <Redirect to="/" />;
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="full-page-form__container">
        <Form
          onSubmit={this.handleSubmit}
          className="full-page-form__content"
          id="register-form"
        >
          <h1 className="full-page-form__header"> Registration Form </h1>
          <hr className="full-page-form__divider" />
          <FormItem>
            {getFieldDecorator("appName", {
              rules: [
                { required: true, message: "Please input your app name!" },
              ],
            })(
              <Input
                prefix={
                  <Icon type="app" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="App Name"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("appCode", {
              rules: [
                { required: true, message: "Please input your app code!" },
              ],
            })(
              <Input
                prefix={
                  <Icon type="app" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="App Code"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your password!" },
                {
                  pattern: /^(?=.*[A-Za-zöÖçÇşŞğĞüÜıİ])(?=.*\d)[A-Za-zöÖçÇşŞğĞüÜıİ\d]{8,}$/,
                  message:
                    "Password must contain minimum eight characters, at least one letter and one number",
                },
              ],
            })(
              <Input
                type="password"
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Password"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("passwordConfirm", {
              rules: [
                { required: true, message: "Please confirm your password!" },
                {
                  validator: this.compareToFirstPassword,
                  message: "Two passwords that you enter is inconsistent!",
                },
              ],
            })(
              <Input
                type="password"
                prefix={
                  <Icon type="reload" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Repeat Password"
              />
            )}
          </FormItem>
          <ErrorContainer error={authStore.error} />
          <FormItem>
            <div className="space-evenly">
              <Button
                type="primary"
                icon="enter"
                style={buttonStyle}
                htmlType="submit"
                loading={authStore.inProgress}
              >
                Submit
              </Button>
            </div>
          </FormItem>
          <div className="space-between">
            <Link to="/">
              <Button htmlType="button" icon="left">
                Homepage
              </Button>
            </Link>
            <Link to="/login">
              <Button htmlType="button" icon="login">
                Login
              </Button>
            </Link>
          </div>
        </Form>
      </div>
    );
  }
}

export default Form.create()(withRouter(RegisterScreen));
