import 'server-only';
import { db } from '../config';
import { FirebaseWebTextsDocument } from '@/types/texts';


const WEB_COLLECTION = 'web';

export async function getWebTexts():Promise<FirebaseWebTextsDocument> {
  try {
    const snapshot = await db.collection(WEB_COLLECTION).doc('textos').get();

    if (!snapshot.exists) {
      throw new Error('No se encontraron textos de inicio');
    }

    return snapshot.data() as FirebaseWebTextsDocument;
  } catch (err) {
    console.error('[getWebTexts] Error:', err);
    throw new Error('No se pudieron obtener los textos de inicio');
  }
}