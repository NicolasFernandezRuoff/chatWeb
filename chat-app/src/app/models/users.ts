export interface UserModel {
    uid: string;
    username: string;
    email: string;
    friends: string[];
    createdAt: any; // Firestore Timestamp
    photoURL?: string;
  }
  