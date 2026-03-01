import { Timestamp } from "firebase-admin/firestore";


export interface FirestoreDataTypes {
  id: string;                
  name: string;                  
  date: Timestamp;               
  capacity: number;
  registrationCount: number;
  status: string;
  category: string;
  createdAt: Timestamp;        
  updatedAt: Timestamp;       
}