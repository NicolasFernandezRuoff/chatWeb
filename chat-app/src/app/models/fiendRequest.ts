export interface FriendRequest {
    id: string;
    from: string;  // ID del usuario que envía la solicitud
    to: string;    // ID del usuario que recibe la solicitud
    status: 'pending' | 'accepted' | 'rejected';
  }
  