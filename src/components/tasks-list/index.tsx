import {FlatList, View, Text} from 'react-native'
import { ITask, Task} from '../task'
import { Feather } from '@expo/vector-icons'
import { styles } from './styles'
import { COLORS } from '../../../colors'
import { useTask } from '../../providers/tasks'

 
interface TasksListProps{
  data: ITask[]
}

export const TasksList = ({ data }: TasksListProps) => {

    const { finishedTasksCounter, onRemoveTask, onUpdateChecked,tasksCounter } = useTask()

  return (
    <FlatList 
      data={data}
      keyExtractor={item => item.id}
      ListHeaderComponent={() => (
        <View style={styles.list_header_wrapper}>
          <View style={styles.list_header}>
            <View style={styles.list_header_info}>
              <Text style={[styles.list_header_info_label, styles.created]}>Criadas</Text>
              <View style={styles.list_header_info_value}>
                <Text style={styles.list_header_info_value_text}>{tasksCounter}</Text>
              </View>
            </View>
            <View style={styles.list_header_info}>
              <Text style={[styles.list_header_info_label, styles.done]}>Concluidas</Text>
              <View style={styles.list_header_info_value}>
                <Text style={styles.list_header_info_value_text}>{finishedTasksCounter}</Text>
              </View>
            </View>
          </View>
        </View>
      )}
      ListEmptyComponent={() => (
        <View style={styles.list_empty_wrapper}>
          <View style={styles.list_empty_line} />
          <View  style={styles.list_empty_content}>
              <Feather name='file-text' color={COLORS.gray_400} size={64} />
              <View style={{marginTop: 16}}>
                <Text style={styles.list_empty_content_title}>Você ainda não tem tarefas cadastradas</Text>
                <Text style={styles.list_empty_content_description}>Crie tarefas e organize seus itens a fazer</Text>
              </View>
          </View>
        </View>
      )}
      renderItem={({item, index}) => (
        <View key={index} style={styles.list_item_wrapper}>
          <Task 
            data={item} 
            onUpdateChecked={() => onUpdateChecked(item.id)} 
            onRemoveTask={() => onRemoveTask(item.id)}
          />
        </View>
    )}
  />
  )
}