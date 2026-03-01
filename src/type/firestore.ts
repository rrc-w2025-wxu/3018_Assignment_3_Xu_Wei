import { Timestamp } from "firebase-admin/firestore";

/**
 * FirestoreDataTypes defines the structure of an event document stored in Firestore.
 *
 * Each field represents a property of the event with its expected type.
 */
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