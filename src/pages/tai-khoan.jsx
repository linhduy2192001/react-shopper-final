import Button from "@/components/Button";
import Field from "@/components/Field";
import { useBodyClass } from "@/hooks/useBodyClass";
import React, { useEffect } from "react";
import { useForm } from "@/hooks/useForm";
import {
  regexp,
  required,
  confirmPassword,
  handleError,
  copyToClipBoard,
} from "@/utils";
import { useQuery } from "@/hooks/useQuery";
import { userService } from "@/services/user";
import { message } from "antd";
import { useAuth } from "@/hooks/useAuth";
import { useDispatch } from "react-redux";
import { useSearch } from "@/hooks/useSearch";
import { loginAction, loginByCodeAction } from "@/stores/auth";

const Account = () => {
  const dispatch = useDispatch();
  const [search] = useSearch();
  const { loginLoading } = useAuth();
  useBodyClass("bg-light");
  const { loading, refetch: registerService } = useQuery({
    enabled: false,
    queryFn: () =>
      userService.register({
        ...formRegister.values,
        redirect: window.location.origin + window.location.pathname,
      }),
    limitDuration: 3000,
  });
  useEffect(() => {
    if (search.code) {
      dispatch(loginByCodeAction(search.code));
    }
  }, []);
  // const { loading: loginLoading, refetch: loginService } = useQuery({
  //   enabled: false,
  //   queryFn: () => authService.login(formLogin.values),
  //   limitDuration: 1000,
  // });
  const formLogin = useForm({
    username: [required(), regexp("email")],
    password: [required()],
  });
  const formRegister = useForm(
    {
      name: [required()],
      username: [required(), regexp("email")],
      password: [required()],
      confirmPassword: [confirmPassword("password")],
    },
    {
      dependencies: {
        password: ["confirmPassword"],
      },
    }
  );

  const onRegister = async () => {
    if (formRegister.validate()) {
      try {
        const res = await registerService();
        message.success(res.message);
      } catch (err) {
        handleError(err);
      }
    }
  };

  const onLogin = async () => {
    if (formLogin.validate()) {
      try {
        dispatch(loginAction(formLogin.values));
        message.success("Login success");
      } catch (err) {
        handleError(err);
      }
    }
  };
  const _copyToClipBoard = (ev) => {
    copyToClipBoard(ev.target.innerText);
    message.info("Copy to clipboard");
  };
  return (
    <section className="py-12">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            {/* Card */}
            <div className="mb-10 card card-lg mb-md-0">
              <div className="card-body">
                {/* Heading */}
                <h6 className="mb-7">Returning Customer</h6>
                {/* Form */}
                <div>
                  <div className="row">
                    <div className="col-12">
                      {/* Email */}
                      <Field
                        placeholder="Email Address"
                        {...formLogin.register("username")}
                      />
                    </div>
                    <div className="col-12">
                      {/* Password */}
                      <Field
                        placeholder="Password"
                        type="password"
                        {...formLogin.register("password")}
                      />
                    </div>
                    <div className="col-12 col-md">
                      {/* Remember */}
                      <div className="form-group">
                        <div className="custom-control custom-checkbox">
                          <input
                            className="custom-control-input"
                            id="loginRemember"
                            type="checkbox"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="loginRemember"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-auto">
                      {/* Link */}
                      <div className="form-group">
                        <a
                          className="font-size-sm text-reset"
                          data-toggle="modal"
                          href="#modalPasswordReset"
                        >
                          Forgot Password?
                        </a>
                      </div>
                    </div>
                    <div className="col-12">
                      {/* Button */}
                      <Button onClick={onLogin} loading={loginLoading}>
                        Sign In
                      </Button>
                    </div>
                    <div className="col-12">
                      <p className="mt-5 mb-2 font-light font-size-sm text-muted">
                        Tài khoản demo:{" "}
                        <b className="text-black">
                          <span
                            className="underline cursor-pointer"
                            onClick={_copyToClipBoard}
                          >
                            demo@spacedev.com{" "}
                          </span>
                          /
                          <span
                            className="underline cursor-pointer"
                            onClick={_copyToClipBoard}
                          >
                            Spacedev@123
                          </span>
                        </b>
                      </p>
                      <p className="mt-5 mb-2 font-light text-justify font-size-sm text-muted">
                        Chúng tôi cung cấp cho bạn tài khoản demo vì mục đích
                        học tập, để đảm bảo những người khác có thể sử dụng
                        chung tài khoản chúng tôi sẽ hạn chế rất nhiều quyền
                        trên tài khoản này ví dụ: <br />
                        - Không thay đổi thông tin cá nhân, mật khẩu <br />
                        - không reset password,... <br />
                        <br />
                        Để có thể sử dụng toàn bộ chức năng trên website, vui
                        lòng tiến hành <b className="text-black">
                          đăng ký
                        </b>{" "}
                        bằng tài khoản email có thật
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            {/* Card */}
            <div className="card card-lg">
              <div className="card-body">
                {/* Heading */}
                <h6 className="mb-7">New Customer</h6>
                {/* Form */}
                <div>
                  <div className="row">
                    <div className="col-12">
                      {/* Email */}
                      <Field
                        placeholder="Full Name *"
                        {...formRegister.register("name")}
                      />
                    </div>
                    <div className="col-12">
                      {/* Email */}
                      <Field
                        placeholder="Email Address * "
                        {...formRegister.register("username")}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      {/* Password */}
                      <Field
                        placeholder="Password *"
                        type="password"
                        {...formRegister.register("password")}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      {/* Password */}
                      <Field
                        placeholder="Confirm password *"
                        type="password"
                        {...formRegister.register("confirmPassword")}
                      />
                    </div>
                    <div className="col-12 col-md-auto">
                      {/* Link */}
                      <div className="font-light form-group font-size-sm text-muted">
                        By registering your details, you agree with our Terms
                        &amp; Conditions, and Privacy and Cookie Policy.
                      </div>
                    </div>
                    <div className="col-12">
                      {/* Button */}
                      <Button loading={loading} onClick={onRegister}>
                        Register
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Account;
