import { useState, FocusEvent } from 'react';
import { Select, SelectProps } from 'antd';
import cn from 'classnames';

import styles from '../../../styles/InputSelect.module.css';

type InputSelectOption = {
  value: string | number;
  label: unknown;
};

export type InputSelectProps<ValueType extends InputSelectOption['value']> = {
  label?: string;
} & Omit<SelectProps<ValueType>, 'mode' | 'placeholder'>;

export function InputSelect<ValueType extends InputSelectOption['value']>({
  children,
  className,
  label = '',
  onFocus,
  onBlur,
  value,
  ...baseInputSelectProps
}: InputSelectProps<ValueType>) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: FocusEvent<HTMLElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: FocusEvent<HTMLElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const isValueEmpty = (value: InputSelectProps<InputSelectOption['value']>['value']) => {
    if (typeof value === 'number') {
      return isNaN(value);
    }

    return !value;
  };

  const isEmpty = isValueEmpty(value);

  return (
    <div
      className={cn(styles.custom_select_wrapper, className, {
        [styles.is_focused]: isFocused,
        [styles.is_empty]: isEmpty,
      })}>
      <Select
        size="large"
        allowClear
        value={value}
        filterOption={false}
        dropdownMatchSelectWidth
        getPopupContainer={(trigger) => trigger.parentNode}
        showSearch
        showAction={['focus']}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...baseInputSelectProps}>
        {children}
      </Select>
      {label && <label className={styles.field_label}>{label}</label>}
    </div>
  );
}
