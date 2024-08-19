import {StyleSheet} from 'react-native'

import { COLORS } from '../../../colors'

export const styles = StyleSheet.create({

  list_header_wrapper: {
    marginBottom: 20
  },

  list_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },

  list_header_info: {
    flexDirection: 'row',
  },

  list_header_info_label: {
    fontWeight: '600',
  },

  done: {
    color: COLORS.purple
  },

  created: {
    color: COLORS.blue_dark
  },

  list_header_info_value: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
    backgroundColor: COLORS.gray_400,
    borderRadius: 999
  },

  list_header_info_value_text: {
    color:COLORS.gray_200,
    fontWeight: '600',
  },
  list_item_wrapper: {
    marginBottom: 8
  },

  list_empty_wrapper: {
    width: '100%',
  },
  list_empty_line: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.gray_300,
  },
  list_empty_content: {
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 48
  },
  list_empty_content_title: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.gray_300,
  },
  list_empty_content_description: {
    fontSize: 14,
    color: COLORS.gray_300
  }
})