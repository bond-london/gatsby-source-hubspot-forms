import React, {
  HTMLInputTypeAttribute,
  useCallback,
  useEffect,
  useState,
} from "react";
import { HubspotFormFieldDefinition } from "./shared";
import { HubspotFormOptions } from "./shared";

function calculateInputType(
  field: HubspotFormFieldDefinition
): HTMLInputTypeAttribute | undefined {
  const { name, type } = field;
  switch (type) {
    case "string":
      if (name === "email") {
        return "email";
      }
      break;

    case "phonenumber":
      return "tel";

    case "number":
      return "number";
  }

  return type;
}

export const HubspotTextField: React.FC<{
  field: HubspotFormFieldDefinition;
  single?: boolean;
  value?: string | number;
  onInteracted: () => void;
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  options: HubspotFormOptions;
}> = ({ field, single, onInteracted, onChange, value, options }) => {
  const [currentValue, setCurrentValue] = useState(value);
  useEffect(() => setCurrentValue(value), [value]);
  const handleChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentValue(ev.currentTarget.value);
      onChange?.(ev);
    },
    [onChange]
  );

  return (
    <input
      value={currentValue}
      id={field.name}
      name={field.name}
      placeholder={field.placeholder}
      type={calculateInputType(field)}
      hidden={field.hidden}
      required={field.required}
      className={options.fieldClassName}
      onInput={onInteracted}
      onChange={handleChange}
    />
  );
};
