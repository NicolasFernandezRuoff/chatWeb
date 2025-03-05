export const environment = {
  production: false,
  firebase: {
    projectId: "login-2f435", 
    appId: "1:869898521111:web:c490e53ebd4573b4c76a52", 
    storageBucket: "login-2f435.firebasestorage.app", 
    apiKey: "AIzaSyDPmpyKVTrQx9z4ZETeG-NjDZbtQ4Zqkgs", 
    authDomain: "login-2f435.firebaseapp.com", 
    messagingSenderId: "869898521111",
    emulator: true
  }
};

// 🛠️ Agregar logs para verificar la configuración:
console.log("🌍 Modo de producción:", environment.production);
console.log("🔥 Usando Firebase Emulator:", environment.firebase.emulator);
console.log("📡 Firebase Config:", environment.firebase);
