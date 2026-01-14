
import { PasswordSettings } from './types';

const ADJECTIVES = ['happy', 'brave', 'sunny', 'swift', 'cool', 'kind', 'bold', 'magic', 'wild', 'grand', 'fast', 'calm', 'smart', 'mega', 'super'];
const NOUNS = ['dino', 'panda', 'tiger', 'wolf', 'eagle', 'bear', 'lion', 'hawk', 'fox', 'shark', 'whale', 'deer', 'cat', 'dog', 'bird'];

export const generatePassword = (settings: PasswordSettings): string => {
  if (settings.funToType) {
    const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
    const num = Math.floor(Math.random() * 99) + 10;
    
    let base = `${adj}${noun}${num}`;
    
    if (settings.symbols) {
      const symbols = '!@#$%^&*';
      base += symbols[Math.floor(Math.random() * symbols.length)];
    }

    if (settings.uppercase) {
      base = base.charAt(0).toUpperCase() + base.slice(1);
    }

    // Adjust to length if necessary, though word-based is better natural
    if (base.length < settings.length) {
      const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
      while (base.length < settings.length) {
        base += chars[Math.floor(Math.random() * chars.length)];
      }
    } else if (base.length > settings.length) {
      base = base.substring(0, settings.length);
    }
    
    return base;
  }

  const chars = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
  };

  let pool = '';
  if (settings.uppercase) pool += chars.uppercase;
  if (settings.lowercase) pool += chars.lowercase;
  if (settings.numbers) pool += chars.numbers;
  if (settings.symbols) pool += chars.symbols;

  if (pool.length === 0) return '';

  let password = '';
  if (settings.uppercase) password += chars.uppercase[Math.floor(Math.random() * chars.uppercase.length)];
  if (settings.lowercase) password += chars.lowercase[Math.floor(Math.random() * chars.lowercase.length)];
  if (settings.numbers) password += chars.numbers[Math.floor(Math.random() * chars.numbers.length)];
  if (settings.symbols) password += chars.symbols[Math.floor(Math.random() * chars.symbols.length)];

  while (password.length < settings.length) {
    password += pool[Math.floor(Math.random() * pool.length)];
  }

  return password.split('').sort(() => 0.5 - Math.random()).join('');
};

export const generatePythonCode = (settings: PasswordSettings): string => {
  if (settings.funToType) {
    return `import random

def generate_fun_password(length=${settings.length}):
    adjectives = ${JSON.stringify(ADJECTIVES)}
    nouns = ${JSON.stringify(NOUNS)}
    
    adj = random.choice(adjectives)
    noun = random.choice(nouns)
    num = random.randint(10, 99)
    
    password = f"{adj}{noun}{num}"
    
    ${settings.symbols ? "password += random.choice('!@#$%^&*')" : ""}
    ${settings.uppercase ? "password = password.capitalize()" : ""}
    
    if len(password) < length:
        chars = "abcdefghijklmnopqrstuvwxyz0123456789"
        password += ''.join(random.choice(chars) for _ in range(length - len(password)))
    
    return password[:length]

if __name__ == "__main__":
    print(generate_fun_password())
`;
  }

  return `import random
import string

def generate_password(length=${settings.length}):
    chars = ""
    ${settings.uppercase ? 'chars += string.ascii_uppercase' : ''}
    ${settings.lowercase ? 'chars += string.ascii_lowercase' : ''}
    ${settings.numbers ? 'chars += string.digits' : ''}
    ${settings.symbols ? "chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'" : ''}
    
    if not chars:
        return "Please select at least one character type"
        
    return ''.join(random.choice(chars) for _ in range(length))

if __name__ == "__main__":
    print(generate_password())
`;
};
