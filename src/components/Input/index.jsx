import { cn } from "@/utils";
import { Popover } from "antd";

export const Input = ({ type = "text", helper, onChange, ...props }) => {
  return (
    <div className="form-group">
      <div
        className={cn("input-group input-group-merge border", {
          "border border-solid text-[red] !border-[red]": props.error,
        })}
      >
        <input
          className="form-control !border-0"
          type={type}
          onChange={(ev) => onChange(ev.target.value)}
          {...props}
        />
        {helper && (
          <Popover
            content={helper}
            placement="topRight"
            overlayStyle={{ maxWidth: 250 }}
          >
            <i className="flex items-center justify-center px-4 fe fe-help-circle " />
          </Popover>
        )}
      </div>
    </div>
  );
};
