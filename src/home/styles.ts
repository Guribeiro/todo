import { StyleSheet } from 'react-native';
import { COLORS } from '../../colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray_600,
  },
  header: {
    backgroundColor: COLORS.gray_700,
    height: 173,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    paddingHorizontal: 24,
    flex: 1,
  },
  form: { 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    bottom: 27
  },
  input: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.gray_500,
    borderRadius: 6,
    height: 54
  },
  button_container: {
    marginLeft: 4
  },
  button: {
    borderRadius: 6,
    padding: 18,
    height: 54,
    backgroundColor: COLORS.blue_dark,
  },
});