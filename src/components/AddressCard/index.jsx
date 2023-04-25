import { PATH } from "@/config";
import { userService } from "@/services/user";
import { handleError } from "@/utils";
import { withListLoading } from "@/utils/withListLoading";
import { withLoading } from "@/utils/withLoading";
import { message } from "antd";
import React from "react";
import { generatePath, Link } from "react-router-dom";
import Button from "../Button";
import Skeleton from "../Skeleton";
import { AddressCardStyle } from "./style";

const AddressCardLoading = () => {
  return (
    <div className="col-12">
      {/* Card */}
      <div className="mb-8 card card-lg bg-light" style={{ height: 274 }}>
        <div className="card-body">
          {/* Text */}
          <p className=" flex  flex-col gap-5 font-size-sm mb-0 leading-[35px]">
            <Skeleton width="65%" height={27} />
            <Skeleton width="40%" height={20} />
            <Skeleton width="54%" height={20} />
            <Skeleton width="35%" height={20} />
            <Skeleton width="35%" height={20} />
            <Skeleton width="25%" height={20} />
          </p>
        </div>
      </div>
    </div>
  );
};
const AddressCard = withLoading(
  ({
    _id,
    fullName,
    onChangeAddressDefault,
    onDeleteAddress,
    email,
    phone,
    province,
    district,
    address,
    default: addressDefault,
  }) => {
    const _onDeleteAddress = async () => {
      try {
        const key = "delete-address";
        message.loading({
          key,
          content: "Đang xoá địa chỉ ",
        });
        await userService.removeAddress(_id);
        onDeleteAddress?.();

        message.success({
          key,
          content: "Xoá địa chỉ thành công",
        });
      } catch (err) {
        handleError(err);
      }
    };
    const _onChangeAddressDefault = async () => {
      try {
        const key = "change-address-default";
        message.loading({
          key,
          content: "Thao tác đang được thực hiện",
        });
        await userService.editAddress(_id, { default: true });
        onChangeAddressDefault?.();

        message.success({
          key,
          content: "Thao tác được hiện thành công",
        });
      } catch (err) {
        handleError(err);
      }
    };
    return (
      <AddressCardStyle className="col-12">
        {/* Card */}
        <div className="mb-8 card card-lg bg-light">
          <div className="card-body">
            {/* Text */}
            <p className="font-size-sm mb-0 leading-[35px]">
              <a className="text-xl font-bold text-body " href="./product.html">
                {fullName}
              </a>{" "}
              <br />
              <b>Số điện thoại:</b> {phone} <br />
              <b>Email:</b>
              {email}
              <br />
              <b>Quận / Huyện:</b> {district} <br />
              <b>Tỉnh / thành phố:</b>
              {province} <br />
              <b>Địa chỉ:</b> {address}
            </p>

            <div className="card-action-right-bottom">
              {addressDefault ? (
                <div className="cursor-pointer color-success">
                  Địa chỉ mặc định
                </div>
              ) : (
                <Button
                  onClick={_onChangeAddressDefault}
                  outline
                  className="hidden btn-chanage-default btn-xs"
                >
                  Đặt làm địa chỉ mặc định
                </Button>
              )}
            </div>
            {/* Action */}
            <div className="flex gap-2 card-action card-action-right">
              {/* Button */}
              <Link
                className="btn btn-xs btn-circle btn-white-primary"
                to={generatePath(PATH.Profile.EditAddress, { id: _id })}
              >
                <i className="fe fe-edit-2" />
              </Link>
              {!addressDefault && (
                <button
                  onClick={_onDeleteAddress}
                  className="btn btn-xs btn-circle btn-white-primary"
                  href="account-address-edit.html"
                >
                  <i className="fe fe-x" />
                </button>
              )}
            </div>
          </div>
        </div>
      </AddressCardStyle>
    );
  },
  AddressCardLoading
);

export const ListAddressCard = withListLoading(AddressCard, AddressCardLoading);
