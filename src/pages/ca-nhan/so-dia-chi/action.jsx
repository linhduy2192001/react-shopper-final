import Field from "@/components/Field";
import { Portal } from "@/components/Portal";
import { PATH, PROFILE_TITLE_ID } from "@/config";
import { handleError, regexp, required } from "@/utils";
import { useForm } from "@/hooks/useForm";
import React from "react";
import Button from "@/components/Button";
import { useQuery } from "@/hooks/useQuery";
import { userService } from "@/services/user";
import { message, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const rules = {
  fullName: [required()],
  email: [required(), regexp("email")],
  phone: [required(), regexp("phone")],
  province: [required()],
  district: [required()],
  address: [required()],
};

export const ActionAddressPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const form = useForm(rules);

  const { data: addressDetail, loading: getAddressLoading } = useQuery({
    enabled: !!id,
    queryFn: () => userService.getAddressDetail(id),
    onSuccess: (res) => {
      form.setValues(res.data);
    },
    onError: () => {
      message.error("Sổ địa chỉ không tồn tại");
      navigate(PATH.Profile.Address);
    },
  });

  const { loading, refetch: actionService } = useQuery({
    enabled: false,
    queryFn: ({ params }) => {
      if (id) {
        return userService.editAddress(id, ...params);
      } else {
        return userService.addAddress(...params);
      }
    },
  });

  const onSubmit = async () => {
    try {
      if (form.validate()) {
        await actionService(form.values);
        message.success(
          id ? "Cập nhật địa chỉ thành công" : "Thêm sổ địa chỉ thành công!"
        );
        navigate(PATH.Profile.Address);
      }
    } catch (err) {
      handleError(err);
    }
  };
  const isEdit = id;
  return (
    <>
      <Portal selector={PROFILE_TITLE_ID}>
        {isEdit ? "Cập nhật địa chỉ" : "Thêm địa chỉ"}
      </Portal>
      {/* Form */}
      <Spin spinning={getAddressLoading}>
        <div className="row">
          <div className="col-12">
            <Field
              label="Full Name *"
              placeholder="Full Name"
              {...form.register("fullName")}
            />
          </div>
          <div className="col-12 col-md-6">
            <Field
              label="Phone Number *"
              placeholder="Phone Number"
              {...form.register("phone")}
            />
          </div>
          <div className="col-12 col-md-6">
            <Field
              label="Email Address *"
              placeholder="Email Address "
              {...form.register("email")}
            />
          </div>
          <div className="col-12 col-md-6">
            <Field
              label="District *"
              placeholder="District *"
              {...form.register("district")}
            />
          </div>
          <div className="col-12 col-md-6">
            <Field
              label="Province / City *"
              placeholder="Province / City *"
              {...form.register("province")}
            />
          </div>
          <div className="col-12">
            <Field
              label="Address *"
              placeholder="Address *"
              {...form.register("address")}
            />
          </div>
          <div className="col-12">
            <Field
              {...form.register("default")}
              renderField={(props) => (
                <div className="mb-0 custom-control custom-checkbox">
                  <input
                    onChange={(ev) => {
                      if (addressDetail && addressDetail.data.default) {
                        message.warning("Bạn không thể bỏ địa chỉ mặc định");
                      } else {
                        props?.onChange?.(ev.target.checked);
                      }
                    }}
                    checked={props.value}
                    type="checkbox"
                    className="custom-control-input"
                    id="defaultShippingAddress"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="defaultShippingAddress"
                  >
                    Default shipping address
                  </label>
                </div>
              )}
            />
          </div>
        </div>
        {/* Button */}
        <Button loading={loading} onClick={onSubmit}>
          {isEdit ? "Cập nhật địa chỉ" : "Thêm địa chỉ"}
        </Button>
      </Spin>
    </>
  );
};
