import {View, StyleSheet, TouchableOpacity, Text,} from 'react-native'
import {Feather} from '@expo/vector-icons'
import { COLORS } from '../../../colors';

export interface ITask {
  id: string
  checked: boolean
  text: string
}

export interface TaskProps {
  data: ITask
  onUpdateChecked: () => void
  onRemoveTask: () => void
}

export const Task = ({data, onUpdateChecked, onRemoveTask}:TaskProps) => {
  const {checked, text} = data

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onUpdateChecked}>
        <View style={[styles.check_box, checked ? styles.checked : {}]}>
          {checked && (
             <Feather name='check' color={COLORS.gray_200} size={12} />
          )}
        </View>
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={[styles.content_text, checked ? styles.text_checked : {}]}>{text}</Text>
      </View>
      <TouchableOpacity onPress={onRemoveTask}>
        <Feather name='trash-2' color={COLORS.gray_300} size={18} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: COLORS.gray_500,
    borderRadius: 8,
    minHeight: 54
  },
  content: {
    marginHorizontal: 8,
    maxWidth: 265,
  },
  content_text: {
    color: COLORS.gray_200,
    fontSize: 14,
  },
  text_checked: {
    textDecorationLine: 'line-through',
    color: COLORS.gray_300,
  },
  check_box: {
    height: 20.45,
    width: 20.45,
    borderRadius: 999,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderColor: COLORS.blue_dark
  },
  checked: {
    backgroundColor: COLORS.purple,
    borderWidth: 0,
  }
})