import { PATH } from "@/config";
import { withListLoading } from "@/utils/withListLoading";
import moment from "moment";
import React from "react";
import { generatePath, Link } from "react-router-dom";
import Skeleton from "../Skeleton";
import Button from "../Button";
import { PaymentCardStyle } from "./style";
import { handleError } from "@/utils";
import { userService } from "@/services/user";
import { message } from "antd";

export const PaymentCard = ({
  _id,
  type,
  cardName,
  cardNumber,
  onDeletePayment,
  onChangePaymentDefault,
  expired,
  default: paymentDefault,
}) => {
  const t = expired.split("/");
  const month = t[0];
  const year = t[1];

  const _onDeletePayment = async () => {
    const key = "delete-payment";

    try {
      message.loading({
        key,
        content: "Đang xoá sổ thanh toán ",
      });
      await userService.removePayment(_id);
      onDeletePayment?.();

      message.success({
        key,
        content: "Xoá sổ thanh toán thành công",
      });
    } catch (err) {
      handleError(err, key);
    }
  };

  const _onChangePaymentDefault = async () => {
    try {
      const key = "change-payment-default";
      message.loading({
        key,
        content: "Thao tác đang được thực hiện",
      });
      await userService.editPayment(_id, { default: true });
      onChangePaymentDefault?.();

      message.success({
        key,
        content: "Thay đổi sổ thanh toán mặc định thành công",
      });
    } catch (err) {
      handleError(err);
    }
  };
  return (
    <PaymentCardStyle className="col-12">
      <div className="mb-8 payment-card card card-lg bg-light">
        <div className="card-body">
          {/* Heading */}
          <h6 className="mb-6">
            {type === "card" ? "Debit / Credit Card" : "Paypal"}
          </h6>
          {/* Text */}
          <p className="mb-5">
            <strong>Card Number: </strong>
            <span className="text-muted">{cardNumber}</span>
          </p>
          {/* Text */}
          <p className="mb-5">
            <strong>Expiry Date: </strong>
            <span className="text-muted">
              {moment(`${month}/01/${year}`).format("MMM, YYYY")}
            </span>
          </p>
          {/* Text */}
          <p className="mb-0">
            <strong>Name on Card: </strong>
            <span className="text-muted">{cardName}</span>
          </p>
          {paymentDefault ? (
            <div className="card-action-right-bottom">
              <a href="#" className="cursor-pointer color-success">
                Thanh toán mặc định
              </a>
            </div>
          ) : (
            <Button
              onClick={_onChangePaymentDefault}
              outline
              className="hidden btn-change-default btn-xs"
            >
              Đặt làm mặc định
            </Button>
          )}
          {/* Action */}
          <div className="flex gap-2 card-action card-action-right">
            {/* Button */}
            <Link
              className="btn btn-xs btn-circle btn-white-primary"
              to={generatePath(PATH.Profile.EditPayment, { id: _id })}
            >
              <i className="fe fe-edit-2" />
            </Link>
            {!paymentDefault && (
              <button
                className=" btn btn-xs btn-circle btn-white-primary"
                onClick={_onDeletePayment}
              >
                <i className="fe fe-x" />
              </button>
            )}
          </div>
        </div>
      </div>
    </PaymentCardStyle>
  );
};

const PaymentCardLoading = () => {
  return (
    <div className="col-12">
      <div
        className="mb-8 payment-card card card-lg bg-light"
        style={{ height: 224 }}
      >
        <div className="card-body">
          {/* Heading */}
          <h6 className="mb-6">
            <Skeleton height={24} />
          </h6>
          {/* Text */}
          <p className="mb-5">
            <Skeleton height={22} />
          </p>
          {/* Text */}
          <p className="mb-5">
            <Skeleton height={22} />
          </p>
          {/* Text */}
          <p className="mb-0">
            <Skeleton height={22} />
          </p>

          {/* Action */}
        </div>
      </div>
    </div>
  );
};

export const ListPaymentCard = withListLoading(PaymentCard, PaymentCardLoading);
