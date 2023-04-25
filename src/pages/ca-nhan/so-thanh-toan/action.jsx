import Button from "@/components/Button";
import Field from "@/components/Field";
import { Input } from "@/components/Input";
import { Portal } from "@/components/Portal";
import Radio from "@/components/Radio";
import { Select } from "@/components/Select";
import { PATH, PROFILE_TITLE_ID } from "@/config";
import { useForm } from "@/hooks/useForm";
import { useQuery } from "@/hooks/useQuery";
import { userService } from "@/services/user";
import { handleError, required } from "@/utils";
import { message, Spin } from "antd";
import moment from "moment";
import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
const rules = {
  cardName: [required()],
  cardNumber: [required()],
  cvv: [required()],
  month: [required()],
  year: [required()],
};

export const ActionPaymentPage = () => {
  const { id } = useParams();
  const [step, setStep] = useState(id ? 1 : 0);
  const navigate = useNavigate();
  const typeRef = useRef("card");
  const form = useForm(rules);

  const { data: paymentDetail, loading: getPaymentLoading } = useQuery({
    enabled: !!id,
    queryFn: () => userService.getPaymentDetail(id),
    onSuccess: (res) => {
      const t = res.data.expired.split("/");
      const month = t[0];
      const year = t[1];
      form.setValues({
        ...res.data,
        month,
        year,
      });
    },
    onError: () => {
      message.error("Sổ địa chỉ không tồn tại");
      navigate(PATH.Profile.Payment);
    },
  });

  const { loading, refetch: actionService } = useQuery({
    enabled: false,
    queryFn: ({ params }) => {
      if (id) {
        return userService.editPayment(id, ...params);
      } else {
        return userService.addPayment(...params);
      }
    },
  });

  const onSubmit = async () => {
    try {
      if (form.validate()) {
        await actionService({
          ...form.values,
          type: typeRef.current,
          expired: `${form.values.month}/${form.values.year}`,
        });
        message.success(
          id
            ? "Cập nhật thanh toán thành công"
            : "Thêm sổ thanh toán thành công!"
        );
        navigate(PATH.Profile.Payment);
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <>
      <Portal selector={PROFILE_TITLE_ID}>
        {id ? "Edit Debit / Credit Card" : "Add Debit / Credit Card"}
      </Portal>
      <Helmet>
        <title>Add Debit / Credit Card</title>
      </Helmet>
      <div>
        {step === 0 && (
          <form>
            <Radio.Group
              defaultValue="card"
              onChange={(value) => typeRef.current === value}
            >
              {/* Card */}
              <div className="border form-group card card-sm">
                <div className="card-body">
                  <Radio value="card">
                    I want to add Debit / Credit Card{" "}
                    <img
                      className="ml-2"
                      src="/img/brands/color/cards.svg"
                      alt="..."
                    />
                  </Radio>
                  {/* Radio */}
                </div>
              </div>
              {/* Card */}
              <div className="border form-group card card-sm">
                <div className="card-body">
                  {/* Radio */}
                  <Radio value="paypal">
                    I want to add PayPall{" "}
                    <img src="/img/brands/color/paypal.svg" alt="..." />
                  </Radio>
                </div>
              </div>
            </Radio.Group>
            {/* Button */}
            <button
              onClick={() => setStep(1)}
              className="btn btn-dark"
              type="submit"
            >
              Continue <i className="ml-2 fe fe-arrow-right" />
            </button>
          </form>
        )}

        {/* Heading */}

        {/* Form */}
        {step === 1 && (
          <Spin spinning={getPaymentLoading}>
            <div>
              <div className="row">
                <div className="col-12 col-md-6">
                  <Field
                    label="Card Number *"
                    placeholder="Card Number"
                    {...form.register("cardNumber")}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <Field
                    label="Name on Card *"
                    placeholder="Name on Card"
                    {...form.register("cardName")}
                  />
                </div>
                <div className="col-12">
                  {/* Label */}
                  <label>Expiry Date *</label>
                </div>
                <div className="col-12 col-md-4">
                  <Field
                    {...form.register("month")}
                    renderField={(props) => (
                      <Select {...props}>
                        <option>Month *</option>
                        {Array.from(Array(12)).map((_, i) => (
                          <option key={i} value={i + 1}>
                            {moment(`${i + 1}/01/2000`).format("MMMM")}
                          </option>
                        ))}
                      </Select>
                    )}
                  />
                </div>
                <div className="col-12 col-md-4">
                  <Field
                    {...form.register("year")}
                    renderField={(props) => (
                      <Select {...props}>
                        <option>Year *</option>
                        {Array.from(Array(30)).map((_, i) => {
                          const value = new Date().getFullYear() - 15 + i;
                          return (
                            <option value={value} key={value}>
                              {value}
                            </option>
                          );
                        })}
                      </Select>
                    )}
                  />
                </div>
                <div className="col-12 col-md-4">
                  <Field
                    placeholder="CVV *"
                    {...form.register("cvv")}
                    renderField={(props) => (
                      <Input
                        helper="The CVV Number on your credit card or debit card is a 3 digit number on VISA, MasterCard and Discover branded credit and debit cards."
                        {...props}
                      />
                    )}
                  />
                </div>
                <div className="col-12">
                  <Field
                    {...form.register("default")}
                    renderField={(props) => (
                      <div className="mb-0 custom-control custom-checkbox">
                        <input
                          onChange={(ev) => {
                            if (paymentDetail && paymentDetail.data.default) {
                              message.warning(
                                "Bạn không thể bỏ sổ thanh toán mặc định"
                              );
                            } else {
                              props?.onChange?.(ev.target.checked);
                            }
                          }}
                          checked={props.value}
                          type="checkbox"
                          className="custom-control-input"
                          id="defaultPaymentMethod"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="defaultPaymentMethod"
                        >
                          Default payment method
                        </label>
                      </div>
                    )}
                  />
                </div>
              </div>
              {/* Button */}
              <Button
                loading={loading}
                onClick={onSubmit}
                className="btn btn-dark"
                type="submit"
              >
                {id ? "Edit Card" : "Add Cart"}
              </Button>
            </div>
          </Spin>
        )}
      </div>
    </>
  );
};
