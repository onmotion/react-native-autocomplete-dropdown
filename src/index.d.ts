import React, { FC } from 'react'
import { StyleProp, ViewStyle } from 'react-native'

export type TAutocompleteDropdownItem = {
  id: string
  title: string | null
}

interface AutocompleteDropdownProps {
  /**
   * @example [
   *     { id: "1", title: "Alpha" },
   *     { id: "2", title: "Beta" },
   *     { id: "3", title: "Gamma" }
   * ]
   */
  dataSet?: TAutocompleteDropdownItem[]
  suggestionsListMaxHeight?: number
  initialValue?: string | object
  loading?: boolean
  useFilter?: boolean
  showClear?: boolean
  showChevron?: boolean
  closeOnBlur?: boolean
  closeOnSubmit?: boolean
  clearOnFocus?: boolean
  debounce?: number
  bottomOffset?: number
  onChangeText?(text: string): any
  onSelectItem?(item: TAutocompleteDropdownItem): any
  onOpenSuggestionsList?(isOpened: boolean): any
  onClear?(): any
  onSubmit?(e: any): any
  onFocus?(e: any): any
  controller?(controller: any): any
  containerStyle?: StyleProp<ViewStyle>
  rightButtonsContainerStyle?: StyleProp<ViewStyle>
  suggestionsListContainerStyle?: StyleProp<ViewStyle>
  ChevronIconComponent?: JSX.Element
  ClearIconComponent?: JSX.Element
  ScrollViewComponent?: JSX.Element
}

export const AutocompleteDropdown: FC<AutocompleteDropdownProps>
