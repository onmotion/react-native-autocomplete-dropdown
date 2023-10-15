import React, { FC } from 'react'
import { StyleProp, TextInputProps, TextStyle, ViewStyle, FlatListProps } from 'react-native'

export type TAutocompleteDropdownItem = {
  id: string
  title: string | null
}

export interface AutocompleteDropdownRef {
  clear: () => void
  close: () => void
  blur: () => void
  open: () => Promise<void>
  setInputText: (text: string) => void
  toggle: () => void
  setItem: (item: TAutocompleteDropdownItem) => void
}

interface AutocompleteDropdownProps {
  /**
   * @example [
   *     { id: "1", title: "Alpha" },
   *     { id: "2", title: "Beta" },
   *     { id: "3", title: "Gamma" }
   * ]
   */
  dataSet?: TAutocompleteDropdownItem[] | null
  inputHeight?: number
  suggestionsListMaxHeight?: number
  initialValue?: string | object
  loading?: boolean
  useFilter?: boolean
  showClear?: boolean
  showChevron?: boolean
  closeOnBlur?: boolean
  closeOnSubmit?: boolean
  clearOnFocus?: boolean
  ignoreAccents?: boolean
  matchFrom?: 'any' | 'start'
  debounce?: number
  direction?: 'down' | 'up'
  position?: 'absolute' | 'relative'
  bottomOffset?: number
  textInputProps?: TextInputProps
  onChangeText?: (text: string) => void
  onSelectItem?: (item: TAutocompleteDropdownItem) => void
  renderItem?: (item: TAutocompleteDropdownItem, searchText: string) => React.ReactElement
  onOpenSuggestionsList?: (isOpened: boolean) => void
  onClear?: () => void
  onChevronPress?: () => void
  onRightIconComponentPress?: () => void
  onSubmit?: TextInputProps['onSubmitEditing']
  onBlur?: TextInputProps['onBlur']
  onFocus?: TextInputProps['onFocus']
  controller?: (controller: AutocompleteDropdownRef) => void
  containerStyle?: StyleProp<ViewStyle>
  inputContainerStyle?: StyleProp<ViewStyle>
  rightButtonsContainerStyle?: StyleProp<ViewStyle>
  suggestionsListContainerStyle?: StyleProp<ViewStyle>
  suggestionsListTextStyle?: StyleProp<TextStyle>
  ChevronIconComponent?: React.ReactElement
  RightIconComponent?: React.ReactElement
  LeftComponent?: React.ReactElement
  ClearIconComponent?: React.ReactElement
  InputComponent?: React.ComponentType
  ItemSeparatorComponent?: React.ReactElement
  EmptyResultComponent?: React.ReactElement
  emptyResultText?: string
  flatListProps?: FlatListProps<any>
}

export const AutocompleteDropdown: FC<AutocompleteDropdownProps>

export const AutocompleteDropdownContextProvider: FC<any>
