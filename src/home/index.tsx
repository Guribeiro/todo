import { useCallback, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  ActivityIndicator,
  Alert,
  TextInput, 
  TouchableOpacity, 
  View
} from 'react-native';
import { Feather } from '@expo/vector-icons'
import { TasksList } from '../components/tasks-list';
import {useTask} from '../providers/tasks'
import {COLORS} from '../../colors'
import Logo from '../../assets/Logo.svg'
import {styles} from './styles'

export default function Home() {
  const [taskText, setTaskText] = useState('');
  
  const {tasks, addNewTask, loading} = useTask()

  const handleAddNewTask = useCallback(() => {
    if(taskText.length < 1) return Alert.alert('Campo vazio', 'Preencha o campo vazio')
    
    addNewTask(taskText)

    setTaskText('')
      
  },[taskText])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo />
      </View>
      <View style={styles.content}>
        <View style={styles.form}>
            <TextInput 
              style={styles.input}
              placeholder='Adicione uma nova tarefa' 
              placeholderTextColor={COLORS.gray_200}
              value={taskText} 
              onChangeText={(text) => setTaskText(text)}
            />
            <View style={styles.button_container}>
              <TouchableOpacity style={styles.button} onPress={handleAddNewTask} disabled={loading}>
                {loading ? (
                  <ActivityIndicator />
                ): (
                  <Feather name='plus-circle' size={18} color={COLORS.gray_200}/>
                )}
              </TouchableOpacity>
            </View>
        </View>

       <TasksList data={tasks} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}


