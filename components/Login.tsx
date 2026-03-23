import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Switch,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { InputField } from './InputField';

interface LoginProps {
  onLogin?: (email: string, password: string) => void;
}

export function Login({ onLogin }: LoginProps) {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email) newErrors.email = 'Informe seu e-mail.';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'E-mail inválido.';
    if (!password) newErrors.password = 'Informe sua senha.';
    else if (password.length < 6) newErrors.password = 'Mínimo 6 caracteres.';
    if (email !== "admin@fiap.com.br") newErrors.email = "E-mail de Admin inválido";
    else if (password !== "123456") newErrors.password = "Senha de Admin inválido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin?.(email, password);
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.wrapper, { paddingTop: insets.top }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.accentBar} />

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 32 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Image
            source={require("../assets/fiap_logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.headline}>Acesse sua conta</Text>
          <Text style={styles.subheadline}>
            Bem-vindo de volta! Faça login para continuar.
          </Text>
        </View>

        <View style={styles.form}>
          <InputField
            label="E-mail"
            iconName="mail-outline"
            placeholder="seu@email.com"
            value={email}
            onChangeText={(t) => { setEmail(t); setErrors((e) => ({ ...e, email: undefined })); }}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            error={errors.email}
          />

          <InputField
            label="Senha"
            iconName="lock-closed-outline"
            placeholder="••••••••"
            value={password}
            onChangeText={(t) => { setPassword(t); setErrors((e) => ({ ...e, password: undefined })); }}
            isPassword
            error={errors.password}
          />

          <View style={styles.row}>
            <View style={styles.rememberRow}>
              <Switch
                value={rememberMe}
                onValueChange={setRememberMe}
                trackColor={{ false: '#333', true: '#ED145B' }}
                thumbColor="#fff"
                style={styles.switch}
              />
              <Text style={styles.rememberLabel}>Lembrar-me</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.forgotText}>Esqueceu a senha?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.loginButtonText}>Entrar</Text>
            }
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>ou continue com</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
            <Ionicons name="logo-google" size={20} color="#fff" />
            <Text style={styles.socialButtonText}>Entrar com Google</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Não tem uma conta? </Text>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#000',
  },
  accentBar: {
    height: 3,
    backgroundColor: '#ED145B',
    width: '100%',
  },
  scroll: {
    paddingHorizontal: 28,
    paddingTop: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 36,
  },
  logo: {
    width: 140,
    height: 56,
    marginBottom: 20,
  },
  headline: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 6,
  },
  subheadline: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    lineHeight: 20,
  },
  form: {
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switch: {
    transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }],
    marginRight: 6,
  },
  rememberLabel: {
    color: '#aaa',
    fontSize: 13,
  },
  forgotText: {
    color: '#ED145B',
    fontSize: 13,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#ED145B',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#ED145B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  loginButtonDisabled: {
    opacity: 0.65,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#2a2a2a',
  },
  dividerText: {
    color: '#555',
    fontSize: 12,
    marginHorizontal: 12,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#2a2a2a',
    borderRadius: 12,
    paddingVertical: 14,
    gap: 10,
  },
  socialButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    color: '#666',
    fontSize: 14,
  },
  footerLink: {
    color: '#ED145B',
    fontSize: 14,
    fontWeight: '600',
  },
});
