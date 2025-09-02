import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useSelector } from 'react-redux';
import { login } from '../redux/actions/authActions';
import { RootState } from '../redux/reducers/rootReducer';
import i18n from '../utils/i18n';
import { useAppDispatch } from '../redux/hooks.ts';
import { AppTextInput } from '../components/AppTextInput.tsx';
import { AppText } from '../components/AppText.tsx';

const LoginScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    if (!email || !password) {
      Alert.alert('Please fill all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      Alert.alert('Please enter a valid email address');
      return;
    }
    dispatch(login(email, password));
  };

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>{i18n.t('login')}</AppText>
      <AppTextInput
        placeholder={i18n.t('email')}
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <AppTextInput
        placeholder={i18n.t('password')}
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {authState.error && <AppText style={styles.error}>{authState.error}</AppText>}
      <TouchableOpacity
        onPress={onLogin}
        style={styles.loginContainer}
      >
        <AppText style={styles.login}>{i18n.t('login')}</AppText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <AppText style={styles.link}>{i18n.t('signup')}</AppText>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    padding: 10,
    borderRadius: 5
  },
  error: { color: 'red', marginBottom: 10 },
  link: { marginTop: 15, color: 'blue', textAlign: 'center' },
  loginContainer: { backgroundColor: '#007AFF', paddingVertical: 10, borderRadius: 4 },
  login: { color: '#FFF', alignSelf: 'center' }
});
