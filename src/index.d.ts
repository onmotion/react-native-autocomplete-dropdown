import React, { FC } from 'react';
import { StyleProp, TextInputProps, TextStyle, ViewStyle, FlatListProps } from 'react-native';

export type TAutocompleteDropdownItem = {
  id: string;
  title: string | null;
};

export interface AutocompleteDropdownRef {
  clear: () => void;
  close: () => void;
  open: () => Promise<void>;
  setInputText: (text: string) => void;
  toggle: () => void;
}

interface AutocompleteDropdownProps {
  /**
   * @example [
   *     { id: "1", title: "Alpha" },
   *     { id: "2", title: "Beta" },
   *     { id: "3", title: "Gamma" }
   * ]
   */
  dataSet?: TAutocompleteDropdownItem[];
  inputHeight?: number;
  suggestionsListMaxHeight?: number;
  initialValue?: string | object;
  loading?: boolean;
  useFilter?: boolean;
  showClear?: boolean;
  showChevron?: boolean;
  closeOnBlur?: boolean;
  closeOnSubmit?: boolean;
  clearOnFocus?: boolean;
  debounce?: number;
  direction?: 'down' | 'up';
  position?: 'absolute' | 'relative';
  bottomOffset?: number;
  textInputProps?: TextInputProps;
  onChangeText?: (text: string) => void;
  onSelectItem?: (item: TAutocompleteDropdownItem) => void;
  renderItem?: (
    item: TAutocompleteDropdownItem,
    searchText: string,
  ) => JSX.Element;
  onOpenSuggestionsList?: (isOpened: boolean) => void;
  onClear?: () => void;
  onSubmit?: TextInputProps['onSubmitEditing'];
  onBlur?: TextInputProps['onBlur'];
  onFocus?: TextInputProps['onFocus'];
  controller?: (controller: AutocompleteDropdownRef) => void;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  rightButtonsContainerStyle?: StyleProp<ViewStyle>;
  suggestionsListContainerStyle?: StyleProp<ViewStyle>;
  suggestionsListTextStyle?: StyleProp<TextStyle>;
  ChevronIconComponent?: JSX.Element;
  ClearIconComponent?: JSX.Element;
  InputComponent?: React.ComponentType;
  ItemSeparatorComponent?: JSX.Element;
  EmptyResultComponent?: JSX.Element;
  emptyResultText?: string;
  flatListProps?: FlatListProps<any>
}

export const AutocompleteDropdown: FC<AutocompleteDropdownProps>;
